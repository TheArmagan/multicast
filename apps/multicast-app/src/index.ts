import { app, BrowserWindow, ipcMain } from 'electron';
import cp from 'child_process';
import path from 'path';
import fs from 'fs';
import isDev from 'electron-is-dev';
import JSONStream from 'json-stream';

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
    backgroundMaterial: "acrylic",
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
  setTimeout(() => createWindow(), 750);

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
});

(() => {
  const keyListenerProc = cp.spawn(path.resolve(__dirname, "./key-listener.exe"), ["COMPLEX"]);
  const jsonStream = JSONStream();
  keyListenerProc.stdout.pipe(jsonStream);
  
  jsonStream.on('data', (data) => {
    console.log("KeyListener Data: ", data);
  });
})();