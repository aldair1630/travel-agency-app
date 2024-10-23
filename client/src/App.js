import { Route, Routes, useLocation } from "react-router-dom";
// eslint-disable-next-line
import { Home, Page, About, Destinations } from "./views";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Register from "./components/Register";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar />}
      <Routes>
        <Route exact path="/" element={<Page />} />
        <Route path="/home" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
        {/* <Route path="/destinations/:id" component={Detail} />
      <Route path="/new" component={Form} />
      <Route path="/edit/:id" component={Form} />
      <Route path="/page/:page" component={Page} /> */}
      </Routes>
      {location.pathname !== "/" && <Footer />}
    </div>
  );
}

export default App;
