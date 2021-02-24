import React from "react";
import { Carousel } from "react-bootstrap";

import image1 from "../assets/images/hero-1.jpg";
import image2 from "./../assets/images/hero-2.jpg";
import image3 from "./../assets/images/3.jpg";
import image4 from "./../assets/images/geanie.jpg";
import Aboutus from "./Aboutus";
import Contact from "./Contact";
import Services from "./Services";

const Home = () => {
  const customcss = {
    color: "white",
  };

  return (
 <>
    <Carousel fade={true} pause={false}>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100 coverbook"
          src={image1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3 style={customcss}>Love to Learn</h3>
          <p style={customcss}>
            Education breeds confindence, confidence breeds hope, hope breeds
            peace
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100 coverbook"
          src={image2}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3 style={customcss}>Library</h3>
          <p style={customcss}>
            Millions of books, study material, notes of various streams
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100 coverbook"
          src={image3}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3 style={customcss}>One Stop for books</h3>
          <p style={customcss}>Easiest and Fastet way to get your books</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100 coverbook"
          src={image4}
          alt="Fourth slide"
        />
        <Carousel.Caption>
          <h3 style={customcss}>Genie</h3>
          <p style={customcss}>Coming Soon!! Door Step delivery.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    
    <Aboutus />
    <Contact />
    <Services />
 </>  
    
  );
};

export default Home;
