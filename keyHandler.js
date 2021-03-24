const sendKeys = require('sendkeys-macos');
css = require('css');
const fs = require('fs');
let exec = require("child_process").exec,
  config = require("./config.js"),
  lastTime = {},
  windowID = "unfilled",
  throttledCommands = config.throttledCommands,
  regexThrottle = new RegExp("^(" + throttledCommands.join("|") + ")$", "i"),
  regexFilter = new RegExp(
    "^(" + config.filteredCommands.join("|") + ")$",
    "i"
  );

let isWindows = process.platform === "win32";

// (function setWindowID() {
//   if (!isWindows & windowID === "unfilled") {
//     exec("xdotool search --onlyvisible --name " + config.programName, function (
//       error,
//       stdout
//     ) {
//       windowID = stdout.trim();
//       // console.log(key, windowID);
//     });
//   }
// })();

for (let i = 0; i < throttledCommands.length; i++) {
  lastTime[throttledCommands[i]] = new Date().getTime();
}

let defaultKeyMap = config.keymap || {
  up: "Up",
  left: "Left",
  down: "Down",
  right: "Right",
  a: "a",
  b: "b",
  x: "x",
  y: "y",
  start: "s",
  select: "e",
};



function appendText(text) {
  const fileStream = fs.createWriteStream('styles.css',
    { flags: 'a' }
  );
  fileStream.write(`${text}\n\n`);
  fileStream.end();
}


function sendKey(command) {
  //if doesn't match the filtered words
  if (!command.match(regexFilter)) {
    let allowKey = true;
    let key = defaultKeyMap[command] || command;
    //throttle certain commands (not individually though)
    if (key.match(regexThrottle)) {
      let newTime = new Date().getTime();
      if (newTime - lastTime[key] < config.timeToWait) {
        allowKey = false;
      } else {
        lastTime = newTime;
      }
    }
    if (allowKey || true) {
      try {
          // validate CSS and hopefully avoid anything weird from happening
          const styles = css.parse(key);
          appendText(key);
        } catch (error) {
          console.warn(`INVALID INPUT: ${key}`)
        }
    }
  }
}

exports.sendKey = sendKey;

