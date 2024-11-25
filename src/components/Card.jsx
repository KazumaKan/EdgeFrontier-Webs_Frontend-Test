import React, { useState, useEffect } from "react";
import PieChart from "../components/PieChartH";
import PieChartT from "../components/PieChartT";
import RangeMeter from "../components/RangeMeter";

import CO from "../assets/co2.png";
import VOC from "../assets/compound.png";
import RODON from "../assets/radon.png";
import { dataStore } from "../page/DataHost";

function Card() {
  // State management for blocks
  const [block5Active, setBlock5Active] = useState(true);
  const [block6Active, setBlock6Active] = useState(true);
  const [block1Active, setBlock1Active] = useState(true);
  const [block2Active, setBlock2Active] = useState(true);
  const [block3Active, setBlock3Active] = useState(true);
  const [block4Active, setBlock4Active] = useState(true);

  // State for dynamic data from dataStore
  const [data, setData] = useState(dataStore);

  useEffect(() => {
    // Set up an interval to check for changes every 2 seconds
    const interval = setInterval(() => {
      setData({ ...dataStore }); // Update state with the latest data from dataStore
    }, 2000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" flex flex-wrap justify-center gap-6 mt-3 ">
      <div>
        {/* Row 1-3 container */}
        <div className="mb-5">
          {/* Row 1 */}
          <div className="flex gap-4">
            {/* Block 5 */}
            <div className="bg-gray-200 rounded-[30px] p-4 w-[375px] h-[250px] shadow-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[#707178] ml-5">
                  TEMPERATURE
                </h2>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={block5Active}
                    onChange={() => setBlock5Active(!block5Active)}
                    className="toggle theme-controller [--tglbg:theme(colors.sky.250)] checked:border-blue-800 checked:bg-blue-300"
                  />
                </label>
              </div>
              <div
                className={`flex flex-row items-center justify-center mt-7 space-x-14 ${
                  block5Active ? "opacity-100" : "opacity-50"
                } transition-opacity duration-500`}
              >
                <PieChartT
                  percentage={block5Active ? data.TEMP : 0}
                  color={block5Active ? "lightblue" : "gray"}
                />
                <h2 className="text-5xl font-bold text-[#3ABEFF]">
                  {block5Active ? data.TEMP : 0} °C
                </h2>
              </div>
            </div>

            {/* Block 6 */}
            <div className="bg-gray-200 rounded-[30px] p-4 w-[375px] h-[250px] shadow-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[#707178] ml-5">
                  HUMIDITY
                </h2>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={block6Active}
                    onChange={() => setBlock6Active(!block6Active)}
                    className="toggle theme-controller [--tglbg:theme(colors.sky.250)] checked:border-blue-800 checked:bg-blue-300"
                  />
                </label>
              </div>
              <div
                className={`flex flex-row items-center justify-center mt-7 space-x-14 ${
                  block6Active ? "opacity-100" : "opacity-50"
                } transition-opacity duration-500`}
              >
                <PieChart
                  percentage={block6Active ? data.HUMID : 0}
                  color={block6Active ? "lightgreen" : "gray"}
                />
                <h2 className="text-5xl font-bold text-[#0F5DC3]">
                  {block6Active ? data.HUMID : 0} %
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex gap-4">
          {/* Block 1 */}
          <div className="bg-gray-200 rounded-[30px] p-4 w-[246px] h-[145px] shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#707178] ml-5">CO2</h2>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={block1Active}
                  onChange={() => setBlock1Active(!block1Active)}
                  className="toggle theme-controller [--tglbg:theme(colors.sky.250)] checked:border-blue-800 checked:bg-blue-300"
                />
              </label>
            </div>
            <div
              className={`flex items-center mt-2 ${
                block1Active ? "opacity-100" : "opacity-50"
              } transition-opacity duration-500`}
            >
              <img src={CO} alt="CO2" className="ml-6 w-[56px] h-[54px]" />
              <h2 className="text-5xl font-bold ml-14 text-[#FF9D00]">
                {block1Active ? data.CO2 : 0}
              </h2>
            </div>
          </div>

          {/* Block 2 */}
          <div className="bg-gray-200 rounded-[30px] p-4 w-[246px] h-[145px] shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#707178] ml-5">VOC</h2>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={block2Active}
                  onChange={() => setBlock2Active(!block2Active)}
                  className="toggle theme-controller [--tglbg:theme(colors.sky.250)] checked:border-blue-800 checked:bg-blue-300"
                />
              </label>
            </div>
            <div
              className={`flex items-center mt-2 ${
                block2Active ? "opacity-100" : "opacity-50"
              } transition-opacity duration-500`}
            >
              <img src={VOC} alt="VOC" className="ml-6 w-[56px] h-[54px]" />
              <h2 className="text-5xl font-bold ml-14 text-[#43D2A7]">
                {block2Active ? data.VOC : 0}
              </h2>
            </div>
          </div>

          {/* Block 3 */}
          <div className="bg-gray-200 rounded-[30px] p-4 w-[246px] h-[145px] shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#707178] ml-5">
                RODON
              </h2>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={block3Active}
                  onChange={() => setBlock3Active(!block3Active)}
                  className="toggle theme-controller [--tglbg:theme(colors.sky.250)] checked:border-blue-800 checked:bg-blue-300"
                />
              </label>
            </div>
            <div
              className={`flex items-center mt-2 ${
                block3Active ? "opacity-100" : "opacity-50"
              } transition-opacity duration-500`}
            >
              <img src={RODON} alt="RODON" className="ml-7 w-[50px] h-[50px]" />
              <h2 className="text-5xl font-bold ml-14 text-[#67A4F4]">
                {block3Active ? data.RA : 0}
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Block 4 */}
        <div className="bg-gray-200 rounded-[30px] p-6 w-[370px] h-[419px] shadow-xl border ">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold  text-[#707178]">PRESSURE</h2>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={block4Active}
                onChange={() => setBlock4Active(!block4Active)}
                className="toggle theme-controller [--tglbg:theme(colors.sky.250)] checked:border-blue-800 checked:bg-blue-300"
              />
            </label>
          </div>
          <div
            className={`flex flex-col items-center justify-center mt-8 transition-all duration-500 ease-in-out ${
              block4Active
                ? "opacity-100 transform scale-100"
                : "opacity-50 transform scale-90"
            }`}
            style={{ height: "calc(100% - 80px)" }}
          >
            {/* Render the RangeMeter */}
            <RangeMeter value={block4Active ? data.PRESSURE : 0} />
            <h2 className="text-5xl mt-14 font-bold text-[#DB2777]">
              {block4Active ? data.PRESSURE : 0} Pa
            </h2>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Card;
