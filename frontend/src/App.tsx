import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Footer from 'src//components/molecules/Footer/Footer';
import AdminNavigation from 'src/pages/Admin/Admin';
import Navigation from 'src/components/molecules/Navigation/Navigation';
import {
  Error,
  Home,
  Signup,
  Login,
  CreatePost,
  PostList,
  Profile,
  Post,
} from 'src/pages';
import {
  Posts,
  Addcategory,
  Category,
  Updatecategory,
  Authors,
} from 'src/pages/Admin';

function App() {
  return (
    <div className='containergrid'>
      <div className='overall-layout'>
        <Navigation />
        <Routes>
          <Route element={<AdminNavigation />}>
            <Route
              element={<Navigate to={'/dashboard/authors'} />}
              path={'/dashboard'}
            />
            <Route
              element={<Posts />}
              path={'/dashboard/posts'}
            />
            <Route
              element={<Authors />}
              path={'/dashboard/authors'}
            />
            <Route
              element={<CreatePost />}
              path={'/dashboard/create-post'}
            />
            <Route
              element={<Addcategory />}
              path={'/dashboard/add-category'}
            />
            <Route
              element={<Category />}
              path={'/dashboard/category-list'}
            />
            <Route
              element={<Updatecategory />}
              path={'/dashboard/update-category/:id'}
            />
          </Route>
          <Route
            element={<CreatePost />}
            path='/create-post'
          />
          <Route
            element={<Home />}
            path='/'
          />
          <Route
            element={<PostList />}
            path='/posts'
          />

          <Route
            element={<Post />}
            path='/post/:postId'
          />

          <Route
            element={<Error />}
            path='*'
          />
          <Route
            element={<Signup />}
            path='/signup'
          />
          <Route
            element={<Login />}
            path='/login'
          />
          <Route
            element={<Profile />}
            path={`profile/:id`}
          />
        </Routes>

        <Footer />
      </div>
    </div>
  );
}

export default App;
