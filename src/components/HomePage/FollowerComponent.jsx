import axios from "axios"
import { useEffect, useState } from "react";
import FollowerItemComponent from "./FollowerItemComponent";

export default function FollowerComponent(props){

    const userId = JSON.parse(localStorage.getItem("users")).uid

    const [followers, setFollowers] = useState([])
    const [user, setUser] = useState({})


    useEffect(
        () => getData(), []
    )

    function getData() {

        axios.get(`http://localhost:8080/follow/followers/${userId}`)
            .then(
                response => {
                    setFollowers(response.data)
                }
            )
            .catch(
                error => {
                    console.log(error);
                }
            )
    }

    return(
        <div>
            <div className="following__title">
                Followers :
            </div>
            <div className="following__main_container">
                {
                    followers.map((item) => {
                        return <div> <FollowerItemComponent key={item.id} userId={item.userId} length={followers.length} /> </div>

                    })
                }
                {/* <button onClick={upadate}>update</button> */}
            </div>
        </div>
    )
}