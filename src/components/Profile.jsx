import "../styles/Profile.css";

import proF from "../assets/profile.png";

const Profile = (rightSpacing = "16px") => {
  return (
    <div
      className="gap-8 mt-6 bg-white text-[#707178] p-8 rounded-lg mx-auto font-sans shadow-lg"
      style={{ width: "685px" }}
    >
      <h2 className="text-lg font-semibold mb-6">Account</h2>

      {/* Profile Photo Section */}
      <div
        className="flex items-center justify-between mb-8"
        style={{ paddingRight: rightSpacing }}
      >
        <div className="flex items-center gap-6">
          <img
            src={proF}
            alt="profile"
            className="w-20 h-20 rounded-full object-cover border border-gray-300"
          />
          <span className="font-medium text-gray-600">Profile Photo</span>
        </div>
        <div className="flex gap-4">
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm">
            Remove Profile
          </button>
          <button className="bg-[#F6CE77] hover:bg-yellow-500 text-[#0D0F1B] px-4 py-2 rounded-md text-sm">
            Change Profile
          </button>
        </div>
      </div>

      {/* Information Section */}
      <div className="space-y-6">
        {/* Name Section */}
        <div
          className="flex justify-between items-center border-b border-gray-300 pb-4"
          style={{ paddingRight: rightSpacing }}
        >
          <span className="font-medium text-gray-600">Name</span>
          <div className="flex items-center gap-4">
            <span className="text-gray-800 font-medium">JOSEP DEPE</span>
            <button className="bg-[#F6CE77] hover:bg-yellow-500 text-[#0D0F1B] px-4 py-2 rounded-md text-sm">
              Edit
            </button>
          </div>
        </div>

        {/* Email Address Section */}
        <div
          className="flex justify-between items-center border-b border-gray-300 pb-4"
          style={{ paddingRight: rightSpacing }}
        >
          <span className="font-medium text-gray-600">Email address</span>
          <div className="flex items-center gap-4">
            <span className="text-gray-800 font-medium">abc@gmail.com</span>
            <button className="bg-[#F6CE77] hover:bg-yellow-500 text-[#0D0F1B] px-4 py-2 rounded-md text-sm">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
