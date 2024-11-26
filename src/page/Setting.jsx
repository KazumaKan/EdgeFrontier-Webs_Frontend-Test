import ContentHeader from "../components/ContentHeader";
import Profile from "../components/Profile";

const Setting = () => {
  return (
    <div
      className="px-7"
      style={{
        paddingLeft: "0px",
        paddingRight: "15px",
      }}
    >
      <ContentHeader />
      <Profile />
    </div>
  );
};

export default Setting;
