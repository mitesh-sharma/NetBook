import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"", email:"", password:"", cpassword:""});
    let navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const {name, email, password} = credentials;
        const response = await fetch("https://netbook-backend.onrender.com/api/auth/createuser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({name, email, password}),
        });
        const json = await response.json()
        console.log(json)

        if(json.success){
            //save the authtoken and redirect
            localStorage.setItem('token', json.authToken);
            navigate("/");
            props.showAlert("Account created successfully", "success");
        }
        else{
            props.showAlert("Invalid Details", "danger");
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
        <div className='container w-25 border border-dark rounded'>
            <h2 className='text-center mt-3 mb-5'><strong>Create new account</strong></h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group my-3">
                    <label htmlFor="exampleInputEmail1">Name</label>
                    <input type="text" className="form-control" id="name" name = "name" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter name" />
                </div>
                <div className="form-group my-3 ">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name = "email" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group my-3 ">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name = "password" onChange={onChange} placeholder="Password" required minLength={5} />
                </div>
                <div className="form-group my-3">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name = "cpassword" onChange={onChange} placeholder="Password" required minLength={5} />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary w-100">Submit</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default Signup