import { useNavigate } from 'react-router-dom'
import postImage from '../../images/post.png'
import homeImage from '../../images/home-button.png'

export default function AllPostsComponent(props) {

    const navigate = useNavigate()

    function gotoAllPosts() {
        navigate("/allposts")
    }

    function gotoHome(){
        navigate("/home")
    }

    return (
        <div className="main_container">
            <div className="fileupload">
                <label htmlFor="all-posts" >
                    {
                        !props.allPosts ? <img className="home__img" src={postImage} /> :
                            <img className="home__img" src={homeImage} />
                    }
                </label>
                {
                    !props.allPosts ? <button id="all-posts" className='my-posts_btn' onClick={gotoAllPosts} type='hidden' /> :
                        <button id="all-posts" className='my-posts_btn' onClick={gotoHome} type='hidden' />
                }
            </div>
        </div>
    )
}

{/* <label htmlFor="my-posts" >
{
    !props.myPosts ? <img className="home__img" src={profileImage} /> :
        <img className="home__img" src={homeImage} />
}
</label>
{
!props.myPosts ? <button id="my-posts" className='my-posts_btn' onClick={gotoMyPosts} type='hidden' /> :
    <button id="my-posts" className='my-posts_btn' onClick={gotoHome} type='hidden' />
} */}