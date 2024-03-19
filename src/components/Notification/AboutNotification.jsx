const AboutNotification = ({ data }) => {
    return (
        <>
            <section className="w-100 d-flex flex-column justify-content-start align-items-start">
                <div className="h1 text-white">{data.heading}</div>
                <p className="" style={{ textIndent: "20px" }}>
                    <div dangerouslySetInnerHTML={{ __html: data.info }} />
                </p> 
            </section>
        </>
    )
}
export default AboutNotification