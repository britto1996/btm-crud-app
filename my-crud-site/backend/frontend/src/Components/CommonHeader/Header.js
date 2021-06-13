import React, { useState } from "react";
import "../HomeDashboard/Home.css";
import { Jumbotron } from "react-bootstrap";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";

const Header = () => {
  return (
    <Jumbotron className="header">
      <h1>BTM'S CRUD APP</h1>
      <p className="paragraph">
        The CRUD application developed by BTM INDUSTRIES. Learn the simple
        project using this code for free.So buddy's why are you waiting ?{" "}
        <strong>Let's Code</strong>
      </p>
      <p className="social-medias">
        <a href="https://www.facebook.com/britto.thomas.52/">
          <FacebookIcon />
        </a>
        <a
          className="linkedIn"
          href="https://www.linkedin.com/in/britto-thomas-aa46521b4/"
        >
          <LinkedInIcon />
        </a>
        <a className="github" href="https://github.com/britto1996">
          <GitHubIcon />
        </a>
      </p>
      <button className="grab__a__coffee">BUY ME A COFFEE</button>
    </Jumbotron>
  );
};

export default Header;
