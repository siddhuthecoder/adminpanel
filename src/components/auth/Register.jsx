import { useState, useEffect } from "react";
import "../../App.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import CustomModal from "../modals/Modal";

const Register = () => {
  const navigate = useNavigate();
  const [valid, setValid] = useState(false);
  const [values, setValues] = useState({
    username: "",
    password: "",
    role: "",
  });
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "username":
        setValues({
          ...values,
          username: value,
        });
        break;
      case "password":
        setValues({
          ...values,
          password: value,
        });
        break;
      case "role":
        setValues({
          ...values,
          role: value,
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
      const response = await axios.post(
        "https://teckzitebackend.onrender.com/admin/register",
        values
      );

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("data", JSON.stringify(response.data));
        setValid(true);
        setShowModal(true);
      } else {
        setValid(false);
        alert("incorect");
      }
    } catch (err) {
      console.error(err);
      setValid(false);
      alert("incorrect cradentials");
      window.location.reload();
    }
    setIsSubmit(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <section
        className="resource-form w-100 d-flex justify-content-center flex-column align-items-center"
        style={{
          width: "100%",
          backgroundColor:"black"
        }}
      >
        <div className="text-center  h3 bold-2" style={{ color: "white" }}>
          Register !
        </div>
        <p className="text-center tag-line" style={{ color: "#CCCCCC" }}>
          Please register to enter admin dashbord
        </p>
        <form
          className="resource-form shadow flex-column ps-3 py-3 mx-auto"
          onSubmit={handleSubmit}
          method="POST"
          style={{
            width: "97%",
            maxWidth: "450px",
            height: "auto",
            backgroundColor: "#333333",
            color: "#FFFFFF",
            display: "flex",
          }}
        >
          <span className="mt-3">
            <label htmlFor="" className="ps-2">
              User Name
            </label>
            <input
              type="name"
              name="username"
              value={values.username}
              placeholder="Enter your Name"
              onChange={handleChange}
              required
              style={{ backgroundColor: "#555555", color: "#FFFFFF" }} // Dark input field
            />
          </span>
          <span className="mt-3">
            <label htmlFor="password" className="ps-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={values.password}
              placeholder="Enter your password"
              onChange={handleChange}
              required
              style={{ backgroundColor: "#555555", color: "#FFFFFF" }} // Dark input field
            />
          </span>
          <span className="mt-3">
            <label htmlFor="role" className="ps-2">
              Role
            </label>
            <select onChange={handleChange} name="role" value={values.role} className="form-select" aria-label="Default select example">
              <option selected>Select your Role</option>
              <option value="Web team">Web Team</option>
              <option value="Core team">Core Team</option>
              <option value="EventCoordinator">Event Co-ordinator</option>
              <option value="WorkshopCoordinator">Workshop Co-ordinator</option>
              <option value="NotificationManager">Notification Manager</option>
            </select>
          </span>
          <span className="mt-3 w-100">
            <input
              type="submit"
              value={isSubmit ? "sending..." : "Submit"}
              className="w-100"
              style={{ backgroundColor: "#006996", color: "white" }}
            />
          </span>
        </form>
        {showModal && (
          <CustomModal showModal={showModal} closeModal={closeModal}>
            {valid ? "success" : "false"}
            <div className="w-100 d-flex">
              <button
                className="btn btn-success mx-auto"
                onClick={() => {
                  navigate("/home");
                }}
              >
                Continue
              </button>
            </div>
          </CustomModal>
        )}
      </section>
    </>
  );
};

export default Register;
