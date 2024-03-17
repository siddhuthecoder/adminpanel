import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AddUser = () => {
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
  });

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
      case "img":
        setClientData({ ...clientData, img: value });
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
    try {
      const getToken = localStorage.getItem("token");
      const token = getToken;
      const response = await axios.post(
        "https://teckzitebackend.onrender.com/user/register",
        clientData,
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
      toast.success("successfully Added New Notification", {
        theme: "colored",
      });
    } catch (err) {
      console.error(err);
      
    }
  };
  return (
    <section style={{backgroundColor:"black"}}>
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
          <input
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
          />
        </span>
        <span className="mt-3">
          <label htmlFor="name" className="ps-2">
            {" "}
            Branch
          </label>
          <select onChange={handleChange} name="branch" value={clientData.branch} className="form-select" aria-label="Default select example">
              <option selected>Select your Branch</option>
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
            City
          </label>
          <input
            type="text"
            name="city"
            placeholder="Enter City"
            value={clientData.city}
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
            value="Submit"
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
