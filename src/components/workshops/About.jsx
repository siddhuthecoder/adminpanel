import React from 'react'

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
            </section>
        </>
    )
}
export default WorkshopAbout