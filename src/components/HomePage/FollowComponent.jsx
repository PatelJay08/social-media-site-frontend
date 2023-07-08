import { Avatar } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import FollowingComponent from "./FollowingComponent";
import FollowerComponent from "./FollowerComponent";


export default function FollowComponent(props) {

    const userId = JSON.parse(localStorage.getItem("users")).uid

    const [userName, setUserName] = useState(null)
    const [user, setUser] = useState({})
    const [searched, setSearched] = useState(false)
    const [follows, setFollows] = useState(false)

    function search() {

        axios.get(`http://localhost:8080/users/search/${userName}`)
            .then(
                response => {
                    // console.log(response.data);
                    setUser(response.data)
                    setSearched(true)

                }
            )

        const usersend = {
            id: null,
            userId: props.userId,
            followingUserId: user.userId
        }

        axios.post(`http://localhost:8080/follow/isfollowing`, usersend)
            .then(
                response => {
                    console.log(response.data);
                    setFollows(response.data)
                }
            )
    }

    function follow() {
        if (user.userId === props.userId || user.userId === null || user.userId === undefined) {
            return
        }
        else {

            const payload = {
                id: null,
                userId: props.userId,
                followingUserId: user.userId
            }

            axios.post(`http://localhost:8080/follow`, payload)
                .then(
                    response => {
                        console.log(response.data);

                    }
                )

            window.location.reload()
        }
    }

    function unfollow(){
        const payload ={
            id:null,
            userId:userId,
            followingUserId:user.userId
        }

        axios.post(`http://localhost:8080/follow/deleteRelation`,payload)
        .then(
            response => {
                // console.log(response.data);
                window.location.reload();

            }
        )
    }

    return (
        <div className="main__container__">
            <div className="search__container">
                <div className="search_box">
                    <input className="search__box__" onChange={(event) => setUserName(event.currentTarget.value)} type="text" placeholder="Enter User Id" ></input>
                    <button className="search__btn" onClick={search}>Search</button>
                </div>
                {
                    searched &&

                    <div className="search__result__container">
                        <div className="__result__container_">
                            <div className="__result__profile">
                                <Avatar src={user.profileImage} sx={{ width: 50, height: 50 }} className="__result__profile__img"></Avatar>
                                <div className="__result__profile__details">
                                    <span className="__userId">{user.userName}</span>
                                    <span className="__userName">{user.name}</span>
                                </div>
                            </div>
                            <div>
                                {
                                   !follows ? <button className="follow__btn" onClick={follow}>Follow</button> : 
                                            <button className="follow__btn" onClick={unfollow} >Unfollow</button>
                                }
                            </div>
                        </div>
                    </div>
                }
                <FollowingComponent />
                <FollowerComponent />
            </div>
            <div>
            </div>
        </div>
    )
}