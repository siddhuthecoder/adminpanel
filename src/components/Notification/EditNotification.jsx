import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../App.css";
import { toast } from "react-toastify";

const EditNotification = ({data}) => {
  const [token, setToken] = useState("");
  const [eveInfo, setEveInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const { id } = useParams();
  const [edit, setEdit] = useState(data);

  useEffect(() => {
    const info = JSON.parse(localStorage.getItem("data"));
    setToken(info.token);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    switch (name) {
      case "heading":
        setEdit({
          ...edit,
          heading: value,
        });
        break;
      case "info":
        setEdit({
          ...edit,
          info: value,
        });
        break;
      case "picturePath":
        setEdit({
          ...edit,
          picturePath: value,
        });
        break;
      case "link":
        setEdit({
          ...edit,
          link: value,
        });
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    try {
      const response2 = await axios.put(
        `https://teckzitebackend.onrender.com/notifications/update/${id}`,
        edit,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: ` Bearer ${token}`,
          },
        }
      );
      toast.success("successfully modified",{theme:"colored"});
    } catch (error) {
      toast.error("Failed to Modify",{theme:"colored"})
      console.error("Error updating event data:", error);
    }
    setIsSubmit(false);
  };

  return (
    <>
      {loading ? (
        <div>loading...</div>
      ) : (
        <>
          <form
            className=""
            onSubmit={handleSubmit}
            style={{
              width: "97%",
              maxWidth: "400px",
              height: "90vh",
              overflowY: "scroll",
              backgroundColor: "rgb(33, 37, 41)",
              margin: "auto",
            }}
          >
            <div
              className="m-3 d-flex flex-column"
              style={{ marginTop: "100px" }}
            >
              <label
                htmlFor="eveDepartment"
                className="ps-2 form-label"
                style={{ color: "#006996", fontWeight: "700" }}
              >
                Heading
              </label>
              <input
                className="form-control"
                type="text"
                name="heading"
                placeholder="Enter Heading"
                value={edit.heading}
                onChange={handleChange}
                required
                style={{
                  backgroundColor: "black",
                  color: "white",
                  fontWeight: "700",
                }}
              />
            </div>

            <div className="m-3 d-flex flex-column">
              <label
                htmlFor="eveDepartment"
                className="ps-2 form-label"
                style={{ color: "#006996", fontWeight: "700" }}
              >
                Information
              </label>
              <input
                className="form-control"
                type="text"
                name="info"
                placeholder="Enter Information"
                value={edit.info}
                onChange={handleChange}
                required
                style={{
                  backgroundColor: "black",
                  color: "white",
                  fontWeight: "700",
                }}
              />
            </div>

            <div className="m-3 d-flex flex-column">
              <label
                htmlFor="eveImg"
                className="ps-2 form-label"
                style={{ color: "#006996", fontWeight: "700" }}
              >
                Picture URL
              </label>
              <input
                className="form-control"
                type="url"
                name="picturePath"
                placeholder="Enter Picture image URL"
                value={edit.picturePath}
                onChange={handleChange}
                required
                style={{
                  backgroundColor: "black",
                  color: "white",
                  fontWeight: "700",
                }}
              />
            </div>
            <div className="m-3 d-flex flex-column">
              <label
                htmlFor="eveImg"
                className="ps-2 form-label"
                style={{ color: "#006996", fontWeight: "700" }}
              >
                Link
              </label>
              <input
                className="form-control"
                type="url"
                name="link"
                placeholder="Enter Link"
                value={edit.link}
                onChange={handleChange}
                required
                style={{
                  backgroundColor: "black",
                  color: "white",
                  fontWeight: "700",
                }}
              />
            </div>
            <div className="m-3 d-flex flex-column">
              <input
                onClick={handleSubmit}
                className="form-control"
                type="submit"
                value={`${isSubmit ? "sending..." : "Submit"}`}
                style={{ backgroundColor: "#006996", color: "white" }}
              />
            </div>
          </form>
        </>
      )}
    </>
  );
};
export default EditNotification;
