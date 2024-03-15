import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import '../../App.css'
import { useToaster } from 'react-hot-toast';

const Edit = () => {
    const [token, setToken] = useState("")
    const toaster = useToaster();

    const [eveInfo, setEveInfo] = useState({})
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    const [edit, setEdit] = useState({
        eveName: eveInfo.eveName,
        eveDepartment: '',
        eveImg: '',
        about: '',
        structure: '',
        timeline: '',
        rules: '',
        TeamSize: 0,
        contact_info: '',
        isRegistrationsOpened: false
    });


    useEffect(() => {
        const info = JSON.parse(localStorage.getItem("data"))
        setToken(info.token)
        console.log(token)
    }, [])

    const fetchData = async () => {

        try {
            const responseData = await axios.get(`http://localhost:3001/admin/events/event/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": ` Bearer ${token}`,
                }
            })
            setEdit(responseData.data)
            setEveInfo(responseData.data)
            console.log(edit)
            setLoading(false)

        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [token])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEdit(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response2 = await axios.put(`http://localhost:3001/admin/events/edit-event/${id}`, edit, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ` Bearer ${token}`,
                },
            });
            toaster.success("successfully modified")
            console.log('Updated event data:', response2.data);
        } catch (error) {
            console.error('Error updating event data:', error);
        }
    };




    return (
        <>
            <form className="" onSubmit={handleSubmit} style={{
                width: "97%",
                maxWidth: "400px",
                height: "90vh",
                overflowY: "scroll",
                backgroundColor: "rgb(33, 37, 41)",
                margin: "auto"
            }}>


                <div className="m-3 d-flex flex-column" style={{ marginTop: "100px" }}>
                    <label htmlFor="eveDepartment" className="ps-2 form-label" style={{ color: "#006996", fontWeight: "700" }}>
                        Event Name
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        name="eveName"
                        placeholder="Enter department"
                        value={edit.eveName}
                        onChange={handleChange}
                        required
                        style={{ backgroundColor: "black", color: "white", fontWeight: "700" }}
                    />
                </div>

                <div className="m-3 d-flex flex-column">
                    <label htmlFor="eveDepartment" className="ps-2 form-label" style={{ color: "#006996", fontWeight: "700" }}>
                        Department
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        name="eveDepartment"
                        placeholder="Enter department"
                        value={edit.eveDepartment}
                        onChange={handleChange}
                        required
                        style={{ backgroundColor: "black", color: "white", fontWeight: "700" }}
                    />
                </div>

                <div className="m-3 d-flex flex-column">
                    <label htmlFor="eveImg" className="ps-2 form-label" style={{ color: "#006996", fontWeight: "700" }}>
                        Event Image URL
                    </label>
                    <input
                        className="form-control"
                        type="url"
                        name="eveImg"
                        placeholder="Enter event image URL"
                        value={edit.eveImg}
                        onChange={handleChange}
                        required
                        style={{ backgroundColor: "black", color: "white", fontWeight: "700" }}
                    />
                </div>

                <div className="m-3 d-flex flex-column">
                    <label htmlFor="about" className="ps-2 form-label" style={{ color: "#006996", fontWeight: "700" }}>
                        About
                    </label>
                    <textarea
                        name="about"
                        placeholder="Enter event description"
                        onChange={handleChange}
                        value={edit.about}
                        required
                        style={{ backgroundColor: "black", color: "white", resize: "none", fontWeight: "700" }}
                    />
                </div>

                <div className="m-3 d-flex flex-column">
                    <label htmlFor="structure" className="ps-2 form-label" style={{ color: "#006996", fontWeight: "700" }}>
                        Structure
                    </label>
                    <textarea
                        name="structure"
                        placeholder="Enter event structure"
                        onChange={handleChange}
                        value={edit.structure}
                        required
                        style={{ backgroundColor: "black", color: "white", resize: "none", fontWeight: "700" }}
                    />
                </div>

                <div className="m-3 d-flex flex-column">
                    <label htmlFor="timeline" className="ps-2 form-label" style={{ color: "#006996", fontWeight: "700" }}>
                        Timeline
                    </label>
                    <textarea
                        name="timeline"
                        placeholder="Enter event timeline"
                        onChange={handleChange}
                        value={edit.timeline}
                        required
                        style={{ backgroundColor: "black", color: "white", resize: "none", fontWeight: "700" }}
                    />
                </div>

                <div className="m-3 d-flex flex-column">
                    <label htmlFor="rules" className="ps-2 form-label" style={{ color: "#006996", fontWeight: "700" }}>
                        Rules
                    </label>
                    <textarea
                        name="rules"
                        placeholder="Enter event rules"
                        onChange={handleChange}
                        value={edit.rules}
                        required
                        style={{ backgroundColor: "black", color: "#FFFFFF", resize: "none" }}
                    />
                </div>

                <div className="m-3 d-flex flex-column">
                    <label htmlFor="TeamSize" className="ps-2 form-label" style={{ color: "#006996", fontWeight: "700" }}>
                        Team Size
                    </label>
                    <input
                        className="form-control"
                        type="number"
                        name="TeamSize"
                        placeholder="Enter team size"
                        onChange={handleChange}
                        value={edit.TeamSize}
                        required
                        style={{ backgroundColor: "black", color: "white", fontWeight: "700" }}
                    />
                </div>

                <div className="m-3 d-flex flex-column">
                    <label htmlFor="contact_info" className="ps-2 form-label" style={{ color: "#006996", fontWeight: "700" }}>
                        Contact Info
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        name="contact_info"
                        placeholder="Enter contact information"
                        onChange={handleChange}
                        required
                        style={{ backgroundColor: "black", color: "white", fontWeight: "700" }}
                    />
                </div>

                <div className="m-3 d-flex flex-column">
                    <label htmlFor="isRegistrationsOpened" className="ps-2 form-label" style={{ color: "#006996", fontWeight: "700" }}>
                        Is Registrations Opened?
                    </label>
                    <select
                        className="form-select"
                        name="isRegistrationsOpened"
                        onChange={handleChange}
                        required
                        style={{ backgroundColor: "black", color: "white", fontWeight: "700" }}
                    >
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
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
        </>
    )
}
export default Edit