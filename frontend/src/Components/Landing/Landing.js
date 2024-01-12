import React from "react";
import './Landing.css'

export default function Landing() {
    return (
        <>
            <div className="LandingContainer">
                <div className="landingSwiper">
                        <img src="/Images/main-banner-top.jpg" alt="landPic" />
                </div>
                <div className="landingPicture">
                    <div>
                        <img src="/Images/main-banner-top.jpg" alt="landPic" />
                    </div>
                    <div>
                        <img src="/Images/main-bot.gif" alt="landPic" />
                    </div>
                </div>
            </div>
        </>
    );
}
