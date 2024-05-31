import React, { useContext, useEffect,useState } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/Context';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { PostContext } from '../../store/Post';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
function Posts({searchQuery}) {

  const {firebase} = useContext(FirebaseContext)
  const [products,setProducts] = useState([])
  const {setDetails} = useContext(PostContext)
  const history = useHistory()
  useEffect(() => {
    getDocs(collection(db, "products"))
     .then((querySnapshot) => {
        const allPosts = querySnapshot.docs.map((doc) => ({
         ...doc.data(),
          id: doc.id,
        }));
      setProducts(allPosts)
      })
     .catch((error) => {
        console.error("Error getting documents: ", error);
      });
  });
  const filteredProducts = searchQuery
    ? products.filter((product) =>
        // product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
        { filteredProducts.map(product=>{
           return <div
           className="card"
           onClick={()=>{
            console.log(product);
            setDetails(product)
            history.push('/view')
           }}
         >
           <div className="favorite">
             <Heart></Heart>
           </div>
           <div className="image">
             <img src={product.imageUrl} alt="" />
           </div>
           <div className="content">
             <p className="rate">&#x20B9; {product.price}</p>
             <span className="kilometer">{product.category}</span>
             <p className="name">{product.name}</p>
           </div>
           <div className="date">
             <span>{product.createAt}</span>
           </div>
         </div>
        })
          
      }
        </div>
      </div>
      {/* <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Posts;
