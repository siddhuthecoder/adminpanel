import React, { useState, useEffect } from 'react';
import '../App.css'
import { useNavigate } from "react-router-dom";

import Dashboard from '../components/Dashboard'
import Documentation from '../components/sendDocument'
import Users from '../components/Clients'
import SendNotice from '../components/sendNotice';
import Documents from '../components/Documents';
import Events from '../components/events/EventsList';
import WorkshopForm from '../components/workshops/SendWorkShop';
import { PiListFill } from "react-icons/pi";
import { CiLogin } from "react-icons/ci";
import { MdClose } from "react-icons/md";
import WorkShopsList from '../components/workshops/WorkShopsList';

import LOGO from '../assets/logo.png'
import Tabs from '../constants/tabs';
import { login, logout } from '../store/actions/actions';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
  const [data, setData] = useState({})
  const [tab, setTab] = useState('dashboard');
  const [width, setWidth] = useState(window.innerWidth);
  const [side, setSide] = useState(false);
  const navigate = useNavigate();

  const role = useSelector((state) => state.auth.role);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const handleLogin = () => {
    login("admin",dispatch);
  };
  const handleLogout = () => {
    logout(dispatch);
  };



  const handleWidth = () => {
    setWidth(window.innerWidth);
  }



  const handleSide = () => {
    if (width < 1000) {
      setSide(false)
    }
    if (width > 1000) {
      setSide(true)
    }
    setSide(!side)
  };

  useEffect(() => {
    window.addEventListener('resize', handleWidth);

    return () => {
      window.removeEventListener('resize', handleWidth);
    };

  }, [side]);

  useEffect(() => {
    const info = JSON.parse(localStorage.getItem("data"));
    setData(info)
  }, [])
  console.log(data)



  return (
    <>
      <section className="w-100" style={{ height: "100vh", backgroundColor: "#121212", color: "#ffffff", overflow: "hidden" }}>
        <div className="border d-flex justify-content-between align-items-center shadow w-100" style={{ height: '50px', backgroundColor: "#333333" }}>
          <div className="d-flex align-items-center">
            <button className="btn mx-2" onClick={handleSide}>
              <PiListFill />
            </button>
            <h2 className="pt-2">TECKZITE</h2>
          </div>
          <div className="d-flex align-items-center">
            <button className="bell-drop" style={{ position: "relative", backgroundColor: "#333333", color: "white", fontSize: "", position: "relative", borderRadius: "", border: "none" }}>
              {/* Icon for notifications */}
            </button>
            <div className="prof-icon bg-warning mx-2 d-flex justify-content-center align-items-center" style={{ width: '30px', height: '30px', borderRadius: '50%', position: "relative" }}>
              <h6>{data.admin?.name[0]}</h6>

              <div className="profile-menu shadow" style={{ position: "absolute", top: "25px" }}>
                <div className="d-flex w-100 flex-column">
                  <div className="border d-flex justify-content-center align-items-center bg-warning mt-2 mx-auto"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%"
                    }}>
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
            <div className="prof-name">{data.admin?.name}</div>
          </div>
        </div>
        <div className="w-100 d-flex" style={{ position: 'relative' }}>
          {
            width > 1000 ?
              <>
                <div className="sidebar bg-dark justify-content-between  d-flex flex-column shadow " style={{ height: '94vh', minWidth: '260px', marginLeft: side ? '0px' : '-260px', transitionDuration: "0.3s", zIndex: "200" }}>
                  <div className="d-flex flex-column">
                    {Tabs.map((data) => (
                      <div className={`tab mb-2  ${tab === data.tab ? "tab-actived" : ""}`} onClick={() => setTab(data.tab)}>
                        <div className="">
                          <span>{data.tabName}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={`tab mb-2 mb-5 `} style={{ backgroundColor: "#b3ecff", border: "2px solid black", borderRadius: "3px" }} onClick={() => {
                    navigate('/')
                  }}>
                    <span><CiLogin /></span>
                    <span>logout</span>
                  </div>
                </div>
              </> :
              <>
                <div className="sidebar justify-content-between  d-flex flex-column bg-dark d-flex flex-column shadow " style={{ height: '100vh', minWidth: '100%', position: "absolute", left: side ? '0px' : '-100%', top: "-50px", transitionDuration: '0.3s', zIndex: "200" }}>
                  <div className="d-flex flex-column">
                    <div className="w-100 d-flex justify-content-between mt-3 align-items- mb-3">
                      <div className="d-flex flex-column ps-4">
                        <img src={LOGO} alt="" style={{ height: "60px" }} />
                        <div className="" style={{ color: "#FFFFFF", fontWeight: "700" }}>U3Tech Pvt Ltd.</div>
                      </div>
                      <div className=" badge text-light d-flex  p-3" style={{ flexDirection: "row-reverse", cursor: "pointer", marginTop: "-20px", marginRight: "-10px" }} onClick={() => { setSide(false); }}>
                        <MdClose style={{ fontSize: "40px" }} />
                      </div>
                    </div>
                    {
                      Tabs.map((data) => (
                        <div key={data.tab} className={`tab mb-2  text-center ${tab === data.tab ? "" : ""}`} onClick={() => { setTab(data.tab); setSide(false); }}>
                          <span style={{ fontWeight: "700", fontSize: "20px", color: "#FFFFFF" }}>{data.tabName}</span>
                        </div>
                      ))
                    }
                  </div>
                  <div className={`tab mb-2 mb-5 text-center `} style={{ backgroundColor: "#b3ecff", border: "2px solid black", borderRadius: "3px" }} onClick={() => { navigate('/') }}>
                    <span><CiLogin /></span>
                    <span>logout</span>
                  </div>
                </div>
              </>
          }
          <div className="shadow  mt-4 mb-2 py-2 mx-auto" style={{ width: "97%", height: width < 700 ? "89vh" : "85vh", minHeight: "85vh", overflowY: "scroll" }}>
            {tab === "dashboard" && <Dashboard />}
            {tab === "users" && <Users />}
            {tab === "sendNotice" && <SendNotice />}
            {tab === "sendDocument" && <Documentation />}
            {tab === "events" && <Events />}
            {tab === "workshops" && <WorkShopsList />}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
