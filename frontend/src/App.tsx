import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminNavigation from "./components/molecules/Navigation/Admin/AdminNav";
import Navigation from "./components/molecules/Navigation/Navigation";
import { Error, Home, Signup, Login } from "./pages";
import Post from "./pages/Admin/Post/Post";


function App() {
  return (
    <div className="containergrid">
      <div className="overall-layout">
        <Navigation />
        <Routes>
          <Route element={<AdminNavigation />}>
            <Route element={<Navigate to={"/dashboard/Posts"} />} path={"/dashboard"} />
            <Route element={<Post />} path={"dashboard/createPost"} />
            <Route element={<Post />} path={"dashboard/Posts"} />
            <Route element={<Post />} path={"dashboard/Authors"} />
            <Route element={<Post />} path={"dashboard/AddCategory"} />
            <Route element={<Post />} path={"dashboard/CategoryList"} />
          </Route>
          <Route element={<Home />} path="/" />
          <Route element={<Error />} path="*" />
          <Route element={<Signup />} path="/signup" />
          <Route element={<Login />} path="/login" />
        </Routes>
      </div>
    </div>
  );
}

export default App;
