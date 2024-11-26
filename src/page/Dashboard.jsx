import ContentHeader from "../components/ContentHeader";
import Card from "../components/Card";
import Dataflow from "../components/Dataflow";

const Dashboard = () => {
  return (
    <div>
      <ContentHeader />
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
