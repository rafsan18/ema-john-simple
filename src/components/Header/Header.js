import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import logo from "../../images/logo.png";
import "./Header.css";
const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const handleSignIn = () => {
        history.push("/login");
    };
    return (
        <div className="header">
            <img src={logo} alt="" />
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Manage Inventory</Link>
                {loggedInUser.isSignedIn ? (
                    <button
                        onClick={() => {
                            setLoggedInUser({});
                        }}
                    >
                        Sign Out
                    </button>
                ) : (
                    <button onClick={handleSignIn}>Sign In</button>
                )}
            </nav>
        </div>
    );
};

export default Header;
