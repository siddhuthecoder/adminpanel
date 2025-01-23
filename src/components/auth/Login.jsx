import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { context } from '../../App';
import '../../App.css';
import CustomModal from '../modals/Modal';

const Login = () => {
  const navigate = useNavigate();
  const {setToken,setRole,setAdmin} = useContext(context);
  const [valid, setValid] = useState(false)
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [isSubmit,setIsSubmit] = useState(false)
  const openModal = () => {
    setShowModal(true);
  };
  const restrictInput = (e)=> {
    const inputValue = e.target.value;
    var reg = /[^\w\d\s\@]/g;
    const sanitizedValue = inputValue.replace(reg, '');
    "".replace()
    e.target.value = sanitizedValue;
  }
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
      const response = await axios.post(`${import.meta.env.VITE_API}/admin/login`, values, {
  httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }),
});
      console.log(`${import.meta.env.VITE_API}/admin/login`);
      console.log(response)

      if (response.status === 200) {
        setToken(response.data.token);
        setRole(response.data.user.role)
        setAdmin(response.data.user.username)
        setValid(true)
        setShowModal(true);
        navigate("/home")
      } else {
        setValid(false)
        alert("incorect");
      }
    } catch (err) {
      setValid(false)
      toast.error("Incorrect Credentials",{theme:"colored"})
      
      console.log(err)
      
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
              onBeforeInput={restrictInput}
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
              onBeforeInput={restrictInput}
              value={values.password}
              required
              style={{ backgroundColor: "#555555", color: "#FFFFFF" }} // Dark input field
            />
          </span>

          <span className="mt-3 w-100">
            <input
              onClick={handleSubmit}
              type="submit"
              value={isSubmit?"sending...":"Submit"}
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
