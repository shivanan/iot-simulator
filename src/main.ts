// const {app, BrowserWindow,dialog} = require('electron');
import { app, BrowserWindow, dialog } from 'electron';
var VERSION = '0.1'

var devMode = false;

var args = process.argv;
if (args.length > 2 ) {
  for(var i=0;i<args.length;i++) {
    var a = args[i];
    if (a == '--dev')
      devMode = true;
  }
}
let CurrentWindow:BrowserWindow = null;
function  showDevTools() {
  if (!!CurrentWindow) CurrentWindow.webContents.openDevTools();
}
function reload() {
  if (!!CurrentWindow) CurrentWindow.reload();
}
function about() {
  dialog.showMessageBox(CurrentWindow,{
    type:'info',
    title:'About IoT Simulator',
    message:'IoT Simulator',
    detail:VERSION,
    buttons:['OK']
  });
}
let win:BrowserWindow;
function createWindow () {
  win = new BrowserWindow({width: 700, height: 500,titleBarStyle:'hidden',title:'IoT Simulator'});
  console.log('DIR',__dirname);
	win.loadURL(`file://${__dirname}/../index.html`)
  if (devMode) {
   win.webContents.openDevTools()
  }


	win.on('closed', () => {
		win = null
    CurrentWindow = null;
	});
  CurrentWindow = win;
 
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  app.quit();
  return;
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
  	app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
  	createWindow()
  }
})
