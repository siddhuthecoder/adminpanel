import React from 'react';
import { PiListFill } from "react-icons/pi";
import ProfileMenu from "./Profile"

// import LOGO from '../assets/logo.png';

const Navbar = ({ handleSide, data }) => {
  return (
    <div className="d-flex justify-content-between align-items-center shadow w-100" style={{ height: '50px', backgroundColor: "#333333" }}>
      <div className="d-flex align-items-center">
        <button className="btn mx-2" onClick={handleSide}>
          <PiListFill />
        </button>
        {/* <img src={LOGO} alt="" style={{ height: "40px" }} /> */}
      </div>
      <div className="d-flex align-items-center">
        <button className="bell-drop" style={{ position: "relative", backgroundColor: "#333333", color: "white", fontSize: "", position: "relative", borderRadius: "", border: "none" }}>
          {/* Icon for notifications */}
        </button>
        <ProfileMenu data={data} />
      </div>
    </div>
  );
};

export default Navbar;
