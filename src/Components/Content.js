import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

import $ from "jquery";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import image1 from "../Images/carousel1.jpeg";
import image2 from "../Images/carousel2.jpeg";
import image3 from "../Images/carousel3.jpeg";

// import { projectFirestore } from './Firebase';
import { db } from "./Firebase";
import Footer from "./Footer";

function Content() {
  const [Products, setProducts] = useState([]);

  const [Banners, setBanners] = useState([]);

  //  const { docs } = useFirestore('products')
  //  console.log('products',docs)

  useEffect(() => {
    // $('.owl-carousel').owlCarousel({
    //     loop:true,
    //     margin:10,
    //     responsiveClass:true,
    //     responsive:{
    //         0:{
    //             items:1,
    //             nav:true
    //         },
    //         600:{
    //             items:1,
    //             nav:false
    //         },
    //         1000:{
    //             items:1,
    //             nav:true,
    //             loop:false
    //         }
    //     }
    // })

    getDocs(collection(db, "products")).then((querySnapshot) => {
      console.log(querySnapshot);

      if (querySnapshot) {
        let docs = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots

          docs.push(doc.data());
          // docs.push({...doc.data,id:doc.id})
          console.log(doc.id, " => ", doc.data());
        });

        setProducts(docs);
      }
    });

    getDocs(collection(db, "banners")).then((querySnapshot) => {
      console.log(querySnapshot);

      if (querySnapshot) {
        let docs = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots

          docs.push(doc.data());
          // docs.push({...doc.data,id:doc.id})
          console.log(doc.id, " => ", doc.data());
        });

        setBanners(docs);
      }
    });
  }, []);

  return (
    <div>
      <OwlCarousel
        className="owl-theme owl-carousel"
        loop
        margin={10}
        nav
        items="1"
        slideBy="1"
        dots={false}
        autoplay={true}
        autoplayTimeout="5000"
        responsive={{
          0: {
            items: 1,
          },
          450: {
            items: 1,
          },
          600: {
            items: 1,
          },
          1000: {
            items: 1,
          },
        }}
      >
        <div class="item">
          <img src={image1} alt="" />
        </div>
        <div class="item">
          <img src={image2} alt="" />
        </div>
        <div class="item">
          <img src={image3} alt="" />
        </div>
      </OwlCarousel>
      ;
      <div className="products-wrapper">
        <div className="row">
          <div className="heading col-6 text-center">
            <h2> latest </h2>
          </div>
        </div>

        <div className="products row">
          {Products &&
            Products.length > 0 &&
            Products.map((EP, index) => {
              return (
                <div className="product col-10 col-sm-6 col-md-3 col-lg-2 ">
                  <div className="image">
                    <img src={EP.productImg} alt="" />
                  </div>

                  <div className="below-heading">
                    <h6 key={index} className="text-center">
                      {" "}
                      {EP.title}{" "}
                    </h6>
                    <p>{` Rs ${EP.price}  `}</p>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="banners row">
          {Banners &&
            Banners.length > 0 &&
            Banners.map((EB, index) => {
              return (
                <div className="banner col-10  col-sm-6 col-md-3 col-lg-8">
                  <div className={EB.BannerContent}>
                    <h2> {EB.BannerTitle} </h2>

                    <button className="btn btn-info">
                      {" "}
                      {EB.BannerCalltoAction}{" "}
                    </button>
                  </div>

                  <img src={EB.ProductImg} alt="" />
                </div>
              );
            })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Content;
