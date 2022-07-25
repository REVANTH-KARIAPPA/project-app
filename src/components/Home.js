import React, { useState, useEffect } from "react";
import "./Products.css";
import UserService from "../services/user.service";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="homecontainer">
      <header className="homecontainer">
        <h1>  Welcome TO LensCart</h1>
        <img src="./images/logo.jpg" alt=""/>
        <h3 className="collorText">My eyes are so beautiful <br/> they have to be kept behind glass</h3>
      </header>
    </div>
  );
};

export default Home;
