const { app, BrowserWindow } = require('electron')
const path = require('path')

require('electron-reload')(path.join(__dirname, '..'));


function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    frame: false,
    webPreferences: {
      contextIsolation: true
    }
  })

  win.loadFile(path.join(__dirname, 'index.html'))
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})