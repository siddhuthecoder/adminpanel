import { MdEmojiEvents } from "react-icons/md";
import { FaChevronDown, FaUserCheck } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { context } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { token } = useContext(context);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [clientsData, setClientsData] = useState([]);
  const [pgnData, setPgnData] = useState([]);
  const [pgnCount, setPgnCount] = useState(0);
  const [clientID, setClientID] = useState("");
  const [tot, setTot] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const handleWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWidth);
  }, []);
  const sortClientsByName = (clients) => {
    return clients.sort((a, b) => {
      const textA = a.tzkid.toUpperCase();
      const textB = b.tzkid.toUpperCase();
      return textA.localeCompare(textB);
    });
  };

  const sortedClients = sortClientsByName(pgnData);

  const filteredClients = sortedClients.filter((client) =>
    search == "name"
      ? client.firstName.toLowerCase().includes(searchQuery.toLowerCase())
      : search == "tzkid"
      ? client.tzkid.toLowerCase().includes(searchQuery.toLowerCase())
      : search == "collegeId"
      ? client.collegeId.toLowerCase().includes(searchQuery.toLowerCase())
      : client.tzkid.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const [rgukt, setRgukt] = useState({
    rguktn: { count: -5 },
    rguktong: { count: 0 },
    rguktsklm: { count: 0 },
    rguktrkv: { count: 0 },
    others: { count: 0 },
  });
  const [year, setYear] = useState({
    p1: { count: 0 },
    p2: { count: 0 },
    e1: { count: 0 },
    e2: { count: 0 },
    e3: { count: 0 },
    e4: { count: 0 },
  });
  const [dep, setDep] = useState({
    puc: { count: 0 },
    cse: { count: -5 },
    ece: { count: 0 },
    eee: { count: 0 },
    mme: { count: 0 },
    mech: { count: 0 },
    civil: { count: 0 },
    chem: { count: 0 },
  });
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API}/user/getAll`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }

        const user = response.data.users;
        var _rgukt = rgukt;
        var _dep = dep;
        var _year = year
        user?.map((item) => {
          const mail = item?.email?.split("@")[1]?.split(".")[0];
          const branch = item?.branch;
          const batch = item?.year
          if (mail == "rguktn") {
            _rgukt.rguktn.count += 1;
          } else if (mail == "rguktong") {
            _rgukt.rguktong.count += 1;
          } else if (mail == "rguktsklm") {
            _rgukt.rguktsklm.count += 1;
          } else if (mail == "rguktrkv") {
            _rgukt.rguktrkv.count += 1;
          } else {
            _rgukt.others.count += 1;
          }
          if(batch == "PUC-1"){
            _year.p1.count+=1
          }else if(batch=="PUC-2"){
            _year.p2.count+=1
          }else if(batch=="E1"){
            _year.e1.count+=1
          }else if(batch=="E2"){
            _year.e2.count+=1
          }else if(batch=="E3"){
            _year.e3.count+=1
          }else if(batch=="E4"){
            _year.e4.count+=1
          }
          if (branch == "PUC") {
            _dep.puc.count += 1;
          } else if (branch == "CSE") {
            _dep.cse.count += 1;
          } else if (branch == "ECE") {
            _dep.ece.count += 1;
          } else if (branch == "EEE") {
            _dep.eee.count += 1;
          } else if (branch == "MME") {
            _dep.mme.count += 1;
          } else if (branch == "MECH") {
            _dep.mech.count += 1;
          } else if (branch == "CIVIL") {
            _dep.civil.count += 1;
          } else if (branch == "CECH") {
            _dep.chem.count += 1;
          }
        });
        setRgukt(_rgukt);
        setDep(_dep);
        setYear(_year)
        setTot(user.length);
        setClientsData(user);
        handlePgn(user, pgnCount);
        setLoading(false);
      } catch (err) {
        toast.error("Internal Error", { theme: "colored" });
        if (err?.message == "Unauthorized") {
          navigate("/");
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [token]); // Use userInfo.token instead of userToken
  const handlePgn = (data, num) => {
    var _user = [];
    var c = 1;
    for (var index = num; index < data.length; index++) {
      if (c < 11) {
        _user.push(data[index]);
        c++;
      }
    }
    setPgnData(_user);
  };
  useEffect(() => {}, []);

  const tabs = [
    { name: "Total Registrations", count: clientsData.length - 5 },
    { name: "RGUKT Nzd", count: rgukt.rguktn.count },
    { name: "RGUKT ONG", count: rgukt.rguktong.count },
    { name: "RGUKT RKV", count: rgukt.rguktrkv.count },
    { name: "RGUKT SKLM", count: rgukt.rguktsklm.count },
    { name: "PUC Registrations", count: dep.puc.count },
    { name: "CSE Registrations", count: dep.cse.count },
    { name: "ECE Registrations", count: dep.ece.count },
    { name: "EEE Registrations", count: dep.eee.count },
    { name: "CIVIL Registrations", count: dep.civil.count },
    { name: "MECH Registrations", count: dep.mech.count },
    { name: "CHEM Registrations", count: dep.chem.count },
    { name: "MME Registrations", count: dep.mme.count },
    { name: "PUC-1 Registrations", count: year.p1.count },
    { name: "PUC-2 Registrations", count: year.p2.count },
    { name: "E-1 Registrations", count: year.e1.count },
    { name: "E-2 Registrations", count: year.e2.count },
    { name: "E-3 Registrations", count: year.e3.count },
    { name: "E-4 Registrations", count: year.e4.count },
  ];
  return (
    <>
      {loading ? (
        <div className="text-center">Loading ....</div>
      ) : (
        <section className="w-100 d-flex flex-column ps-4">
          <div className="row w-100">
            <div
              className="col-12 mx-auto shadow d-flex align-items-center justify-content-between"
              style={{}}
            >
              <div
                className="mx-auto d-flex align-items-center justify-content-between"
                style={{
                  width: "98%",
                  backgroundColor: "black",
                  minHeight: "70px",
                  borderRadius: "7px",
                }}
              >
                <div className="text-white ps-4">Dashboard</div>
              </div>
            </div>
          </div>
          <div className="row w-100 mt-4 ">
            {tabs.map((item) => (
              <div
                className="col-12 col-md-4 col-lg-3 col-xl-3 mt-4 mx-auto"
                style={{}}
              >
                <div
                  className="mx-auto mt-4 d-flex align-items-center justify-content-around"
                  style={{
                    width: "95%",
                    borderRadius: "7px",
                    backgroundColor: "black",
                    minHeight: "100px",
                  }}
                >
                  <FaUserCheck style={{ fontSize: "40px" }} />
                  <div className="d-flex flex-column">
                    <div className="h1 text-center">{item.count} </div>
                    <div className="text-center">{item.name}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Table */}

          <div
            className="table-responsive align-items-center table-striped  mt-4"
            style={{ height: "auto", width: "3000px", overflow: "" }}
          >
            <div
              className="d-flex align-items-center justify-content-between mb-3 "
              style={{ position: "sticky", left: "0" }}
            >
              <div className="mx-2 d-flex align-items-center">
                <FiSearch style={{ marginRight: "-20px", zIndex: "1" }} />
                <input
                  type="text"
                  placeholder="search......."
                  className="py-1 ps-4"
                  style={{ borderRadius: "5px", border: "0.3px solid grey" }}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select
                value={search}
                style={{ maxWidth: "" }}
                name="search"
                onChange={(e) => setSearch(e.target.value)}
                className="form-select"
                aria-label="Default select example"
              >
                <option selected>Select Seaarch</option>
                <option value="tzkid">Teckzite ID</option>
                <option value="name">Name</option>
                <option value="collegeId">College ID</option>
              </select>
            </div>
            <div
              className={` d-flex text-center ${
                width > 700
                  ? "justify-content-between"
                  : "justify-content-around"
              } align-items-center flex-wrap`}
            >
              <div
                className="d-flex flex-column mx-auto"
                style={{
                  width: "100%",
                  minWidth: "350px",
                  overflowX: "scroll",
                }}
              >
                <div className="d-flex align-items-center flex-column   justify-content-center">
                  <div
                    className="d-flex text-center justify-content-around bg-dark text-white align-items-center  mb-2  py-1 shadow"
                    style={{ width: "100%", minWidth: "950px", height: "50px" }}
                  >
                    <div className="" style={{width:"150px"}}>S.no</div>
                    <div
                      className="d-flex text-center align-items-center"
                      style={{ minWidth: "300px" }}
                    >
                      Teckzite ID
                    </div>
                    <div
                      className="d-flex align-items-center"
                      style={{ minWidth: "300px" }}
                    >
                      <span className="pe-4">User</span>
                    </div>
                    <div
                      className="d-flex align-items-center"
                      style={{ minWidth: "300px" }}
                    >
                      <span className="pe-4">College ID</span>
                    </div>
                    <div
                      className="d-flex align-items-center"
                      style={{ minWidth: "300px" }}
                    >
                      Branch
                    </div>
                    <div
                      className="d-flex align-items-center"
                      style={{ minWidth: "175px" }}
                    >
                      Year
                    </div>
                    <div
                      className="d-flex align-items-center"
                      style={{ minWidth: "175px" }}
                    >
                      Amount Paid
                    </div>
                    <div
                      className="d-flex align-items-center"
                      style={{ minWidth: "350px" }}
                    >
                      Email
                    </div>
                    <div
                      className="d-flex align-items-center"
                      style={{ minWidth: "300px" }}
                    >
                      Contact
                    </div>
                    <div
                      className="d-flex align-items-center"
                      style={{ minWidth: "350px" }}
                    >
                      Address
                    </div>
                    <div
                      className="d-flex align-items-center"
                      style={{ minWidth: "300px" }}
                    >
                      Razorpay Order ID
                    </div>
                  </div>
                  {filteredClients.map((data, index) => (
                    <div
                      key={index}
                      className="d-flex justify-content-around align-items-center hover-effect cursor-pointer  my-1  py-4 shadow"
                      style={{
                        width: "100%",
                        minWidth: "950px",
                        height: "50px",
                        cursor: "pointer",
                        backgroundColor: "black",
                      }}
                      onClick={() => {
                        setClientID(data.tzkid);
                        if (clientID != "") {
                          navigate(`/clients/${clientID}`);
                        }
                      }}
                    >
                      <div
                        className="align-items-center"
                        style={{ minWidth: "150px" }}
                      >
                        {pgnCount + index + 1}
                      </div>
                      <div
                        className="d-flex   align-items-center"
                        style={{ minWidth: "300px" }}
                      >
                        <span className="pe-4">{data.tzkid}</span>
                      </div>
                      <div
                        className="d-flex align-items-center"
                        style={{ minWidth: "300px" }}
                      >
                        {data.firstName} {data.lastName}
                      </div>

                      <div
                        className="d-flex align-items-center"
                        style={{ minWidth: "300px" }}
                      >
                        {data.collegeId}
                      </div>
                      <div
                        className="d-flex align-items-center"
                        style={{ minWidth: "300px" }}
                      >
                        {data.branch}
                      </div>
                      <div
                        className="d-flex align-items-center"
                        style={{ minWidth: "175px" }}
                      >
                        {data.year}
                      </div>
                      <div
                      className="d-flex align-items-center"
                      style={{ minWidth: "175px" }}
                    >
                      {data.amountPaid}
                    </div>
                      <div
                        className="d-flex align-items-center"
                        style={{ minWidth: "350px" }}
                      >
                        {data.email}
                      </div>
                      <div
                        className="d-flex align-items-center"
                        style={{ minWidth: "300px" }}
                      >
                        {data.phno}
                      </div>
                      <div
                        className="d-flex align-items-center"
                        style={{ minWidth: "350px" }}
                      >
                        {data.city} {data.district} {data.state}
                      </div>
                      <div
                        className="d-flex align-items-center"
                        style={{ minWidth: "300px" }}
                      >
                        {data?.razorpay_order_id}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex flex-row-reverse p-2">
            {tot - pgnCount > 10 && (
              <button
                type="button"
                onClick={() => {
                  setPgnCount(pgnCount + 10);
                  handlePgn(clientsData, pgnCount + 10);
                }}
                className="btn btn-primary"
              >
                <IoIosArrowForward />
              </button>
            )}
            {pgnCount > 1 && (
              <button
                type="button"
                onClick={() => {
                  setPgnCount(pgnCount - 10);
                  handlePgn(clientsData, pgnCount - 10);
                }}
                className="btn mx-2 btn-primary"
              >
                <IoIosArrowBack />
              </button>
            )}
          </div>
        </section>
      )}
    </>
  );
};
export default Dashboard;
