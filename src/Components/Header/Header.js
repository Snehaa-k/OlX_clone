import React,{useContext} from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { getAuth, signOut } from 'firebase/auth';


function Header({ searchQuery, setSearchQuery }) {
  const history = useHistory()

  const {user} = useContext(AuthContext)
  const firebase = useContext(FirebaseContext)
  
 
  return ( 
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span>{user? user.displayName:<button  onClick={()=>{history.push('/login')}}>Login</button>}</span>
          <hr />
        </div>
         { user && <span onClick={()=>{const auth = getAuth();
         signOut(auth)
          history.push('/login')
         }}><button >Logout</button></span>}
        {user && <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span onClick={()=>{history.push('/create')}}>SELL</span>
          </div>
        </div>}
      </div>
    </div>
  );
}

export default Header;
