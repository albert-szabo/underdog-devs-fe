import React, { useEffect } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import '../../Navbar/Navbar.css';

function LoginButton() {
  const { loginWithRedirect, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: 'underdog-identifier',
          scope: 'openid profile email',
        });
        localStorage.setItem('AuthToken', token);
      } catch (e) {
        console.log(e.message);
      }
    };
    getUserData();
  }, [getAccessTokenSilently]);

  return (
    <button
      className="btn btn-primary btn-login"
      onClick={() => loginWithRedirect()}
    >
      Login
    </button>
  );
}

export default LoginButton;
