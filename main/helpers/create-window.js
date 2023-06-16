import { app, screen, BrowserWindow } from "electron";
import Store from "electron-store";
import path from "path";

const isProd = process.env.NODE_ENV === "production";

export default (windowName, options) => {
  const key = "window-state";
  const name = `window-state-${windowName}`;
  const store = new Store({ name });
  const defaultSize = {
    width: options.width,
    height: options.height,
  };
  let state = {};
  let win;

  const restore = () => store.get(key, defaultSize);

  if (process.defaultApp) {
    if (process.argv.length >= 2) {
      app.setAsDefaultProtocolClient("sai-admin", process.execPath, [
        path.resolve(process.argv[1]),
      ]);
    }
  } else {
    app.setAsDefaultProtocolClient("sai-admin");
  }

  const getCurrentPosition = () => {
    const position = win.getPosition();
    const size = win.getSize();
    return {
      x: position[0],
      y: position[1],
      width: size[0],
      height: size[1],
    };
  };

  const windowWithinBounds = (windowState, bounds) => {
    return (
      windowState.x >= bounds.x &&
      windowState.y >= bounds.y &&
      windowState.x + windowState.width <= bounds.x + bounds.width &&
      windowState.y + windowState.height <= bounds.y + bounds.height
    );
  };

  const resetToDefaults = () => {
    const bounds = screen.getPrimaryDisplay().bounds;
    return Object.assign({}, defaultSize, {
      x: (bounds.width - defaultSize.width) / 2,
      y: (bounds.height - defaultSize.height) / 2,
    });
  };

  const ensureVisibleOnSomeDisplay = (windowState) => {
    const visible = screen.getAllDisplays().some((display) => {
      return windowWithinBounds(windowState, display.bounds);
    });
    if (!visible) {
      return resetToDefaults();
    }
    return windowState;
  };

  const saveState = () => {
    if (!win.isMinimized() && !win.isMaximized()) {
      Object.assign(state, getCurrentPosition());
    }
    const session = new Store({ name: "session" });
    session.delete("user");
    store.set(key, state);
  };

  state = ensureVisibleOnSomeDisplay(restore());

  const browserOptions = {
    ...state,
    ...options,
    icon: "./resources/__yuuka_blue_archive_drawn_by_amonitto__sample-8a8247ab1c40e8ee7ad019f04f9c4d8d.jpg",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      ...options.webPreferences,
      devTools: options.devTools || false,
    },
  };
  win = new BrowserWindow(browserOptions);

  const gotTheLock = app.requestSingleInstanceLock();

  if (!gotTheLock) {
    app.quit();
  } else {
    app.on("second-instance", (event, commandLine, workingDirectory) => {
      if (win) {
        if (win.isMinimized()) win.restore();
        win.focus();
      }
      const formatedURL = commandLine?.pop()?.split("//")[1]?.slice(0, -1);
      if (formatedURL) {
        if (isProd) {
          win.loadURL(`app://./${formatedURL}.html`);
        } else {
          const port = process.argv[2];
          win.loadURL(`http://localhost:${port}/${formatedURL}`);
        }
      }
    });

    app.on("ready", async () => {
      await createWindow();
    });
  }

  win.on("close", saveState);

  return win;
};
