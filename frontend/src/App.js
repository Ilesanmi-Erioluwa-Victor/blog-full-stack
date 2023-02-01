import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "src//components/molecules/Footer/Footer";
import AdminNavigation from "src/components/molecules/Navigation/Admin/AdminNav";
import Navigation from "src/components/molecules/Navigation/Navigation";
import { Error, Home, Signup, Login } from "src/pages";
import {
  Post,
  Addcategory,
  Category,
  Createpost,
  Authors,
} from "src/pages/Admin";

function App() {
  return (
    <div className="containergrid">
      <div className="overall-layout">
        <Navigation />
        <Routes>
          <Route element={<AdminNavigation />}>
            <Route 
              element={<Navigate to={"/dashboard/Authors"} />}
              path={"/dashboard"}
            />
            <Route element={<Createpost />}  path={"dashboard/createPost"} />
            <Route element={<Post />} path={"dashboard/Posts"} />
            <Route element={<Authors />} path={"dashboard/Authors"} />
            <Route element={<Addcategory />} path={"dashboard/AddCategory"} />
            <Route element={<Category />} path={"dashboard/CategoryList"} />
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