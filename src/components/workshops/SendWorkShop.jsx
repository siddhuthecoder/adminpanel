import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css'

const WorkshopForm = () => {

    const [token, setToken] = useState("")
    const [formData, setFormData] = useState({
        workshopName: '',
        workshopDept: '',
        about: '',
        workshopImg: '',
        structure: '',
        isRegistrationsOpened: 1,
        contact: '',
        instructorName: '',
        instructorSpecifications: '',
        instructorImage: ''
    });

    useEffect(() => {
        const info = JSON.parse(localStorage.getItem("data"));
        setToken(info.token)
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        console.log(token)
        try {
            const response = await axios.get('http://localhost:3001/admin/workshops/all-workshops', {
                header: {
                    'Content-Type': 'application/json',
                    'Authorization': ` Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzA3ZDg1Yjk4MTY4NTBkNTY0ZTM5ZSIsImlhdCI6MTcwOTM1MTUwNH0.mPW-B6bX4zrV1Xv2Dlof6sK78lHUdk8Bq0NgIv2mRc4`,
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    return (
        <>
            <section className="resource-form w-100 mt-3" style={{ width: '97%', maxWidth: '1100px', height: '87vh', backgroundColor: '#121212', color: '#ffffff' }}>
                <form onSubmit={handleSubmit} className="d-flex flex-column" style={{
                    width: "97%",
                    maxWidth: "400px",
                    height: "90vh",
                    overflowY: "scroll",
                    backgroundColor: "rgb(33, 37, 41)",
                    margin: "auto"
                }}>
                    <div className="m-3 d-flex flex-column">
                        <label htmlFor="workshopName" className="ps-2 form-label" style={{ color: "#006996", fontWeight: "700" }}>
                            Workshop Name
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            name="workshopName"
                            placeholder="Enter workshop Name"
                            value={formData.workshopName}
                            onChange={handleChange}
                            required
                            style={{ backgroundColor: "black", color: "#006996", fontWeight: "700" }}
                        />
                    </div>

                    <div className="m-3 d-flex flex-column">
                        <label htmlFor="workshopDept" className="ps-2 form-label" style={{ color: "#006996", fontWeight: "700" }}>
                            Department
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            name="workshopDept"
                            placeholder="Enter department"
                            value={formData.workshopDept}
                            onChange={handleChange}
                            required
                            style={{ backgroundColor: "black", color: "#006996", fontWeight: "700" }}
                        />
                    </div>

                    <div className="m-3 d-flex flex-column">
                        <label htmlFor="about" className="ps-2 form-label" style={{ color: "#006996", fontWeight: "700" }}>
                            About
                        </label>
                        <textarea
                            name="about"
                            placeholder="Enter workshop description"
                            value={formData.about}
                            onChange={handleChange}
                            required
                            style={{ backgroundColor: "black", color: "#FFFFFF", resize: "none" }}
                        />
                    </div>

                    <div className="m-3 d-flex flex-column">
                        <label htmlFor="workshopImg" className="ps-2 form-label" style={{ color: "#006996", fontWeight: "700" }}>
                            Workshop Image URL
                        </label>
                        <input
                            className="form-control"
                            type="url"
                            name="workshopImg"
                            placeholder="Enter workshop image URL"
                            value={formData.workshopImg}
                            onChange={handleChange}
                            required
                            style={{ backgroundColor: "black", color: "#006996", fontWeight: "700" }}
                        />
                    </div>

                    <div className="m-3 d-flex flex-column">
                        <label htmlFor="structure" className="ps-2 form-label" style={{ color: "#006996", fontWeight: "700" }}>
                            Structure
                        </label>
                        <textarea
                            name="structure"
                            placeholder="Enter workshop structure"
                            value={formData.structure}
                            onChange={handleChange}
                            required
                            style={{ backgroundColor: "black", color: "#FFFFFF", resize: "none" }}
                        />
                    </div>

                    <div className="m-3 d-flex flex-column">
                        <label htmlFor="isRegistrationsOpened" className="ps-2 form-label" style={{ color: "#006996", fontWeight: "700" }}>
                            Is Registrations Opened?
                        </label>
                        <select
                            className="form-select"
                            name="isRegistrationsOpened"
                            value={formData.isRegistrationsOpened}
                            onChange={handleChange}
                            required
                            style={{ backgroundColor: "black", color: "#006996", fontWeight: "700" }}
                        >
                            <option value={1}>Yes</option>
                            <option value={0}>No</option>
                        </select>
                    </div>

                    <div className="m-3 d-flex flex-column">
                        <label htmlFor="contact" className="ps-2 form-label" style={{ color: "#006996", fontWeight: "700" }}>
                            Contact Info
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            name="contact"
                            placeholder="Enter contact information"
                            value={formData.contact}
                            onChange={handleChange}
                            required
                            style={{ backgroundColor: "black", color: "#006996", fontWeight: "700" }}
                        />
                    </div>

                    <div className="m-3 d-flex flex-column">
                        <label htmlFor="instructorName" className="ps-2 form-label" style={{ color: "#006996", fontWeight: "700" }}>
                            Instructor Name
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            name="instructorName"
                            placeholder="Enter instructor name"
                            value={formData.instructorName}
                            onChange={handleChange}
                            required
                            style={{ backgroundColor: "black", color: "#006996", fontWeight: "700" }}
                        />
                    </div>

                    <div className="m-3 d-flex flex-column">
                        <label htmlFor="instructorSpecifications" className="ps-2 form-label" style={{ color: "#006996", fontWeight: "700" }}>
                            Instructor Specifications
                        </label>
                        <textarea
                            name="instructorSpecifications"
                            placeholder="Enter instructor specifications"
                            className='form-control'
                            value={formData.instructorSpecifications}
                            onChange={handleChange}
                            required
                            style={{ backgroundColor: "black", color: "#FFFFFF", resize: "none" }}
                        />
                    </div>

                    <div className="m-3 d-flex flex-column">
                        <label htmlFor="instructorImage" className="ps-2 form-label" style={{ color: "#006996", fontWeight: "700" }}>
                            Instructor Image URL
                        </label>
                        <input
                            className="form-control"
                            type="url"
                            name="instructorImage"
                            placeholder="Enter instructor image URL"
                            value={formData.instructorImage}
                            onChange={handleChange}
                            required
                            style={{ backgroundColor: "black", color: "#006996", fontWeight: "700" }}
                        />
                    </div>

                    <div className="m-3 d-flex flex-column">
                        <input
                            className="form-control"
                            type="submit"
                            value="Submit"
                            style={{ backgroundColor: "#006996", color: "white" }}
                        />
                    </div>
                </form>
            </section>
        </>

    );
};

export default WorkshopForm;
