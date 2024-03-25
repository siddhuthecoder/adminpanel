import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { context } from "../../App";
import FileBase64 from "react-file-base64";

const AddUser = () => {
  const { token } = useContext(context);
  const [clientData, setClientData] = useState({
    branch: "",
    city: "",
    college: "",
    collegeId: "",
    district: "",
    email: "",
    firstName: "",
    img: "",
    lastName: "",
    phno: "",
    refreals: [],
    regEvents: [],
    regWorkshop: [],
    state: "",
    tzkid: "",
    year: "",
    mode: "offline_mode",
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const restrictInput = (e)=> {
    const inputValue = e.target.value;
    var reg = /[^\w\d\s\@]/g;
    const sanitizedValue = inputValue.replace(reg, '');
    "".replace()
    e.target.value = sanitizedValue;
  }
  const handleFileInputChange = (file) => {
    if (parseInt(file.size) > 100) {
      setSize(true);
      toast.error("Image should be less than 100KB", { theme: "colored" });
    } else {
      setClientData({ ...clientData, img: `${file.base64}` });
      setSize(false);
    }
  };
  const [size, setSize] = useState(false);
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    switch (name) {
      case "firstName":
        setClientData({ ...clientData, firstName: value });
        break;
      case "lastName":
        setClientData({ ...clientData, lastName: value });
        break;
      case "college":
        setClientData({ ...clientData, college: value });
        break;

      case "email":
        setClientData({ ...clientData, email: value });
        break;
      case "phno":
        setClientData({ ...clientData, phno: value });
        break;
      case "year":
        setClientData({ ...clientData, year: value });
        break;
      case "collegeId":
        setClientData({ ...clientData, collegeId: value });
        break;
      case "state":
        setClientData({ ...clientData, state: value });
        break;
      case "district":
        setClientData({ ...clientData, district: value });
        break;
      case "city":
        setClientData({ ...clientData, city: value });
        break;
      case "tzkid":
        setClientData({ ...clientData, tzkid: value });
        break;
      case "branch":
        setClientData({ ...clientData, branch: value });
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
        const response = await axios.post(
          `${import.meta.env.VITE_API}/user/register`,
          clientData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setClientData({
          branch: "",
          city: "",
          college: "",
          collegeId: "",
          district: "",
          email: "",
          firstName: "",
          img: "",
          lastName: "",
          phno: "",
          refreals: [],
          regEvents: [],
          regWorkshop: [],
          state: "",
          tzkid: "",
          year: "",
        });
        toast.success("successfully Added New User", {
          theme: "colored",
        });
      } catch (err) {
        toast.error("Failed to Add new User", { theme: "colored" });
        if (err?.message == "Unauthorized") {
          navigate("/");
        }
      }
    }
    setIsSubmit(false);
  };
  return (
    <section style={{ backgroundColor: "black" }}>
      <form
        className="resource-form shadow d-flex flex-column ps-3 py-3 mx-auto"
        style={{
          width: "97%",
          maxWidth: "450px",
          backgroundColor: "#333333",
          color: "#ffffff",
          borderRadius: "8px",
          padding: "20px",
        }}
      >
        <span className="mt-3">
          <label htmlFor="name" className="ps-2">
            {" "}
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter First Name"
            value={clientData.firstName}
            onChange={handleChange}
            onBeforeInput={restrictInput}
            required
            style={{
              backgroundColor: "#1e1e1e",
              color: "#ffffff",
              padding: "8px",
              borderRadius: "4px",
              border: "none",
            }}
          />
        </span>
        <span className="mt-3">
          <label htmlFor="name" className="ps-2">
            {" "}
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            placeholder="Enter Last Name"
            value={clientData.lastName}
            onChange={handleChange}
            onBeforeInput={restrictInput}
            required
            style={{
              backgroundColor: "#1e1e1e",
              color: "#ffffff",
              padding: "8px",
              borderRadius: "4px",
              border: "none",
            }}
          />
        </span>

        <span className="mt-3">
          <label htmlFor="email" className="ps-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={clientData.email}
            onChange={handleChange}
            required
            style={{
              backgroundColor: "#1e1e1e",
              color: "#ffffff",
              padding: "8px",
              borderRadius: "4px",
              border: "none",
            }}
          />
        </span>
        <span className="mt-3">
          <label htmlFor="name" className="ps-2">
            {" "}
            Year
          </label>
          {/* <input
            type="text"
            name="year"
            placeholder="Enter Year"
            value={clientData.year}
            onChange={handleChange}
            required
            style={{
              backgroundColor: "#1e1e1e",
              color: "#ffffff",
              padding: "8px",
              borderRadius: "4px",
              border: "none",
            }}
          /> */}
          <select
            onChange={handleChange}
            name="year"
            value={clientData.year}
            className="form-select"
            aria-label="Default select example"
          >
            <option selected>Select your Year</option>
            <option value="PUC-1">PUC 1</option>
            <option value="PUC-2">PUC 2</option>
            <option value="E1">E1</option>
            <option value="E2">E2</option>
            <option value="E3">E3</option>
            <option value="E4">E4</option>
          </select>
        </span>
        <span className="mt-3">
          <label htmlFor="name" className="ps-2">
            {" "}
            Branch
          </label>
          <select
            onChange={handleChange}
            name="branch"
            value={clientData.branch}
            className="form-select"
            aria-label="Default select example"
          >
            <option selected>Select your Branch</option>
            <option value="PUC">PUC</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="MECH">MECH</option>
            <option value="CHEM">CHEM</option>
            <option value="CIVIL">CIVIL</option>
            <option value="MME">MME</option>
          </select>
        </span>
        <span className="mt-3">
          <label htmlFor="name" className="ps-2">
            {" "}
            College
          </label>
          <input
            type="text"
            name="college"
            placeholder="Enter College Name"
            value={clientData.college}
            onChange={handleChange}
            onBeforeInput={restrictInput}
            required
            style={{
              backgroundColor: "#1e1e1e",
              color: "#ffffff",
              padding: "8px",
              borderRadius: "4px",
              border: "none",
            }}
          />
        </span>
        <span className="mt-3">
          <label htmlFor="name" className="ps-2">
            {" "}
            College ID
          </label>
          <input
            type="text"
            name="collegeId"
            placeholder="Enter College ID"
            value={clientData.collegeId}
            onChange={handleChange}
            required
            style={{
              backgroundColor: "#1e1e1e",
              color: "#ffffff",
              padding: "8px",
              borderRadius: "4px",
              border: "none",
            }}
          />
        </span>
        <span className="mt-3">
          <label htmlFor="name" className="ps-2">
            {" "}
            None RGUKT Students ID Photo {"(<100KB)"}
          </label>
          <FileBase64 multiple={false} onDone={handleFileInputChange} />
        </span>

        <span className="mt-3">
          <label htmlFor="name" className="ps-2">
            {" "}
            City
          </label>
          <input
            type="text"
            name="city"
            placeholder="Enter City"
            value={clientData.city}
            onBeforeInput={restrictInput}
            onChange={handleChange}
            required
            style={{
              backgroundColor: "#1e1e1e",
              color: "#ffffff",
              padding: "8px",
              borderRadius: "4px",
              border: "none",
            }}
          />
        </span>
        <span className="mt-3">
          <label htmlFor="name" className="ps-2">
            {" "}
            District
          </label>
          <input
            type="text"
            name="district"
            placeholder="Enter District"
            value={clientData.district}
            onBeforeInput={restrictInput}
            onChange={handleChange}
            required
            style={{
              backgroundColor: "#1e1e1e",
              color: "#ffffff",
              padding: "8px",
              borderRadius: "4px",
              border: "none",
            }}
          />
        </span>
        <span className="mt-3">
          <label htmlFor="name" className="ps-2">
            {" "}
            State
          </label>
          <input
            type="text"
            name="state"
            placeholder="Enter State"
            value={clientData.state}
            onBeforeInput={restrictInput}
            onChange={handleChange}
            required
            style={{
              backgroundColor: "#1e1e1e",
              color: "#ffffff",
              padding: "8px",
              borderRadius: "4px",
              border: "none",
            }}
          />
        </span>

        <span className="mt-3">
          <label htmlFor="contact" className="ps-2">
            Contact
          </label>
          <input
            type="number"
            name="phno"
            placeholder="Enter Contact"
            value={clientData.phno}
            onChange={handleChange}
            required
            style={{
              backgroundColor: "#1e1e1e",
              color: "#ffffff",
              padding: "8px",
              borderRadius: "4px",
              border: "none",
            }}
          />
        </span>
        <span className="mt-3">
          <input
            type="submit"
            value={isSubmit ? "sending..." : "Submit"}
            onClick={handleSubmit}
            style={{
              backgroundColor: "#006996",
              color: "white",
              padding: "10px",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
            }}
          />
        </span>
      </form>
    </section>
  );
};

export default AddUser;
