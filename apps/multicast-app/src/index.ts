import { app, BrowserWindow } from 'electron';
import isDev from 'electron-is-dev';

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 700,
    height: 475,
    minWidth: 700,
    minHeight: 475,
    frame: false,
    transparent: true,
    backgroundColor: "#00000000",
    resizable: true,
    autoHideMenuBar: true,
    center: true,
    title: "Multicast",
    hasShadow: false,
    darkTheme: true,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInSubFrames: true,
      nodeIntegrationInWorker: true,
      contextIsolation: false,
      backgroundThrottling: false,
      webSecurity: false
    },
  });

  if (isDev) {
    win.loadURL('http://localhost:3000');
  } else {
    win.loadFile('ui/index.html')
  }
}

app.whenReady().then(() => {
  setTimeout(() => createWindow(), 300);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})