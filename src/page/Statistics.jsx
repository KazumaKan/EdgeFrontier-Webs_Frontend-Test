import DeviceL from "../components/DeviceL";
import InvoiceStatistic from "../components/InvoiceStatistic";
import ChartsTime from "../components/ChartsTime";
import ContentHeader from "../components/ContentHeader";

const Statistics = () => {
  return (
    <div>
      <ContentHeader />
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
