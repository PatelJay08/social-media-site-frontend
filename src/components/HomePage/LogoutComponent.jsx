import { useNavigate } from 'react-router-dom'
import logoutImage from '../../images/log-out.png'

export default function LogoutComponent(){

    const navigate = useNavigate()

    function logout(){
        navigate("/")
    }

    return(
        <div className="main_container">
            <div className="fileupload">
                <label htmlFor="log-out" >
                    
                    <img className="home__img" src={logoutImage} /> 
                    
                </label>
                
                     <button id="log-out" className='my-posts_btn' onClick={logout} type='hidden' /> 
                
            </div>
        </div>
    )
}