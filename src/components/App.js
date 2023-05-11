// import { useEffect } from 'react';
// import { getPosts } from '../api';
import { useAuth } from '../hooks';
// import { Loader } from './index';
import {
  BrowserRouter as Router,
  Route,
  redirect,
  Routes,
} from 'react-router-dom';
import { Home, Login, Signup, Settings, UserProfile } from '../pages';
import { Loader, Navbar } from './index';
function PrivateRoute({ children, ...rest }) {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={() => {
        if (auth.user) {
          return children;
        }
        return redirect('/login');
      }}
    />
  );
}

const Page404 = () => {
  return <h1>404</h1>;
};

function App() {
  // const [posts, setPosts] = useState([]);

  const auth = useAuth();

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const response = getPosts();
  //     console.log('response', response);
  //   };
  //   fetchPosts();
  // }, []);

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
          <PrivateRoute>
            <Route path="/settings" element={<Settings />} />
          </PrivateRoute>
          <PrivateRoute>
            <Route path="/user/:userId" element={<UserProfile />} />{' '}
          </PrivateRoute>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
