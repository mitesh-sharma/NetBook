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
        <div className={`bg-${props.mode === 'light'? 'light':'dark'} container w-25 border border-${props.mode === 'light'? 'dark':'light'} rounded p-3`}>
            <h2 className={`text-center mb-5 text-${props.mode === 'light'? 'dark':'light'}`}><strong>Create new account</strong></h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group my-3">
                    <label htmlFor="exampleInputEmail1" className={`text-${props.mode === 'light'? 'dark':'light'}`}>Name</label>
                    <input type="text" className="form-control" id="name" name = "name" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter name" />
                </div>
                <div className="form-group my-3 ">
                    <label htmlFor="email" className={`text-${props.mode === 'light'? 'dark':'light'}`}>Email address</label>
                    <input type="email" className="form-control" id="email" name = "email" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-secondary">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group my-3 ">
                    <label htmlFor="password" className={`text-${props.mode === 'light'? 'dark':'light'}`}>Password</label>
                    <input type="password" className="form-control" id="password" name = "password" onChange={onChange} placeholder="Password" required minLength={5} />
                </div>
                <div className="text-center">
                    <button type="submit" className={`btn btn-${props.mode === 'light'? 'primary':'secondary'} w-100 mt-2`}>Submit</button>
                </div>
            </form>
        </div>
        <div>
            <p className={`mt-2 text-center text-${props.mode === 'light'? 'dark':'light'}`}>Please note - Servers might be slow, please wait if there is no response after clicking on Submit button. Thank you for your patience.</p>
        </div>
        </>
    )
}

export default Signup