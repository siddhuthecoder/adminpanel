import React, { useState, useEffect } from "react";
import { MdOutlineGroups } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import CustomModal from "./modals/Modal";
import { GoOrganization } from "react-icons/go";
import { GoFileSubmodule } from "react-icons/go";
import { IoMdPersonAdd } from "react-icons/io";
import { FaCircleInfo } from "react-icons/fa6";
import CustomModal2 from "./modals/Modal2";
import '../App.css'
import { Link, useNavigate } from "react-router-dom"
import c from '../assets/b party.png'
import { RiExpandUpDownFill } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from 'axios'
import CreateClient from "./createClient";

const Users = () => {
    const Navigate = useNavigate()

    const navigate = useNavigate()
    const [filter, setFilter] = useState("all");
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [userInfo, setUserInfo] = useState({})
    const [clientsData, setClientsData] = useState([])
    const [clientID, setClientID] = useState("")
    const clients = [
        { title: "Name", minWidth: "200px" },
        { title: "Email", minWidth: "120px" },
        { title: "Company", minWidth: "120px" },
        { title: "Created Date", minWidth: "60px" },
        { title: "Phone", minWidth: "70px" },
        { title: "Client Type", minWidth: "120px" },
        { title: "Delete", minWidth: "40px" },

    ]
    const [currentPage, setCurrentPage] = useState(1);
    const [width, setWidth] = useState(window.innerWidth)
    const itemsPerPage = 10;
    const handleWidth = () => {
        setWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', handleWidth)

    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const info = JSON.parse(localStorage.getItem("data"));
                setUserInfo(info);

                const response = await axios.get("http://localhost:3001/admin/auth/fetchAllUsers", {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${info.token}`
                    }
                });

                console.log("Response:", response.data); // Log response data for debugging

                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }

                setClientsData(response.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [userInfo.token]); // Use userInfo.token instead of userToken

    const sortClientsByName = (clients) => {
        return clients.slice().sort((a, b) => {
            const nameA = (a.name || '').toLowerCase();
            const nameB = (b.name || '').toLowerCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
    };

    const sortedClients = sortClientsByName(clientsData);

    // Filter clients based on search query
    const filteredClients = sortedClients.filter(client =>
        client.name.toLowerCase().includes(searchQuery.toLowerCase())
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
                    <div className="">Loading Clients information...</div>
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
                        <button className="btn btn-primary mx-2  " onClick={openModal2} style={{ marginRight: "" }}><IoMdPersonAdd /><span className="px-1">{width > 600 ? "Create User" : "Add"}</span></button>
                        <CustomModal2 showModal2={showModal2} closeModal2={closeModal2}>
                            <CreateClient />
                        </CustomModal2>
                    </div>
                    <div className={`w-100 d-flex ${width > 700 ? "justify-content-between" : "justify-content-around"} align-items-center flex-wrap`}>
                        <div className="d-flex flex-column mx-auto" style={{ width: "100%", minWidth: "350px", overflowX: "scroll" }}>
                            <div className="w-100 d-flex align-items-center flex-column   justify-content-center" style={{ minWidth: "1000px" }}>
                                <div className="d-flex justify-content-around bg-dark text-white align-items-center  mb-2  py-1 shadow" style={{ width: "100%", minWidth: "950px", height: "50px" }}>
                                    <div className="">S.no</div>
                                    <div className="d-flex align-items-center" style={{ minWidth: "200px" }}>
                                        <span className="pe-4">User</span>
                                        <RiExpandUpDownFill />
                                    </div>
                                    <div className="d-flex align-items-center" style={{ minWidth: "140px" }}>
                                        <span className="pe-4">Email</span>
                                        <RiExpandUpDownFill />
                                    </div>
                                    <div className="d-flex align-items-center" style={{ minWidth: "170px" }}>
                                        <span className="pe-4">College ID</span>
                                        <RiExpandUpDownFill />
                                    </div>
                                </div>
                                {
                                    filteredClients.map((data, index) => (
                                        <div className="d-flex justify-content-around align-items-center hover-effect cursor-pointer  my-1  py-4 shadow" style={{ width: "100%", minWidth: "950px", height: "50px", cursor: "pointer", backgroundColor: "black" }} onClick={() => {
                                            setClientID(data._id)
                                            console.log(clientID)
                                            if (clientID != "") {
                                                navigate(`/clients/${clientID}`)
                                            }
                                        }}>
                                            <div className="">{index + 1}</div>
                                            <div className="d-flex align-items-center" style={{ minWidth: "200px" }}>
                                                {data.name}
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
