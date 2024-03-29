import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';
import Spinner from './loader'

const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"", password:""});
    const [load, setLoad] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoad(true);
        const response = await fetch("https://netbook-backend.onrender.com/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password}),
        });
        const json = await response.json()
        setLoad(false);
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
        <div className={`container col-lg-4 col-md-6 col-sm-8 border border-${props.mode === 'light' ? 'dark' : 'light'} rounded bg-${props.mode === 'light' ? 'light' : 'dark'} mx-auto`}>
            <h2 className={`text-center mt-3 mb-5 text-${props.mode === 'light'? 'dark':'light'}`}><strong>Login</strong></h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group my-3">
                    <label htmlFor="email" className={`text-${props.mode === 'light'? 'dark':'light'}`}>Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-secondary">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="password"className={`text-${props.mode === 'light'? 'dark':'light'}`}>Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name="password" placeholder="Password" />
                </div>
                <div className="text-center">
                    <button type="submit" className={`btn btn-${props.mode === 'light'? 'primary':'secondary'} w-100 my-3`}>Login</button>
                </div>
            </form>
        </div>
        <div className='text-center'>
            {load ? <Spinner /> :  ""}
        </div>
        </>
    )
}

export default Login