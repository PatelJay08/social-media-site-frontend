import './Actions.css'
import AllPostsComponent from './AllPostsComponent'
import LogoutComponent from './LogoutComponent'
import MyPostsComponent from './MyPostsComponent'
import UploadNewPostComponent from './Post/UploadNewPostComponent'

export default function ActionsComponent(props){
    return(
        <div className="actions__maincontainer">
                <UploadNewPostComponent />
                <AllPostsComponent allPosts={props.allPosts} />
                <MyPostsComponent myPosts={props.myPosts} />
                <LogoutComponent />
        </div>
    )
}