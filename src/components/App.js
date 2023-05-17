// import { useEffect } from 'react';
// import { getPosts } from '../api';
import { useAuth } from '../hooks';
// import { Loader } from './index';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { Home, Login, Signup, Settings, UserProfile } from '../pages';
import { Loader, Navbar } from './index';
// import { useEffect } from 'react';
// import { getPosts } from '../api';

// const PrivateRoute = ({ children }) => {
//   return useAuth() ? children : <Navigate to="/login" />;
// };
function PrivateRoute({ children, ...rest }) {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={() => {
        if (auth.user) {
          return children;
        }
        return <Navigate to="/signin" />;
      }}
    />
  );
}
// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const auth = useAuth();
//   return (
//     // Show the component only when the user is logged in
//     // Otherwise, redirect the user to /signin page
//     <Route
//       {...rest}
//       render={(props) =>
//         auth.user() ? <Component {...props} /> : <Navigate to="/signin" />
//       }
//     />
//   );
// };

const Page404 = () => {
  return <h1>404</h1>;
};

function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Signup />} />
          {/* <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          /> */}
          <Route path="/settings" element={<Settings />} />
          <Route
            path="/user/:userId"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
}
// const Appp = () => {
//   useEffect(() => {
//     const fetchPosts = async () => {
//       const response = await getPosts();
//       console.log('response', response);
//     };
//     fetchPosts();
//   }, []);
//   return <h1>Hello World</h1>
// };

export default App;
