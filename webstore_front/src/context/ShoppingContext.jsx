import React, { createContext, useContext, useState, useEffect } from 'react';

const ShoppingContext = createContext();

export const ShoppingProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [favoriteItems, setFavoriteItems] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favoriteItems));
    }, [favoriteItems]);

    const addToCart = (productId) => {
        setCartItems(prev => [...prev, productId]);
    };

    const removeFromCart = (productId) => {
        setCartItems(prev => prev.filter(id => id !== productId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const isInCart = (productId) => {
        return cartItems.includes(productId);
    };

    const addToFavorites = (productId) => {
        setFavoriteItems(prev => [...prev, productId]);
    };

    const removeFromFavorites = (productId) => {
        setFavoriteItems(prev => prev.filter(id => id !== productId));
    };

    const isInFavorites = (productId) => {
        return favoriteItems.includes(productId);
    };

    const toggleFavorite = (productId) => {
        if (isInFavorites(productId)) {
            removeFromFavorites(productId);
        } else {
            if (isInCart(productId)) {
                removeFromCart(productId);
            }
            addToFavorites(productId);
        }
    };

    const toggleCart = (productId) => {
        if (isInCart(productId)) {
            removeFromCart(productId);
        } else {
            if (isInFavorites(productId)) {
                removeFromFavorites(productId);
            }
            addToCart(productId);
        }
    };

    return (
        <ShoppingContext.Provider value={{
            cartItems,
            favoriteItems,
            addToCart,
            removeFromCart,
            clearCart,
            isInCart,
            addToFavorites,
            removeFromFavorites,
            isInFavorites,
            toggleFavorite,
            toggleCart
        }}>
            {children}
        </ShoppingContext.Provider>
    );
};

export const useShopping = () => {
    const context = useContext(ShoppingContext);
    if (!context) {
        throw new Error('useShopping must be used within a ShoppingProvider');
    }
    return context;
};