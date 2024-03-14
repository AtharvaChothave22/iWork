import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div>
            <img
                style={{ width: '98%', height: '900px' }}
                src="https://ainal.me/wp-content/uploads/2020/10/Hire-Freelancer.jpg"
                alt="error"
            />

            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', fontSize: '20px', fontWeight: 400, color: 'black', textShadow: '1px 1px white' }}>
                <p style={{ fontSize: '60px', fontWeight: 'bold', color: 'black', textShadow: '1px 1px white' }}>Welcome to Our Platform</p>
                <p>Discover amazing opportunities. Sign up now!</p>
                <Link to='/signup'><button style={{ padding: '10px 25px', fontSize: '20px', backgroundColor: 'rgb(255 122 61)', color: 'white', border: 'ActiveBorder', borderRadius: '40px', cursor: 'pointer' }}>
                    Sign Up
                </button>
                </Link>
            </div>
        </div>
    );
};

export default LandingPage;





// import React from "react";
// const LandingPage = () => {
//     return (

//         <div>

//             <img width={'98%'} height={'900px'} src="https://ainal.me/wp-content/uploads/2020/10/Hire-Freelancer.jpg" alt="error" />

//         </div>

//     )
// };
// export default LandingPage

