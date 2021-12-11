import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home.js";
import Contact from "./components/pages/Contact.js";
import Company from "./components/pages/Company.js";
import NewProject from "./components/pages/NewProject.js";
import Container from "./components/layout/Container.js";
import Navbar from "./components/layout/Navbar.js";
import Footer from "./components/layout/Footer.js";
import Projects from "./components/pages/Projects.js";

function App() {
  return (
    <Router>
      <Navbar />

      <Container customClass="min-height">
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="projects" exact element={<Projects />}></Route>
          <Route path="/company" exact element={<Company />}></Route>
          <Route path="/contact" exact element={<Contact />}></Route>
          <Route path="/newproject" exact element={<NewProject />}></Route>
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
