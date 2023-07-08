import { Avatar, Grid } from "@mui/material";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { storage } from "../firebase";
import axios from "axios";
import uploadimage from '../../images/upload1.png'
import { useEffect, useState } from "react";

export default function UserProfileComponent(props) {


    const userId = JSON.parse(localStorage.getItem("users")).uid

    const [followers, setFollowers] = useState(0)
    const [followings, setFollowings] = useState(0)

    useEffect(
        () => getData(), []
    )

    function getData() {
        axios.get(`http://localhost:8080/follow/${userId}`)
            .then(
                response => {
                    setFollowings(response.data.length)
                }
            )

        axios.get(`http://localhost:8080/follow/followers/${userId}`)
            .then(
                response => {
                    setFollowers(response.data.length)

                }
            )
    }

    function upload(event) {
        let image = event.target.files[0]
        if (image === null || image === undefined)
            return

        const storageref = ref(storage, image.name)
        var uploadTask = uploadBytesResumable(storageref, image)
        uploadTask.on(
            "stage_changed",
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);

                    let payload = {
                        "userId": userId,
                        "userName": props.user.userName,
                        "name": props.user.name,
                        "profileImage": downloadURL,
                    }

                    axios.put(`http://localhost:8080/users/${userId}`, payload)
                        .then(
                            response => {
                                window.location.reload()
                            }
                        )

                })
            }
        )
    }

    return (
        <div className="main__container">
            <div>
                <h3>My Profile </h3>
            </div>
            <div className="profile__container">
                <div className="profile__img__conatiner">
                    <Avatar sx={{ width: 100, height: 100 }} className="profile__img" src={props.user.profileImage}></Avatar>
                </div>
            </div>
            <div className="profile__details">
                <span className="user__name">{props.user.userName}</span>
                <span>{props.user.name}</span>
                <span className="bold">Followers :{followers}</span>
                <span className="bold">Followings:{followings}</span>
                <div className="fileupload">
                    <label htmlFor="upload-profile" >
                        <img className="mainpage__uploadicon" src={uploadimage} />
                    </label>
                    <input onChange={upload} id="upload-profile" type="file" />
                </div>
                <span>change profile picture</span>
            </div>
        </div>
    )
}