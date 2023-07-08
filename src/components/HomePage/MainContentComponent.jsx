import { useEffect, useState } from "react";
import PostComponent from "./Post/PostComponent";
import axios from "axios";
import { Grid } from "@mui/material";

import './MainContent.css'
import UserProfileComponent from "./UserProfileComponent";
import FollowComponent from "./FollowComponent";
import ActionsComponent from "./ActionsComponent";


export default function MainContentComponent(props) {

    const userId = JSON.parse(localStorage.getItem("users")).uid

    const [posts, setPosts] = useState([])
    const [user, setUser] = useState({})

    useEffect(
        () => getPost(), [props.myPosts,props.allPosts]
    )

    // console.log(props.myPosts);

    function getPost() {

        if(props.allPosts){
            axios.get(`http://localhost:8080/posts`)
            .then(
                response => {
                    setPosts(response.data)
                    console.log(response.data);
                }
            )
        }

        else if (props.myPosts) {
            // console.log(props.myPosts);
            axios.get(`http://localhost:8080/posts/myposts/${userId}`)
                .then(
                    response => {
                        setPosts(response.data)
                        console.log(response.data);
                        // window.location.reload()
                    }
                )
        }

        else{
            // console.log(props.myPosts);
            axios.get(`http://localhost:8080/posts/${userId}`)
                .then(
                    response => {
                        setPosts(response.data)
                        console.log(response.data);
                    }
                )
        }


        axios.get(`http://localhost:8080/users/${userId}`)
            .then(
                response => {
                    setUser(response.data)
                }
            )

    }

    return (
        <div>
            <div>
                {/* <UploadNewPostComponent /> */}
                <ActionsComponent user={user} myPosts={props.myPosts} allPosts={props.allPosts} />
                <Grid container>
                    <Grid item xs={3}>
                        <UserProfileComponent user={user} />
                    </Grid>
                    <Grid item xs={5}>
                        {
                            posts.map((item) => {
                                return <div key={item.postId}> <PostComponent userId={item.userId} postId={item.postId} likeCount={item.likeCount} userName={item.userName} postPath={item.postPath} myPosts={props.myPosts} post={item} /> <br /></div>
                            })
                        }
                    </Grid>
                    <Grid item xs={4}>
                        {
                            props.myPosts && <FollowComponent userId={userId} />
                        }
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}