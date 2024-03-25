import { useState, useEffect, useContext } from "react";
import AboutEvent from "./AboutEvent";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Edit from "./EditEvent";
import emailjs, { EmailJSResponseStatus } from "@emailjs/browser";

import { MdKeyboardBackspace } from "react-icons/md";
import { GrNext } from "react-icons/gr";
import DeleteEvent from "./DeleteEvent";
import { toast } from "react-toastify";
import { context } from "../../App";
import MyRichTextEditor from "../shared/MyRichTextEditor";

const EventDetails = () => {
  const [tab, setTab] = useState("About");
  const { token } = useContext(context);
  const [eveInfo, setEveInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const [content, setContent] = useState({
    subject: "",
    message: "",
    from_name: "",
    reply_to: import.meta.env.VITE_TECKZITE_MAIL,
  });
  const { id } = useParams();
  const [emails, setEmails] = useState([]);

  const fetchData = async () => {
    try {
      const responseData = await axios.get(
        `${import.meta.env.VITE_API}/events/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: ` Bearer ${token}`,
          },
        }
      );
      const responseData2 = await axios.get(
        `${import.meta.env.VITE_API}/events/view-responses/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: ` Bearer ${token}`,
          },
        }
      );
      setEveInfo({
        ...responseData.data,
        registerdStudents: responseData2.data.responses,
      });
      const _email = responseData2.data.responses?.map((item) => item[0].email);
      setEmails(_email);
      setLoading(false);
    } catch (err) {
      toast.error("Internal Error", { theme: "colored" });
      if (err?.message == "Unauthorized") {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    const temp = { ...content, to_mail: emails.join(",") };

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAIL_SERVICE_ID,
        import.meta.env.VITE_EMAIL_TEMPLATE_ID,
        temp,
        {
          publicKey: import.meta.env.VITE_EMAIL_PUBLIC_KEY,
        }
      );
      toast.success("MAIL SENT SUCCESSFULLY!", { theme: "colored" });
      setContent({ ...content, subject: "", message: "", from_name: "" });
    } catch (err) {
      if (err instanceof EmailJSResponseStatus) {
        return;
      }
      toast.error("ERROR! while sending mail", { theme: "colored" });
    }
    setIsSubmit(false);
  };
  const goback = () => {
    window.history.back();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "subject":
        setContent({ ...content, subject: value });
        break;
      case "from_name":
        setContent({ ...content, from_name: value });
        break;
      case "message":
        setContent({ ...content, message: value });
        break;

      default:
        break;
    }
  };
  const restrictInput = (e) => {
    const inputValue = e.target.value;
    var reg = /[^\w\d\s\@]/g;
    const sanitizedValue = inputValue.replace(reg, "");
    "".replace();
    e.target.value = sanitizedValue;
  };
  if (loading) {
    return (
      <>
        <div className="text-center">Loading....</div>
      </>
    );
  }

  return (
    <>
      <section
        className="w-100 d-flex flex-column  border"
        style={{
          height: "100vh",
          overflow: "scroll",
          backgroundColor: "rgb(18,18,18)",
        }}
      >
        <div
          className="w-100 d-flex align-items-center fixed-top justify-content-between shadow"
          style={{ height: "50px", backgroundColor: "#333333" }}
        >
          <div className="mx-3">
            <Link to="#" onClick={goback}>
              <MdKeyboardBackspace
                style={{ fontSize: "30px", color: "#ffffff" }}
              />
            </Link>
          </div>
          <div className="h2 text-white px-2">TECKZITE</div>
        </div>
        <div className="w-100 mt-5  d-flex align-items-center">
          <div className="h3 ms-3 text-white ">Events</div>
          <GrNext className=" h4 text-primary" />
          <div className="h3 me-1 text-white">{eveInfo.name}</div>
        </div>
        <div className="w-100 row mx-auto">
          <div
            className="col-11 col-md-6 col-lg-4 mx-auto py-4 my-3 d-flex flex-column"
            style={{
              backgroundColor: "black",
              maxHeight: "300px",
            }}
          >
            <img
              src={eveInfo.img}
              alt=""
              className=" mx-auto mt-2"
              style={{ width: "95%", borderRadius: "4px", height: "100%" }}
            />
            <div className="text-center py-3 h1 " style={{ color: "white" }}>
              {eveInfo.eveName}
            </div>
          </div>

          <div
            className="col-11 col-md-6 my-3 py-4 col-lg-7 mx-auto"
            style={{
              backgroundColor: "black",
            }}
          >
            <div className="w-100 d-flex align-items-center text-white">
              <div
                className={` px-3 ${tab == "About" ? "tab-active" : ""} `}
                onClick={() => setTab("About")}
              >
                About
              </div>
              <div
                className={` px-3 ${tab == "Edit" ? "tab-active" : ""} `}
                onClick={() => setTab("Edit")}
              >
                Edit
              </div>
              <div
                className={` px-3 ${tab == "Delete" ? "tab-active" : ""} `}
                onClick={() => setTab("Delete")}
              >
                Delete
              </div>
            </div>
            <hr
              style={{ color: "grey", fontWeight: "700", marginTop: "2px" }}
            />
            <div
              className="section w-100 "
              style={{ height: "70vh", overflow: "scroll" }}
            >
              {tab == "About" && <AboutEvent data={eveInfo} />}
              {tab == "Edit" && <Edit data={eveInfo} />}
              {tab == "Delete" && <DeleteEvent />}
            </div>
            <div className="m-3 d-flex flex-column">
              <input
                data-bs-toggle="modal"
                data-bs-target="#mailModel"
                className="form-control"
                type="submit"
                value={`${"Send Mail"}`}
                style={{ backgroundColor: "#006996", color: "white" }}
              />
            </div>
          </div>
        </div>
      </section>
      <div
        className="modal fade"
        id="mailModel"
        tabindex="-1"
        aria-labelledby="mailModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog bg-dark modal-fullscreen">
          <div className="modal-content bg-dark">
            <div className="modal-header bg-dark">
              <h1 className="modal-title bg-dark fs-5" id="mailModalLabel">
                Send Mail
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form
                className="resource-form shadow d-flex flex-column ps-3 py-3 mx-auto"
                style={{
                  width: "97%",
                  maxWidth: "450px",
                  backgroundColor: "#212529",
                  color: "#ffffff",
                  borderRadius: "10px",
                }}
              >
                <span className="mt-3">
                  <label htmlFor="heading" className="ps-2">
                    From
                  </label>
                  <input
                    type="text"
                    name="from_name"
                    value={content.from_name}
                    onBeforeInput={restrictInput}
                    placeholder="Enter from event name"
                    onChange={handleChange}
                    required
                    style={{ backgroundColor: "#121212", color: "#ffffff" }}
                  />
                </span>
                <span className="mt-3">
                  <label htmlFor="heading" className="ps-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={content.subject}
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
                  <textarea
                    name="message"
                    cols="30"
                    value={content.message}
                    placeholder="Full description"
                    style={{ backgroundColor: "#121212", color: "#ffffff" }}
                    onChange={handleChange}
                    required
                  ></textarea>
                </span>

                <span className="mt-3 w-100">
                  <input
                    type="submit"
                    onClick={handleSubmit}
                    value={isSubmit ? "sending..." : "Send Mail"}
                    className="w-100"
                    style={{ backgroundColor: "#83eeee", color: "#121212" }}
                  />
                </span>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EventDetails;
