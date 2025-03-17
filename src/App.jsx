import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Detail from './pages/Blog Detail/Detail';
import NewBlog from './pages/Blog/NewBlog';
import BlogDetail from './pages/Blog Detail/BlogDetail';
import EditBlog from './pages/EditBlog/EditBlog';
import Navbar from './pages/Navbar/Navbar';
import Profile from './pages/Profile/Profile';
import User from './pages/User/User';
function App() {
  return (
    <BrowserRouter>
        <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/newblog" element={<NewBlog />} />
        <Route path="/blogdetail/:id" element={<BlogDetail />} />
        <Route path="/editblog/:id" element={<EditBlog />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
