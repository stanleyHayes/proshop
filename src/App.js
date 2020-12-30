import React from "react";
import {Switch, Route} from "react-router-dom";
import HomePage from "./pages/home/home-page";
import ProductsPage from "./pages/products/products-page";
import ProductDetailPage from "./pages/products/product-detail";
import ScrollToTop from "./components/shared/scroll-to-top";
import AboutPage from "./pages/others/about-page";
import ContactPage from "./pages/others/contact-page";
import PrivacyPolicyPage from "./pages/others/privacy-policy-page";
import TermsAndConditionsPage from "./pages/others/terms-and-conditions-page";
import CartPage from "./pages/cart/cart-page";
import AccountPage from "./pages/others/account-page";
import ShippingPage from "./pages/cart/shipping-page";
import SignInPage from "./pages/authentication/sign-in-page";
import SignUpPage from "./pages/authentication/sign-up-page";

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

                <Route exact={true} path="/account">
                    <ShippingPage/>
                </Route>

                <Route exact={true} path="/login">
                    <SignInPage/>
                </Route>

                <Route exact={true} path="/register">
                    <SignUpPage/>
                </Route>

                <Route exact={true} path="/terms-and-conditions">
                    <TermsAndConditionsPage/>
                </Route>
            </ScrollToTop>
        </Switch>
    );
}

export default App;
