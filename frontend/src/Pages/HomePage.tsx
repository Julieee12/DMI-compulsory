import {useNavigate} from "react-router-dom";
import React from "react";
import image from '../assets/logo.png'; // Adjust the path as necessary
import schruteAd from '../assets/schrutead.png'; // Adjust the path as necessary
import blackberryAd from '../assets/blackberryad.jpg'; // Adjust the path as necessary
import BBB from '../assets/bbb.png'; // Adjust the path as necessary
import Creed from '../assets/creed.png'; // Adjust the path as necessary
import Vance from '../assets/vancead.png'; // Adjust the path as necessary
import '../Styles/retro.css'; // Import the retro styles

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const goToAdminPage = () => {
        navigate('/adminpage');
    };

    const goToOrderPage = () => {
        navigate('/customerpage');
    };

    return (
        <div className={"flex flex-row"}>
            <div className="home-container">
                {/* Right Advertisement */}


                {/* Centered Content */}
                <div className="centered-content">
                    <img src={image} alt="Logo" className="centeredLogo"/>
                    <h1 className="title">Welcome to Dunder Mifflin Infinity!</h1>
                    <h2 className="subtitle">Choose your destiny!</h2>
                    <div className="button-container">
                        <button className="retro-button" onClick={goToAdminPage}>I’m Michael Scott</button>
                        <button className="retro-button" onClick={goToOrderPage}>I’m a Customer</button>
                    </div>
                </div>

            </div>

            {/*  Ad container  */}
            <div className={"absolute left-0 h-screen flex flex-col justify-start w-[400px] top-0"}>
                {/* Left Advertisement */}
                <div className="adsstyling flex-1 text-red-500 text-2xl font-black text-center flex items-center">
                    <p> IDENTITY THEFT IS NOT A JOKE, BUT DISPLAYING YOUR ADS HERE IS!!!</p>

                </div>
                <div className={"adsstyling"}>
                    <a href="https://www.blackberry.com/us/en/products/devices" target="_blank">
                    <img src={blackberryAd} alt="Blackberry Ad" className="ad-image"/>
                    <p className="ad-text">Display your ad here!</p>
                    </a>
                </div>

                <div className="adsstyling">
                    <a href="https://www.tripadvisor.com/Hotel_Review-g52842-d730099-Reviews-Schrute_Farms-Honesdale_Pocono_Mountains_Region_Pennsylvania.html" target="_blank">
                    <img src={schruteAd} alt="Schrute Ad" className="ad-image"/>
                    <p className="ad-text">Display your ad here!</p>
                    </a>
                </div>
            </div>

            <div className={"absolute right-0 h-screen flex flex-col justify-start w-[400px] top-0"}>
                {/* Left Advertisement */}
                <div className="adsstyling flex-1 text-red-500 text-5xl font-black justify-center flex items-center">
                    <p> ADS!ADS!ADS!</p>
                </div>
                <div className={"adsstyling"}>
                    <a href="https://theoffice.fandom.com/wiki/Vance_Refrigeration" target="_blank">
                    <img src={Vance} alt="Vance Ad" className="ad-image"/>
                    </a>
                    <p className="ad-text">Display your ad here!</p>
                </div>

                <div className="adsstyling">
                    <a href="https://creedthoughtsgov.com/" target="_blank">
                        <img src={Creed} alt="Creed Ad" className="ad-image"/>
                    </a>
                    <p className="ad-text">Display your ad here!</p>
                </div>
            </div>
        </div>


    );
};

export default HomePage;
