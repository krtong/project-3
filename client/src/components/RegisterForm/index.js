import React from "react"; 
// sorry cody i had to disable this because i cant figure out why it's  apply itself to fucking everything.
// import './style-old.css';
// import './style.css'
import axios from 'axios';
import API from "../../utils/API";

class RegisterForm extends React.Component{ 
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


                    <form id="form-login" className="register-form active">
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
                
        )
    }
}

export default RegisterForm; 

