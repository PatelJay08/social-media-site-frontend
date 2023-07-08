import { storage } from "../../firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import axios from "axios";
import uploadimage from '../../../images/image.png'
import './Upload.css'

export default function UploadNewPostComponent() {

    const userId = JSON.parse(localStorage.getItem("users")).uid

    function uploadpost(event) {
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
                        "postId": Math.floor(Math.random() * 100000).toString(),
                        "userId": userId,
                        "postPath": downloadURL,
                        "timeStamp": new Date().getTime(),
                        "likeCount": 0
                    }

                    axios.post(`http://localhost:8080/posts`, payload)
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
        <div className="main_container">
            <div className="fileupload">
                <label htmlFor="file-upload" >
                    <img className="upload-img" src={uploadimage} />
                </label>
                <input onChange={uploadpost} id="file-upload" type="file" />
            </div>
        </div>
    )
}