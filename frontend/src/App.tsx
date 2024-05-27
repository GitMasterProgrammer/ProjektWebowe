import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import {routes} from "./helpers/routing.tsx";
import RequireAuth from "@auth-kit/react-router/RequireAuth";

function App() {

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

/*

    TODO: jak zaznacze followa to pózniej sie nie wyswietla jako zafollowany
    TODO: na zgłoszeniach to data w lepszym formacie żeby sie wyświetlała
    TODO: search nie dziala - w konsoli wypisuje ale na stronie nie
    TODO (do rozważenia): zgłoszenia zwracałbym tylko z danego dnia, i żeby można sobie bylo z selecta pofiltorowac jakiego targeta zgłoszenia wyświetlic
    TODO (do rozważenia): osoby utworzone przez użytkowników to  na początku defaultowo 3 z najwieksza ilości likow  i zostawił tylko search 

*/