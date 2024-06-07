import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import {routes} from "./helpers/routing.tsx";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import {useEffect} from "react";

function App() {
    useEffect(() => {
        document.title = 'Pysstektor';
    }, []);
  return (
      <Router>
          <Navbar/>

          <Routes>
              {routes.map((route)=> {
                  if (!route.requireAuth) {
                      return <Route
                          key={route.path}
                          path={route.path}
                          element={route.element}/>
                  }
                  else {
                      return <Route
                          key={route.path}
                          path={route.path}
                          element={
                              <RequireAuth fallbackPath={'/login'}>
                                  {route.element}
                              </RequireAuth>}/>
                  }

              })}
          </Routes>

      </Router>
  )
}

export default App