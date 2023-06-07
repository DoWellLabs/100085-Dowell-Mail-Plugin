import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contact from "./pages/Contact";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Contact />}>
            Contact
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
