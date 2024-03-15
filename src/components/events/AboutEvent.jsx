const AboutEvent = ({ data }) => {
    return (
        <>
            <section className="w-100 d-flex flex-column justify-content-start align-items-start">
                <div className="h1 text-white">{data.name}</div>
                <p className="" style={{ textIndent: "20px" }}>
                    {data.desc}
                </p>
                <div className="h5 text-white">registerdStudents</div>
                <p className="" style={{ textIndent: "20px" }}>
                    {data?.registerdStudents.length==0 ? "No one is registered yet!" : data.registerdStudents?.map((e)=>e)}
                </p>
                
            </section>
        </>
    )
}
export default AboutEvent