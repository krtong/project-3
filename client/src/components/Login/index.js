import React, { useContext, useState } from "react";

// sorry cody i had to disable this because i cant figure out why it's  apply itself to fucking everything.
// import './style-old.css';
import './style.css'
import axios from 'axios';
import API from "../../utils/API";
import {UserContext} from "../../context/UserContext";

const Login = () => { 

    const { user, setUser } = useContext(UserContext);
    const [userdata, setUserdata] = useState({
        username: "",
        password: "",
        verifyPassword: "",
        email: ""
    });
    const [registerActiveId, setRegisterActiveId] = useState(true);
    const [loginActiveId, setLoginActiveId] = useState(false);
    
    // handle any changes to the input fields
    const handleInputChange = event => {
        // Pull the name and value properties off of the event.target (the element which triggered the event)
        const { name, value } = event.target;
        // Set the state for the appropriate input field
        setUserdata({
            ...userdata,
            [name]: value
        });
    };

    const handleRegisterSubmit = event => {
        // Preventing the default behavior of the form submit (which is to refresh the page)
        event.preventDefault();
        const {username, password, verifyPassword, email} = userdata;
        console.log(username, password, verifyPassword, email)

        if (!username || !password || !email || !verifyPassword) {
            alert("Fill out all fields please!");
        } else if (password !== verifyPassword) {
            alert("Please re-enter your passwords - they did not match")
        } {
            axios.post('/api/auth/login', {
                username: username,
                password: password,
                email: email
            })
                .then(response => {
                    console.log("response.data.redirect", response.data.redirect);
                    if (response.data.redirect == '/') {
                        console.log(window.location = "/")
                    } else if (response.data.redirect == '/login'){
                        console.log(window.location = "/login")
                    }
                }).catch(err => {
                    console.log('Sign up server error: ')
                    console.log(err)
                })
        }
    }


    // Need to stop it if doesnt find user
    const handleLoginSubmit = event => {
        // Preventing the default behavior of the form submit (which is to refresh the page)
        event.preventDefault();
        const {username, password} = userdata;

        if (!username || !password) {
            alert("Fill out all fields please!");
        } else if (password.length < 6) {
            alert(`Choose a more secure password `);
        } else {
            alert(`Hello ${username}, your password: ${password}`);
            axios.post('/api/auth/login', {
                username: username,
                password: password,
            })
                .then(response => {
                    console.log("response.data.redirect", response.data.redirect);
                    if (response.data.redirect == '/') {
                        console.log(window.location = "/")
                    } else if (response.data.redirect == '/login'){
                        console.log(window.location = "/login")
                    }
                }).catch(err => {
                    console.log('Sign up server error: ')
                    console.log(err)
                })
        }
    }

    const loginClickHandler = event => {
        event.preventDefault();
        setLoginActiveId(true);
        setRegisterActiveId(false);
    }

    const registerClickHandler = event => {
        event.preventDefault();
        setLoginActiveId(false);
        setRegisterActiveId(true);
    }

    return( 
        <main ontouchstart className=" login-form with-hover">
            <aside className="login-form">
                <div></div>
                <svg viewBox="0 0 100 100">
                    <g stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M65.892702,73 C70.3362168,68.5836139 73.0845878,62.4824333 73.0845878,55.7432553 C73.0845878,49.0040774 70.3362168,42.9028968 65.892702,38.4865107 C61.4491873,34.0701246 55.3105288,31.338533 48.5299539,31.338533 C41.749379,31.338533 35.6107205,34.0701246 31.1672058,38.4865107 C26.723691,42.9028968 23.97532,49.0040774 23.97532,55.7432553 C23.97532,62.4824333 26.723691,68.5836139 31.1672058,73 C31.1672058,73 65.892702,73 65.892702,73 Z M73.0594097,62.3985471 C76.4680437,61.2200182 88.5607213,56.1793944 85.5117743,37.8371245 L81.6924976,37.9360303 C80.8526284,43.134546 77.152648,46.6051883 72.4845099,46.6051883 M24.4062209,60.319036 C24.3904842,60.3191058 24.3747393,60.3191408 24.3589862,60.3191408 C18.6378761,60.3191408 14,55.70958 14,50.0233985 C14,44.3372171 18.6378761,39.7276563 24.3589862,39.7276563 C26.0569266,39.7276563 27.6594543,40.133673 29.0736464,40.8533508 M65.8946819,38.4867877 L31.1652244,38.4844448 M37.6782363,44.9577899 C34.9010396,47.7180312 33.1833077,51.5312691 33.1833077,55.7432553 C33.1833077,59.9552416 34.9010396,63.7684794 37.6782363,66.5287208 M45.4606247,29.0505903 L51.5992831,29.0505903 M48.5299539,26 L48.5299539,31.338533"></path>
                    </g>
                                <label for="name">Name</label>
                </svg>
                <div>
                    <p id="intro-signup" className=" login-form active"><strong>RecipeMe</strong> is even better with&nbsp;an&nbsp;account.</p>
                    <p id="intro-login">Welcome back to<br/><strong>RecipeMe</strong>!</p>
                </div>
            </aside>
            <section>
                <h1>
                    <a id="link-signup" onClick={registerClickHandler} >Sign Up</a>
                    <a id="link-login" onClick={loginClickHandler} >Log In</a>
                </h1>
                <form id="form-signup" className={loginActiveId && 'signup-form active'}>
                    <div>
                        <fieldset>
                            <div>
                                <label for="username">Username</label>
                                <input
                                    value={userdata.username}
                                    name="username"
                                    onChange={handleInputChange}
                                    type="text"
                                    // className="form-control"
                                    placeholder="Example McSample"
                                />
                            </div>
                        </fieldset>
                        <fieldset>
                            <div>
                                <label for="password">Password</label>
                                <input
                                    value={userdata.password}
                                    name="password"
                                    onChange={handleInputChange}
                                    type="password"
                                    // className="form-control"
                                    placeholder="••••••••"
                                />
                            </div>
                        </fieldset>
                    </div>
                    <ul>
                        <li>
                            <button className=" login-form fb">
                                <a  href={`${process.env.REACT_APP_API_SERVER_URL}/api/auth/google`}>Connect with Google</a>
                            </button>
                        </li>
                        <li>
                            <button  className=" login-form tw">
                                <a href={`${process.env.REACT_APP_API_SERVER_URL}/api/auth/facebook`}>Connect with Facebook</a>
                            </button>
                        </li>
                    </ul>
                    
                    <input 
                        type="submit" 
                        value="Sign In"
                        onClick={handleLoginSubmit}
                    />
                </form>
                <form id="form-login" className={registerActiveId && 'login-form active'}>
                    <div>
                    <fieldset>
                            <div>
                                <label for="username">Username</label>
                                <input
                                    value={userdata.username}
                                    name="username"
                                    onChange={handleInputChange}
                                    type="text"
                                    placeholder="Example McSample"
                                />
                            </div>
                        </fieldset>
                        <fieldset>
                            <div>
                                <label for="email">Email</label>
                                <input
                                    value={userdata.email}
                                    name="email"
                                    onChange={handleInputChange}
                                    type="text"
                                    placeholder="example@sample.com"
                                />
                            </div>
                        </fieldset>
                        <fieldset>
                            <div>
                                <label for="password">Password</label>
                                <input
                                    value={userdata.password}
                                    name="password"
                                    onChange={handleInputChange}
                                    type="password"
                                    placeholder="••••••••"
                                />
                            </div>
                        </fieldset>
                        <fieldset>
                            <div>
                                <label for="password">Verify.Password</label>
                                <input
                                    value={userdata.verifyPassword}
                                    name="verifyPassword"
                                    onChange={handleInputChange}
                                    type="password"
                                    placeholder="••••••••"
                                />
                            </div>
                        </fieldset>
                    </div>

                    <ul>
                        <li>
                            <button className=" login-form fb">
                                <a  href={`${process.env.REACT_APP_API_SERVER_URL}/api/auth/google`}>Register with Google</a>
                            </button>
                        </li>
                        <li>
                            <button  className=" login-form tw">
                                <a href={`${process.env.REACT_APP_API_SERVER_URL}/api/auth/facebook`}>Register with Facebook</a>
                            </button>
                        </li>
                    </ul>

                    <input 
                        type="submit" 
                        value="Register Now"
                        onClick={handleRegisterSubmit}
                    />

                </form>
            </section>
        </main>
    )
}


export default Login; 

