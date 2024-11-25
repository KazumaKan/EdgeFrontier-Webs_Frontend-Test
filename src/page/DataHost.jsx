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
  lastReceivedTime: null, // เก็บเวลาที่รับข้อมูลล่าสุด
  speed: null, // ความเร็วการส่งข้อมูล
};

socket.onmessage = (event) => {
  try {
    if (event.data) {
      const parsedData = JSON.parse(event.data);
      const currentTime = Date.now();

      // คำนวณความเร็วในการส่งข้อมูล
      if (dataStore.lastReceivedTime) {
        const timeDiff = currentTime - dataStore.lastReceivedTime; // คำนวณเวลาที่ใช้
        dataStore.speed = 1000 / timeDiff; // ความเร็ว (ข้อมูลที่ส่งมาใน 1 วินาที)
      }

      // อัพเดตข้อมูลใน dataStore
      dataStore.CO2 = parsedData.Data.CO2;
      dataStore.HUMID = parsedData.Data.HUMID;
      dataStore.PRESSURE = parsedData.Data.PRESSURE;
      dataStore.RA = parsedData.Data.RA;
      dataStore.TEMP = parsedData.Data.TEMP;
      dataStore.VOC = parsedData.Data.VOC;
      dataStore.Event = parsedData.Event;
      dataStore.HardwareID = parsedData.HardwareID;
      dataStore.TimeStamp = parsedData.TimeStamp;

      // แสดงข้อมูลใน Console
      console.log("Received Data:", parsedData);
      console.log("Speed (data/sec):", dataStore.speed);

      // อัพเดตเวลาเมื่อรับข้อมูลล่าสุด
      dataStore.lastReceivedTime = currentTime;
    }
  } catch (err) {
    console.error("Error parsing WebSocket message:", err);
  }
};

socket.onopen = () => {
  console.log("WebSocket is connected");
};

socket.onerror = (error) => {
  console.error("WebSocket Error:", error);
};

socket.onclose = () => {
  console.log("WebSocket connection closed");
};

export default socket;
