import React from "react";
import Slider from "react-slick";
import { IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Arrow components without hover effects and static positioning
const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", zIndex: 2 }}
      onClick={onClick}
    >
      <ArrowBackIosIcon />
    </IconButton>
  );
};

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", zIndex: 2 }}
      onClick={onClick}
    >
      <ArrowForwardIosIcon />
    </IconButton>
  );
};

export default function Carousel({ children, slidesToShow = 3 }) {
  // Ensure that we do not duplicate slides if the number of children is less than slidesToShow
  const numSlides = React.Children.count(children);
  const settings = {
    dots: false,
    infinite: numSlides > slidesToShow, // Infinite only if more slides than slidesToShow
    speed: 500,
    slidesToShow: Math.min(slidesToShow, numSlides), // Show only available slides
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, numSlides),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div style={{ position: "relative" }}>
      <Slider {...settings}>{children}</Slider>
    </div>
  );
}
