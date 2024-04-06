import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import {routes} from "./helpers/routing.tsx";

function App() {

  return (
      <Router>
          <Navbar/>
          <Routes>
              {routes.map((route)=> (
                  <Route
                      key={route.path}
                      path={route.path}
                      element={route.element} />
              ))}
          </Routes>
      </Router>
  )
}

export default App
