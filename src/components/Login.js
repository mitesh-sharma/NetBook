import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"", password:""});
    const navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("https://netbook-backend.onrender.com/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password}),
        });
        const json = await response.json()

        if(json.success){
            //save the authtoken and redirect
            localStorage.setItem('token', json.authToken);
            props.showAlert("Welcome", "success")
            navigate("/");
        }
        else{
            props.showAlert("Invalid Credentials", "danger");
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
        <div className='container w-25 border border-dark rounded'>
            <h2 className='text-center mt-3 mb-5'><strong>Login</strong></h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group my-3">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name="password" placeholder="Password" />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary my-3 w-100">Login</button>
                </div>
            </form>
        </div>
        <div>
            <p className='text-center'>Please note - Servers might be slow, please wait if there is no response after clicking on Login button. Thank you for your patience.</p>
        </div>
        </>
    )
}

export default Login