import { useState, useEffect } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CustomModal from './modals/Modal';

const Login = () => {
  const navigate = useNavigate();
  const [valid, setValid] = useState(false)
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };
  const handleChange = (e) => {
    const formData = { ...values };
    formData[e.target.name] = e.target.value;
    setValues(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(" http://localhost:3001/admin/auth/login", values);

      if (response.status === 200) {
        const token = response.data.token;
        const email = response.data.email
        localStorage.setItem("data", JSON.stringify(response.data));
        localStorage.setItem("email", email)
        setValid(true)
        setShowModal(true);
      } else {
        setValid(false)
        alert("incorect");
      }
    } catch (err) {
      console.error(err);
      setValid(false)
      alert("incorrect cradentials")
      window.location.reload()

    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <section
        className="resource-form bg-dark w-100 d-flex justify-content-center flex-column align-items-center"
        style={{
          width: "100%",
          height: "100vh"
        }}
      >
        <div className="text-center  h3 bold-2" >
          Login !
        </div>
        <p className="text-center tag-line" style={{ color: "#CCCCCC" }}>
          Lorem ipsum dolor sit amet consectetur adipi
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
            <label htmlFor="" className="ps-2" >
              User Name
            </label>
            <input
              type="name"
              name="name"
              placeholder="Enter your Name"
              onChange={handleChange}
              required
              style={{ backgroundColor: "#555555", color: "#FFFFFF" }} // Dark input field
            />
          </span>
          <span className="mt-3">
            <label htmlFor="" className="ps-2" >
              User Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your EMail"
              onChange={handleChange}
              required
              style={{ backgroundColor: "#555555", color: "#FFFFFF" }} // Dark input field
            />
          </span>

          <span className="mt-3">
            <label htmlFor="password" className="ps-2" >
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
              style={{ backgroundColor: "#555555", color: "#FFFFFF" }} // Dark input field
            />
          </span>

          <span className="mt-3 w-100">
            <input
              type="submit"
              value="submit"

              className="w-100"
              style={{ backgroundColor: "#006996", color: "white" }}
            />
          </span>
        </form>
        {showModal &&
          <CustomModal showModal={showModal} closeModal={closeModal}>
            {valid ? "success" : "false"}
            <div className="w-100 d-flex">
              <button className="btn btn-success mx-auto" onClick={() => {
                navigate("/home")
              }}>Continue</button>
            </div>
          </CustomModal>}
      </section>

    </>
  );
};

export default Login;
