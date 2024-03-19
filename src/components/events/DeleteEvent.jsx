import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { context } from "../../App";

const DeleteEvent = () => {
    const {id} = useParams();
    const navigate = useNavigate()
    const [isDelete,setIsDelete] = useState(false);
    const {token} = useContext(context)
    
    const handleDelete = async (e) => {
        e.preventDefault()
        setIsDelete(true)
        try {
            const response2 = await axios.delete(`${import.meta.env.VITE_API}/events/delete-event/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ` Bearer ${token}`,
                },
            });
            toast.success("successfully deleted",{theme:"colored"})
            navigate("/home")
        } catch (error) {
          if(error?.message=="Unauthorized" || error.response.status == 401){
            toast.error("Please Login Again",{theme:"colored"})
            navigate("/")
          }else{
            toast.error("Failed to Modify",{theme:"colored"})
          }
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

export default DeleteEvent;
