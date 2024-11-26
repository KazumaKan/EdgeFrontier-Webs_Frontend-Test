import ContentHeader from "../components/ContentHeader";
import Card from "../components/Card";
import Dataflow from "../components/Dataflow";
import DataHost from "./DataHost";

const Dashboard = () => {
  return (
    <div>
      <DataHost />
      <div className="  flex-row ">
        <div>
          <Card />
          <Dataflow />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
