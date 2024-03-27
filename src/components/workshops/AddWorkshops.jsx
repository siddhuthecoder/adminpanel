import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../../App.css";
import { toast } from "react-toastify";
import { context } from "../../App";
import FileBase64 from "react-file-base64";
import { useNavigate } from "react-router-dom";
import MyRichTextEditor from "../shared/MyRichTextEditor";

const AddWorkshops = () => {
  const { token } = useContext(context);
  const [eveInfo, setEveInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const [size, setSize] = useState(false);
  const [size1, setSize1] = useState(false);
  const [edit, setEdit] = useState({
    name: "",
    dep: "",
    about: "",
    workshopImg: "",
    structure: "",
    contact: "",
    instructorName: "",
    instructorSpecifications: "",
    instructorImage: "",
    entryFee: "",
  });
  const setDesc = (ele) => setEdit({ ...edit, about: ele });
  const setStruct = (ele) => setEdit({ ...edit, structure: ele });
  const setContact = (ele) => setEdit({ ...edit, contact: ele });
  const handleFileInputChange1 = (file) => {
    if (parseInt(file.size) > 100) {
      toast.error("Image should be less than 100KB", { theme: "colored" });
      setSize1(true);
    } else {
      setSize1(false);
      setEdit({ ...edit, instructorImage: `${file.base64}` });
    }
  };
  const handleFileInputChange = (file) => {
    if (parseInt(file.size) > 100) {
      setSize(true);
      toast.error("Image should be less than 100KB", { theme: "colored" });
    } else {
      setSize(false);
      setEdit({ ...edit, workshopImg: `${file.base64}` });
    }
  };
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
      case "entryFee":
        setEdit({
          ...edit,
          entryFee: value,
        });
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    if (size) {
      toast.error("Image should be less than 100KB", { theme: "colored" });
    } else if (size1) {
      toast.error("Image Should be less than 100KB", { theme: "colored" });
    } else {
      try {
        const response2 = await axios.post(
          `${import.meta.env.VITE_API}/workshops/create/new`,
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
          entryFee: "",
        });
        toast.success("successfully Added New Workshop", { theme: "colored" });
      } catch (error) {
        if (error?.message == "Unauthorized" || error.response.status == 401) {
          toast.error("Please Login Again", { theme: "colored" });
          navigate("/");
        } else {
          toast.error("Failed to Modify", { theme: "colored" });
        }
      }
    }
    setIsSubmit(false);
  };

  const restrictInput = (e)=> {
    const inputValue = e.target.value;
    var reg = /[^\w\d\s\@]/g;
    const sanitizedValue = inputValue.replace(reg, '');
    "".replace()
    e.target.value = sanitizedValue;
  }

  return (
    <section style={{ backgroundColor: "black", height: "100vh" }}>
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
                onBeforeInput={restrictInput}
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
              <select
                onChange={handleChange}
                name="dep"
                value={edit.dep}
                className="form-select"
                aria-label="Default select example"
              >
                <option selected>Select Department</option>
                <option value="ALL">ALL</option>
                <option value="PUC">PUC</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="MECH">MECH</option>
                <option value="CHEM">CHEM</option>
                <option value="CIVIL">CIVIL</option>
                <option value="MME">MME</option>
              </select>
            </div>

            <div className="m-3 d-flex flex-column">
              <label
                htmlFor="wsImg"
                className="ps-2 form-label"
                style={{ color: "#006996", fontWeight: "700" }}
              >
                Workshop Image {"(<100KB)"}
              </label>
              <FileBase64 multiple={false} onDone={handleFileInputChange} />
              <p style={{ color: "white" }}>
                {edit.workshopImg != "" ? "Seleted" : "Select"}
              </p>
            </div>

            <div className="m-3 d-flex flex-column">
              <label
                htmlFor="about"
                className="ps-2 form-label"
                style={{ color: "#006996", fontWeight: "700" }}
              >
                About
              </label>
              {/* <textarea
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
              /> */}
              <div style={{ color: "white" }}>
                <MyRichTextEditor name={"add"} setText={setDesc} />
              </div>
            </div>

            <div className="m-3 d-flex flex-column">
              <label
                htmlFor="structure"
                className="ps-2 form-label"
                style={{ color: "#006996", fontWeight: "700" }}
              >
                Structure
              </label>
              {/* <textarea
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
              /> */}
              <div style={{ color: "white" }}>
                <MyRichTextEditor name={"add"} setText={setStruct} />
              </div>
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
                onBeforeInput={restrictInput}
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
                onBeforeInput={restrictInput}
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
                Instructor Image {"(<100KB)"}
              </label>
              <FileBase64 multiple={false} onDone={handleFileInputChange1} />
              <p style={{ color: "white" }}>
                {edit.instructorImage != "" ? "Seleted" : "Select"}
              </p>
            </div>
            <div className="m-3 d-flex flex-column">
              <label
                htmlFor="contact_info"
                className="ps-2 form-label"
                style={{ color: "#006996", fontWeight: "700" }}
              >
                Contact Info
              </label>
              {/* <input
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
              /> */}
              <div style={{ color: "white" }}>
                <MyRichTextEditor name={"add"} setText={setContact} />
              </div>
            </div>
            <div className="m-3 d-flex flex-column">
              <label
                htmlFor="entryFee"
                className="ps-2 form-label"
                style={{ color: "#006996", fontWeight: "700" }}
              >
                Entry Fee
              </label>
              <input
                className="form-control"
                type="number"
                name="entryFee"
                placeholder="Enter Entry Fee"
                value={edit.entryFee}
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
    </section>
  );
};
export default AddWorkshops;
