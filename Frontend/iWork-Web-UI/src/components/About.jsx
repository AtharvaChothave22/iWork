// import React from 'react';
// import Card from 'react-bootstrap/Card';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const contributors = [
//     {
//         name: 'Pratik Chavhan',
//         description: 'Meticulous planning with detailed execution on the back-end, diligently designing the database and giving highly remarkable insights on front-end development.',
//         email: 'pratik.chavhan.77@gmail.com',
//         image: `assests/Pratik.jpg`
//     },
//     {
//         name: 'Atharva Chothave',
//         description: 'Handled challenges and complexities of the UI with a clear understanding of the expected results while making the whole working process efficient with hands-on technological knowledge.',
//         email: 'atharvachothave3@gmail.com',
//         image: 'assets/Atharva.jpg',
//     },
//     {
//         name: 'Aniket Gaikwad',
//         description: 'Bringing the pieces together of the frontend and backend by excellent routing, mapping, and providing resourceful solutions at every step of the agile working methodology.',
//         email: 'aniketgaikwad0195@gmail.com',
//         image: 'assets/Aniket.jpg',
//     },
//     {
//         name: 'Kranti Ranpise',
//         description: 'Creativity infused code to meet the user-friendly frontend while making a valuable contribution at the backend and database with attention to details and rigorous testing.',
//         email: 'krantiranpise11@gmail.com',
//         image: 'assets/Kranti.jpg',
//     },
//     {
//         name: 'Harshvardhan Patil',
//         description: 'Converting innovative ideas into code at the backend while ensuring productive assistance at the frontend and leading the team to a successful deployment of the project.',
//         email: 'harshvardhanpatil070@gmail.com',
//         image: 'assets/Harsh.jpg',
//     }
//     // Add more contributors as needed
// ];

// const AboutPage = () => {
//     return (
//         <>
//             <div><h1 style={{ textAlign: 'center', fontSize: '50px', fontWeight: 'bold' }}>About Us</h1></div><br /><br /><br />
//             <div className="d-flex justify-content-center flex-wrap">
//                 {contributors.map((contributor, index) => (
//                     <Card key={index} className="m-3" style={{ maxWidth: '30rem' }}>
//                         <Card.Img variant="top" src={contributor.image} alt={contributor.name} />
//                         <Card.Body>
//                             <Card.Title><u>{contributor.name}</u></Card.Title>
//                             <Card.Text>{contributor.description}</Card.Text>
//                             <Card.Text>Email: {contributor.email} </Card.Text>
//                         </Card.Body>
//                     </Card>
//                 ))}
//             </div>
//             <br /><br /><br /><br /><br /><br /><br /><br />
//         </>
//     );
// };

// export default AboutPage;


import React from 'react';

const About = () => {
    return (
        <section className="py-3 py-md-5 py-xl-8">
            <div className="container">

                <div className="row gy-3 gy-md-4 gy-lg-0 align-items-lg-center">
                    <div className="col-12 col-lg-6 col-xl-5">
                        <img className="img-fluid rounded" loading="lazy" src="https://bootstrapbrain.com/demo/components/abouts/about-1/assets/img/about-img-1.jpg" alt="error" />
                    </div>
                    <div className="col-12 col-lg-6 col-xl-7">
                        <div className="row justify-content-xl-center">
                            <div className="col-12 col-xl-11">
                                <h2 className="h1 mb-3">Who Are We?</h2>
                                <p className="lead fs-4 text-secondary mb-3">We help talent meet diverse opportunities. Our perspective is to furnish outstanding captivating services that are monumentally rewarding for businesses and professionals.</p>
                                <p className="mb-5"></p>
                                <div className="row gy-4 gy-md-0 gx-xxl-5X">
                                    <div className="col-12 col-md-6">
                                        <div className="d-flex">
                                            <div className="me-4 text-primary">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-gear-fill" viewBox="0 0 16 16">
                                                    <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className="mb-3">Versatile Brand</h4>
                                                <p className="text-secondary mb-0">We are shaping a versatile digital approach that thrives seamlessly across all platforms, connecting freelancers and clients on our dynamic freelance website.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="d-flex">
                                            <div className="me-4 text-primary">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-fire" viewBox="0 0 16 16">
                                                    <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className="mb-3">Digital Agency</h4>
                                                <p className="text-secondary mb-0">We champion innovation by seamlessly blending core concepts with intricate ideas, fostering a dynamic environment on our freelance platform.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
