import { useState, useEffect } from "react";
import axios from "axios";
import eve from "../../assets/2109998.jpg";
import { FiSearch } from "react-icons/fi";
import CustomModal from "../modals/Modal";
import CustomModal2 from "../modals/Modal2";
import EditEvent from "../../components/events/EditEvent";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const Navigate = useNavigate();
  const [tab, setTab] = useState("ALL");
  const [data, setData] = useState({});
  const [events, setEvents] = useState([]);
  const [showModalArray, setShowModalArray] = useState([]);
  const [showModalArray2, setShowModalArray2] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [eventInfo, setEventInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState();
  const eveNameRef = useRef(null);
  const eveDepartmentRef = useRef(null);
  const eveImgRef = useRef(null);
  const aboutRef = useRef(null);
  const structureRef = useRef(null);
  const timelineRef = useRef(null);
  const rulesRef = useRef(null);
  const teamSizeRef = useRef(null);
  const contactInfoRef = useRef(null);
  const isRegistrationsOpenedRef = useRef(null);
  const [edit, setEdit] = useState({
    eveID: eventInfo._id,
    eveName: eventInfo.eveName,
    eveDepartment: "",
    eveImg: "",
    about: "",
    structure: "",
    timeline: "",
    rules: "",
    TeamSize: 0,
    contact_info: "",
    isRegistrationsOpened: false,
  });

  useEffect(() => {
    const info = JSON.parse(localStorage.getItem("data"));
    setData(info);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://teckzitebackend.onrender.com/events/all-events",
        {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
      if (response.status == 304) {
        alert("success");
      }
      setEvents(response.data);
      console.log(events);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const fetchEvent = async () => {
    setLoading(true);
    try {
      const responseData = await axios.get(
        `https://teckzitebackend.onrender.com/events/event/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: ` Bearer ${data.token}`,
          },
        }
      );
      setEdit(responseData.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [data.token]);

  useEffect(() => {
    fetchEvent();
  }, []);

  useEffect(() => {
    setShowModalArray(new Array(events.length).fill(false));
  }, [events]);
  useEffect(() => {
    setShowModalArray2(new Array(events.length).fill(false));
  }, []);

  const openModal = (index) => {
    const updatedShowModalArray = [...showModalArray];
    updatedShowModalArray[index] = true;
    setShowModalArray(updatedShowModalArray);
  };

  const closeModal = (index) => {
    const updatedShowModalArray = [...showModalArray];
    updatedShowModalArray[index] = false;
    setShowModalArray(updatedShowModalArray);
  };

  const openModal2 = (index) => {
    console.log("open");
    setId(events[index]._id);
    const updatedShowModalArray2 = [...showModalArray];
    updatedShowModalArray2[index] = true;
    setShowModalArray2(updatedShowModalArray2);
  };

  const closeModal2 = (index) => {
    setId("");
    const updatedShowModalArray2 = [...showModalArray];
    updatedShowModalArray2[index] = false;
    setShowModalArray2(updatedShowModalArray2);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredEvents = events.filter(
    (event) =>
      (tab === "ALL" || event.eveDepartment === tab) &&
      (searchQuery === "" ||
        Object.values(event).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchQuery.toLowerCase())
        ))
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEdit((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response2 = await axios.put(
        `https://teckzitebackend.onrender.com/events/edit-event/${id}`,
        edit,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: ` Bearer ${data.token}`,
          },
        }
      );
      console.log("Updated event data:", response2.data);
    } catch (error) {
      console.error("Error updating event data:", error);
    }
    setLoading(false);
  };

  return (
    <>
      <section
        className="d-flex flex-column"
        style={{ width: "100%", height: "100%", overflow: "" }}
      >
        <div className="w-100 d-flex flex-column mx-auto">
          <div className="mx-2 d-flex align-items-center">
            <FiSearch style={{ marginRight: "-20px", zIndex: "1" }} />
            <input
              type="text"
              placeholder="search......."
              className="py-1 ps-4 text-white"
              style={{
                borderRadius: "5px",
                border: "0.3px solid grey",
                backgroundColor: "black",
              }}
              value={searchQuery}
              onChange={handleSearch}
            />
          <input
                onClick={()=>{Navigate("/events/add-event")}}
                className="form-control"
                type="submit"
                value={`${ "Add Event"}`}
                style={{ backgroundColor: "green",width:"150px",marginLeft:"40px", color: "white" }}
              />
          </div>
          <div
            className=" d-flex align-items-center mt-3  mx-auto shadow d-flex align-items-center flex-wrap w-100"
            style={{
              width: "100%",
              backgroundColor: "",
              minWidth: "300px",
              overFlow: "scroll",
            }}
          >
            <div
              className={`px-4 mt-3 ${tab === "ALL" ? "tab-active" : ""}`}
              onClick={() => setTab("ALL")}
              style={{ cursor: "pointer" }}
            >
              ALL
            </div>
            <div
              className={`px-4 mt-3 ${tab === "CSE" ? "tab-active" : ""}`}
              onClick={() => setTab("CSE")}
              style={{ cursor: "pointer" }}
            >
              CSE
            </div>
            <div
              className={`px-4 mt-3 ${tab === "ECE" ? "tab-active" : ""}`}
              onClick={() => setTab("ECE")}
              style={{ cursor: "pointer" }}
            >
              ECE
            </div>
            <div
              className={`px-4 mt-3 ${tab === "EEE" ? "tab-active" : ""}`}
              onClick={() => setTab("EEE")}
              style={{ cursor: "pointer" }}
            >
              EEE
            </div>
            <div
              className={`px-4 mt-3 ${tab === "MECH" ? "tab-active" : ""}`}
              onClick={() => setTab("MECH")}
              style={{ cursor: "pointer" }}
            >
              MECH
            </div>
            <div
              className={`px-4 mt-3 ${tab === "CHEM" ? "tab-active" : ""}`}
              onClick={() => setTab("CHEM")}
              style={{ cursor: "pointer" }}
            >
              CHEM
            </div>
            <div
              className={`px-4 mt-3 ${tab === "CIVIL" ? "tab-active" : ""}`}
              onClick={() => setTab("CIVIL")}
              style={{ cursor: "pointer" }}
            >
              CIVIL
            </div>
            <div
              className={`px-4 mt-3 ${tab === "MME" ? "tab-active" : ""}`}
              onClick={() => setTab("MME")}
              style={{ cursor: "pointer" }}
            >
              MME
            </div>
          </div>
        </div>
        <div className="w-100 col-12 d-flex justify-content-around align-items-center flex-wrap">
          {loading ? (
            <div>loading...</div>
          ) : filteredEvents.length == 0 ? (
            <>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "60vh" }}
              >
                ...Opps events are not uploaded yet
              </div>
            </>
          ) : (
            filteredEvents.map((data, index) => (
              <>
                <div key={index}
                  className="d-flex flex-column my-3 card "
                  style={{
                    width: "97%",
                    maxWidth: "300px",
                    position: "relative",
                    height: "auto",
                    backgroundColor: "black",
                    overflow: "hidden",
                  }}
                >
                  <div
                    className="w-100 d-flex align-items-center justify-content-center"
                    style={{
                      position: "absolute",
                      opacity: "0.3",
                      bottom: "-40px",
                      right: "-60px",
                      pointerEvents: "none",
                    }}
                  >
                    <div
                      className="text-dark"
                      style={{ fontSize: "150px", color: "ligh", zIndex: "3" }}
                    >
                      0{index + 1}
                    </div>
                  </div>
                  <img
                    src={eve}
                    alt=""
                    className=" mx-auto mt-2"
                    style={{ width: "95%", borderRadius: "4px" }}
                  />
                  <div className="row mx-auto" style={{ width: "95%" }}>
                    <div
                      className="col-12 h3 text-center text pt-3"
                      style={{ color: "#006996", fontWeight: "700" }}
                    >
                      {data.eveName}
                    </div>
                  </div>
                  <div className="row mx-auto" style={{ width: "95%" }}>
                    <div className="col-6  " style={{ color: "#1f94c6" }}>
                      <span className="pe-3">Team Size : {data.teamSize} </span>
                    </div>
                    <div className="col-3">
                      <span className="badge bg-dark">{data.TeamSize}</span>
                    </div>
                  </div>
                  <div className="row mx-auto" style={{ width: "95%" }}>
                    <div className="col-12  " style={{ color: "#1f94c6" }}>
                      <span className="pe-3">
                        Event ID : {data._id.slice(0, 4)}...
                        {data._id.slice(
                          data._id.length - 5,
                          data._id.length - 1
                        )}{" "}
                      </span>
                    </div>
                    <div className="col-6">
                      <span className="badge bg-dark">{data.eveID}</span>
                    </div>
                  </div>
                  <div className="row mx-auto" style={{ width: "95%" }}>
                    <div className="col-6  " style={{ color: "#1f94c6" }}>
                      <span className="pe-3">Department : {data.dep} </span>
                    </div>
                    <div className="col-6">
                      <span className="badge bg-dark">
                        {data.eveDepartment}
                      </span>
                    </div>
                  </div>
                  <div className="row mx-auto " style={{ width: "95%" }}>
                    <div className="col-12 mx-auto">
                      <button
                        className="btn btn-dark w-100 mx-auto my-3"
                        onClick={() => {
                          setId(data._id);
                          if (id != null) {
                            console.log(id);
                            Navigate(`/events/${id}`);
                          }
                        }}
                      >
                        Know more..
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default Events;
