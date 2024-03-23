import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../App.css";
import { toast } from "react-toastify";
import { context } from "../../App";
import FileBase64 from "react-file-base64";
import MyRichTextEditor from "../shared/MyRichTextEditor";

const EditNotification = ({ data }) => {
  const { token } = useContext(context);
  const [eveInfo, setEveInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [size, setSize] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [edit, setEdit] = useState(data);
  const [isChange, setIsChange] = useState("Change");
  const restrictInput = (e) => {
    const inputValue = e.target.value;
    var reg = /[^\w\d]/g;
    const sanitizedValue = inputValue.replace(reg, "");
    "".replace();
    e.target.value = sanitizedValue;
  };
  const handleFileInputChange = (file) => {
    if (parseInt(file.size) > 100) {
      toast.error("Image should be less than 100KB", { theme: "colored" });
      setSize(true);
    } else {
      setEdit({ ...edit, picturePath: `${file.base64}` });
      setIsChange("Changed");
      setSize(false);
    }
  };
  const setText = (ele) => setEdit({ ...edit, info: ele });
  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "heading":
        setEdit({
          ...edit,
          heading: value,
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

    if (size) {
      toast.error("Image should be less than 100KB", { theme: "colored" });
    } else {
      try {
        const response2 = await axios.put(
          `${import.meta.env.VITE_API}/notifications/update/${id}`,
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
                Information
              </label>
              {/* <input
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
              /> */}
              <div style={{ color: "white" }}>
                <MyRichTextEditor
                  setText={setText}
                  name={"edit"}
                  data={edit.info}
                />
              </div>
            </div>

            <div className="m-3 d-flex flex-column">
              <label
                htmlFor="eveImg"
                className="ps-2 form-label"
                style={{ color: "#006996", fontWeight: "700" }}
              >
                Image {"(<100KB)"}
              </label>
              <FileBase64 multiple={false} onDone={handleFileInputChange} />
              <p style={{ color: "white" }}>{isChange}</p>
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
