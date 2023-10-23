// import 2 Electron modules (CommonJS)
const { app, BrowserWindow, ipcMain } = require("electron");
// Attach preload script to renderer
const path = require("path");

// Instantiate a window
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    // Attach preload script to renderer
    webPreferences: {
      // __dirname points to path of currently executing script
      // path.join API joins multiple path segments, so it works cross-platform
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
};

// Call function when app is ready
// Use app.whenReady() API
// Call createWindow() once promise is fulfilled
app.whenReady().then(() => {
  // Ensure IPC is available before loading the page
  ipcMain.handle("ping", () => "pong");
  createWindow();

  // Handle macOS
  // Listen for app module's 'activate' event
  app.on("activate", () => {
    // and call the existing createWindows() method
    // if no BrowserWindows are open
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Handle Windows & Linux
// Quit app when window is closed
app.on("window-all-closed", () => {
  // unless OS is mac
  if (process.platform !== "darwin") app.quit();
});
