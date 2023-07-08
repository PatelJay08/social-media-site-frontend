import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import './SignIn.css'


export default function SingInComponent(props) {

    const [emailId, setEmailId] = useState(null)
    const [password, setPassword] = useState(null)
    const navigate = useNavigate()

    function handleSubmit() {
        signInWithEmailAndPassword(auth, emailId, password)
            .then((userCredential) => {
                var user = userCredential.user;

                localStorage.setItem("users", JSON.stringify(user));
                // window.location.reload();

                navigate("/home")


            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });

    }

    function signup(){
        navigate(`/signup`)
    }

    return (
        <div>
            <input type="text" className="logipage__text" onChange={(event) => setEmailId(event.currentTarget.value)} placeholder="Phone number, username, or email" />
            <input className="logipage__text" onChange={(event) => setPassword(event.currentTarget.value)} type="password" placeholder="Password" />
            <button type="submit" className="login__button" onClick={handleSubmit}>Log In</button>
            <br></br>
            <button className="login__button" onClick={signup}>Sign Up</button>
        </div>
    )
}