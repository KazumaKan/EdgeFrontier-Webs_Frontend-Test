import React from "react";
import DeviceL from "../components/DeviceL";
import InvoiceStatistic from "../components/InvoiceStatistic";
import ChartsTime from "../components/ChartsTime";

const Statistics = () => {
  return (
    <div>
      <div className="border-2 flex">
        <InvoiceStatistic />
        <ChartsTime />
      </div>
      <DeviceL />
    </div>
  );
};

export default Statistics;
