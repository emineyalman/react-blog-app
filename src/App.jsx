import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Detail from './pages/Blog Detail/Detail';
import NewBlog from './pages/Blog/NewBlog';
import BlogDetail from './pages/Blog Detail/BlogDetail';
import EditBlog from './pages/EditBlog/EditBlog';

function App() {
  return (
    <BrowserRouter>
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/newblog" element={<NewBlog />} />
        <Route path="/blogdetail/:id" element={<BlogDetail />} />
        <Route path="/editblog/:id" element={<EditBlog />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
