import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { context } from "../../App";

const NotificationList = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("ALL");
  const {token} = useContext(context)
  const [notifications, setNotifications] = useState([]);
  const [showModalArray, setShowModalArray] = useState([]);
  const [showModalArray2, setShowModalArray2] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [eventInfo, setEventInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState();
  const [edit, setEdit] = useState({
    heading: "",
    info: "",
    picturePath: "",
    link: "",
  });


  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API}/notifications/all-notifications`,
        {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 304) {
        alert("success");
      }
      setNotifications(response.data.notifications);
    } catch (err) {
      toast.error("Internal Error",{theme:"colored"})
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  useEffect(() => {
    setShowModalArray(new Array(notifications.length).fill(false));
  }, [notifications]);
  useEffect(() => {
    setShowModalArray2(new Array(notifications.length).fill(false));
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
    
    setId(notifications[index]._id);
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


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEdit((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <>
      <section
        className="d-flex flex-column"
        style={{ width: "100%", height: "100%", overflow: "" }}
      >
        <div className="w-100 pb-3 border-bottom d-flex flex-column mx-auto">
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
              onClick={() => {
                navigate("/notifications/add-notification");
              }}
              className="form-control"
              type="submit"
              value={`${"Add Notification"}`}
              style={{
                backgroundColor: "green",
                width: "150px",
                marginLeft: "40px",
                color: "white",
              }}
            />
          </div>
          
        </div>
        <div className="w-100 col-12 d-flex justify-content-around align-items-center flex-wrap">
          {loading ? (
            <div>loading...</div>
          ) : notifications.length == 0 ? (
            <>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "60vh" }}
              >
                ...Opps notifications are not uploaded yet
              </div>
            </>
          ) : (
            notifications.map((data, index) => (
              <>
                <div
                  key={index}
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
                  </div>
                  <img
                    src={data.picturePath}
                    alt=""
                    className=" mx-auto mt-2"
                    style={{ width: "95%", borderRadius: "4px" }}
                  />
                  <div className="row mx-auto" style={{ width: "95%" }}>
                    <div
                      className="col-12 h3 text-center text pt-3"
                      style={{ color: "#006996", fontWeight: "700" }}
                    >
                      {data.heading}
                    </div>
                  </div>
                  <div className="row mx-auto " style={{ width: "95%" }}>
                    <div className="col-12 mx-auto">
                      <button
                        className="btn btn-dark w-100 mx-auto my-3"
                        onClick={() => {
                          setId(data._id);
                          if (id != null) {
                            navigate(`/notifications/${id}`);
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

export default NotificationList;
