import { useState, useEffect } from 'react'
import axios from 'axios'
import eve from "../assets/2109998.jpg"
import { FiSearch } from "react-icons/fi";
import CustomModal from './modals/Modal'
import '../App.css'
const WorkShops = () => {
    const [tab, setTab] = useState("ALL")
    const [data, setData] = useState({})
    const [workshops, setWorkshops] = useState([])
    const [showModalArray, setShowModalArray] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        const info = JSON.parse(localStorage.getItem("data"))
        setData(info)
    }, [])

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3001/admin/workshops/all-workshops", {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${data.token}`,
                }
            })
            setWorkshops(response.data)
            console.log(workshops)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [data.token])


    useEffect(() => {
        setShowModalArray(new Array(workshops.length).fill(false));
    }, [workshops]);




    const openModal = (index) => {
        const updatedShowModalArray = [...showModalArray];
        updatedShowModalArray[index] = true;
        setShowModalArray(updatedShowModalArray);
    };

    const closeModal = (index) => {
        const updatedShowModalArray = [...showModalArray];
        updatedShowModalArray[index] = false;
        setShowModalArray(updatedShowModalArray);
    };
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredWorkShop = workshops.filter(event =>
        (tab === "ALL" || workshops.eveDepartment === tab) &&
        (searchQuery === '' ||
            Object.values(event).some(value =>
                typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
            )
        )
    );
    return (
        <>
            <section className="d-flex flex-column" style={{ width: "100%", height: "100%" }}>
                <div className="w-100 d-flex flex-column mx-auto">
                    <div className="mx-2 d-flex align-items-center">
                        <FiSearch style={{ marginRight: "-20px", zIndex: "1" }} />
                        <input
                            type="text"
                            placeholder="search......."
                            className="py-1 ps-4 text-white"
                            style={{ borderRadius: "5px", border: "0.3px solid grey", backgroundColor: "black" }}
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </div>
                    <div className="d-flex align-items-center  mx-auto shadow d-flex align-items-center " style={{ backgroundColor: "", overFlowX: "scroll" }} >
                        <div className={`px-4 ${tab === "ALL" ? "tab-active" : ""}`} onClick={() => setTab("ALL")} style={{ cursor: "pointer" }}>ALL</div>
                        <div className={`px-4 ${tab === "CSE" ? "tab-active" : ""}`} onClick={() => setTab("CSE")} style={{ cursor: "pointer" }}>CSE</div>
                        <div className={`px-4 ${tab === "ECE" ? "tab-active" : ""}`} onClick={() => setTab("ECE")} style={{ cursor: "pointer" }}>ECE</div>
                        <div className={`px-4 ${tab === "EEE" ? "tab-active" : ""}`} onClick={() => setTab("EEE")} style={{ cursor: "pointer" }}>EEE</div>
                        <div className={`px-4 ${tab === "MECH" ? "tab-active" : ""}`} onClick={() => setTab("MECH")} style={{ cursor: "pointer" }}>MECH</div>
                        <div className={`px-4 ${tab === "CHEM" ? "tab-active" : ""}`} onClick={() => setTab("CHEM")} style={{ cursor: "pointer" }}>CHEM</div>
                        <div className={`px-4 ${tab === "CIVIL" ? "tab-active" : ""}`} onClick={() => setTab("CIVIL")} style={{ cursor: "pointer" }}>CIVIL</div>
                        <div className={`px-4 ${tab === "MME" ? "tab-active" : ""}`} onClick={() => setTab("MME")} style={{ cursor: "pointer" }}>MME</div>
                    </div>
                </div>
                <div className="w-100 col-12 d-flex justify-content-around align-items-center flex-wrap">

                    {
                        filteredEvents.length == 0 ? (
                            <>
                                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
                                    ...Opps events are not uploaded yet
                                </div>
                            </>
                        ) :
                            (
                                filteredEvents.map((data, index) => (
                                    <>

                                        <div className="d-flex flex-column my-3 card " style={{ width: "97%", maxWidth: "300px", position: "relative", height: "auto", backgroundColor: "black", overflow: "hidden" }}>
                                            <div className="w-100 d-flex align-items-center justify-content-center" style={{ position: "absolute", opacity: "0.3", bottom: "-40px", right: "-60px", pointerEvents: "none" }}>
                                                <div className="text-dark" style={{ fontSize: "150px", color: "ligh", zIndex: "3" }}>0{index + 1}</div>
                                            </div>
                                            <img src={eve} alt="" className=" mx-auto mt-2" style={{ width: "95%", borderRadius: "4px" }} />
                                            <div className="row mx-auto" style={{ width: "95%" }}>
                                                <div className="col-12 h3 text-center text pt-3" style={{ color: '#006996', fontWeight: "700" }}>{data.eveName}</div>
                                            </div>
                                            <div className="row mx-auto" style={{ width: "95%" }}>
                                                <div className="col-6  " style={{ color: "#1f94c6" }}>
                                                    <span className="pe-3">Team Size : </span>
                                                </div>
                                                <div className="col-3">
                                                    <span className="badge bg-dark">{data.TeamSize}</span>
                                                </div>
                                            </div>
                                            <div className="row mx-auto" style={{ width: "95%" }}>
                                                <div className="col-6  " style={{ color: "#1f94c6" }}>
                                                    <span className="pe-3">Event ID : </span>
                                                </div>
                                                <div className="col-6">
                                                    <span className="badge bg-dark">{data.eveID}</span>
                                                </div>
                                            </div>
                                            <div className="row mx-auto" style={{ width: "95%" }}>
                                                <div className="col-6  " style={{ color: "#1f94c6" }}>
                                                    <span className="pe-3">Department : </span>
                                                </div>
                                                <div className="col-6">
                                                    <span className="badge bg-dark">{data.eveDepartment}</span>
                                                </div>
                                            </div>
                                            <div className="row mx-auto " style={{ width: "95%" }}>
                                                <div className="col-12 mx-auto">
                                                    <button className="btn btn-dark w-100 mx-auto my-3" onClick={() => openModal(index)}>Know more..</button>
                                                </div>
                                            </div>

                                        </div>
                                        <CustomModal showModal={showModalArray[index]} closeModal={() => closeModal(index)}>
                                            <div className="w-100 row">
                                                <div className="col-12">
                                                    <img src={eve} alt="" className="mx-auto ms-2" style={{ width: "100%", height: "300px" }} />
                                                </div>
                                                <p className="text-white my-3" style={{ textIndent: "15px" }}>{data.about}</p>
                                            </div>
                                        </CustomModal>

                                    </>
                                ))
                            )
                    }

                </div >

            </section>
        </>
    )
}

export default WorkShops 
