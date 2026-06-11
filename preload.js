const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  windowControls: {
    minimize: () => ipcRenderer.send('window-min'),
    maximize: () => ipcRenderer.send('window-max'),
    close: () => ipcRenderer.send('window-close')
  },
  
  auth: {

        register: (userData) =>
            ipcRenderer.invoke('register-user', userData),

        login: (credentials) =>
            ipcRenderer.invoke('login-user', credentials)
    }
})
