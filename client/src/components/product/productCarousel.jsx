import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../assets/css/Products.css";

function ProductCarousel({ products }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
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
    <div className="product-carousel">
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} className="product-carousel-card">
            <Link
              to={`/products/${product.id}`}
              className="product-carousel-link"
            >
              <img
                src={product.image}
                alt={product.name}
                className="product-carousel-image"
              />
              <div className="product-carousel-details">
                <h2 className="product-carousel-name">{product.name}</h2>
                <p className="product-carousel-price">Prix : {product.price}</p>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ProductCarousel;
