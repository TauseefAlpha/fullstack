import React from "react";
import "./App.css";
import Login from "./components/login/login";
import SignUp from "./components/signUp/signUp";
import ProtectedRoute from "./components/routes/protectedRoute";
import PublicRoutes from "./components/routes/publicRoutes";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import About from "./components/dashboard/about";
import Dashboard from "./components/dashboard/dashboard";
import Booklist from "./components/booklist/booklist";
import Addbook from "./components/addbook/addbook";
import { store } from "./store/store";
import { Provider } from "react-redux";
import ErrorPage from "./components/notFound/errorPage";
import Chatapp from "./components/chatapp/chatapp";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PublicRoutes />}>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/booklist" element={<Booklist />} />
        <Route path="/addbook" element={<Addbook />} />
        <Route path="/chatapp" element={<Chatapp />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </>
  )
);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  );
}

export default App;
