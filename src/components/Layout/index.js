import React from "react";
// import { useAuth } from "../auth/Auth";
// import { useNavigate } from "react-router-dom";
import { AppBar, Box, CssBaseline, Toolbar } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Content from "./Content";

const Layout = ({ children }) => {

    return (
        <>
        <div className="parent">
            <Header />
            
            <div className="main">
                
                <Sidebar />
                
                <div className="child content">
                    
                    {children}
                </div>  
            </div>
            
            <Footer />
        </div>
        </>
    );
}

export default Layout;