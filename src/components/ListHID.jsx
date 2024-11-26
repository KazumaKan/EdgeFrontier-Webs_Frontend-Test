// middle/stateStore.js

let HardwareID = "";
let Mode = "";
let Speed = "";

const setHardwareID = (id) => {
  HardwareID = id;
};

const setMode = (mode) => {
  Mode = mode;
};

const setSpeed = (speed) => {
  Speed = speed;
};

export { HardwareID, Mode, Speed, setHardwareID, setMode, setSpeed };
