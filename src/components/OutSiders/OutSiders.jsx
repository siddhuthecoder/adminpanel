import React, { useContext, useEffect, useState } from "react";
import emailjs, { EmailJSResponseStatus } from "@emailjs/browser";
import { toast } from "react-toastify";
import axios from "axios";
import { context } from "../../App";

const OutSiders = () => {
  const { token } = useContext(context);
  const [loading, setLoading] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const [emails, setEmails] = useState([]);
  const [data,setData] = useState([])
   const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API}/user/getAll`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }

        const user = response.data.users;
        var _user = []
        var _email = []
        user?.map((item) => {
          const mail = item?.email?.split("@")[1]?.split(".")[0];
          if (mail != "rguktn" && mail != "rguktsklm" && mail != "rguktong" && mail != "rguktrkv") {
            _user.push(item)
            _email.push(item?.email)
          }
        });
        setData(_user);
        setEmails(_email)
        setLoading(false);
      } catch (err) {
        toast.error("Internal Error", { theme: "colored" });
        if (err?.message == "Unauthorized") {
          navigate("/");
        }
      }
      setLoading(false);
    };

  useEffect(() => {
    fetchData();
  }, [token]);

  const [content, setContent] = useState({
    subject: "",
    message: "",
    from_name: "",
    reply_to: import.meta.env.VITE_TECKZITE_MAIL,
  });
  const restrictInput = (e) => {
    const inputValue = e.target.value;
    var reg = /[^\w\d\s\@]/g;
    const sanitizedValue = inputValue.replace(reg, "");
    "".replace();
    e.target.value = sanitizedValue;
  };
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
  if(loading){
    return (
      <div style={{textAlign: "center"}}>loading...</div>
    )
  }
  return (

    <div>
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
      <div
        className="table-responsive align-items-center table-striped  mt-4"
        style={{ height: "auto", width: "1400px", overflow: "" }}
      >
        <div
          className={` d-flex text-center ${"justify-content-between"} align-items-center flex-wrap`}
        >
          <div
            className="d-flex flex-column mx-auto"
            style={{
              width: "100%",
              minWidth: "350px",
              overflowX: "scroll",
            }}
          >
            <div className="d-flex align-items-center flex-column   justify-content-center">
              <div
                className="d-flex text-center justify-content-around bg-dark text-white align-items-center  mb-2  py-1 shadow"
                style={{ width: "100%", minWidth: "950px", height: "50px" }}
              >
                <div className="" style={{ width: "100px" }}>
                  S.no
                </div>
                <div
                  className="d-flex text-center align-items-center"
                  style={{ minWidth: "270px" }}
                >
                  Name
                </div>
                <div
                  className="d-flex align-items-center"
                  style={{ minWidth: "280px" }}
                >
                  <span className="pe-4">Email ID</span>
                </div>
                <div
                  className="d-flex align-items-center"
                  style={{ minWidth: "200px" }}
                >
                  <span className="pe-4">Contact</span>
                </div>
                <div
                  className="d-flex align-items-center"
                  style={{ minWidth: "150px" }}
                >
                  <span className="pe-4">Branch</span>
                </div>
                <div
                  className="d-flex align-items-center"
                  style={{ minWidth: "250px" }}
                >
                  <span className="pe-4">College</span>
                </div>
                <div
                  className="d-flex align-items-center"
                  style={{ minWidth: "150px" }}
                >
                  College ID
                </div>
              </div>
              {data?.map((item, index) => (
                  <div
                    key={index}
                    className="d-flex justify-content-around align-items-center hover-effect cursor-pointer  my-1  py-4 shadow"
                    style={{
                      width: "100%",
                      minWidth: "950px",
                      height: "50px",
                      cursor: "pointer",
                      backgroundColor: "black",
                    }}
                  >
                    <div
                      className="align-items-center"
                      style={{ minWidth: "100px" }}
                    >
                      {index + 1}
                    </div>
                    <div
                      className="d-flex   align-items-center"
                      style={{ minWidth: "270px" }}
                    >
                      <span className="pe-4">{item.firstName} {item.lastName}</span>
                    </div>
                    <div
                      className="d-flex align-items-center"
                      style={{ minWidth: "280px" }}
                    >
                      {item.email}
                    </div>
                    <div
                      className="d-flex align-items-center"
                      style={{ minWidth: "200px" }}
                    >
                      {item.phno}
                    </div>
                    <div
                      className="d-flex align-items-center"
                      style={{ minWidth: "150px" }}
                    >
                      {item.branch}
                    </div>
                    <div
                      className="d-flex align-items-center"
                      style={{ minWidth: "250px",overflow:"hidden" }}
                    >
                      {item.college?.slice(0,26)}
                    </div>
                    <div
                      className="d-flex align-items-center"
                      style={{ minWidth: "300px" }}
                    >
                      {item.collegeId}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

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
                    placeholder="Enter from name"
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
                    placeholder="Enter Subject"
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
    </div>
  );
};

export default OutSiders;
