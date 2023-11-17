import Footer from "../Footer";
import Header from "../Header";
import Sidebar from "../Sidebar";

const Content = ({ children }) => {

    return (

        <>
        <div className="parent">
            <Header />
            {/* <div className="child">Header</div> */}
            <div className="main">
                {/* <div className="child">Sidebar</div> */}
                <Sidebar />
                {/* <div className="child content">Content</div>   */}
                <div className="child content">
                    {children}
                </div>
            </div>
            {/* <div className="child">Footer</div> */}
            <Footer />
        </div>
        </>
    );
}

export default Content;