import React from "react"; 
// sorry cody i had to disable this because i cant figure out why it's  apply itself to fucking everything.
// import './style-old.css';
import './style.css'
import axios from 'axios';
import API from "../../utils/API";
import { BrowserRouter as Redirect} from "react-router-dom";


class Login extends React.Component{ 
    constructor(){
        super()
        this.state = {
            username: "",
            password: "",
            redirect: false
        }
    } 

    // handle any changes to the input fields
    handleInputChange = event => {
        // Pull the name and value properties off of the event.target (the element which triggered the event)
        const { name, value } = event.target;
        // Set the state for the appropriate input field
        this.setState({
            [name]: value
        });
    };

    redirectRender = () => {
        // console.log("are we in redirectRender?")
        const { redirect } = this.state;
        // console.log(redirect);
        if (redirect) {
            // console.log("is this run?")
            // return <Redirect to='/' />
            this.props.history.push("/");
        }
    }

    handleFormSubmit = event => {
        // Preventing the default behavior of the form submit (which is to refresh the page)
        event.preventDefault();
        if (!this.state.username || !this.state.password) {
            alert("Fill out all fields please!");
        } else if (this.state.password.length < 6) {
            alert(`Choose a more secure password ${this.state.firstName} ${this.state.lastName}`);
        } else {
            alert(`Hello ${this.state.username}, your password: ${this.state.password}`);
            axios.post('/api/auth/login', {
                username: this.state.username,
                password: this.state.password
            })
                .then(response => {
                    // console.log("THIS ONE?",response)
                    if (response.data) {
                        console.log('Successful signup!');
                        this.setState({
                            redirect: true
                        })
                        this.redirectRender();
                    } else {
                        console.log('Signup error')
                    }
                }).catch(err => {
                    console.log('Sign up server error: ')
                    console.log(err)
                })
        }
    }

    handleGoogleSubmit = event => {
        event.preventDefault();
        console.log("are we here, before the api call")
        // axios.get('/api/auth/google');
        API.googleLogin();
    }

    render() {
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
                        <a id="link-signup" className=" login-form active">Sign Up</a>
                        <a id="link-login">Log In</a>
                    </h1>
                    <form id="form-signup" className="login-form active">
                        <div>
                            <fieldset>
                                <div>
                                    <label for="username">Username</label>
                                    <input
                                        value={this.state.username}
                                        name="username"
                                        onChange={this.handleInputChange}
                                        type="text"
                                        // className="form-control"
                                        placeholder="Example McSample"
                                    />
                                </div>
                            </fieldset>
                            {/* <fieldset>
                                <div>
                                    <label for="email">Email</label>
                                    <input
                                        value={this.state.email}
                                        name="email"
                                        onChange={this.handleInputChange}
                                        type="text"
                                        // className="form-control"
                                        placeholder="example@sample.com"
                                    />
                                </div>
                            </fieldset> */}
                            <fieldset>
                                <div>
                                    <label for="password">Password</label>
                                    <input
                                        value={this.state.password}
                                        name="password"
                                        onChange={this.handleInputChange}
                                        type="password"
                                        // className="form-control"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </fieldset>
                        </div>
                        <ul>
                            <li>
                                {/* may need to go back and fix the route - for deployment? */}
                                {/* <button className=" login-form fb" onClick={this.handleGoogleSubmit}>Connect with Google</button> */}
                                <button className=" login-form fb">
                                    <a  href="http://localhost:3001/auth/google">Connect with Google</a>
                                </button>
                            </li>
                            <li>
                                <button  className=" login-form tw">
                                    <a href="http://localhost:3001/auth/facebook">Connect with Facebook</a>
                                </button>
                            </li>
                        </ul>
                        
                        <input 
                            type="submit" 
                            value="Sign Up"
                            onClick={this.handleFormSubmit}
                        />
                    </form>
                    <form id="form-login">
                        <div>
                            <fieldset>
                                <div>
                                    <label for="email">Email</label>
                                    <input id="email" type="email" placeholder="marcia@polo.com"/>
                                </div>
                            </fieldset>
                            <fieldset>
                                <div>
                                    <label for="password">Password</label>
                                    <input id="password" type="password" placeholder="••••••••"/>
                                </div>
                            </fieldset>
                        </div>
            
                        <ul>
                            <li>
                                <button className=" login-form fb" href="/">EHLLOLOLOLO</button>
                            </li>
                            <li>
                                <button className=" login-form tw">Connect with Twitter</button>
                            </li>
                        </ul>
                        
                        <input type="submit" value="Log In"/>
                    </form>
                </section>
            </main>
        )
    }
}

export default Login; 

