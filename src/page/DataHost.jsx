const socket = new WebSocket("wss://server-test-latest.onrender.com/demo");

export const dataStore = {
  CO2: null,
  HUMID: null,
  PRESSURE: null,
  RA: null,
  TEMP: null,
  VOC: null,
  Event: null,
  HardwareID: null,
  TimeStamp: null,
  lastReceivedTime: null,
  speed: null,
  Prediction: {
    Cold: null,
    Warm: null,
    Hot: null,
    Dry: null,
    Wet: null,
    Normal: null,
    Unknown: null,
  },
};

socket.onmessage = (event) => {
  try {
    if (event.data) {
      const parsedData = JSON.parse(event.data);
      const currentTime = Date.now();

      if (dataStore.lastReceivedTime) {
        const timeDiff = currentTime - dataStore.lastReceivedTime;
        dataStore.speed = 1000 / timeDiff;
      }

      // อัปเดตค่าที่ได้รับจาก WebSocket และทำการปัดเศษทศนิยมให้มีสูงสุดแค่ 2 ตำแหน่ง
      dataStore.CO2 = parseFloat(parsedData.Data.CO2).toFixed(2);
      dataStore.HUMID = parseFloat(parsedData.Data.HUMID).toFixed(2);
      dataStore.PRESSURE = parseFloat(parsedData.Data.PRESSURE).toFixed(2);
      dataStore.RA = parseFloat(parsedData.Data.RA).toFixed(2);
      dataStore.TEMP = parseFloat(parsedData.Data.TEMP).toFixed(2);
      dataStore.VOC = parseFloat(parsedData.Data.VOC).toFixed(2);
      dataStore.Event = parsedData.Event;

      // อัปเดตข้อมูล Prediction
      dataStore.Prediction.Cold = parsedData.Prediction?.Cold ?? "N/A";
      dataStore.Prediction.Warm = parsedData.Prediction?.Warm ?? "N/A";
      dataStore.Prediction.Hot = parsedData.Prediction?.Hot ?? "N/A";
      dataStore.Prediction.Dry = parsedData.Prediction?.Dry ?? "N/A";
      dataStore.Prediction.Wet = parsedData.Prediction?.Wet ?? "N/A";
      dataStore.Prediction.Normal = parsedData.Prediction?.Normal ?? "N/A";
      dataStore.Prediction.Unknown = parsedData.Prediction?.Unknown ?? "N/A";

      dataStore.lastReceivedTime = currentTime;
    }
  } catch (err) {
    console.error("Error parsing WebSocket message:", err);
  }
};

socket.onopen = () => {
  console.info("WebSocket connected");
};

socket.onerror = (error) => {
  console.error("WebSocket error:", error);
};

socket.onclose = () => {
  console.warn("WebSocket connection closed");
};

export default socket;
