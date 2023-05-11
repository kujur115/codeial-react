import { useState } from 'react';
import { redirect } from 'react-router-dom';
// import { useToasts } from 'react-toast-notifications';

import styles from '../styles/login.module.css';
import { useAuth } from '../hooks';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  // const { addToast } = useToasts();
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);

    if (!email || !password) {
      // return addToast('Please enter both email and password', {
      //   appearance: 'error',
      // });
      return console.error('Please enter both email and password');
    }

    const response = await auth.login(email, password);

    if (response.success) {
      console.log('Successfully logged in');
    } else {
      console.error(response.message);
    }

    setLoggingIn(false);
  };

  if (auth.user) {
    return redirect('/');
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>

      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Paasword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <button disabled={loggingIn}>
          {loggingIn ? 'Logging in...' : 'Log In'}
        </button>
      </div>
    </form>
  );
};

export default Login;
