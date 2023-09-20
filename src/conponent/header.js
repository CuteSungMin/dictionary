import { Link } from "react-router-dom";
import './header.css'

const Header = () => {
    return ( 
        <div className="header w800">
            <nav className="header_nav">
                <ul>
                    <li><Link to="/dictionary">Home</Link></li>
                    <li className="logo">Frontend Dictionary</li>
                    <li><Link to="/write">Write</Link></li>
                </ul>
            </nav>
        </div>
     );
}
 
export default Header;