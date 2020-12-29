import React from "react";
import {AppBar, Hidden} from "@material-ui/core";
import DesktopHeader from "./desktop-header";
import MobileHeader from "./mobile-header";

const Header = () => {
    return (
        <AppBar variant="outlined">
            <Hidden mdDown={true} implementation="js">
                <DesktopHeader/>
            </Hidden>

            <Hidden lgUp={true} implementation="js">
                <MobileHeader/>
            </Hidden>
        </AppBar>
    )
}
export default Header;