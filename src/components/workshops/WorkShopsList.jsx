import { useState, useEffect } from 'react'
import eve from '../../assets/2109998.jpg'
import { FiSearch } from "react-icons/fi";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'



const WorkShopsList = () => {
    const Navigate = useNavigate()
    const [token, setToken] = useState("")
    const [workshops, setWorkshops] = useState([])
    const [tab, setTab] = useState("ALL")
    const [searchQuery, setSearchQuery] = useState('');
    const [id, setId] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const info = JSON.parse(localStorage.getItem("data"));
        setToken(info.token)
    }, [])

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3001/admin/workshops/all-workshops", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": ` Bearer ${token}`,
                }
            })
            console.log(response.data)
            setWorkshops(response.data)
            setLoading(false)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [token])

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredWorkshops = workshops.filter(event =>
        (tab === "ALL" || event.eveDepartment === tab) &&
        (searchQuery === '' ||
            Object.values(event).some(value =>
                typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
            )
        )
    );

    if (loading) {
        return (
            <div className="text-center">Loading ....</div>
        )
    }

    return (
        <>

            <section className="w-100 d-flex flex-column">
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
                    <div className=" d-flex align-items-center mt-3  mx-auto shadow d-flex align-items-center flex-wrap w-100" style={{ width: "100%", backgroundColor: "", minWidth: "300px", overFlow: "scroll" }} >
                        <div className={`px-4 mt-3 ${tab === "ALL" ? "tab-active" : ""}`} onClick={() => setTab("ALL")} style={{ cursor: "pointer" }}>ALL</div>
                        <div className={`px-4 mt-3 ${tab === "CSE" ? "tab-active" : ""}`} onClick={() => setTab("CSE")} style={{ cursor: "pointer" }}>CSE</div>
                        <div className={`px-4 mt-3 ${tab === "ECE" ? "tab-active" : ""}`} onClick={() => setTab("ECE")} style={{ cursor: "pointer" }}>ECE</div>
                        <div className={`px-4 mt-3 ${tab === "EEE" ? "tab-active" : ""}`} onClick={() => setTab("EEE")} style={{ cursor: "pointer" }}>EEE</div>
                        <div className={`px-4 mt-3 ${tab === "MECH" ? "tab-active" : ""}`} onClick={() => setTab("MECH")} style={{ cursor: "pointer" }}>MECH</div>
                        <div className={`px-4 mt-3 ${tab === "CHEM" ? "tab-active" : ""}`} onClick={() => setTab("CHEM")} style={{ cursor: "pointer" }}>CHEM</div>
                        <div className={`px-4 mt-3 ${tab === "CIVIL" ? "tab-active" : ""}`} onClick={() => setTab("CIVIL")} style={{ cursor: "pointer" }}>CIVIL</div>
                        <div className={`px-4 mt-3 ${tab === "MME" ? "tab-active" : ""}`} onClick={() => setTab("MME")} style={{ cursor: "pointer" }}>MME</div>
                    </div>
                </div>
                <div className="d-flex justify-content-around align-items-center w-100 flex-wrap">
                    {
                        workshops.map((data, index) => (
                            <div className=" row mt-3 " style={{ width: "97%", maxWidth: "600px", backgroundColor: "black" }}>
                                <div className="col-12 col-sm-4 my-2 d-flex justify-content-center align-items-center " style={{ minHeight: "200px" }}>
                                    <img src={eve} alt="" className=" my-2  " style={{ width: "100%", borderRadius: "4px", height: "100%" }} />
                                </div>
                                <div className="col-12 col-sm-7 py-3 d-flex flex-column pe-2">
                                    <div className="d-flex w-100 justify-content-between align-items-center">
                                        <div className=""></div>
                                        <div className="badge bg-dark">CSE</div>
                                    </div>
                                    <div className="text-center w-100 h3">Title</div>
                                    <div className="w-100 text-center">Updated workshop structure</div>
                                    <div className="w-100 text-center" style={{ color: "grey" }}>Updated workshop structure Updated workshop structure</div>
                                    <div className="w-100">
                                        <div className="" style={{ color: "grey" }}>By -/</div>
                                    </div>
                                    <div className="w-100 d-flex justify-content-between align-items-center">
                                        <img src={eve} style={{ height: "50px", width: "50px" }} alt="" />
                                        <div className="d-flex flex-column">
                                            <div className="" style={{ fontSize: "15px" }}>Mrs.Doctor Sribabu</div>
                                            <div className="" style={{ color: "grey", fontSize: "10px" }}>Phd ., MME ,software Engeneer</div>
                                        </div>
                                    </div>
                                    <div className="w-100 d-flex align-items-center mt-2 flex-row-reverse">
                                        <div className="badge bg-dark btn" onClick={() => {
                                            setId(data._id)
                                            console.log(id)
                                            if (id != "") {
                                                Navigate(`/workshops/${id}`)
                                            }
                                        }}>Know More...</div>
                                    </div>
                                </div>

                            </div>
                        ))
                    }
                </div>
            </section>
        </>
    )
}
export default WorkShopsList