import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomModal from './modals/Modal';

const SendNotice = () => {
    const [valid, setValid] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [token, setToken] = useState("")
    const [notice, setNotice] = useState({
        date: new Date().toISOString(),
        heading: "",
        info: "",
        picturePath: "",
        link: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNotice(prevNotice => ({
            ...prevNotice,
            [name]: value
        }));
    };

    useEffect(() => {
        const info = JSON.parse(localStorage.getItem("data"));
        setToken(info.token)
        console.log(token)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(notice)
        try {
            const response = await axios.post(
                "http://localhost:3001/admin/notifications/new",
                notice,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                }
            );
            if (response.status === 201) {
                window.location.reload()
            }
        } catch (err) {
            console.error(err);
            setValid(false);
            alert("failed");
        }
    };

    return (
        <>
            <section className="resource-form w-100" style={{ backgroundColor: "#121212", color: "#ffffff" }}>
                <div className="text-center h3 bold-2" style={{ color: "#83eeee" }}>Send Notice</div>
                <form className="resource-form shadow d-flex flex-column ps-3 py-3 mx-auto"
                    style={{
                        width: '97%',
                        maxWidth: '450px',
                        backgroundColor: '#212529',
                        color: '#ffffff',
                        borderRadius: '10px'
                    }}
                    onSubmit={handleSubmit}
                >
                    <span className="mt-3">
                        <label htmlFor="heading" className="ps-2">Heading</label>
                        <input type="text" name="heading" placeholder="Title of the notice" onChange={handleChange} required style={{ backgroundColor: '#121212', color: '#ffffff' }} />
                    </span>

                    <span className="mt-3">
                        <label htmlFor="info" className="ps-2">Description</label>
                        <textarea name="info" cols="30" rows="5" placeholder="Full description" style={{ backgroundColor: '#121212', color: '#ffffff' }} onChange={handleChange} required></textarea>
                    </span>

                    <span className="mt-3">
                        <label htmlFor="link" className="ps-2">Link (optional)</label>
                        <input type="text" name="link" placeholder="Post link" onChange={handleChange} style={{ backgroundColor: '#121212', color: '#ffffff' }} />
                    </span>
                    <span className="mt-3">
                        <label htmlFor="picturePath" className="ps-2">Link (optional)</label>
                        <input type="text" name="picturePath" placeholder="Picture path" onChange={handleChange} style={{ backgroundColor: '#121212', color: '#ffffff' }} />
                    </span>

                    <span className="mt-3 w-100">
                        <input type="submit" value="Submit" className="w-100" style={{ backgroundColor: '#83eeee', color: '#121212' }} />
                    </span>
                </form>
            </section>
        </>
    );
};

export default SendNotice;
