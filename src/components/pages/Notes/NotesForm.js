import React, { useState } from 'react';
import {
  Modal,
  Menu,
  Space,
  Radio,
  Checkbox,
  message,
  Dropdown,
  Button,
  Input,
} from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import './Notes.css';

const NotesForm = ({ displayModal, setDisplayModal }) => {
  const { TextArea } = Input;
  const [count, setCount] = useState(0);
  const [toggle, setToggle] = useState(1);
  const [content, setContent] = useState(0);

  const theme = localStorage.getItem('theme');
  const handleMenuClick = e => {
    setContent(e.key);
  };

  const RonChange = e => {
    setToggle(e.target.value);
  };

  const ConChange = checkedValues => {
    console.log('checked = ', checkedValues);
  };

  const Subject = () => {
    if (content === '1') {
      return 'Needs / resource request';
    } else if (content === '2') {
      return 'Changing Mentors';
    } else if (content === '3') {
      return 'Time sensitive needs';
    } else {
      return 'Select note type ';
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        Needs / resource request
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        Changing Mentors
      </Menu.Item>
      <Menu.Item key="3" icon={<UserOutlined />}>
        Time sensitive needs
      </Menu.Item>
    </Menu>
  );
  return (
    displayModal && (
      <Modal
        title="Create a new note"
        visible={displayModal}
        onOk={() => setDisplayModal(false)}
        onCancel={() => setDisplayModal(false)}
        footer={null}
      >
        <div
          className="column"
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <label htmlFor="">Subject</label>
          <Dropdown overlay={menu} style={{ width: '40%' }}>
            <Button>
              {Subject()} <DownOutlined />
            </Button>
          </Dropdown>
          <br />
          <label htmlFor="">Content</label>
          <TextArea
            rows={4}
            maxLength="280"
            onChange={e => setCount(e.target.value.length)}
          />
          <p style={{ marginTop: '1%' }}>{count}/280 Characters</p>
          <br />
        </div>
        <div
          className="outer-column"
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <div
            className="row1"
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <div
              className="radio"
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <label htmlFor="">Priority</label>
              <Radio.Group onChange={RonChange} value={toggle}>
                <Space direction="vertical">
                  <Radio value={1}>Urgent</Radio>
                  <Radio value={2}>Medium</Radio>
                  <Radio value={3}>Low</Radio>
                </Space>
              </Radio.Group>
            </div>
          </div>
          <br />

          <div
            className="row2"
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Button className={`modalBtn saveBtn ${theme ? theme : ''}SaveBtn`}>
              Save as draft
            </Button>
            <Button
              className={`modalBtn createBtn ${theme ? theme : ''}CreateBtn`}
            >
              Create
            </Button>
          </div>
        </div>
      </Modal>
    )
  );
};

export default NotesForm;
