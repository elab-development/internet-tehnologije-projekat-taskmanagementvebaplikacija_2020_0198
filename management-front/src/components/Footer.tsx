import React from 'react';
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import './footerstyle.css';
import { Link, useNavigate } from 'react-router-dom';
//import { useHistory } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();

    const redirectToTwitter = () => {
        <a href="https://twitter.com/mattermost" target="_blank" rel="noopener noreferrer"></a>
        navigate('/twitter');
    };

    return (
        <footer className="footer">
            <div className="social-buttons">

                <a href="https://twitter.com/mattermost" target="_blank" rel="noopener noreferrer">
                    <button className="twitter-button"><FaXTwitter /></button>
                </a>

                <a href="https://www.facebook.com/profile.php?id=100068269412600" target="_blank" rel="noopener noreferrer">
                    <button className="twitter-button"><FaFacebook /></button>
                </a>

            </div>
        </footer>
    );
};

export default Footer;