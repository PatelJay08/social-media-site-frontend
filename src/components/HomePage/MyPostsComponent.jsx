import { Navigate, useNavigate } from 'react-router-dom'
import uploadimage from '../../images/upload.png'
import homeImage from '../../images/home-button.png'
import profileImage from '../../images/profile.png'

export default function MyPostsComponent(props) {

    const navigate = useNavigate()

    function gotoMyPosts() {
        navigate("/myposts")
    }

    function gotoHome(){
        navigate("/home")
    }

    return (
        <div className="main_container">
            <div className="fileupload">
                <label htmlFor="my-posts" >
                    {
                        !props.myPosts ? <img className="home__img" src={profileImage} /> :
                            <img className="home__img" src={homeImage} />
                    }
                </label>
                {
                    !props.myPosts ? <button id="my-posts" className='my-posts_btn' onClick={gotoMyPosts} type='hidden' /> :
                        <button id="my-posts" className='my-posts_btn' onClick={gotoHome} type='hidden' />
                }
            </div>
        </div>
    )
}