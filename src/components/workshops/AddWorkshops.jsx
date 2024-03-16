import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../App.css";
import { toast } from "react-toastify";

const AddWorkshops = () => {
  const [token, setToken] = useState("");
  const [eveInfo, setEveInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [edit, setEdit] = useState({
    name: eveInfo.name,
    dep: "",
    about: "",
    workshopImg: "",
    structure: "",
    contact: "",
    instructorName: "",
    instructorSpecifications: "",
    instructorImage: "",
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
      case "about":
        setEdit({
          ...edit,
          about: value,
        });
        break;
      case "workshopImg":
        setEdit({
          ...edit,
          workshopImg: value,
        });
        break;
      case "structure":
        setEdit({
          ...edit,
          structure: value,
        });
        break;
      case "contact":
        setEdit({
          ...edit,
          contact: value,
        });
        break;
      case "instructorName":
        setEdit({
          ...edit,
          instructorName: value,
        });
        break;
      case "instructorSpecifications":
        setEdit({
          ...edit,
          instructorSpecifications: value,
        });
        break;
      case "instructorImage":
        setEdit({
          ...edit,
          instructorImage: value,
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
        `https://teckzitebackend.onrender.com/workshops/new`,
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
        about: "",
        workshopImg: "",
        structure: "",
        contact: "",
        instructorName: "",
        instructorSpecifications: "",
        instructorImage: "",
      });
      toast.success("successfully Added New Workshop", { theme: "colored" });
    } catch (error) {
      toast.error("Failed to add", { theme: "colored" });
      console.error("Error Adding new workshop data:", error);
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
              height: "100%",
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
                htmlFor="wsname"
                className="ps-2 form-label"
                style={{ color: "#006996", fontWeight: "700" }}
              >
                Workshop Name
              </label>
              <input
                className="form-control"
                type="text"
                name="name"
                placeholder="Enter Workshop Name"
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
                htmlFor="wsImg"
                className="ps-2 form-label"
                style={{ color: "#006996", fontWeight: "700" }}
              >
                Workshop Image URL
              </label>
              <input
                className="form-control"
                type="url"
                name="workshopImg"
                placeholder="Enter workshop image URL"
                value={edit.workshopImg}
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
                name="about"
                placeholder="Enter workshop description"
                onChange={handleChange}
                value={edit.about}
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
                placeholder="Enter workshop structure"
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
                Instructor Name
              </label>
              <input
                className="form-control"
                type="text"
                name="instructorName"
                placeholder="Enter Instructor Name"
                value={edit.instructorName}
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
                htmlFor="TeamSize"
                className="ps-2 form-label"
                style={{ color: "#006996", fontWeight: "700" }}
              >
                Instructor Specifications
              </label>
              <textarea
                name="instructorSpecifications"
                placeholder="Enter Instructor Specifications"
                onChange={handleChange}
                value={edit.instructorSpecifications}
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
                htmlFor="wsImg"
                className="ps-2 form-label"
                style={{ color: "#006996", fontWeight: "700" }}
              >
                Instructor Image URL
              </label>
              <input
                className="form-control"
                type="url"
                name="instructorImage"
                placeholder="Enter Instructor image URL"
                value={edit.instructorImage}
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
                htmlFor="contact_info"
                className="ps-2 form-label"
                style={{ color: "#006996", fontWeight: "700" }}
              >
                Contact Info
              </label>
              <input
                className="form-control"
                type="text"
                name="contact"
                placeholder="Enter contact information"
                value={edit.contact}
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
export default AddWorkshops;
