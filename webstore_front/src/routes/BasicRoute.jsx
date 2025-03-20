import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "../components/NotFoundPage";
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/Register";
import HomePage from "../pages/homePage/HomePage";
import Products from "../pages/Products/Products";
import Layout from "../components/layout/Layout";
import MyProfilePage from "../pages/myProfile/MyProfilePage";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import FavoriteProducts from "../pages/FavoriteProducts/FavoriteProducts.jsx";
import * as Manufacturers from "../pages/Manufacturers";
import * as Clothing from "../pages/Clothing";
import * as Users from "../pages/Users";
import * as Categories from "../pages/Categories";
const BasicRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetails />} />

                <Route path="clothing" >
                    <Route index element={< Clothing.List />} />
                    <Route path="create" element={< Clothing.Create />} />
                    <Route path="edit/:id" element={< Clothing.Edit />} />
                </Route>

                <Route path="categories" >
                    <Route index element={< Categories.List />} />
                    <Route path="create" element={< Categories.Create />} />
                    <Route path="edit/:id" element={< Categories.Edit />} />
                </Route>

                <Route path="users" >
                    <Route index element={<Users.List />} />
                    <Route path="create" element={<Users.Create />} />
                    <Route path="edit/:id" element={<Users.Edit />} />
                </Route>

                <Route path="manufacturers" >
                    <Route index element={<Manufacturers.List />} />
                    <Route path="create" element={<Manufacturers.Create />} />
                    <Route path="edit/:id" element={<Manufacturers.Edit />} />
                </Route>

                <Route
                    path="/favoriteProducts"
                    element={<FavoriteProducts />}
                />

                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                <Route path="/profile" element={<MyProfilePage />} />

                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
};

export default BasicRoute;
