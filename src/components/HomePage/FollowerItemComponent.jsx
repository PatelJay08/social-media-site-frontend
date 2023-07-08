import { Avatar } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function FollowerItemComponent(props){
    
    const userId = JSON.parse(localStorage.getItem("users")).uid

    const [user, setUser] = useState({})
    const [isFollowing, setIsFollowing] = useState(false)
    const [change,setChange] = useState(false)


    useEffect(
        ()=>getData(),[props.length,change,user,isFollowing]
    )

    function getData(){
        axios.get(`http://localhost:8080/users/${props.userId}`)
        .then(
            response =>{
                // console.log(response.data);
                setUser(response.data)
            }
        )

        const payload = {
            id:props.id,
            userId:userId,
            followingUserId:props.userId
        }

        axios.post(`http://localhost:8080/follow/isfollowing`,payload)
        .then(
            response =>{
                // console.log(response.data);
                setIsFollowing(response.data)
            }
        )

    }

    function unfollow(){
        
        const payload ={
            id:null,
            userId:userId,
            followingUserId:props.userId
        }

        axios.post(`http://localhost:8080/follow/deleteRelation`,payload)
        .then(
            response => {
                // console.log(response.data);
                window.location.reload();
                setIsFollowing(response.data)
                setChange(response.data)
                
            }
        )

    }


    function follow(){
        
        const payload = {
            id:null,
            userId:userId,
            followingUserId:props.userId
        }

        axios.post(`http://localhost:8080/follow`,payload)
        .then(
            response =>{
                setIsFollowing(response.data)
                window.location.reload();
            }
        )

    }


    return(
        <div>
            <div className="search__result__container">
                        <div className="__result__container">
                            <div className="__result__profile">
                                <Avatar src={user.profileImage} sx={{ width: 50, height: 50 }} className="__result__profile__img"></Avatar>
                                <div className="__result__profile__details">
                                    <span className="__userId">{user.userName}</span>
                                    <span className="__userName">{user.name}</span>
                                </div>
                            </div>
                            <div>
                                {
                                     isFollowing ?  <button className="follow__btn" onClick={unfollow}>unfollow</button>  : <div><button className="follow__btn" onClick={follow}>follow</button></div>
                               
                                }
                            </div>
                        </div>
                    </div>
        </div>
    )

}