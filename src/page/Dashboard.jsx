import React from "react";
import ContentHeader from "../components/ContentHeader";
import Card from "../components/Card";
import Dataflow from "../components/Dataflow";
import Statistics from "../page/Statistics";
import CardMode from "../components/CardMode";
import ChartsTime from "../components/ChartsTime";

const Dashboard = () => {
  return (
    <div>
      <ContentHeader />
      <div className="border-2 flex flex-row">
        <div>
          <Card />
          <Dataflow />
        </div>
        <CardMode />
      </div>
        {/* <ChartsTime /> */}
      <Statistics />
    </div>
  );
};

export default Dashboard;
