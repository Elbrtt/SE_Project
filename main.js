const fs = require('fs');
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

if (!app.isPackaged) {
    require('electron-reload')(__dirname);
}

const usersFile = path.join(
    app.getPath('userData'),
    'users.json'
);

console.log('Users file:', usersFile);

if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, '[]');
}

function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        frame: false,
        webPreferences: {
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadFile(
        path.join(__dirname, 'src/pages/authentication.html')
    );

    ipcMain.on('window-min', () => win.minimize());

    ipcMain.on('window-max', () => {
        if (win.isMaximized()) {
            win.unmaximize();
        } else {
            win.maximize();
        }
    });

    ipcMain.on('window-close', () => win.close());
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

ipcMain.handle('register-user', async (event, userData) => {
    try {
        const users = JSON.parse(
            fs.readFileSync(usersFile, 'utf8')
        );

        const exist = users.some(
            user =>
                user.username &&
                user.username.toLowerCase() ===
                userData.username.toLowerCase()
        );

        if (exist) {
            return {
                success: false,
                message: 'Username already exists'
            };
        }

        users.push({
            username: userData.username,
            email: userData.email,
            password: userData.password
        });

        fs.writeFileSync(
            usersFile,
            JSON.stringify(users, null, 2)
        );

        return {
            success: true
        };

    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: error.message
        };
    }
});

ipcMain.handle('login-user', async (event, credentials) => {
    try {
        const users = JSON.parse(
            fs.readFileSync(usersFile, 'utf8')
        );

        const user = users.find(
            user =>
                user.username &&
                user.password &&
                user.username.toLowerCase() ===
                credentials.username.toLowerCase() &&
                user.password === credentials.password
        );

        if (user) {
            return {
                success: true,
                username: user.username
            };
        }

        return {
            success: false
        };

    } catch (error) {
        console.error(error);

        return {
            success: false
        };
    }
});