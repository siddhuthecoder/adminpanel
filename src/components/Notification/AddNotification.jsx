import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { context } from "../../App";
import FileBase64 from 'react-file-base64';
import MyRichTextEditor from "../shared/MyRichTextEditor";
import { useNavigate } from "react-router-dom";

const AddNotification = () => {
  const [valid, setValid] = useState(false);
  const [isSubmit,setIsSubmit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const {token} = useContext(context)
  const navigate = useNavigate()
  const [size,setSize] = useState(false)
  const [info,setInfo] = useState("")
  const [notice, setNotice] = useState({
    heading: "",
    info: "",
    picturePath: "",
    link: "",
  });
  const restrictInput = (e)=> {
    const inputValue = e.target.value;
    var reg = /[^\w\d]/g;
    const sanitizedValue = inputValue.replace(reg, '');
    "".replace()
    e.target.value = sanitizedValue;
  }
  const setText = (ele)=>{
    setInfo(ele)
    setNotice({...notice,info:ele})
  }
  const handleFileInputChange = (file) => {
      if(parseInt(file.size)>100){
        setSize(true)
        toast.error("File size should less than 100KB",{theme:"colored"})
      }else{
        setSize(false);
        setNotice({...notice,picturePath: `${file.base64}`});
      }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "heading":
        setNotice({
          ...notice,
          heading: value,
        });
        break;
      case "link":
        setNotice({
          ...notice,
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
    if(size){
      toast.error("Image should be less than 100KB",{theme:"colored"})
    }else{
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/notifications/create/new`,
        notice,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        window.location.reload();
      }
      setNotice({
        heading: "",
        info: "",
        picturePath: "",
        link: "",
      });
      toast.success("successfully Added New Notification", {
        theme: "colored",
      });
    } catch (err) {
      setValid(false);
      if(err?.message=="Unauthorized" || err.response.status == 401){
        toast.error("Please Login Again",{theme:"colored"})
        navigate("/")
      }else{
        toast.error("Failed to Modify",{theme:"colored"})
      }
    }}
    setIsSubmit(false)
  };

  return (
    <div style={{ height: "100vh", backgroundColor: "#121212" }}>
      <section
        className="resource-form w-100"
        style={{ backgroundColor: "#121212", color: "#ffffff" }}
      >
        <div className="text-center h3 bold-2" style={{ color: "#83eeee" }}>
          Add Notification
        </div>
        <form
          className="resource-form shadow d-flex flex-column ps-3 py-3 mx-auto"
          style={{
            width: "97%",
            maxWidth: "450px",
            backgroundColor: "#212529",
            color: "#ffffff",
            borderRadius: "10px",
          }}
          onSubmit={handleSubmit}
        >
          <span className="mt-3">
            <label htmlFor="heading" className="ps-2">
              Heading
            </label>
            <input
              type="text"
              name="heading"
              value={notice.heading}
              onBeforeInput={restrictInput}
              placeholder="Title of the notice"
              onChange={handleChange}
              required
              style={{ backgroundColor: "#121212", color: "#ffffff" }}
            />
          </span>

          <span className="mt-3">
            <label htmlFor="info" className="ps-2">
              Description
            </label>
            {/* <textarea
              name="info"
              cols="30"
              rows="5"
              value={notice.info}
              placeholder="Full description"
              style={{ backgroundColor: "#121212", color: "#ffffff" }}
              onChange={handleChange}
              required
            ></textarea> */}
            <MyRichTextEditor setText={setText} name={"add"} />
          </span>

          <span className="mt-3">
            <label htmlFor="link" className="ps-2">
              Image (optional) {"<"} 100KB
            </label>
            <FileBase64 multiple={false} onDone={handleFileInputChange} />
          </span>
          <span className="mt-3">
            <label htmlFor="link" className="ps-2">
              Link (optional)
            </label>
            <input
              type="url"
              name="link"
              value={notice.link}
              placeholder="Enter Link"
              onChange={handleChange}
              style={{ backgroundColor: "#121212", color: "#ffffff" }}
            />
          </span>

          <span className="mt-3 w-100">
            <input
              type="submit"
              value={isSubmit?"sending...":"Submit"}
              className="w-100"
              style={{ backgroundColor: "#83eeee", color: "#121212" }}
            />
          </span>
        </form>
      </section>
    </div>
  );
};

export default AddNotification;
