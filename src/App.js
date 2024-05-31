import './App.css';
import Home from './Pages/Home';
import { useEffect,useContext } from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import { AuthContext, FirebaseContext } from './store/Context';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Create  from './Pages/Create'
import View from './Pages/ViewPost'
import Post, { PostContext } from './store/Post'


function App() {
  const {setUser} = useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)
  useEffect(()=>{
        const auth = getAuth()
        onAuthStateChanged(auth,(user)=>{
        
          setUser(user)
       
       })
})
  return (
    <div>
    <Post>
      <Router>
        <Route exact path='/'>
        <Home/>
     </Route>
     <Route path='/signup'>
        <Signup/>
     </Route>
     <Route path='/login'>
       <Login/>
     </Route>
     <Route path='/create'>
       <Create/>
     </Route>
     <Route path='/view'>
       <View/>
     </Route>
     </Router>
     </Post>
    </div>
  );
}

export default App;
