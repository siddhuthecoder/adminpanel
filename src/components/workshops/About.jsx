import React from 'react'

const WorkshopAbout = ({ data }) => {
    return (
        <>
            <section className="w-100 d-flex flex-column pe-3">
                <div className="h3 py-2 text-white">{data.workshopName}</div>
                <p className="" style={{ textIndent: "20px" }}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum nulla ullam consequuntur fuga dolorem quaerat iure nesciunt quia aliquid adipisci, est odio laboriosam. Inventore modi autem molestiae at. Quam, laborum!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum nulla ullam consequuntur fuga dolorem quaerat iure nesciunt quia aliquid adipisci, est odio laboriosam. Inventore modi autem molestiae at. Quam, laborum!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum nulla ullam consequuntur fuga dolorem quaerat iure nesciunt quia aliquid adipisci, est odio laboriosam. Inventore modi autem molestiae at. Quam, laborum!
                </p>
            </section>
        </>
    )
}
export default WorkshopAbout