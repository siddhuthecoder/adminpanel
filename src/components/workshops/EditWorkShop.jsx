import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import '../../App.css'
import { useToaster } from 'react-hot-toast';

const Edit = () => {
    const [token, setToken] = useState("")
    const toaster = useToaster();

    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    const [edit, setEdit] = useState({
        workshopName: "",
        workshopDept: "",
        workshopImg: "",
        structure: "",
        instructorName: "",
        instructorSpecifications: "",
        instructorImage: "",
        description: "",
        contact: "",
        isRegistrationsOpened: false,
        __v: 0
    });


    useEffect(() => {
        const info = JSON.parse(localStorage.getItem("data"))
        setToken(info.token)
        console.log(token)
    }, [])

    const fetchData = async () => {

        try {
            const responseData = await axios.get(`http://localhost:3001/admin/workshops/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": ` Bearer ${token}`,
                }
            })
            setEdit(responseData.data)
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
            const response2 = await axios.put(`http://localhost:3001/admin/workshops/edit-workshop/${id}`, edit, {
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

        </>
    )
}
export default Edit