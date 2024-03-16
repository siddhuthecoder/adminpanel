import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const DeleteWorkshop = () => {
    const {id} = useParams();
    const navigate = useNavigate()
    const [isDelete,setIsDelete] = useState(false);
    const [token,setToken] = useState("");
    useEffect(() => {
        const info = JSON.parse(localStorage.getItem("data"));
        setToken(info.token);
      }, []);
    
    const handleDelete = async (e) => {
        e.preventDefault()
        setIsDelete(true)
        try {
            const response2 = await axios.delete(`https://teckzitebackend.onrender.com/workshops/delete/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ` Bearer ${token}`,
                },
            });
            toast.success("successfully deleted",{theme:"colored"})
            navigate("/home")
        } catch (error) {
            toast.error("Failed to delete",{theme:"colored"})
            console.error('Error deleting event data:', error);
        }
        setIsDelete(false)
    };

  return (
    <div className="m-3 d-flex flex-column">  
      <input
        onClick={handleDelete}
        className="form-control"
        type="submit"
        value={`${isDelete?"deleting...":"Delete Event"}`}
        style={{ backgroundColor: "red", color: "white" }}
      />
    </div>
  );
};

export default DeleteWorkshop;
