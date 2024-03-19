import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../App.css";
import { toast } from "react-toastify";
import { context } from "../../App";
import FileBase64 from 'react-file-base64';
import MyRichTextEditor from "../shared/MyRichTextEditor";

const EditWorkShop = ({ data }) => {
  const {token} = useContext(context)
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const [edit, setEdit] = useState(data);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isChange,setIsChange] = useState("Change")
  const [isChange1,setIsChange1] = useState("Change")
  const [size,setSize] = useState(false)
  const [size1,setSize1] = useState(false)
  
  const setDesc = (ele)=>setEdit({...edit,about:ele})
  const setStruct = (ele)=>setEdit({...edit,structure:ele})
  const setContact = (ele)=>setEdit({...edit,contact:ele})
  const handleFileInputChange = (file) => {
    if(parseInt(file.size)>100){
      toast.error("Image should be less than 100KB",{theme:"colored"})
      setSize(true)
    }else{
      setSize(false)
      setIsChange("Changed")
      setEdit({...edit,workshopImg: `${file.base64}`});
    }
  };
  const handleFileInputChange1 = (file) => {
    if(parseInt(file.size)>100){
      setSize1(true)
      toast.error("Image should be less than 100KB",{theme:"colored"})
    }else{
      setIsChange1("Changed")
      setSize1(false)
      setEdit({...edit,instructorImage: `${file.base64}`});
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
    setIsSubmit(true)
    if(size){
      toast.error("Image should be less than 100KB",{theme:"colored"})
    }else if(size1){
      toast.error("Image should be less than 100KB",{theme:"colored"})
    }else{
    try {
      const response2 = await axios.put(
        `${import.meta.env.VITE_API}/workshops/edit-workshop/${id}`,
        edit,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: ` Bearer ${token}`,
          },
        }
      );
      toast.success("successfully modified", { theme: "colored" });
    } catch (error) {
      toast.error("Internal Error",{theme:"colored"})
      if(error?.message=="Unauthorized"){
        navigate("/")
      }
    }}
    setIsSubmit(false)
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
              <select
                onChange={handleChange}
                name="dep"
                value={edit.dep}
                className="form-select"
                aria-label="Default select example"
              >
                <option >Select Department</option>
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
              <p style={{color:"white"}}>
              {isChange}
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
              <div style={{color:"white"}}>
                <MyRichTextEditor name={"edit"} data={edit.about} setText={setDesc} />
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
              <div style={{color:"white"}}>
                <MyRichTextEditor name={"edit"} data={edit.structure} setText={setStruct} />
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
                placeholder="Workshop Instructor Name"
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
                Instructor Image {"(<100KB)"}
              </label>
              <FileBase64 multiple={false} onDone={handleFileInputChange1} />
              <p style={{color:"white"}}>
              {isChange1}
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
              <div style={{color:"white"}}>
                <MyRichTextEditor name={"edit"} data={edit.contact} setText={setContact} />
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
                type="text"
                name="entryFee"
                placeholder="Enter contact information"
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
    </>
  );
};
export default EditWorkShop;
