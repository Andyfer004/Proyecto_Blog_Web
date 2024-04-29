//import logo from './logo.svg';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./assets/Home/home.jsx";
import Posts from "./assets/posts/post.jsx";
import Cars from "./assets/cars/cars.jsx";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/cars" element={<Cars />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;