import { Avatar } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";


export default function FollowingItemComponent(props){
    
    const [user, setUser] = useState({})
    const userId = JSON.parse(localStorage.getItem("users")).uid

    const [change,setChange] = useState(false)


    useEffect(
        ()=>getData(),[user,change,props.length]
    )

    function getData(){
        axios.get(`http://localhost:8080/users/${props.userId}`)
        .then(
            response =>{
                // console.log(response.data);
                setUser(response.data)
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
                // setChange(response.data)
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
                                <button className="follow__btn" onClick={unfollow}>Unfollow</button>
                            </div>
                        </div>
                    </div>
        </div>
    )
}