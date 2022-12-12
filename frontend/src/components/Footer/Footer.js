import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { BsGithub, BsYoutube, BsInstagram, BsLinkedin } from "react-icons/bs";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div>
        <Typography variant="h5">About Me</Typography>
        <Typography>
          Hey, My Name is <b> Mohammad Tahir </b> CEO of <b>  Ghareeb Star </b> .
          I am a Full-Stack Developer and I Love To Code.  <b>Contact Us </b> For The Solutions of Your <b> Business Upgradation </b>
        </Typography>

        <Link to="/contact" className="footerContactBtn">
          <Typography>Contact Us</Typography>
        </Link>
      </div>
      <div  >
        <Typography variant="h6">Social Media</Typography>
        <a href="https://github.com/ghareebstar/" target="black">
          <BsGithub />
        </a>
        <a href="https://youtube.com/ghareebstar/" target="black">
          <BsYoutube />
        </a>
        <a href="https://instagram.com/ghareebstar/" target="black">
          <BsInstagram />
        </a>
        <a href="https://www.linkedin.com/in/ghareebstar/" target="black">
          <BsLinkedin />
        </a>
      </div>
    </div>
  );
};

export default Footer;
