import axios from "axios"
import { useEffect, useState } from "react";
import FollowingItemComponent from "./FollowingItemComponent";


export default function FollowingComponent(props) {

    const userId = JSON.parse(localStorage.getItem("users")).uid

    const [following, setFollowing] = useState([])
    const [user, setUser] = useState({})


    useEffect(
        () => getData(), [following.length]
    )

    function getData() {

        axios.get(`http://localhost:8080/follow/${userId}`)
            .then(
                response => {
                    console.log(userId);
                    console.log(response.data);
                    setFollowing(response.data)
                }
            )
            .catch(
                error => {
                    console.log(error);
                }
            )
    }

    return (
        <div>
            <div className="following__title">
                Following :
            </div>
            <div className="following__main_container">
                {
                    following.map((item) => {
                        return <div> <FollowingItemComponent key={item.id} userId={item.followingUserId} length={following.length} /> </div>

                    })
                }
                {/* <button onClick={upadate}>update</button> */}
            </div>
        </div>
    )
}