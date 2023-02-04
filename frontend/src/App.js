import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "src//components/molecules/Footer/Footer";
import AdminNavigation from "src/pages/Admin/Admin";
import Navigation from "src/components/molecules/Navigation/Navigation";
import { Error, Home, Signup, Login } from "src/pages";
import {
  Post,
  Addcategory,
  Category,
  Createpost,
  Authors,
  // Admin
} from "src/pages/Admin";

function App() {
  return (
    <div className="containergrid">
      <div className="overall-layout">
        <Navigation />
        <Routes>
          <Route element={<AdminNavigation />}>
            <Route 
              element={<Navigate to={"/dashboard/authors"} />}
              path={"/dashboard"}
            />
            <Route element={<Createpost />}  path={"dashboard/create-post"} />
            <Route element={<Post />} path={"dashboard/posts"} />
            <Route element={<Authors />} path={"dashboard/authors"} />
            <Route element={<Addcategory />} path={"dashboard/add-category"} />
            <Route element={<Category />} path={"dashboard/caategory-list"} />
          </Route>
          <Route element={<Home />} path="/" />
          <Route element={<Error />} path="*" />
          <Route element={<Signup />} path="/signup" />
          <Route element={<Login />} path="/login" />
        </Routes>

        <Footer />
      </div>
    </div>
  );
}

export default App;
