import React, { useState } from "react"
import { collection, addDoc } from "firebase/firestore"
import { db } from "../Components/Firebase"
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage"

function AdminPanel() {
  const [Title, setTitle] = useState("")
  const [Price, setPrice] = useState("")
  const [Image, setImage] = useState(null)
  const [Url, setUrl] = useState("")
  const [Progress, setProgress] = useState(0)
  const [Message, setMessage] = useState("")
  const [ErrorMessage, setErrorMessage] = useState("")
  const [Flag, setFlag] = useState()

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const submit = (e) => {
    e.preventDefault()

    if (!Title || !Price || !Image) {
      setErrorMessage("please fill all the fields")
    } else {
      console.log("hittibg")

      setFlag("wait -- uploading the product details")

      const storage = getStorage()

      const storageRef = ref(storage, `Images/${Image.name}`)

      const uploadTask = uploadBytesResumable(storageRef, Image)

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log("Upload is " + progress + "% done")

          // switch (snapshot.state) {
          //   case 'paused':
          //     console.log('Upload is paused');
          //     break;
          //   case 'running':
          //     console.log('Upload is running');
          //     break;
          // }
        },
        (error) => {
          // Handle unsuccessful uploads
          alert("error while uploading image", error)
        },
        () => {
          console.log("Uploaded a blob or file!")
          setMessage("image uploaded successfully")
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL)
            addDoc(collection(db, "products"), {
              title: Title,
              price: Price,
              productImg: downloadURL,
            }).then((succs) => {
              if (succs) {
                console.log(succs.id)
                setFlag("uploaded")
                alert(
                  "product details uploaded successfully ,now you can visit homepage to see the product"
                )
              }
            })
          })

          // Add a new document with a generated id.
        }
      )
    }
  }

  // 'file' comes from the Blob or File API
  // uploadBytes(storageRef, Image).then((snapshot) => {
  //   if(snapshot) {

  //     console.log('Uploaded a blob or file!');

  //   }

  //   else {
  //     console.log('no')
  //   }

  // });

  // const storage = getStorage();

  // const uploadTask = storage.ref(`Images/${image.name}`).put(image);
  //   uploadTask.on(
  //     "state_changed",
  //     snapshot => {
  //       const progress = Math.round(
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //       );
  //       setProgress(progress);
  //     },
  //     error => {
  //       console.log(error);
  //     },
  //     () => {
  //       storage
  //         .ref("images")
  //         .child(image.name)
  //         .getDownloadURL()
  //         .then(url => {
  //           setUrl(url);
  //         });
  //     }
  //   );

  // Add a new document with a generated id.
  //  addDoc(collection(db, "products"), {
  //     title: Title,
  //     price:Price
  //   }).then((succs)=>   {

  //     console.log(succs.id)

  //   })
  //   console.log("Document written with ID: ", docRef.id);

  return (
    <form>
      {ErrorMessage}

      <h2> upload product details </h2>

      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">
          product title
        </label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">
          product price
        </label>
        <input
          type="name"
          class="form-control"
          id="exampleInputPassword1"
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">
          product image
        </label>
        &nbsp; &nbsp; &nbsp;
        <input type="file" onChange={handleChange} />
        {Message}
      </div>

      {Url}

      <button class="btn btn-primary" onClick={(e) => submit(e)}>
        Submit
      </button>

      {Flag}
    </form>
  )
}

export default AdminPanel
