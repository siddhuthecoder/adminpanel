import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { MdEventAvailable, MdGroups, MdKeyboardBackspace } from "react-icons/md";
import logo from "../../assets/logo.png";
import { PiIdentificationBadgeFill } from "react-icons/pi";
import {
  FaRegUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUserTag,
  FaCalendarAlt,
  FaBuilding,
  FaFileAlt,
  FaIdCard,
  FaSlideshare
} from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import { RiExpandUpDownFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { context } from "../../App";

const ClientDetails = () => {
  const [right, setRight] = useState("details");
  const [dataArray, setDataArray] = useState([]);
  const {token} = useContext(context);
  const [clientData, setClientData] = useState({});
  const [loading, setLoading] = useState(true);
  const [pdfID, setPdfID] = useState("");
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [pdfUrls, setPdfUrls] = useState([]);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");

  const openPdfInNewTab = (pdfUrl) => {
    window.open(`${pdfUrl}#toolbar=0`, "_blank");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get(
          `${import.meta.env.VITE_API}/user/${clientId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        );

        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }

        setClientData(response.data.user);
        setLoading(false);
      } catch (err) {
        toast.error("Internal Error",{theme:"colored"})
        if(err?.message=="Unauthorized"){
          navigate("/")
        }
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    if (clientData.email) {
      getPdf();
    }
  }, [clientData.email]);


  const getPdf = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/client/getPdfByEmail",
        { useremail: clientData.email },
        { responseType: "json" }
      );
      const responseArray = response.data;
      setDataArray(responseArray);

      // Extract PDF titles from the response data
      const pdfTitles = responseArray.map((pdf) => pdf.title);
      setPdfUrls(pdfTitles);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch PDF titles");
      setLoading(false);
    }
  };

  useEffect(() => {
    getPdf();
  }, []);

  const clientDataInfo = [
    {
      title: "TeckZite ID",
      icon: <FaIdCard />,
      value: `${clientData.tzkid}`,
    },
    {
      title: "Name",
      icon: <FaRegUser />,
      value: `${clientData.firstName} ${clientData.lastName}`,
    },
    { title: "Email", icon: <FaEnvelope />, value: `${clientData.email}` },
    { title: "Contact", icon: <FaPhone />, value: `${clientData.phno}` },
    {
      title: "Address",
      icon: <FaMapMarkerAlt />,
      value: `${clientData.city} ${clientData.district} ${clientData.state}`,
    },
    {
        title: "College Name",
        icon: <FaBuilding />,
        value: `${clientData.college}`,
      },
      {
        title: "College Id",
        icon: <PiIdentificationBadgeFill />,
        value: `${clientData.collegeId}`,
      },
      {
        title: "Branch",
        icon: <MdGroups />,
        value: `${clientData.branch}`,
      },
      {
        title: "Year",
        icon: <MdGroups />,
        value: `${clientData.year} `,
      },
      {
        title: "Referrals",
        icon: <FaSlideshare />,
        value: `${clientData.refreals?.length==0?"No Referrals":clientData.refreals?.join(", ")}`,
      },
      {
        title: "Registered Events",
        icon: <MdEventAvailable />,
        value: `${clientData.regEvents?.length==0?"No Registered Events":clientData.regEvents?.join(", ")}`,
      },
      {
        title: "Registered Workshop",
        icon: <MdEventAvailable />,
        value: `${clientData.regWorkshop?.length==0?"No Registered Workshops":clientData.regWorkshop?.join(", ")}`,
      },
      {
        title: "Student ID Image",
        icon: <PiIdentificationBadgeFill />,
        value: `${clientData?.img}`,
      },
              
  ];

  const DetailsClient = () => {
    return (
      <>
        <div className="w-100 d-flex flex-column ">
          {clientDataInfo.map((data, index) => (
            <>
            { data.value!="" &&
              <div
              key={index}
              className=" mx-auto    row w-100 ps-3 py-2"
              style={{
                backgroundColor: "#1e1e1e",
                borderBottom: "1px solid #333333",
              }}
            >
              <div
                className="col-12 col-sm-5 col-md-4 d-flex align-items-center"
                style={{ color: "#cccccc" }}
              >
                {data.icon}
                <span className="ps-2" style={{ minWidth: "120px" }}>
                  {data.title}
                </span>
              </div>
              {data.title=="Student ID Image"?<div className="col-12 sol-sm-7 col-md-8">
                <img src={data.value} alt="student Id" width="150px" height={"150px"}/>
              </div>:<div
                className="col-12 col-sm-7 col-md-8"
                style={{ color: "#00cccc", fontWeight: "700" }}
              >
                {data.value}
              </div>}
            </div>
  }
          </>
          ))}
        </div>
      </>
    );
  };

  const goback = () => {
    window.history.back();
  };
  if (loading) {
    return (
      <>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="">Loading...</div>
        </div>
      </>
    );
  }
  return (
    <>
      <section
        className="w-100"
        style={{
          backgroundColor: "#1e1e1e",
          color: "#ffffff",
          minHeight: "100vh",
        }}
      >
        <div
          className="w-100 d-flex align-items-center justify-content-between shadow"
          style={{ height: "50px", backgroundColor: "#333333" }}
        >
          <div className="mx-3">
            <Link to="#" onClick={goback}>
              <MdKeyboardBackspace
                style={{ fontSize: "30px", color: "#ffffff" }}
              />
            </Link>
          </div>
          <img src={logo} alt="logo" style={{ height: "40px" }} />
        </div>
        <div className="breadcrumb py-3 px-3" style={{ color: "#ffffff" }}>
          <div className="breadcrumb-item h4">
            <Link
              to="/home"
              style={{ textDecoration: "none", color: "#cccccc" }}
            >
              Users
            </Link>
          </div>
          <div
            className="breadcrumb-item h4"
            style={{ textDecoration: "none" }}
          >
            {clientData.firstName}
          </div>
        </div>
        <div className="w-100 row" style={{ margin: "0px 0px" }}>
          <div
            className=" mx-auto card d-flex flex-column shadow"
            style={{ backgroundColor: "#333333", color: "#ffffff" }}
          >
            <div className="d-flex w-100 align-items-center justify-content-between">
              <h1
                className="h1 m-3 px-2"
                style={{ fontWeight: "700", borderLeft: "8px solid #00cccc" }}
              >
                Client Details
              </h1>
            </div>
            <DetailsClient />
          </div>
        </div>
      </section>
    </>
  );
};
export default ClientDetails;
