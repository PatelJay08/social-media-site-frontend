import { BrowserRouter, Route, Routes } from "react-router-dom";
import SingInComponent from "./LoginPage/SignInComponent";
import MainContentComponent from "./HomePage/MainContentComponent";
import AuthProvider from "./AuthContext";
import LoginPageComponent from "./LoginPage/LoginPageComponent";
import SignUpComponent from "./LoginPage/SingUpComponent";
import MyPostsPageComponent from "./HomePage/MyPostsPageComponent";

export default function MainComponent() {

    return (
        <div>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LoginPageComponent />} />
                        <Route path="/signup" element={<SignUpComponent />} />
                        <Route path="/home" element={<MainContentComponent myPosts={false} />} />
                        <Route path="/allposts" element={<MainContentComponent myPosts={false} allPosts={true} />} />
                        <Route path="/myposts" element={<MainContentComponent myPosts={true}/>}  />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}