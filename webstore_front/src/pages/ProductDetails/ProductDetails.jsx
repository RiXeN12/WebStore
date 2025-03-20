import { ChevronRight, Heart, ShoppingCart } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useShopping } from "../../context/ShoppingContext";
import productImage from "../../hooks/productImage";
import { useActions } from "../../hooks/useActions";

const ProductDetails = () => {
  const { clothingItemList } = useSelector((state) => state.product);
  const { getClothingItems } = useActions();

  useEffect(() => {
    getClothingItems();
  }, []);

  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const {
    cartItems,
    toggleFavorite,
    addToCart,
    removeFromCart,
    isInCart,
    isInFavorites,
    removeFromFavorites,
  } = useShopping();

  useEffect(() => {
    setIsLoading(true);
    const productData = clothingItemList.find((p) => p.id === id);
    setTimeout(() => {
      setProduct(productData);
      setIsLoading(false);
    }, 500);
  }, [id]);

  const toggleCart = (productId) => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    if (isInCart(productId)) {
      removeFromCart(productId);
    } else {
      if (isInFavorites(productId)) {
        removeFromFavorites(productId);
      }
      addToCart(productId);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen d-flex justify-content-center align-items-center">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-5">
        <h2>Товар не знайдено</h2>
        <button
          className="btn btn-dark mt-3"
          onClick={() => navigate("/products")}
        >
          Повернутися до списку товарів
        </button>
      </div>
    );
  }

  const sizes = ["XS", "S", "M", "L", "XL"];

  return (
    <div className="container py-4">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item d-flex align-items-center">
            <Link to="/" className="text-dark text-decoration-none">
              Головна
            </Link>
            <ChevronRight size={14} className="ms-1" />
          </li>
          <li className="breadcrumb-item d-flex align-items-center">
            <Link to="/products" className="text-dark text-decoration-none">
              Одяг
            </Link>
            <ChevronRight size={14} className="ms-1" />
          </li>
          <li className="breadcrumb-item d-flex align-items-center">
            <Link
              to={`/products?category=${product.category.name}`}
              className="text-dark text-decoration-none"
            >
              {product.category.name}
            </Link>
            <ChevronRight size={14} className="ms-1" />
          </li>
          {product.manufacturer.name && (
            <li className="breadcrumb-item d-flex align-items-center">
              <Link
                to={`/products?manufacturers=${product.manufacturer.name}`}
                className="text-dark text-decoration-none"
              >
                {product.manufacturer.name}
              </Link>
              <ChevronRight size={14} className="ms-1" />
            </li>
          )}
          <li className="breadcrumb-item active" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="row justify-content-center">
        <div className="col-md-6 mb-4">
          <div className="position-relative">
            <div className="row">
              {product.images.length > 0 ? (
                <div
                  id="productCarousel"
                  className="carousel slide bg-black text-dark bg-opacity-25 rounded"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner">
                    {product.images.map((image, index) => (
                      <div
                        className={`carousel-item ${
                          index === 0 ? "active" : ""
                        }`}
                        key={index}
                      >
                        <img
                          src={productImage(image.filePath)}
                          className="d-block w-100 rounded"
                          alt={`Slide ${index}`}
                          style={{ height: "400px", objectFit: "contain" }}
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#productCarousel"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#productCarousel"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              ) : (
                <img
                  src={productImage(undefined)}
                  className="d-block w-100 rounded"
                  style={{ height: "300px", objectFit: "contain" }}
                />
              )}
            </div>
          </div>
          <div className="border-top pt-4 mt-5">
              <div className="accordion" id="productAccordion">
                <div className="accordion-item border-0">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button ps-0 bg-transparent shadow-none fw-bold text-uppercase"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#description"
                      style={{ fontSize: "1.2rem", color: "#6f42c1" }}
                    >
                      <i className="bi bi-file-text me-2"></i> Опис товару
                    </button>
                  </h2>
                  <div
                    id="description"
                    className="accordion-collapse collapse show h5"
                  >
                    <div className="accordion-body ps-0">
                      <div
                        className="p-3 rounded"
                        style={{ backgroundColor: "#f8f9fa" }}
                      >
                        <p className="mb-2">
                          <strong className="text-muted">
                            <i className="bi bi-tag-fill me-2"></i>Категорія:&nbsp;
                          </strong>
                          <span className="fw-semibold">
                            {product.category.name}
                          </span>
                        </p>

                        {product.manufacturer && (
                          <p className="mb-2">
                            <strong className="text-muted">
                              <i className="bi bi-building me-2"></i>Виробник:&nbsp;
                            </strong>
                            <span className="fw-semibold">
                              {product.manufacturer.name}
                            </span>
                          </p>
                        )}

                        <p className="mb-0">
                          <strong className="text-muted">
                            <i className="bi bi-file-earmark-text me-2"></i>
                            Опис:&nbsp;
                          </strong>
                          <span
                            className="fw-normal"
                            style={{ lineHeight: "1.6" }}
                          >
                            {product.description}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

        </div>
        <div className="col-md-6">
          <div className="px-md-4">
            <h1 className="h4 mb-2">{product.name}</h1>
            <p className="h5 mb-4">{product.price} UAH</p>

            <div className="mb-4 text-center">
              <p className="mb-2">- Оберіть розмір -</p>
              <div className="d-flex justify-content-center gap-2 mb-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`btn ${
                      selectedSize === size ? "btn-dark" : "btn-outline-dark"
                    }`}
                    style={{ width: "55px", height: "55px" }}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button className="btn btn-link text-dark">
                Перевір свій розмір
              </button>
            </div>

            <div className="d-flex gap-2 mb-4">
              <button
                className={`btn ${
                  isInCart(product.id) ? "btn-success" : "btn-dark"
                } flex-grow-1 py-2 d-flex align-items-center justify-content-center gap-2 ${
                  isAnimating ? "animating" : ""
                }`}
                onClick={() => toggleCart(product.id)}
              >
                <ShoppingCart size={20} />
                {isInCart(product.id) ? "ДОДАНО В КОШИК" : "ДОДАТИ У КОШИК"}
              </button>
              <button
                className="btn btn-outline-danger py-2 px-3"
                onClick={() => toggleFavorite(product.id)}
              >
                <Heart
                  size={20}
                  fill={isInFavorites(product.id) ? "currentColor" : "none"}
                />
              </button>
            </div>

            <div className="border-top pt-3 mb-4">
              <button className="btn btn-link text-dark ps-0 d-flex align-items-center justify-content-between w-100">
                <span>Вартість та час доставки</span>
                <span>→</span>
              </button>
              <p className="small text-muted ms-0">
                При покупках понад 1200 UAH
              </p>
            </div>

            <div className="border-top pt-3">
              <button className="btn btn-link text-dark ps-0 d-flex align-items-center justify-content-between w-100">
                <span>Термін повернення 365 днів</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {cartItems.length > 0 && (
        <div className="position-fixed bottom-0 end-0 m-4 p-3 cart-indicator">
          <div className="d-flex align-items-center gap-2">
            <ShoppingCart className="cart-icon" size={24} />
            <span className="fw-medium">
              Корзина: {cartItems.length} товарів
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
