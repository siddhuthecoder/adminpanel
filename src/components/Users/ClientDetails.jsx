import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import {
  MdEventAvailable,
  MdGroups,
  MdKeyboardBackspace,
} from "react-icons/md";
import logo from "../../assets/logo.png";
import FileBase64 from "react-file-base64";
import { PiIdentificationBadgeFill } from "react-icons/pi";
import { GiTakeMyMoney } from "react-icons/gi";
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
  FaSlideshare,
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
  const { token } = useContext(context);
  const [tab,setTab] = useState("")
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
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }

        setClientData(response.data.user);
        setLoading(false);
      } catch (err) {
        toast.error("Internal Error", { theme: "colored" });

        if (err?.message == "Unauthorized") {
          navigate("/");
        }
      }
    };

    fetchData();
  }, [token,tab]);

 
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
      title: "Amount Paid",
      icon: <GiTakeMyMoney />,
      value: `${clientData.amountPaid}`,
    },
    {
      title: "Referrals",
      icon: <FaSlideshare />,
      value: `${
        clientData.refreals?.length == 0
          ? "No Referrals"
          : clientData.refreals?.join(", ")
      }`,
    },
    {
      title: "Registered Events",
      icon: <MdEventAvailable />,
      value: `${
        clientData.regEvents?.length == 0
          ? "No Registered Events"
          : clientData.regEvents?.join(", ")
      }`,
    },
    {
      title: "Registered Workshop",
      icon: <MdEventAvailable />,
      value: `${
        clientData.regWorkshop?.length == 0
          ? "No Registered Workshops"
          : clientData.regWorkshop?.join(", ")
      }`,
    },
    {
      title: "Student ID Image",
      icon: <PiIdentificationBadgeFill />,
      value: `${clientData?.idUpload}`,
    },
  ];

  const EditDetails = () => {
    const [isSubmit, setIsSubmit] = useState(false);
    const [editData,setEditData] = useState(clientData);
    const restrictInput = (e) => {
      const inputValue = e.target.value;
      var reg = /[^\w\d\s\@]/g;
      const sanitizedValue = inputValue.replace(reg, "");
      "".replace();
      e.target.value = sanitizedValue;
    };
    const handleFileInputChange = (file) => {
      if (parseInt(file.size) > 70) {
        setSize(true);
        toast.error("Image should be less than 70KB", { theme: "colored" });
      } else {
        setEditData({ ...editData, idUpload: `${file.base64}` });
        setSize(false);
      }
    };
    const [size, setSize] = useState(false);
    const handleChange = (e) => {
      e.preventDefault();
      const { name, value } = e.target;
      switch (name) {
        case "firstName":
          setEditData({ ...editData, firstName: value });
          break;
        case "lastName":
          setEditData({ ...editData, lastName: value });
          break;
        case "college":
          setEditData({ ...editData, college: value });
          break;

        case "email":
          setEditData({ ...editData, email: value });
          break;
        case "phno":
          setEditData({ ...editData, phno: value });
          break;
        case "year":
          setEditData({ ...editData, year: value });
          break;
        case "collegeId":
          setEditData({ ...editData, collegeId: value });
          break;
        case "state":
          setEditData({ ...editData, state: value });
          break;
        case "district":
          setEditData({ ...editData, district: value });
          break;
        case "city":
          setEditData({ ...editData, city: value });
          break;
        case "tzkid":
          setEditData({ ...editData, tzkid: value });
          break;
        case "branch":
          setEditData({ ...editData, branch: value });
          break;
        case "amountPaid":
          setEditData({ ...editData, amountPaid: value });
          break;

        default:
          break;
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmit(true);
      if (size) {
        toast.error("Image should be less than 70KB", { theme: "colored" });
      } else {
        try {
          const response = await axios.put(
            `${import.meta.env.VITE_API}/user/edit/${clientId}`,
            editData,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          toast.success("successfully Edited User Data", {
            theme: "colored",
          });
          setTab("");
        } catch (err) {
          console.log(err)
          toast.error("Failed to Edit User", { theme: "colored" });
          if (err?.message == "Unauthorized") {
            navigate("/");
          }
        }
      }
      setIsSubmit(false);
    };
    return (
      <section style={{ backgroundColor: "black" }}>
        <form
          className="resource-form shadow d-flex flex-column ps-3 py-3 mx-auto"
          style={{
            width: "97%",
            maxWidth: "450px",
            backgroundColor: "#333333",
            color: "#ffffff",
            borderRadius: "8px",
            padding: "20px",
          }}
        >
          <span className="mt-3">
            <label htmlFor="name" className="ps-2">
              {" "}
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter First Name"
              value={editData.firstName}
              onChange={handleChange}
              onBeforeInput={restrictInput}
              required
              style={{
                backgroundColor: "#1e1e1e",
                color: "#ffffff",
                padding: "8px",
                borderRadius: "4px",
                border: "none",
              }}
            />
          </span>
          <span className="mt-3">
            <label htmlFor="name" className="ps-2">
              {" "}
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter Last Name"
              value={editData.lastName}
              onChange={handleChange}
              onBeforeInput={restrictInput}
              required
              style={{
                backgroundColor: "#1e1e1e",
                color: "#ffffff",
                padding: "8px",
                borderRadius: "4px",
                border: "none",
              }}
            />
          </span>

          <span className="mt-3">
            <label htmlFor="email" className="ps-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={editData.email}
              onChange={handleChange}
              required
              style={{
                backgroundColor: "#1e1e1e",
                color: "#ffffff",
                padding: "8px",
                borderRadius: "4px",
                border: "none",
              }}
            />
          </span>
          <span className="mt-3">
            <label htmlFor="name" className="ps-2">
              {" "}
              Year
            </label>
            {/* <input
            type="text"
            name="year"
            placeholder="Enter Year"
            value={editData.year}
            onChange={handleChange}
            required
            style={{
              backgroundColor: "#1e1e1e",
              color: "#ffffff",
              padding: "8px",
              borderRadius: "4px",
              border: "none",
            }}
          /> */}
            <select
              onChange={handleChange}
              name="year"
              value={editData.year}
              className="form-select"
              aria-label="Default select example"
            >
              <option selected>Select your Year</option>
              <option value="PUC-1">PUC 1</option>
              <option value="PUC-2">PUC 2</option>
              <option value="E1">E1</option>
              <option value="E2">E2</option>
              <option value="E3">E3</option>
              <option value="E4">E4</option>
            </select>
          </span>
          <span className="mt-3">
            <label htmlFor="name" className="ps-2">
              {" "}
              Branch
            </label>
            <select
              onChange={handleChange}
              name="branch"
              value={editData.branch}
              className="form-select"
              aria-label="Default select example"
            >
              <option selected>Select your Branch</option>
              <option value="PUC">PUC</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="MECH">MECH</option>
              <option value="CHEM">CHEM</option>
              <option value="CIVIL">CIVIL</option>
              <option value="MME">MME</option>
            </select>
          </span>
          <span className="mt-3">
            <label htmlFor="name" className="ps-2">
              {" "}
              College
            </label>
            <input
              type="text"
              name="college"
              placeholder="Enter College Name"
              value={editData.college}
              onChange={handleChange}
              onBeforeInput={restrictInput}
              required
              style={{
                backgroundColor: "#1e1e1e",
                color: "#ffffff",
                padding: "8px",
                borderRadius: "4px",
                border: "none",
              }}
            />
          </span>
          <span className="mt-3">
            <label htmlFor="name" className="ps-2">
              {" "}
              College ID
            </label>
            <input
              type="text"
              name="collegeId"
              placeholder="Enter College ID"
              value={editData.collegeId}
              onChange={handleChange}
              required
              style={{
                backgroundColor: "#1e1e1e",
                color: "#ffffff",
                padding: "8px",
                borderRadius: "4px",
                border: "none",
              }}
            />
          </span>
          <span className="mt-3">
            <label htmlFor="name" className="ps-2">
              {" "}
              None RGUKT Students ID Photo {"(<70KB)"}
            </label>
            <FileBase64 multiple={false} onDone={handleFileInputChange} />
          </span>

          <span className="mt-3">
            <label htmlFor="name" className="ps-2">
              {" "}
              City
            </label>
            <input
              type="text"
              name="city"
              placeholder="Enter City"
              value={editData.city}
              onBeforeInput={restrictInput}
              onChange={handleChange}
              required
              style={{
                backgroundColor: "#1e1e1e",
                color: "#ffffff",
                padding: "8px",
                borderRadius: "4px",
                border: "none",
              }}
            />
          </span>
          <span className="mt-3">
            <label htmlFor="name" className="ps-2">
              {" "}
              District
            </label>
            <input
              type="text"
              name="district"
              placeholder="Enter District"
              value={editData.district}
              onBeforeInput={restrictInput}
              onChange={handleChange}
              required
              style={{
                backgroundColor: "#1e1e1e",
                color: "#ffffff",
                padding: "8px",
                borderRadius: "4px",
                border: "none",
              }}
            />
          </span>
          <span className="mt-3">
            <label htmlFor="name" className="ps-2">
              {" "}
              State
            </label>
            <input
              type="text"
              name="state"
              placeholder="Enter State"
              value={editData.state}
              onBeforeInput={restrictInput}
              onChange={handleChange}
              required
              style={{
                backgroundColor: "#1e1e1e",
                color: "#ffffff",
                padding: "8px",
                borderRadius: "4px",
                border: "none",
              }}
            />
          </span>

          <span className="mt-3">
            <label htmlFor="contact" className="ps-2">
              Contact
            </label>
            <input
              type="number"
              name="phno"
              placeholder="Enter Contact"
              value={editData.phno}
              onChange={handleChange}
              required
              style={{
                backgroundColor: "#1e1e1e",
                color: "#ffffff",
                padding: "8px",
                borderRadius: "4px",
                border: "none",
              }}
            />
          </span>

          <span className="mt-3">
            <label htmlFor="amountPaid" className="ps-2">
              Amount Paid
            </label>
            <input
              type="text"
              name="amountPaid"
              placeholder="Enter Amount Paid"
              value={editData.amountPaid}
              onBeforeInput={restrictInput}
              onChange={handleChange}
              required
              style={{
                backgroundColor: "#1e1e1e",
                color: "#ffffff",
                padding: "8px",
                borderRadius: "4px",
                border: "none",
              }}
            />
          </span>
          <span className="mt-3">
            <input
              type="submit"
              value={isSubmit ? "sending..." : "Submit"}
              onClick={handleSubmit}
              style={{
                backgroundColor: "#006996",
                color: "white",
                padding: "10px",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
              }}
            />
          </span>
        </form>
      </section>
    );
  };

  const DetailsClient = () => {
    return (
      <>
        <div className="w-100 d-flex flex-column ">
          {clientDataInfo.map((data, index) => (
            <>
              {data.value != "" && (
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
                  {data.title == "Student ID Image" ? (
                    <div className="col-12 sol-sm-7 col-md-8">
                      <img
                        src={data.value}
                        alt="student Id"
                        width="150px"
                        height={"150px"}
                      />
                    </div>
                  ) : (
                    <div
                      className="col-12 col-sm-7 col-md-8"
                      style={{ color: "#00cccc", fontWeight: "700" }}
                    >
                      {data.value}
                    </div>
                  )}
                </div>
              )}
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
              <button
                className="btn btn-primary mx-2  "
                style={{ marginRight: "" }}
                onClick={()=>setTab("edit")}
              >
                <span className="px-1">Edit</span>
              </button>
            </div>
            {tab==""?<DetailsClient />:<EditDetails />}
          </div>
        </div>
      </section>
    </>
  );
};
export default ClientDetails;
