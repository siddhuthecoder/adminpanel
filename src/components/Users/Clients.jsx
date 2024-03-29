import React, { useState, useEffect, useContext } from "react";
import { MdOutlineGroups } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { IoMdPersonAdd } from "react-icons/io";
import '../../App.css'
import { NavLink, useNavigate } from "react-router-dom"
import axios from 'axios'
import { toast } from "react-toastify";
import { context } from "../../App";

const Users = () => {
    const navigate = useNavigate()
    const [filter, setFilter] = useState("all");
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const {token} = useContext(context);
    const [clientsData, setClientsData] = useState([])
    const [clientID, setClientID] = useState("")
    const [width, setWidth] = useState(window.innerWidth)
    const handleWidth = () => {
        setWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', handleWidth)

    }, [])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                
                const response = await axios.get(`${import.meta.env.VITE_API}/user/getAll`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

               
                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }

                setClientsData(response.data.users);
                setLoading(false);
            } catch (err) {
                toast.error("Internal Error",{theme:"colored"})
                if(err?.message=="Unauthorized"){
                    navigate("/")
                  }
            }
            setLoading(false)
        };

        fetchData();
    }, [token]); // Use userInfo.token instead of userToken

    const sortClientsByName = (clients) => {
        return clients.sort((a,b)=>{
            const textA = a.firstName.toUpperCase()
            const textB = b.firstName.toUpperCase()
            return textA.localeCompare(textB)
        })
    };

    const sortedClients = sortClientsByName(clientsData);

    // Filter clients based on search query
    const filteredClients = sortedClients.filter(client =>
        client.firstName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false)

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    const openModal2 = () => {
        setShowModal2(true);
    };

    const closeModal2 = () => {
        setShowModal2(false);
    };

    if (loading) {
        return (
            <>
                <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                    <div className="">Loading Users information...</div>
                </div>
            </>
        );
    }
    return (
        <>
            <section
                className="dashboard ps-2 mx-auto w-100 d-flex flex-column"
                style={{
                    overflow: "scroll",
                    width: "99%",
                }}
            >
                <div className="w-100  d-flex align-items-center py-3" style={{ color: "#006996" }}>
                    <MdOutlineGroups style={{ fontSize: "25px" }} />
                    <div className="h4 px-2">Users</div>
                </div>
                <div className="table-responsive table-striped w-100  mt-4" style={{ height: "auto", overflow: "" }}>
                    <div className="d-flex align-items-center justify-content-between mb-3 " style={{ position: "sticky", left: "0" }}>
                        <div className="mx-2 d-flex align-items-center">
                            <FiSearch style={{ marginRight: "-20px", zIndex: "1" }} />
                            <input type="text" placeholder="search......." className="py-1 ps-4" style={{ borderRadius: "5px", border: "0.3px solid grey" }} onChange={e => setSearchQuery(e.target.value)} />
                        </div>
                        <NavLink to="/clients/add-user" className="btn btn-primary mx-2  " style={{ marginRight: "" }}><IoMdPersonAdd /><span className="px-1">{width > 600 ? "Create User" : "Add"}</span></NavLink>
                    </div>
                    <div className={`w-100 d-flex ${width > 700 ? "justify-content-between" : "justify-content-around"} align-items-center flex-wrap`}>
                        <div className="d-flex flex-column mx-auto" style={{ width: "100%", minWidth: "350px", overflowX: "scroll" }}>
                            <div className="w-100 d-flex align-items-center flex-column   justify-content-center" style={{ minWidth: "1000px" }}>
                                <div className="d-flex justify-content-around bg-dark text-white align-items-center  mb-2  py-1 shadow" style={{ width: "100%", minWidth: "950px", height: "50px" }}>
                                    <div className="">S.no</div>
                                    <div className="d-flex align-items-center" style={{ minWidth: "200px" }}>
                                        <span className="pe-4">User</span>
                                    </div>
                                    <div className="d-flex align-items-center" style={{ minWidth: "140px" }}>
                                        <span className="pe-4">Email</span>
                                        
                                    </div>
                                    <div className="d-flex align-items-center" style={{ minWidth: "170px" }}>
                                        <span className="pe-4">College ID</span>
                                        
                                    </div>
                                </div>
                                {
                                    filteredClients.map((data, index) => (
                                        <div key={index} className="d-flex justify-content-around align-items-center hover-effect cursor-pointer  my-1  py-4 shadow" style={{ width: "100%", minWidth: "950px", height: "50px", cursor: "pointer", backgroundColor: "black" }} onClick={() => {
                                            setClientID(data.tzkid)
                                            if (clientID != "") {
                                                navigate(`/clients/${clientID}`)
                                            }
                                        }}>
                                            <div className="">{index + 1}</div>
                                            <div className="d-flex align-items-center" style={{ minWidth: "200px" }}>
                                                {data.firstName} {data.lastName}
                                            </div>
                                            <div className="d-flex align-items-center" style={{ minWidth: "140px" }}>
                                                {data.email}
                                            </div>
                                            <div className="d-flex align-items-center" style={{ minWidth: "170px" }}>
                                                {data.collegeId}
                                            </div>
                                        </div>
                                    ))
                                }

                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default Users;
