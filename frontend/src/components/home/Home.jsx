import React from 'react'
import style from "./Home.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";


const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className={style.controlBtn} onClick={onClick}>
      <button className={style.next}>
        <MdNavigateNext className={style.icon} />
      </button>
    </div>
  );
};
const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className={style.controlBtn} onClick={onClick}>
      <button className={style.prev}>
        <GrFormPrevious className={style.icon} />
      </button>
    </div>
  );
};


export const Home = ({images}) => {

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 1000,
    Default: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          swipeToSlide: true,
        },
      },
    ],

  };
  return (
    <section className={style.category}>
    <Slider {...settings}>
      {images.map((item,index) => (
        <div className={style.boxs} key={item.id}>
          <div className={style.box}>
              <img 
              src={item.src} 
              alt={item.alt}
              key= {index}
              className={style.image}
               />
          
            {/* Uncomment the following section if you want to display category and title */}
            {/* <div className='overlay'>
              <h4>{item.category}</h4>
              <p>{item.title}</p>
            </div> */}
          </div>
        </div>
      ))}
    </Slider>
  </section>
);
};

export default Home