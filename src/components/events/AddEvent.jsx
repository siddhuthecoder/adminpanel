import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../App.css";
import { toast } from "react-toastify";

const AddEvent = () => {
  const [token, setToken] = useState("");
  const [eveInfo, setEveInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [edit, setEdit] = useState({
    name: eveInfo.name,
    dep: "",
    img: "",
    desc: "",
    structure: "",
    rules: [],
    registedStudents: [],
    teamSize: 0,
    contact_info: "",
  });

  useEffect(() => {
    const info = JSON.parse(localStorage.getItem("data"));
    setToken(info.token);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "name":
        setEdit({
          ...edit,
          name: value,
        });
        break;
      case "dep":
        setEdit({
          ...edit,
          dep: value,
        });
        break;
      case "img":
        setEdit({
          ...edit,
          img: value,
        });
        break;
      case "desc":
        setEdit({
          ...edit,
          desc: value,
        });
        break;
      case "structure":
        setEdit({
          ...edit,
          structure: value,
        });
        break;
      case "rules":
        setEdit({
          ...edit,
          rules: value,
        });
        break;
      case "registedStudents":
        setEdit({
          ...edit,
          registedStudents: value,
        });
        break;
      case "teamSize":
        setEdit({
          ...edit,
          teamSize: value,
        });
        break;
      case "contact_info":
        setEdit({
          ...edit,
          contact_info: value,
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
      const response2 = await axios.post(
        `https://teckzitebackend.onrender.com/events/new`,
        edit,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: ` Bearer ${token}`,
          },
        }
      );
      setEdit({
        name: "",
        dep: "",
        img: "",
        desc: "",
        structure: "",
        rules: [],
        registedStudents: [],
        teamSize: 0,
        contact_info: "",
      })
      toast.success("successfully Added New Event", { theme: "colored" });
    } catch (error) {
      toast.error("Failed to add", { theme: "colored" });
      console.error("Error Adding new event data:", error);
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
              width: "100%",
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
                Event Name
              </label>
              <input
                className="form-control"
                type="text"
                name="name"
                placeholder="Enter department"
                value={edit.name}
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
                Department
              </label>
              <input
                className="form-control"
                type="text"
                name="dep"
                placeholder="Enter department"
                value={edit.dep}
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
                Event Image URL
              </label>
              <input
                className="form-control"
                type="url"
                name="img"
                placeholder="Enter event image URL"
                value={edit.img}
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
                htmlFor="about"
                className="ps-2 form-label"
                style={{ color: "#006996", fontWeight: "700" }}
              >
                About
              </label>
              <textarea
                name="desc"
                placeholder="Enter event description"
                onChange={handleChange}
                value={edit.desc}
                required
                style={{
                  backgroundColor: "black",
                  color: "white",
                  resize: "none",
                  fontWeight: "700",
                }}
              />
            </div>

            <div className="m-3 d-flex flex-column">
              <label
                htmlFor="structure"
                className="ps-2 form-label"
                style={{ color: "#006996", fontWeight: "700" }}
              >
                Structure
              </label>
              <textarea
                name="structure"
                placeholder="Enter event structure"
                onChange={handleChange}
                value={edit.structure}
                required
                style={{
                  backgroundColor: "black",
                  color: "white",
                  resize: "none",
                  fontWeight: "700",
                }}
              />
            </div>
            <div className="m-3 d-flex flex-column">
              <label
                htmlFor="rules"
                className="ps-2 form-label"
                style={{ color: "#006996", fontWeight: "700" }}
              >
                Rules
              </label>
              <textarea
                name="rules"
                placeholder="Enter event rules"
                onChange={handleChange}
                value={edit.rules}
                required
                style={{
                  backgroundColor: "black",
                  color: "#FFFFFF",
                  resize: "none",
                }}
              />
            </div>

            <div className="m-3 d-flex flex-column">
              <label
                htmlFor="TeamSize"
                className="ps-2 form-label"
                style={{ color: "#006996", fontWeight: "700" }}
              >
                Team Size
              </label>
              <input
                className="form-control"
                type="number"
                name="teamSize"
                placeholder="Enter team size"
                onChange={handleChange}
                value={edit.teamSize}
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
                htmlFor="contact_info"
                className="ps-2 form-label"
                style={{ color: "#006996", fontWeight: "700" }}
              >
                Contact Info
              </label>
              <input
                className="form-control"
                type="text"
                name="contact_info"
                placeholder="Enter contact information"
                value={edit.contact_info}
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
export default AddEvent;
