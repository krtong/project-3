import React from "react"; 
// import './style.css'
import axios from 'axios';
import API from "../../utils/API";

class LoginForm extends React.Component{ 
    constructor(){
        super()
        this.state = {
            username: "",
            password: ""
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
                    console.log(response)
                    if (response.data) {
                        console.log('Successful signup!');
                        this.setState({
                            redirectTo: '/'
                        })
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
        )
    }
}

export default LoginForm; 

