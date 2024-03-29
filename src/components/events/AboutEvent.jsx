const AboutEvent = ({ data }) => {
    const regSt = data.registerdStudents?.map((item)=>item[0].tzkid)

    return (
        <>
            <section className="w-100 d-flex flex-column justify-content-start align-items-start">
                <div className="h1 text-white">{data.name}</div>
                <p className="" style={{ textIndent: "20px" }}>
                <div dangerouslySetInnerHTML={{ __html: data.desc }} />
                </p>
                
                <div className="h5 text-white">Event Timeline</div>
                <p className="" style={{ textIndent: "20px" }}>
                <div dangerouslySetInnerHTML={{ __html: data.timeline }} />
                </p>

                <div className="h5 text-white">Prize Money</div>
                <p className="" style={{ textIndent: "20px" }}>
                <div dangerouslySetInnerHTML={{ __html: data.prizeMoney }} />
                </p>
                <div className="h5 text-white">registerdStudents</div>
                <p className="" style={{ textIndent: "20px" }}>
                    {data?.registerdStudents.length==0 ? "No one is registered yet!" : regSt.join(", ")}
                </p>
            </section>
        </>
    )
}
export default AboutEvent