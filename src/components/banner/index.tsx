import React from "react";
import banner from "../../assets/images/banner.jpeg";

export default function Banner() {
    return (
        <div className="banner">
            <div className="bannerImagem" style={{ backgroundColor: "#2e2c39" }}>
                <img style={{ height: "100%" }} src={banner}></img>
            </div>
        </div>
    );
}