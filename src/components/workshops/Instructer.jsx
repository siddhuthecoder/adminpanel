import React from 'react'
import eve from '../../assets/2109998.jpg'
const Instructer = ({ data }) => {
    return (
        <>
            <section className="w-100 d-flex justify-content-center align-items-center">
                <div className="card" style={{ width: "97%", maxWidth: "300px", backgroundColor: "black" }}>
                    <img src={eve} alt="" className=" mx-auto mt-2" style={{ width: "95%", borderRadius: "4px", height: "100%" }} />
                    <div className="text-center h3 text-white py-3">{data.instructorName}</div>
                </div>
            </section>
        </>
    )
}
export default Instructer