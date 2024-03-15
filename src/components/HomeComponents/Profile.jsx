import React from 'react';

const ProfileMenu = ({ data }) => {
  return (
    <div className="prof-icon bg-warning mx-2 d-flex justify-content-center align-items-center" style={{ width: '30px', height: '30px', borderRadius: '50%', position: "relative" }}>
      <h6 className="pt-2">{data.admin?.name[0]}</h6>
      <div className="profile-menu shadow" style={{ position: "absolute", top: "25px" }}>
        <div className="d-flex w-100 flex-column">
          <div className="border d-flex justify-content-center align-items-center bg-warning mt-2 mx-auto" style={{ width: "100px", height: "100px", borderRadius: "50%" }}>
            <h3 style={{ fontSize: "70px" }}>{data.admin?.name[0]}</h3>
          </div>
          <div className="w-100 d-flex justify-content-around align-items-center">
            <button className="btn btn-primary">View profile</button>
            <button className="btn btn-warning">Edit profile</button>
          </div>
          <div className="w-100 d-flex justify-content-center align-items-center mt-3">
            <button className="btn btn-danger px-5" style={{ width: "260px" }}><CiLogin /><span className="px-2">logout</span></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
