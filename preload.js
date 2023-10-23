const { contextBridge, ipcRenderer } = require("electron");

// Expose selected properties from Electron's process.version object
// to the renderer in a `versions` global variable
contextBridge.exposeInMainWorld("versions", {
  // we can also expose variables, not just functions
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // send a ping from web page to main process (ipcRenderer)
  ping: () => ipcRenderer.invoke("ping"),
});
