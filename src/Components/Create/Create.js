import React, { Fragment, useContext, useEffect, useState } from 'react';
import './Create.css';
import {FirebaseContext,AuthContext} from '../../store/Context'
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { collection, addDoc } from "firebase/firestore"; 
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { db,storage} from '../../firebase/config';
import Header from '../Header/Header';

const Create = () => {
  const {firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
  
  
 

  const history = useHistory()
  const [name,setName] = useState('');
  const [category,setCategory] = useState('')
  const [price,setPrice] = useState(null)
  const [image,setImage] = useState(null)
  const date = new Date()
  let imageUrl;
  const handlesubmit=()=>{
    if (!name || !category || !price) {
      alert("Please enter the details");
      return;
    }
    const trimmedName = name.trim();
    const trimmedCategory = category.trim();
    const trimmedPrice = price.trim();

   
    if (!trimmedName || !trimmedCategory || !trimmedPrice) {
      alert("Please enter correct details");
      return;
    }
    if (price<=0){
      alert("Please Enter correct price")
      return; 
    }
    if (image === null || !image) {
      alert("Please select an image");
      return;
    }
   
    const imageRef = storageRef(storage, `image/${image.name}`);
    uploadBytes(imageRef, image)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
          
              setImage(url);
              imageUrl = url
           
          }).then(()=>{
           
            addDoc(collection(db,"products"),{
            
            name,
            category,
            price,
            imageUrl,
            userId:user.uid,
            createAt:date.toDateString()

            })
            
           history.push('/') 
          }).catch((error) => {
            console.log(error.messege)
          });
          
      }).catch((error) => {
        console.log(error.message);
      })
     
     
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
         
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
              id="fname"
              name="Name"
              required
              
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e)=>{setCategory(e.target.value)}}
              id="fname"
              name="category"
              required
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number"  placeholder='enter price' min={1} id="fname" value={price}  onChange={(e)=>{setPrice(e.target.value)}} name="Price" required />
            <br />
          
          <br />
          <img alt="Posts"   accept="image/png,image/jpeg" width="200px" height="200px" src={image ? URL.createObjectURL(image):''}></img>
        
            <br />
            <input  onChange= {(e)=>{setImage(e.target.files[0])}} type="file" />
            <br />
            <button onClick={handlesubmit} className="uploadBtn">upload and Submit</button>
         
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
