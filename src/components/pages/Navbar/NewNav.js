import { Menu, Button } from 'antd';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';
import logo from '../Navbar/ud_logo2.png';

const NewNav = () => {
  const { loginWithRedirect } = useAuth0();
  const { logout, isAuthenticated } = useAuth0();
  const { push } = useHistory();

  const logoutAuth = () => {
    localStorage.removeItem('AuthToken');
    logout({ returnTo: window.location.origin });
  };

  return (
    <Menu theme="dark" mode="vertical">
      {!isAuthenticated && (
        <Button
          type="primary"
          onClick={() => loginWithRedirect()}
          style={{ marginLeft: 'auto' }}
        >
          Login
        </Button>
      )}
      {!isAuthenticated && (
        <Button type="primary" onClick={() => push('/apply')}>
          Apply
        </Button>
      )}
      {isAuthenticated && (
        <Button type="primary" onClick={logoutAuth}>
          Logout
        </Button>
      )}
    </Menu>
  );
};

export default NewNav;
