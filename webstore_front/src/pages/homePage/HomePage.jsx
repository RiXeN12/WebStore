import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { products } from "../../data/productsData";
import { useActions } from "../../hooks/useActions.js";
import "./style.css";
import productImage from "../../hooks/productImage.js";

const heroImages = [
  "https://media.boohoo.com/i/boohooamplience/0503_UK_40OFF_SPRING_ESSENTIALS_MENSWEAR_DESK_1920x759?qlt=default&fmt=auto",
  "https://media.boohoo.com/i/boohooamplience/2702_SMART_SETS_DESK_1920x759_UK?qlt=default&fmt=auto",
  "https://media.boohoo.com/i/boohooamplience/050325_DSK_1_UK_COWPRINT_V2?qlt=default&fmt=auto",
  "https://media.boohoo.com/i/boohooamplience/2402_HOLIDAY_SHOP_APP_DESK_UK?qlt=default&fmt=auto",
];

const HomePage = () => {
  const { manufacturerList } = useSelector((state) => state.manufacturer);
  const { clothingItemList } = useSelector((state) => state.product);
  const { categoryList } = useSelector((state) => state.category);
  const { getManufacturers, getCategories, getClothingItems } = useActions();
  const limitedProducts = clothingItemList.slice(0, 4);

  useEffect(() => {
    getManufacturers();
    getCategories();
    getClothingItems();
  }, []);

  return (
    <div className="container-fluid p-0">
      <div className="hero-section position-relative mb-5">
        <div
          id="heroCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {heroImages.map((image, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <div className="hero-image-container">
                  <img
                    src={image}
                    className="d-block w-100"
                    alt={`Спортивний одяг ${index + 1}`}
                  />
                </div>
                <div className="carousel-caption text-center">
                  <a href="/products" className="btn btn-primary btn-lg">
                    SHOP NOW
                  </a>
                </div>
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Попередній</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Наступний</span>
          </button>
        </div>
      </div>

      <div className="container py-5">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Нові надходження</h2>
              <a href="/products" className="text-decoration-none">
                Дивитись всі
              </a>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {limitedProducts.map((product) => (
            <div className="col-12 col-md-6 col-lg-3" key={product.id}>
              <div className="card product-card h-100 border-0 position-relative">
                <div className="product-image-container">
                  <img
                    src={productImage(product.images[0]?.filePath)}
                    className="card-img-top"
                    // style={{ objectFit: "contain" }}
                    alt={product.name}
                  />
                </div>
                <div className="card-body px-0">
                  <h5 className="card-title">{product.name}</h5>
                  <div className="d-flex gap-2 align-items-center">
                    <span className="fw-bold">{product.price} грн</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row mt-5">
          <div className="col-12">
            <h2 className="mb-4">Виробники</h2>
          </div>
        </div>

        <div className="row g-4">
          {manufacturerList.map((manufacturer) => (
            <div className="col-12 col-md-4" key={manufacturer.id}>
              <div className="manufacturer-card d-flex flex-column justify-content-between">
                <div>
                  <h3 className="h4">{manufacturer.name}</h3>
                  <i className={`bi bi-shop brand-icon`}></i>
                </div>
                <div className="mt-3">
                  <Link
                    to={`/products?manufacturers=${manufacturer.name}`}
                    className="text-decoration-none view-link"
                  >
                    Переглянути
                    <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row mt-5">
          <div className="col-12">
            <h2 className="mb-4">Категорії</h2>
          </div>
        </div>

        <div className="row g-4">
          {categoryList.map((category) => (
            <div className="col-12 col-md-4" key={category.id}>
              <div className="category-card p-4 rounded-3 h-100 d-flex flex-column justify-content-between bg-light category-hover">
                <div>
                  <h3 className="h4 mb-3">{category.name}</h3>
                  <p className="text-muted mb-0">{category.description}</p>
                </div>
                <div className="mt-3">
                  <Link
                    to={`/products?category=${category.name}`}
                    className="text-decoration-none d-flex align-items-center gap-2"
                  >
                    Переглянути
                    <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="container mt-10 mt-5">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            <div className="col">
              <div className="text-center">
                <i className="bi bi-truck fs-1 mb-3"></i>
                <h4>Безкоштовна доставка</h4>
                <p className="text-muted">При замовленні від 1000 ₴</p>
              </div>
            </div>
            <div className="col">
              <div className="text-center">
                <i className="bi bi-arrow-repeat fs-1 mb-3"></i>
                <h4>Повернення</h4>
                <p className="text-muted">14 днів на повернення</p>
              </div>
            </div>
            <div className="col">
              <div className="text-center">
                <i className="bi bi-shield-check fs-1 mb-3"></i>
                <h4>Безпечна оплата</h4>
                <p className="text-muted">100% безпечні платежі</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
