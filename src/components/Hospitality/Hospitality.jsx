import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { context } from "../../App";
import { toast } from "react-toastify";

const Hospitality = () => {
  const [values, setValues] = useState({
    tzkid: "",
    gender: "",
  });
  const [check,setCheck] = useState(true)
  const {token} = useContext(context)
  const navigate = useNavigate()
  const [show,setShow] = useState(false)
  const [isSubmit,setIsSubmit] = useState(false)
  const [alloc,setAlloc] = useState("")
  const [rooms,setRooms] = useState({male:[{roomNo:"I2 - SF - 60B",count:0},{roomNo:"I2 - SF - 61B",count:0},{roomNo:"I2 - SF - 62B",count:0},{roomNo:"I2 - SF - 63B",count:0}],female:[{roomNo:"K2 - SF - 60B",count:0},{roomNo:"K2 - SF - 61B",count:0},{roomNo:"K2 - SF - 62B",count:0},{roomNo:"K2 - SF - 63B",count:0}]})
  useEffect(()=>{
    const local = JSON.parse(localStorage.getItem("rooms"));
    if(local){
      setRooms(local)
    }
    console.log(local)
  },[])
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmit(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API}/user/${values.tzkid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      
      const data = response.data.user;
      if(!data?.gender){
        setShow(true)
      }
      show ? giveData(values) : giveData(data)
    } catch (err) {
      toast.error("Internal Error", { theme: "colored" });
      console.log(err)
      if (err?.message == "Unauthorized") {
        navigate("/");
      }
    }
    setIsSubmit(false)
  };
  const giveData = (data)=>{
    const gender = data?.gender
    if(gender=="male"){
        var rom = rooms.male
        for (var index = 0; index < rom.length; index++) {
            if(rom[index].count <=5){
                setAlloc(rom[index].roomNo);
                rom[index].count+=1
                break
            }
        }
        setRooms({...rooms,male:rom})
        setValues({tzkid:"",gender:""})
        setShow(false)
    }else if(gender=="female"){
        var rom = rooms.female
        for (var index = 0; index < rom.length; index++) {
            if(rom[index].count <=5){
                setAlloc(rom[index].roomNo);
                rom[index].count+=1
                break
            }
        }
        setRooms({...rooms,male:rom})
        setValues({tzkid:"",gender:""})
        setShow(false)
    }
    localStorage.setItem("rooms",JSON.stringify(rooms))
    console.log(rooms)
  
  }
  const handleChange = (e) => {
    e.preventDefault();
    setAlloc("")
    const { name, value } = e.target;
    switch (name) {
      case "tzkid":
        setShow(false)
        setCheck(true)
        setValues({ ...values, tzkid: value });
        break;
      case "gender":
        setValues({ ...values, gender: value });
        break;

      default:
        break;
    }
  };

  return (
    <section>
      <div className="text-center  h3 bold-2" style={{ color: "white" }}>
        Hospitality !
      </div>
      <form
        className="resource-form shadow flex-column ps-3 py-3 mx-auto"
        method="POST"
        onSubmit={handleSubmit}
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
          <label htmlFor="tkzkid" className="ps-2">
            Teckzite ID
          </label>
          <input
            type="name"
            name="tzkid"
            value={values.tzkid}
            placeholder="Enter your Teckzite ID"
            onChange={handleChange}
            required
            style={{ backgroundColor: "#555555", color: "#FFFFFF" }} // Dark input field
          />
        </span>
        {show && <><span className="mt-3">
          <label htmlFor="role" className="ps-2">
            Gender
          </label>
          <select
            onChange={handleChange}
            name="gender"
            value={values.gender}
            className="form-select"
            aria-label="Default select example"
          >
            <option selected>Select Your Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </span></>}
        <span className="mt-3 w-100">
          <input
            onSubmit={handleSubmit}
            type="submit"
            value={isSubmit ? "sending..." : "Submit"}
            className="w-100"
            style={{ backgroundColor: "#006996", color: "white" }}
          />
        </span>
      </form>
      {alloc && <><div className="text-center mt-5 h3 bold-2" style={{ color: "white" }}>
        Allocated Room: {alloc}
      </div></>}
    </section>
  );
};

export default Hospitality;
