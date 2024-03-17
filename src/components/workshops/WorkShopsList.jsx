import { useState, useEffect, useContext } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { context } from "../../App";

const WorkShopsList = () => {
  const Navigate = useNavigate();
  const {token} = useContext(context)
  const [workshops, setWorkshops] = useState([]);
  const [tab, setTab] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API}/workshops/all-workshops`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: ` Bearer ${token}`,
          },
        }
      );
      setWorkshops(response.data);
    } catch (err) {
      toast.error("Internal Error",{theme:"colored"})
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  if (loading) {
    return <div className="text-center">Loading ....</div>;
  }

  return (
    <>
      <section className="w-100 d-flex flex-column">
        <div className="w-100 d-flex pb-3 border-bottom flex-column mx-auto">
          <div className="mx-2 d-flex bottom align-items-center">
            <FiSearch style={{ marginRight: "-20px", zIndex: "1" }} />
            <input
              type="text"
              placeholder="search......."
              className="py-1 ps-4 text-white"
              style={{
                borderRadius: "5px",
                border: "0.3px solid grey",
                backgroundColor: "black",
              }}
              value={searchQuery}
              onChange={handleSearch}
            />
            <input
                onClick={()=>{Navigate("/workshops/add-workshop")}}
                className="form-control"
                type="submit"
                value={`${ "Add Workshop"}`}
                style={{ backgroundColor: "green",width:"150px",marginLeft:"40px", color: "white" }}
              />
          </div>
        </div>
        {workshops.length == 0 ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "60vh" }}
          >
            ...Opps events are not uploaded yet
          </div>
        ) : (
          <div className="d-flex justify-content-around align-items-center w-100 flex-wrap">
            {workshops.map((data, index) => (
              <div
                className=" row mt-3 "
                style={{
                  width: "97%",
                  maxWidth: "600px",
                  backgroundColor: "black",
                }}
              >
                <div
                  className="col-12 col-sm-4 my-2 d-flex justify-content-center align-items-center "
                  style={{ minHeight: "200px" }}
                >
                  <img
                    src={data.workshopImg}
                    alt=""
                    className=" my-2  "
                    style={{
                      width: "100%",
                      borderRadius: "4px",
                      height: "100%",
                    }}
                  />
                </div>
                <div className="col-12 col-sm-7 py-3 d-flex flex-column pe-2">
                  <div className="d-flex w-100 justify-content-between align-items-center">
                    <div className=""></div>
                    <div className="badge bg-dark">{data.dep}</div>
                  </div>
                  <div className="text-center w-100 h3">{data.name}</div>
                  <div className="w-100 text-center">{data.structure}</div>
                  <div className="w-100">
                    <div className="" style={{ color: "grey" }}>
                      By -/
                    </div>
                  </div>
                  <div className="w-100 d-flex justify-content-between align-items-center">
                    <img
                      src={data.instructorImage}
                      style={{ height: "50px", width: "50px" }}
                      alt=""
                    />
                    <div className="d-flex flex-column">
                      <div className="" style={{ fontSize: "15px" }}>
                        {data.instructorName}
                      </div>
                      <div
                        className=""
                        style={{ color: "grey", fontSize: "10px" }}
                      >
                        {data.instructorSpecifications}
                      </div>
                    </div>
                  </div>
                  <div className="w-100 d-flex align-items-center mt-2 flex-row-reverse">
                    <div
                      className="badge bg-dark btn"
                      onClick={() => {
                        setId(data._id);
                        if (id != "") {
                          Navigate(`/workshops/${id}`);
                        }
                      }}
                    >
                      Know More...
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};
export default WorkShopsList;
