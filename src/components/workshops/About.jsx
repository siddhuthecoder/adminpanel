import React from "react";

const WorkshopAbout = ({ data }) => {
  return (
    <>
      <section className="w-100 d-flex flex-column pe-3">
        <div className="h3 py-2 text-white">{data.name}</div>
        <div className="" style={{ textIndent: "20px" }}>
          <div dangerouslySetInnerHTML={{ __html: data.about }} />
        </div>
        <div className="h5 py-2 text-white">structure</div>
        <div style={{ textIndent: "20px" }}>
          <div dangerouslySetInnerHTML={{ __html: data.structure }} />
        </div>
        <div className="h5 py-2 text-white">Entry Fee</div>
        <p className="" style={{ textIndent: "20px" }}>
          {data.entryFee}
        </p>
        <div
          className="table-responsive align-items-center table-striped  mt-4"
          style={{ height: "auto", width: "1000px", overflow: "" }}
        >
          <div
            className={` d-flex text-center ${"justify-content-between"} align-items-center flex-wrap`}
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
                  <div className="" style={{ width: "150px" }}>
                    S.no
                  </div>
                  <div
                    className="d-flex text-center align-items-center"
                    style={{ minWidth: "250px" }}
                  >
                    Name
                  </div>
                  <div
                    className="d-flex align-items-center"
                    style={{ minWidth: "250px" }}
                  >
                    <span className="pe-4">Email ID</span>
                  </div>
                  <div
                    className="d-flex align-items-center"
                    style={{ minWidth: "200px" }}
                  >
                    <span className="pe-4">College</span>
                  </div>
                  <div
                    className="d-flex align-items-center"
                    style={{ minWidth: "150px" }}
                  >
                    College ID
                  </div>
                </div>
                {data?.regStudents?.map((item, index) => (
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
                  >
                    <div
                      className="align-items-center"
                      style={{ minWidth: "150px" }}
                    >
                      {index + 1}
                    </div>
                    <div
                      className="d-flex   align-items-center"
                      style={{ minWidth: "250px" }}
                    >
                      <span className="pe-4">{item.name}</span>
                    </div>
                    <div
                      className="d-flex align-items-center"
                      style={{ minWidth: "250px" }}
                    >
                      {item.email}
                    </div>

                    <div
                      className="d-flex align-items-center"
                      style={{ minWidth: "200px" }}
                    >
                      {item.college}
                    </div>
                    <div
                      className="d-flex align-items-center"
                      style={{ minWidth: "300px" }}
                    >
                      {item.idNumber}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default WorkshopAbout;
