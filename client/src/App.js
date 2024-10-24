import { Route, Routes, useLocation } from "react-router-dom";
import { Home, Page, About, Destinations } from "./views";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Register from "./components/Register";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <AuthProvider>
      {location.pathname !== "/" && <NavBar />}
        <Routes>
          <Route exact path="/" element={<Page />} />
          <Route path="/home" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      {location.pathname !== "/" && <Footer />}
      </AuthProvider>
    </div>
  );
}

export default App;
