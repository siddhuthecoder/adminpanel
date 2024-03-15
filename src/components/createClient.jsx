import React, { useState ,useEffect} from "react";
import '../App.css'
import {Link,useNavigate} from "react-router-dom"
import axios from 'axios'

const CreateClient = () => {
    const Navigate = useNavigate()
    const [createClient,setCreateClient] = useState({
        name:"",
        email:"",
        password:"",
        contact:"",
        company:""
      })
      const handleChange = (e) => {
        const formData = {...createClient}
        formData[e.target.name] = e.target.value
        setCreateClient(formData)
      }
      const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(
                'http://localhost:8080/client/signup',
                createClient,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            if (response.status === 200) {
                window.location.reload(); 
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <form className="resource-form shadow d-flex flex-column ps-3 py-3 mx-auto"
                    style={{
                        width: '97%',
                        maxWidth: '450px',
                        backgroundColor: '#F7FFFF',
                    }}
                    onSubmit={handleSubmit}
                    method="POST"
                    >
                    <span className="mt-3">
                        <label htmlFor="title" className="ps-2">Name</label>
                        <input type="text" name="name" placeholder="Client Name" onChange={handleChange} required />
                    </span>

                    <span className="mt-3">
                        <label htmlFor="email" className="ps-2">Email</label>
                        <input type="email" name="email" placeholder="Client Email" onChange={handleChange} required />
                    </span>

                    <span className="mt-3">
                        <label htmlFor="contact" className="ps-2">Contact</label>
                        <input type="number" name="contact" placeholder="Client Phone number" onChange={handleChange} required />
                    </span>

                    <span className="mt-3">
                        <label htmlFor="password" className="ps-2">Password</label>
                        <input type="password" name="password" placeholder="password" onChange={handleChange} required />
                    </span>


                    <span className="mt-3">
                        <label htmlFor="company" className="ps-2">Company</label>
                        <input type="text" name="company" placeholder="Company" onChange={handleChange} required />
                    </span>

                    <span className="mt-3 w-100">
                        <input type="submit" value="Create Client" className="w-100" style={{ backgroundColor: '#006996', color: 'white' }} />
                    </span>
            </form>
        </>
    )
}
export default CreateClient