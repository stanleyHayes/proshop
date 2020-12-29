import React from "react";
import {Switch, Route} from "react-router-dom";
import HomePage from "./pages/home/home-page";
import ProductsPage from "./pages/products/products-page";
import ProductDetailPage from "./pages/products/product-detail";
import ScrollToTop from "./components/shared/scroll-to-top";

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
            </ScrollToTop>
        </Switch>
    );
}

export default App;
