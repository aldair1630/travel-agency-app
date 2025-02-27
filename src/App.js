import { Route, Routes, useLocation } from "react-router-dom";
import { Home, Page, About, Destinations } from "./views";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Register from "./components/Register";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <AuthProvider>
        {location.pathname !== "/" && <NavBar />}
        <Routes>
          <Route exact path="/" element={<Page />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<h1>Not Found</h1>} />

          {/* Rutas privadas */}
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
          </Route>

          {/* Rutas públicas */}
          <Route element={<PublicRoute restricted />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
        {location.pathname !== "/" && <Footer />}
      </AuthProvider>
    </div>
  );
}

export default App;
