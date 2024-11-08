import {useState} from "react";
import {FaUser} from "react-icons/fa";
import {toast} from "react-toastify";



function Register(){
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2:""
    })

    const {name, email, password,password2} = formData;

    const onChange = (e)=>{
        setFormData((prevState) => ({...prevState, [e.target.name]: e.target.value}));
    }

    const onSubmit = (e)=>{
        e.preventDefault();



        if(password !== password2){
            toast.error("Passwords don't match");
        }

    }


    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser/> Register
                </h1>
                <p>Please create an account</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" name="name" className="form-control" id="name" value={name}
                               onChange={onChange} placeholder="Enter your name" required/>
                    </div>
                    <div className="form-group">
                        <input type="email" name="email" className="form-control" id="email" value={email}
                               onChange={onChange} placeholder="Enter your email" required/>
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" className="form-control" id="password" value={password}
                               onChange={onChange} placeholder="Enter your password" required/>
                    </div>
                    <div className="form-group">
                        <input type="password" name="password2" className="form-control" id="password2" value={password2}
                               onChange={onChange} placeholder="Confirm your password" required/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-block">Register</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register;