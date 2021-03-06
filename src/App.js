import React from "react";
import {Switch, Route} from "react-router-dom";
import HomePage from "./pages/home/home-page";
import ProductsPage from "./pages/products/products-page";
import ProductDetailPage from "./pages/products/product-detail-page";
import ScrollToTop from "./components/shared/scroll-to-top";
import AboutPage from "./pages/others/about-page";
import ContactPage from "./pages/others/contact-page";
import PrivacyPolicyPage from "./pages/others/privacy-policy-page";
import TermsAndConditionsPage from "./pages/others/terms-and-conditions-page";
import CartPage from "./pages/cart/cart-page";
import AccountPage from "./pages/others/account-page";
import SignInPage from "./pages/authentication/sign-in-page";
import SignUpPage from "./pages/authentication/sign-up-page";
import PaymentPage from "./pages/cart/payment-page";
import CheckoutPage from "./pages/cart/checkout-page";
import OrderDetailPage from "./pages/orders/order-detail-page";
import OrdersPage from "./pages/orders/orders-page";
import UsersPage from "./pages/users/users-page";
import UserDetailPage from "./pages/users/user-detail-page";
import EditUserPage from "./pages/users/edit-user-page";
import EditProductPage from "./pages/products/edit-product-page";
import CreateProductPage from "./pages/products/create-product-page";
import SearchPage from "./pages/products/search-page";

const App = () => {
    return (
        <Switch>
            <ScrollToTop>
                <Route exact={true} path="/">
                    <HomePage/>
                </Route>

                <Route exact={true} path="/products">
                    <ProductsPage/>
                </Route>

                <Route exact={true} path="/products/:productID">
                    <ProductDetailPage/>
                </Route>

                <Route exact={true} path="/product/new">
                    <CreateProductPage/>
                </Route>

                <Route exact={true} path="/products/:productID/edit">
                    <EditProductPage/>
                </Route>

                <Route exact={true} path="/cart">
                    <CartPage/>
                </Route>

                <Route exact={true} path="/about">
                    <AboutPage/>
                </Route>

                <Route exact={true} path="/contact">
                    <ContactPage/>
                </Route>

                <Route exact={true} path="/privacy">
                    <PrivacyPolicyPage/>
                </Route>

                <Route exact={true} path="/account">
                    <AccountPage/>
                </Route>

                <Route exact={true} path="/checkout">
                    <CheckoutPage/>
                </Route>

                <Route exact={true} path="/login">
                    <SignInPage/>
                </Route>

                <Route exact={true} path="/register">
                    <SignUpPage/>
                </Route>

                <Route exact={true} path="/payment">
                    <PaymentPage/>
                </Route>

                <Route exact={true} path="/terms-and-conditions">
                    <TermsAndConditionsPage/>
                </Route>

                <Route exact={true} path="/orders/:orderID">
                    <OrderDetailPage/>
                </Route>

                <Route exact={true} path="/orders">
                    <OrdersPage/>
                </Route>

                <Route exact={true} path="/users/:userID">
                    <UserDetailPage/>
                </Route>

                <Route exact={true} path="/users/:userID/edit">
                    <EditUserPage/>
                </Route>

                <Route exact={true} path="/users">
                    <UsersPage/>
                </Route>

                <Route exact={true} path="/search">
                    <SearchPage/>
                </Route>
            </ScrollToTop>
        </Switch>
    );
}

export default App;
