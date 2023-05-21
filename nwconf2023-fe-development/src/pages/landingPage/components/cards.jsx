import React from 'react'
import Cloudcomputing from "../../../images/cloudcomputing.png"
import BlockChain from "../../../images/blockchain.jpg"
import BigData from "../../../images/bigdata.jpg"
import Cryptography from "../../../images/cyrptography.jpg"
import SoftwareEngineering from "../../../images/software.jpg"
import MachineLearning from "../../../images/machinelearning.png"
import DataAnalytics from "../../../images/analytics.jpg"
import CyberSecurity from "../../../images/cyber.jpg"
import Derik from "../../../images/pf1.jpg"
import Jamal from "../../../images/pf2.jpg"
import Tessie from "../../../images/pf3.jpg"
import Jay from "../../../images/pf4.jpg"
import Amanda from "../../../images/pf5.jpg"
import Brooke from "../../../images/pf6.jpg"
import Elon from "../../../images/pf7.jpg"
import BillGates from "../../../images/speaker.jpg"
import Fb from "../../../images/fb.png"
import Linkdin from "../../../images/linkdin.png"
import Msg from "../../../images/msg.png"
const cards = () => {

    const data = [
        {
            id: 1,
            title: "Cloud computing",
            content: "Explore More",
            image: Cloudcomputing,
            link: "https://en.wikipedia.org/wiki/Cloud_computing"
        },
        {
            id: 2,
            title: "Block Chain",
            content: "Explore More",
            image: BlockChain,
            link: "https://en.wikipedia.org/wiki/Blockchain"
        },
        {
            id: 3,
            title: "Big Data",
            content: "Explore More",
            image: BigData,
            link: "https://en.wikipedia.org/wiki/Bigdata"
        },
        {
            id: 4,
            title: "Cryptography",
            content: "Explore More",
            image: Cryptography,
            link: "https://en.wikipedia.org/wiki/Cryptography"
        },
        {
            id: 5,
            title: "Software Engineering",
            content: "Explore More",
            image: SoftwareEngineering,
            link: "https://en.wikipedia.org/wiki/Softwareengineering"
        },
        {
            id: 6,
            title: "Machine Learning",
            content: "Explore More",
            image: MachineLearning,
            link: "https://en.wikipedia.org/wiki/Machinelearning"
        },
        {
            id: 7,
            title: "Data Analytics",
            content: "Explore More",
            image: DataAnalytics,
            link: "https://en.wikipedia.org/wiki/Dataanalytics"
        },
        {
            id: 8,
            title: "Cyber Security",
            content: "Explore More",
            image: CyberSecurity,
            link: "https://en.wikipedia.org/wiki/Cyber-security_regulation"
        },
    ]
    const Users = [
        {
            name: "Derik",
            role: "CEO, XYZ",
            image: Derik
        },
        {
            name: "Jamal Hussain",
            role: "Managing Director, ABC",
            image: Jamal
        },
        {
            name: "Tessie",
            role: "Blockchain professor, JHG",
            image: Tessie
        },
        {
            name: "Jay shetty",
            role: "Cloud specialist, AWS",
            image: Jay
        },
        {
            name: "Amanda",
            role: "Phd, Some university",
            image: Amanda
        },
        {
            name: "Bill Gates",
            role: "ML professor, FJH",
            image: Brooke
        },
        {
            name: "Brooke",
            role: "CEO, DEF",
            image: Elon
        },

        {
            name: "Elon musk",
            role: "ML professor, FJH",
            image: BillGates
        },

    ]
    return (
        <div>
            <div className='first-card-container'>

            <div className="first-card">
                    <h1>Important Dates</h1>
                    <p>Paper Submission Deadline:<span style={{ color: "red" }}> August 20, 2023</span></p>
                    <p>Authors Notification: <span style={{ color: "red" }}>Septembert 5, 2023</span></p>
                    <p>Accept/Reject Paper: <span style={{ color: "red" }}>September 24, 2023</span></p>
                    <p>Conference on <span style={{ color: "red" }}>October 12 , 2023</span></p>
                    {/* <div className='my-btn'>
                        <button className='card-btn'>KNOW MORE</button>
                    </div> */}
                </div>
                <div className="first-card child">
                    <div>
                        <h1>About the Conference</h1>
                        <p>NWMSU conference (Conference2023) will provide an excellent international forum for sharing knowledge and results in theory, methodology and applications of Natural Language Computing and its advances.
                            Authors are solicited to contribute to the conference by submitting articles that illustrate research results, projects, surveying works and industrial experiences that describe significant advances in Conference2023.</p>
                        <span>Conference on October 12, 2023</span>
                    </div>
                    {/* <div className='my-btn'>
                        <button className='card-btn'>KNOW MORE</button>
                    </div> */}
                </div>
                <div className="first-card">
                    <h1>Paper Submission</h1>
                    <p>Authors are invited to submit papers through the conference Paper Submission by August 20, 2023. Submissions must be original and should not have been published previously or be under consideration for publication while being evaluated for this conference. The proceedings of the conference will be published by Conference Proceedings in NWMSU(conference2023) .
                        Selected papers from Conference2023, after further revisions, will be published in the special issue of the following journals.</p>
                    <li>International Journal on Natural Language Computing (IJNLC)</li>
                    <li>International Journal of Web & Semantic Technology (IJWesT)</li>
                    <li>Machine Learning and Applications: An International Journal (MLAIJ)</li>
                    <li>Information Technology in Industry (ITII)</li>
                    <li>International Journal on Information Theory (IJIT)</li>
                    {/* <div className='my-btn'>
                        <button className='card-btn'>KNOW MORE</button>
                    </div> */}
                </div>
                <div className="first-card child">
                    <div>
                        <h1>Conference Proceedings</h1>
                        <p>Hard copy of the proceedings will be distributed during the Conference. The softcopy will be available on Library.</p>
                        <span>Conference on October 12, 2023</span>
                    </div>
                    {/* <div className='my-btn'>
                        <button className='card-btn'>KNOW MORE</button>
                    </div> */}
                </div>


            </div>

            <div className="second-card-set">
                <div className="heading">
                    <h1>TOPICS</h1>
                </div>
                <div className="second-card-container">
                    {data.map(product => (
                        <>
                            <div className="sec-card-image">
                                <img src={product.image} alt="" />
                                <div className="sec-img-con">
                                    <p className='sec-p'>{product.title}</p>
                                    <button className='sec-btn'> {product.content}</button>

                                </div>
                            </div>
                        </>
                    ))}

                </div>
                <div className="third-card-container">
                    <div className="heading">
                        <h1>COMMITTEE MEMBERS</h1>
                    </div>
                    <div className="third-con">
                    {Users.map(product => (
                        <>
                       
                        <div className="third-card-image">
                               <div className="third-dp-img">
                               <img src={product.image} alt="" />
                               </div>
                                <div className="third-img-con">
                                    <h4 className='third-p'>{product.name}</h4>
                                    <p className='third-btn'> {product.role}</p>

                                </div>
                                {/* <div className="social-icon">
                                    <img src={Fb} alt="" />
                                    <img src={Linkdin} alt="" />
                                    <img src={Msg} alt="" />
                                </div> */}
                            </div>
                       
                       




                        </>


                    ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default cards