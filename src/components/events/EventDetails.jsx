import { useState, useEffect, useContext } from 'react'
import AboutEvent from './AboutEvent'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Edit from './EditEvent'

import { MdKeyboardBackspace } from "react-icons/md";
import { GrNext } from "react-icons/gr";
import DeleteEvent from './DeleteEvent'
import { toast } from 'react-toastify'
import { context } from '../../App'




const EventDetails = () => {

    const [tab, setTab] = useState("About")
    const {token} = useContext(context);
    const [eveInfo, setEveInfo] = useState({})
    const [loading, setLoading] = useState(true)
    const { id } = useParams()

    const fetchData = async () => {

        try {
            const responseData = await axios.get(`${import.meta.env.VITE_API}/events/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": ` Bearer ${token}`,
                }
            })
            setEveInfo(responseData.data)
            setLoading(false)

        }
        catch (err) {
            toast.error("Internal Error",{theme:"colored"})
        }
    }

    useEffect(() => {
        fetchData()
    }, [token])

    const goback = () => {
        window.history.back()
    }

    if (loading) {
        return (
            <>
                <div className="text-center">Loading....</div>
            </>
        )
    }

    return (
        <>

            <section className="w-100 d-flex flex-column  border" style=
                {{
                    height: "100vh",
                    overflow: "scroll",
                    backgroundColor: "rgb(18,18,18)"
                }}>
                <div className="w-100 d-flex align-items-center fixed-top justify-content-between shadow" style={{ height: "50px", backgroundColor: "#333333" }}>
                    <div className="mx-3">
                        <Link to="#" onClick={goback}>
                            <MdKeyboardBackspace style={{ fontSize: "30px", color: "#ffffff" }} />
                        </Link>
                    </div>
                    <div className="h2 text-white px-2" >TECKZITE</div>
                </div>
                <div className="w-100 mt-5  d-flex align-items-center">
                    <div className="h3 ms-3 text-white ">Events</div>
                    <GrNext className=" h4 text-primary" />
                    <div className="h3 me-1 text-white">{eveInfo.name}</div>
                </div>
                <div className="w-100 row mx-auto">
                    <div className="col-11 col-md-6 col-lg-4 mx-auto py-4 my-3 d-flex flex-column" style={{
                        backgroundColor: "black",
                        maxHeight: "300px"
                    }}>
                        <img src={eveInfo.img} alt="" className=" mx-auto mt-2" style={{ width: "95%", borderRadius: "4px", height: "100%" }} />
                        <div className="text-center py-3 h1 " style={{ color: "#006996" }} >{eveInfo.eveName}</div>
                    </div>
                    <div className="col-11 col-md-6 my-3 py-4 col-lg-7 mx-auto" style={{
                        backgroundColor: "black",
                    }}>
                        <div className="w-100 d-flex align-items-center text-white">
                            <div className={` px-3 ${tab == "About" ? "tab-active" : ""} `} onClick={() => setTab("About")}>About</div>
                            <div className={` px-3 ${tab == "Edit" ? "tab-active" : ""} `} onClick={() => setTab("Edit")}>Edit</div>
                            <div className={` px-3 ${tab == "Delete" ? "tab-active" : ""} `} onClick={() => setTab("Delete")}>Delete</div>
                        </div>
                        <hr style={{ color: "grey", fontWeight: "700", marginTop: "2px", }} />
                        <div className="section w-100 " style={{ height: "70vh", overflow: "scroll" }}>
                            {tab == "About" && <AboutEvent data={eveInfo} />}
                            {tab == "Edit" && <Edit data={eveInfo} />}
                            {tab == "Delete" && <DeleteEvent />}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default EventDetails