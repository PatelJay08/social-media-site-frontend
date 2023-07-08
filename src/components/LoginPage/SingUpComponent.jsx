import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import './SignUp.css'
import axios from "axios";

export default function SignUpComponent(){

    const [emailId, setEmailId] = useState(null)
    const [password, setPassword] = useState(null)
    const [userName,setUserName] = useState(null)
    const [name,setName] = useState(null)

    const navigate = useNavigate()

    function handleSubmit() {
        createUserWithEmailAndPassword(auth, emailId, password)
            .then((userCredential) => {
                var user = userCredential.user;

                let payload = {
                    "userId": user.uid,
                    "userName": userName,
                    "name": name,
                    "profileImage": ""
                }

                axios.post(`http://localhost:8080/users`,payload)
                .then(
                    response => {
                        console.log(response);
                    }
                )
                
                // localStorage.setItem("users", JSON.stringify(user));
                // window.location.reload();

                navigate("/signup")

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });

    }

    return (
        <div className="main_component">
            <input type="text" className="logipage__text" onChange={(event) => setEmailId(event.currentTarget.value)} placeholder="email" />
            <input type="text" className="logipage__text" onChange={(event) => setUserName(event.currentTarget.value)} placeholder="username" />
            <input type="text" className="logipage__text" onChange={(event) => setName(event.currentTarget.value)} placeholder="name" />
            <input className="logipage__text" onChange={(event) => setPassword(event.currentTarget.value)} type="text" placeholder="Password" />
            <button type="submit" className="login__button" onClick={handleSubmit}>Sign Up</button>
        </div>
    )
}