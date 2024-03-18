const AboutNotification = ({ data }) => {
    return (
        <>
            <section className="w-100 d-flex flex-column justify-content-start align-items-start">
                <div className="h1 text-white">{data.heading}</div>
                <p className="" style={{ textIndent: "20px" }}>
                    {data.info}
                    <br/>
                    <br/>
                    {data?.link}
                </p> 
            </section>
        </>
    )
}
export default AboutNotification