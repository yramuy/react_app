import { Link } from "react-router-dom";

const Sidebar = () => {
    
    return (
        <>
          <div className="sidebar">
          
          <ul>
              <li><Link to="/home" underline="none"><i className="fas fa-home"></i>Home</Link></li>
              <li><Link to="/profile" underline="none"><i className="fas fa-user"></i>Profile</Link></li>
              <li><Link to="/about" underline="none"><i className="fas fa-address-card"></i>About</Link></li>
              <li><Link to="/blog" underline="none"><i className="fas fa-blog"></i>Blog</Link></li>
              <li><Link to="/contact" underline="none"><i className="fas fa-address-book"></i>Contact</Link></li>
              <li><Link to="/users" underline="none"><i className="fas fa-address-book"></i>Users</Link></li>
              <li><Link to="/posts" underline="none"><i className="fas fa-address-book"></i>User Posts</Link></li>
          </ul>
          </div>
        </>
    );
};

export default Sidebar;