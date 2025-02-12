import React from 'react';
import {
  GithubOutlined,
  TwitterOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  LinkedinOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import { useAuth0 } from '@auth0/auth0-react';
import './LandingPage.less';
import mentorHelpingMentee from './resources/mentorhelpingmentee.jpg';
import FooterLanding from '../FooterLanding/FooterLanding';

//Another Pull request is going to need figure out the best way to implement the current application wide header.
//Images acquired from unsplash.com

const LandingPage = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <>
      <div className="landInfo1">
        <div className="left1">
          <h2 className="head1">UNDERDOG DEVS</h2>
          <p className="text1">
            We are a group of software engineers helping aspiring developers who
            are either formerly incarcerated or from an economically
            disadvantaged background.
          </p>
          <div className="content-container">
            <div className="button-container-signin">
              <h3>Already have an account?</h3>
              <Button type="primary" onClick={() => loginWithRedirect()}>
                Log In
              </Button>
            </div>

            <h3>Ready to Join Underdog Devs?</h3>

            <div className="button-container-apply">
              <div className="button-container">
                <a href="/apply/mentor">
                  <Button className="mentor-button">Apply as a Mentor</Button>
                </a>
              </div>

              <a href="/apply/mentee">
                <Button className="mentee-button">Apply as a Mentee</Button>
              </a>
            </div>

            <a href="/apply">More Information About Us</a>
          </div>
        </div>
        <div className="right1">
          <img
            className="img1"
            src={mentorHelpingMentee}
            alt="Mentor helping Mentee"
          ></img>
        </div>
      </div>

      <div className="landSocial">
        <h3 className="subHeadSocial">Follow Us On Social Media</h3>
        <div className="iconRow">
          <GithubOutlined style={{ fontSize: '25px' }} />
          <TwitterOutlined style={{ fontSize: '25px' }} />
          <InstagramOutlined style={{ fontSize: '25px' }} />
          <YoutubeOutlined style={{ fontSize: '25px' }} />
          <LinkedinOutlined style={{ fontSize: '25px' }} />
        </div>
      </div>
      <FooterLanding />
    </>
  );
};

export default LandingPage;
