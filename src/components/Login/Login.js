import React, { useState, useContext } from "react";

import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";
import {
    handleGoogleSignIn,
    initializeLoginFramework,
    handleSignOut,
    handleFbSignIn,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "./loginManager";

function Login() {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: "",
        email: "",
        password: "",
        photoURL: "",
        error: "",
        success: false,
    });
    initializeLoginFramework();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        handleGoogleSignIn().then((res) => {
            handleResponse(res, true);
        });
    };

    const fbSignIn = () => {
        handleFbSignIn.then((res) => {
            handleResponse(res, true);
        });
    };

    const signOut = () => {
        handleSignOut().then((res) => {
            handleResponse(res, false);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(
                user.name,
                user.email,
                user.password
            ).then((res) => {
                handleResponse(res, true);
            });
        }

        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password).then(
                (res) => {
                    handleResponse(res, true);
                }
            );
        }
    };

    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        console.log(res);
        if (redirect) {
            history.replace(from);
        }
    };

    const handleBlur = (e) => {
        let isFormValid = true;
        if (e.target.name === "email") {
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === "password") {
            const isPasswordValid = e.target.value.length >= 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);

            isFormValid = isPasswordValid && passwordHasNumber;
        }

        if (isFormValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            {user.isSignedIn ? (
                <button onClick={signOut}>Sign Out</button>
            ) : (
                <button onClick={googleSignIn}>Sign in Using Google</button>
            )}
            <br />
            <button onClick={fbSignIn}>Sign in Using facebook</button>
            {user.isSignedIn && (
                <div>
                    <h2>Welcome {user.name}</h2>
                    <p>Signed In Email: {user.email}</p>
                    <img src={user.photoURL} alt="" />
                </div>
            )}
            <h1>Our own Authentication</h1>
            <input
                type="checkbox"
                onChange={() => setNewUser(!newUser)}
                name="newUser"
                id=""
            />
            <label htmlFor="newUser">New User Sign up</label>

            <form onSubmit={handleSubmit} action="">
                {newUser && (
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your Name"
                        onBlur={handleBlur}
                        required
                    />
                )}

                <br />
                <input
                    type="text"
                    name="email"
                    placeholder="Enter your Email"
                    onBlur={handleBlur}
                    required
                />
                <br />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your Password"
                    onBlur={handleBlur}
                    required
                />
                <br />
                <input type="submit" value={newUser ? "Sign Up" : "Sign In"} />
            </form>

            <p style={{ color: "red" }}>{user.error}</p>
            {user.success && (
                <p style={{ color: "green" }}>
                    User {newUser ? "Created " : "Logged In "}successfully
                </p>
            )}

            {/* {user.success ? (
        <p style={{ color: "green" }}>User Created successfully</p>
      ) : (
        <p style={{ color: "red" }}>{user.error}</p>
      )} */}
        </div>
    );
}

export default Login;
