import DeviceL from "../components/DeviceL";
import InvoiceStatistic from "../components/InvoiceStatistic";
import ChartsTime from "../components/ChartsTime";

const Statistics = () => {
  return (
    <div>
      <div>
        <div className="flex gap-4">
          <InvoiceStatistic />
          <ChartsTime />
        </div>
        <DeviceL />
      </div>
    </div>
  );
};

export default Statistics;
