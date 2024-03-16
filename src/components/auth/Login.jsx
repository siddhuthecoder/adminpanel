import { useState, useEffect } from 'react';
import '../../App.css';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CustomModal from '../modals/Modal';

const Login = () => {
  const navigate = useNavigate();
  const [valid, setValid] = useState(false)
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSubmit,setIsSubmit] = useState(false)
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
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true)
    try {
      const response = await axios.post("https://teckzitebackend.onrender.com/admin/login", values);

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("data", JSON.stringify(response.data));
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
    setIsSubmit(false)
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
        <div className="text-center  h3 bold-2" style={{color:"white"}}>
          Login !
        </div>
        <p className="text-center tag-line" style={{ color: "#CCCCCC" }}>
          Please login to enter admin dashbord
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
              name="username"
              value={values.username}
              placeholder="Enter your Name"
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
              value={values.password}
              required
              style={{ backgroundColor: "#555555", color: "#FFFFFF" }} // Dark input field
            />
          </span>

          <span className="mt-3 w-100">
            <input
              type="submit"
              value={isSubmit?"sending...":"Submit"}
              className="w-100"
              style={{ backgroundColor: "#006996", color: "white" }}
            />
          </span>
          <span className="mt-3 w-100">Doesn't have account? <NavLink to={"/register"}>Register</NavLink></span>
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
