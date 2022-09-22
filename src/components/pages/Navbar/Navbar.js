import React, { useState, useEffect } from 'react';
import useAxiosWithAuth0 from '../../../hooks/useAxiosWithAuth0';
import { connect } from 'react-redux';
import './Navbar.css';
import logo from '../Navbar/ud_logo2.png';
import { UserOutlined, FormOutlined } from '@ant-design/icons';
import { Dropdown, Layout, Menu, Modal, Popover, Switch } from 'antd';
import NavBarLanding from '../NavBarLanding/NavBarLanding';
import { Link, useHistory } from 'react-router-dom';
import LoginButton from './NavbarFeatures/LoginButton';
import ApplyButton from './NavbarFeatures/ApplyButton';
import LogoutButton from './NavbarFeatures/LogoutButton';
import MentorPopover from './NavbarFeatures/MentorPopover';
import { useAuth0 } from '@auth0/auth0-react';
import { getCurrentUser } from '../../../state/actions/userProfile/getCurrentUser';
import { mentorInfo } from '../../../state/actions/mentor/postMentorInfo';
import { useDispatch } from 'react-redux';

import { API_URL } from '../../../config';
import { setFetchStart } from '../../../state/actions/lifecycle/setFetchStart';
import { setFetchEnd } from '../../../state/actions/lifecycle/setFetchEnd';
import { setFetchError } from '../../../state/actions/errors/setFetchError';

const { Header } = Layout;

const Navbar = ({ userProfile, getProfile, currentUser }) => {
  const [user, setUser] = useState({});
  const [modal, setModal] = useState(false);
  const [toggleStatus, setToggleStatus] = useState(false);
  const { logout, isAuthenticated } = useAuth0();
  const { axiosWithAuth } = useAxiosWithAuth0();

  const dispatch = useDispatch();

  const openModal = () => setModal(true);
  const cancelOpen = () => setModal(false);

  const history = useHistory();

  const handleLogout = () => {
    setModal(false);
    localStorage.removeItem('role_id');
    localStorage.removeItem('AuthToken');
    logout({ returnTo: window.location.origin });
  };

  /**
   * Author: Khaleel Musleh
   * @param {dispatch(getCurrentUser)}
   * dispatch(getCurrentUser) dispatches a request to getCurrentUser in state/actions/userProfile which then returns a response of either a success or error status
   */

  useEffect(() => {
    (async () => {
      if (isAuthenticated) {
        const user = await axiosWithAuth().get(
          `/profile/current_user_profile/`
        );

        setUser(user.data);

        // The following code was taken from the userProfile redux action file
        setFetchStart();
        axiosWithAuth()
          .get(`${API_URL}profile/${user.data.profile_id}`)
          .then(res => {
            if (res.data) {
              getProfile(res.data);
            }
          })
          .catch(err => {
            setFetchError(err);
          })
          .finally(() => setFetchEnd());
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Object.values(currentUser).length]);

  const profile_id = user.profile_id;
  const isMentor = user.role_id === 3;

  /**
   * Author: Khaleel Musleh
   * @param {dispatch(mentorInfo)}
   * dispatch(mentorInfo) dispatches a request to postMentorInfo with profile_id parameter in state/actions/mentor which then returns a response of either a success or error status
   */

  // Determines the initial state of the Mentor toggle switch
  useEffect(() => {
    dispatch(mentorInfo(profile_id))
      .then(res => {
        const availability = res.payload.data[0]?.availability;
        setToggleStatus(availability);
      })
      .catch(err => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) {
    return <NavBarLanding />;
  }

  const menuItems = [
    {
      key: '/profile',
      icon: <UserOutlined />,
      label: 'Profile Settings',
    },
    {
      key: 'navLogout',
      label: 'Log Out',
    },
  ];

  const handleMenuClick = menu => {
    if (menu.key === 'navLogout') {
      openModal();
      return;
    }
  };

  const handleToggleChange = checked => {
    axiosWithAuth()
      .post(`${API_URL}profile/availability/${profile_id}`, {
        accepting_new_mentees: checked,
      })
      .then(res => {
        setToggleStatus(checked);
      })
      .catch(err => console.log(err));
  };

  const accountMenu = <Menu items={menuItems} onClick={handleMenuClick} />;

  const reloadLogo = () => {
    isAuthenticated ? history.push('/') : document.location.reload();
  };

  return (
    <>
      <Layout className="layout">
        <Header className="menuBar">
          <div className="logoDiv">
            <div onClick={reloadLogo}>
              <img
                src={logo}
                alt="underdog devs logo"
                height="68"
                style={{ marginLeft: '1vw' }}
                role="button"
              />
            </div>
            {isMentor && (
              <Popover
                title={`Status: ${
                  toggleStatus ? 'Accepting' : 'Not Accepting'
                }`}
                content={<MentorPopover />}
                placement="bottom"
              >
                <section className="mentorStatus">
                  <Switch
                    checked={toggleStatus}
                    onChange={handleToggleChange}
                    id="mentorSwitch"
                  />
                  <span className="toggleText">New Mentees</span>
                </section>
              </Popover>
            )}
            {Object.keys(user).length && (
              <div className="userInfo-and-profilePic">
                <Dropdown overlay={accountMenu} placement="bottom" arrow>
                  <div className="userInfo-and-profilePic">
                    <div className="userInfo">
                      <div
                        className="username"
                        // eslint-disable-next-line jsx-a11y/aria-role
                        role="text"
                        aria-label="Account settings"
                      >
                        <div className="username">
                          Welcome {userProfile.first_name}
                        </div>
                      </div>
                    </div>
                  </div>
                </Dropdown>
              </div>
            )}
            {!isAuthenticated && (
              <div className="header_buttons">
                <LoginButton />
                <ApplyButton />
                <LogoutButton />
              </div>
            )}
            {/* temporary logout button until private route is finished and when we can logout from dashboard */}
          </div>
        </Header>
      </Layout>
      <Modal
        visible={modal}
        onCancel={cancelOpen}
        onOk={handleLogout}
        title="Confirm Log Out"
        role="logout"
      >
        Are you sure you want to log out now?
      </Modal>
    </>
  );
};

/**
 * Author: Khaleel Musleh
 * @param {mapStateToProps}
 * Added userProfile and currentUser to state for fetching current user data and user which is currently being viewed or altered and renders it in the Navbar.js component.
 */

const mapStateToProps = state => {
  return {
    userProfile: state.user.userProfile,
    currentUser: state.user.currentUser,
  };
};

export default connect(mapStateToProps)(Navbar);
