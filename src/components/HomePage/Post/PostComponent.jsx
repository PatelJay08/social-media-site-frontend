import { Avatar } from "@mui/material";
import './Post.css'
import love from '../../../images/love.svg'
import share from '../../../images/share.svg'
import message from '../../../images/message.svg'
import comment from '../../../images/comment.svg'
import { useEffect, useState } from "react";
import axios from "axios";

import deleteImage from '../../../images/delete.png'

export default function PostComponent(props) {

    const userId = JSON.parse(localStorage.getItem("users")).uid

    const [comments, setComments] = useState([])
    const [postProfile, setPostProfile] = useState(null)
    const [liked, setLiked] = useState(true)

    useEffect(
        () => getComments(), []
    )

    function getComments() {
        axios.get(`http://localhost:8080/comments/${props.postId}`)
            .then(
                response => {
                    // console.log(response.data);
                    setComments(response.data)
                }
            )

        axios.get(`http://localhost:8080/users/${props.userId}`)
            .then(
                respone => {
                    // console.log(respone.data);
                    setPostProfile(respone.data.profileImage)
                }
            )
    }

    function keyPressed(event) {
        if (event.key === 'Enter') {
            console.log("pressed");
            let comment = event.currentTarget.value;
            if (comment !== null || comment !== undefined) {

                let payload = {
                    "commentId": Math.floor(Math.random() * 1000000).toString(),
                    "userId": userId,
                    "postId": props.postId,
                    "timeStamp": new Date().getTime(),
                    "comment": comment
                }

                axios.post(`http://localhost:8080/comments`, payload)
                    .then(
                        response => {
                            // console.log(response.data);
                            window.location.reload();

                        }
                    )
            }
        }
    }

    function like() {
        // console.log("liked");
        if (liked !== true) {
            let payload = {
                "postId": props.postId,
                "userId": "userId",
                "postPath": "downloadURL",
                "timeStamp": "",
                "likeCount": 1
            }

            axios.post(`http://localhost:8080/posts/disliked`, payload)
                .then(
                    response => {
                        window.location.reload()
                    }
                )
            console.log("disliked");
            setLiked(true)

        }
        else {
            let payload = {
                "postId": props.postId,
                "userId": "userId",
                "postPath": "downloadURL",
                "timeStamp": "",
                "likeCount": 1
            }

            axios.post(`http://localhost:8080/posts/liked`, payload)
                .then(
                    response => {
                        window.location.reload()
                    }
                )
            setLiked(false)

            console.log("liked");

        }
    }

    function deletePost(){
        console.log(props.post);

        axios.post(`http://localhost:8080/posts/delete`,props.post)
        .then(
            respone =>{
                window.location.reload()
            }
        )
    }

    return (
        <div>
            <div className="post__container">
                <div className="post__header">
                    <Avatar sx={{ height: 50, width: 50 }} src={postProfile}></Avatar>
                    <span>{props.userName}</span>
                    {
                        props.myPosts && <button onClick={deletePost} className="edit-btn"><img className="edit-btn-img" src={deleteImage}></img></button>
                    }
                </div>
                <div className="post__content">
                    <img alt="??" src={props.postPath} width="550"></img>
                </div>
                <div className="post__reactions">
                    <img alt="??" src={love} className="like__icon"></img>
                    <img alt="??" src={message}></img>
                    <img alt="??" src={comment}></img>
                    <img alt="??" src={share}></img>
                </div>
                <div className="likes">
                    <span>{props.likeCount}likes</span>
                </div>
                <div className="post__comments">

                    <div className="comment__list">
                        {

                            comments.map((item, index) => {
                                return index < 4 ? <div className="comments" key={item.commentId}><span className="bold">{item.userName} : </span> {item.comment}</div> : <span key={item.commentId}></span>
                            })
                        }
                    </div>
                    <div className="commentbox__div">
                        <input type="text" className="post__commentbox" placeholder="Press Enter to send" onKeyDown={keyPressed}></input>
                    </div>
                </div>
            </div>
        </div>
    )
}