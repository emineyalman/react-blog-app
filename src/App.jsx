import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Detail from './pages/Blog Detail/Detail';
import NewBlog from './pages/Blog/NewBlog';
import BlogDetail from './pages/Blog Detail/BlogDetail';

function App() {
  return (
    <BrowserRouter>
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/newblog/:id" element={<BlogDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
