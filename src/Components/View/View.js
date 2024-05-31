import React, { useContext, useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { collection, query, where, getDocs} from "firebase/firestore";
import './View.css';
import { PostContext } from '../../store/Post';
import { FirebaseContext } from '../../store/Context';


function View() {
  const [userDetails,setUserDetails] = useState()
  console.log(userDetails,"user")
  const {postsDetails} = useContext(PostContext)
  console.log(postsDetails,"post")
  const {firebase} = useContext(FirebaseContext)
  
  useEffect(()=>{
    if (postsDetails && postsDetails.userId) {
    const{userId} = postsDetails
    const collectionRef = collection(db, 'users');
    const q = query(collectionRef, where("userv", "==", userId));
    

    getDocs(q).then(docRefs => {
        docRefs.forEach(doc => {
          setUserDetails(doc.data())
          console.log(doc.data)
        });
    }).catch(error => {
        console.error("Error fetching documents:", error);
    });
  }
    
  },[postsDetails,db])

  return (
    <>
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postsDetails.imageUrl}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postsDetails.price}</p>
          <span>{postsDetails.name}</span>
          <p>{postsDetails.category}</p>
          <span>{postsDetails.createAt}</span>
        </div>
      { userDetails &&   <div className="contactDetails">
        <h4>user Details</h4>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
          {/* <p>{}</p> */}
        </div>}
      </div>
    </div>
    </>
  );
}

export default View;
