import React, { useCallback, useEffect, useState, useMemo } from 'react';
import ApplicationModal from './ApplicationModal';
import { Table, Button, Tag } from 'antd';
import './PendingApplication.css';
import { getApplication } from '../../../state/actions/userProfile/getApplication';
import { connect, useDispatch } from 'react-redux';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.name - b.name,
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    filters: [
      {
        text: 'mentor',
        value: 'mentor',
      },
      {
        text: 'mentee',
        value: 'mentee',
      },
    ],
    onFilter: (value, record) => record.role.includes(value),
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.date - b.date,
  },
  {
    title: 'Application',
    dataIndex: 'button',
    key: 'button',
  },
];

const PendingApplications = ({ applicationProfile }) => {
  const dispatch = useDispatch();

  const [applications, setApplications] = useState([]);
  const [displayModal, setDisplayModal] = useState(false);
  const [profileId, setProfileId] = useState('');
  const [currentApplication, setCurrentApplication] = useState();

  const showModal = profile_id => {
    setProfileId(profile_id);
    setDisplayModal(true);
  };

  useEffect(() => {
    dispatch(getApplication());
    setApplications(
      Object.values(applicationProfile).map(row => ({
        key: row.profile_id,
        name: row.first_name + ' ' + row.last_name,
        role: (
          <Tag
            style={{ height: '20px', width: '20px' }}
            color={row.accepting_new_mentees === undefined ? 'orange' : 'blue'}
          >
            {row.role_name}
          </Tag>
        ),
        date:
          Date(row.created_at.slice).slice(0, 3) +
          '. ' +
          Date(row.created_at.slice).slice(4, 9) +
          ', ' +
          Date(row.created_at.slice).slice(10, 16),
        button: (
          <Button
            style={{
              backgroundImage:
                'linear-gradient(-180deg, #37AEE2 0%, #1E96C8 100%)',
              borderRadius: '.5rem',
              boxSizing: 'border-box',
              color: '#FFFFFF',
              display: 'flex',
              fontSize: '16px',
              justifyContent: 'center',
              cursor: 'pointer',
              touchAction: 'manipulation',
            }}
            type="primary"
            id={row.profile_id}
            onClick={() => showModal(row.profile_id)}
          >
            Review Application
          </Button>
        ),
      }))
    );
  }, [applicationProfile.length > 1]);

  return (
    <>
      <h2>Pending Applications</h2>
      <ApplicationModal
        displayModal={displayModal}
        setDisplayModal={setDisplayModal}
        profileId={profileId}
        setProfileId={setProfileId}
        applicationProfile={applicationProfile}
      />
      <Table columns={columns} dataSource={applications} />
    </>
  );
};

const mapStateToProps = state => {
  return {
    applicationProfile: state.user.ApplicationProfile,
  };
};

export default connect(mapStateToProps)(PendingApplications);
