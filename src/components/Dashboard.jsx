import { MdEmojiEvents } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";


const Dashboard = () => {
  return (
    <>
      <section className="w-100 d-flex flex-column ps-4">
        <div className="row w-100">
          <div className="col-12 mx-auto shadow d-flex align-items-center jjustify-content-between" style={{}} >
            <div className="mx-auto d-flex align-items-center justify-content-between" style={{ width: "98%", backgroundColor: "black", minHeight: "70px", borderRadius: "7px" }}>
              <div className="text-white ps-4">Dashboard</div>
              <FaChevronDown className="mx-3" style={{ fontSize: "30px" }} />
            </div>
          </div>
        </div>
        <div className="row w-100 mt-4 ">
          <div className="col-6 col-md-3  mt-4 mx-auto" style={{}}>
            <div className="mx-auto d-flex align-items-center justify-content-around" style={{ width: "95%", borderRadius: "7px", backgroundColor: "black", minHeight: "100px", }}>
              <MdEmojiEvents style={{ fontSize: "40px" }} />
              <div className="d-flex flex-column">
                <div className="h1 text-center">100 <span className="text-danger">+</span></div>
                <div className="text-center">Projects</div>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3  mt-4 mx-auto" style={{}}>
            <div className="mx-auto d-flex align-items-center justify-content-around" style={{ width: "95%", borderRadius: "7px", backgroundColor: "black", minHeight: "100px", }}>
              <MdEmojiEvents style={{ fontSize: "40px" }} />
              <div className="d-flex flex-column">
                <div className="h1 text-center">100 <span className="text-danger">+</span></div>
                <div className="text-center">Projects</div>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3  mt-4 mx-auto" style={{}}>
            <div className="mx-auto d-flex align-items-center justify-content-around" style={{ width: "95%", borderRadius: "7px", backgroundColor: "black", minHeight: "100px", }}>
              <MdEmojiEvents style={{ fontSize: "40px" }} />
              <div className="d-flex flex-column">
                <div className="h1 text-center">100 <span className="text-danger">+</span></div>
                <div className="text-center">Projects</div>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3  mt-4 mx-auto" style={{}}>
            <div className="mx-auto d-flex align-items-center justify-content-around" style={{ width: "95%", borderRadius: "7px", backgroundColor: "black", minHeight: "100px", }}>
              <MdEmojiEvents style={{ fontSize: "40px" }} />
              <div className="d-flex flex-column">
                <div className="h1 text-center">100 <span className="text-danger">+</span></div>
                <div className="text-center">Projects</div>
              </div>
            </div>
          </div>
        </div>
        <div className="row w-100 mt-4">
          <div className="col-12 col-md-6 col-lg-8 py-4 " style={{ backgroundColor: "", minHeight: "400px" }}>
            <div className="mx-auto w-100" style={{ backgroundColor: "black", width: "97%", height: "100%" }}></div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 py-4 " style={{ backgroundColor: "", minHeight: "400px" }}>
            <div className="mx-auto w-100" style={{ backgroundColor: "black", width: "97%", height: "100%" }}></div>
          </div>
        </div>
      </section>
    </>
  )
}
export default Dashboard