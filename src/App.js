
import './App.css';
import Login from './components/Login';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './components/auth/Auth';
import Layout from './components/Layout';
import Home from './components/Pages/Home';
import Profile from './components/Pages/Profile';
import Blog from './components/Pages/Blog';
import Contact from './components/Pages/Contact';
import About from './components/Pages/About';
import Users from './components/Pages/Users';
import EditUser from './components/Pages/EditUser';
import Posts from './components/Pages/Posts';
import AddEditUserPosts from './components/Pages/AddEditUserPosts';

const App = () => {

  return (
      <>
      <AuthProvider>
      <div className='App'>
        <BrowserRouter>
          <Routes>
              <Route path='/' element={<Login />}/>
              <Route path='/home' element={<Home />}/>
              <Route path='/profile' element={<Profile /> }/>
              <Route path='/blog' element={<Blog /> }/>
              <Route path='/contact' element={<Contact /> }/>
              <Route path='/about' element={<About /> }/>
              <Route path='/users' element={<Users /> }/>
              <Route path='/editUser/:userId' element={<EditUser /> }/>
              <Route path='/posts' element={<Posts />}/>
              <Route path='/addEditUserPost' element={<AddEditUserPosts />}/>
              <Route path='/addEditUserPost/:postId' element={<AddEditUserPosts /> }/>

          </Routes> 
        </BrowserRouter>
        </div>
        </AuthProvider>
      </>

  );
};

export default App;
