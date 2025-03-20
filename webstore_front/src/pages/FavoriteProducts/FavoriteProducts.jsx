import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Check } from 'lucide-react';
import { products } from '../../data/productsData';
import { useShopping } from '../../context/ShoppingContext';

const FavoriteProducts = () => {
    const {
        cartItems,
        favoriteItems,
        addToCart,
        removeFromFavorites,
        isInCart
    } = useShopping();

    const [selectedItems, setSelectedItems] = useState([]);
    const [isSelectMode, setIsSelectMode] = useState(false);

    const toggleFavorite = (productId) => {
        if (isSelectMode) {
            toggleSelect(productId);
            return;
        }

        removeFromFavorites(productId);
    };

    const toggleSelect = (productId) => {
        setSelectedItems(prevSelected => {
            if (prevSelected.includes(productId)) {
                return prevSelected.filter(id => id !== productId);
            } else {
                return [...prevSelected, productId];
            }
        });
    };

    const toggleSelectMode = () => {
        setIsSelectMode(!isSelectMode);
        setSelectedItems([]);
    };

    const selectAll = () => {
        const favoriteProducts = products.filter(product => favoriteItems.includes(product.id));
        setSelectedItems(favoriteProducts.map(product => product.id));
    };

    const addSelectedToCart = () => {
        selectedItems.forEach(productId => {
            if (!isInCart(productId)) {
                addToCart(productId);
            }
        });
        
        selectedItems.forEach(productId => {
            removeFromFavorites(productId);
        });
        
        setSelectedItems([]);
        setIsSelectMode(false);
    };

    const canAddToFavorites = (productId) => {
        return !isInCart(productId);
    };

    const favoriteProducts = products.filter(product => favoriteItems.includes(product.id));

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h4 mb-0">Мій вибір</h1>
                {favoriteProducts.length > 0 && (
                    <div className="d-flex gap-2">
                        <button
                            className="btn btn-outline-dark"
                            onClick={toggleSelectMode}
                        >
                            {isSelectMode ? 'Скасувати' : 'Вибрати'}
                        </button>
                        {isSelectMode && (
                            <>
                                <button
                                    className="btn btn-outline-dark"
                                    onClick={selectAll}
                                >
                                    Вибрати все
                                </button>
                                {selectedItems.length > 0 && (
                                    <button
                                        className="btn btn-dark d-flex align-items-center gap-2"
                                        onClick={addSelectedToCart}
                                    >
                                        <ShoppingCart size={20} />
                                        Додати в кошик ({selectedItems.length})
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>

            {favoriteProducts.length === 0 ? (
                <div className="text-center py-5">
                    <p className="mb-4">У вас поки немає обраних товарів</p>
                    <Link to="/products" className="btn btn-dark">
                        Перейти до каталогу
                    </Link>
                </div>
            ) : (
                <div className="row g-4">
                    {favoriteProducts.map(product => (
                        <div key={product.id} className="col-6 col-md-4 col-lg-3">
                            <div
                                className={`card h-100 border-0 ${
                                    isSelectMode ? 'cursor-pointer' : ''
                                } ${
                                    selectedItems.includes(product.id) ? 'bg-light' : ''
                                }`}
                                onClick={() => isSelectMode && toggleSelect(product.id)}
                            >
                                <div className="position-relative">
                                    <Link
                                        to={`/product/${product.id}`}
                                        onClick={(e) => isSelectMode && e.preventDefault()}
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="card-img-top"
                                            style={{ aspectRatio: '3/4', objectFit: 'cover' }}
                                        />
                                    </Link>
                                    {isSelectMode ? (
                                        <div
                                            className={`position-absolute top-0 end-0 m-2 rounded-circle d-flex align-items-center justify-content-center ${
                                                selectedItems.includes(product.id) ? 'bg-dark' : 'bg-light'
                                            }`}
                                            style={{ width: '32px', height: '32px', border: '2px solid currentColor' }}
                                        >
                                            {selectedItems.includes(product.id) && (
                                                <Check size={20} color="white" />
                                            )}
                                        </div>
                                    ) : (
                                        <button
                                            className="btn btn-outline-danger position-absolute top-0 end-0 m-2"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleFavorite(product.id);
                                            }}
                                            disabled={!canAddToFavorites(product.id)}
                                        >
                                            <Heart
                                                size={20}
                                                fill="#dc3545"
                                                color="#dc3545"
                                            />
                                        </button>
                                    )}
                                </div>
                                <div className="card-body px-0 pt-3">
                                    <h5 className="card-title h6">{product.title}</h5>
                                    <p className="card-text">
                                        <span className="fw-bold">{product.price} грн</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoriteProducts;