import React, { useEffect, useState } from 'react';
import axios from '../utils/interceptor';
import { BASE_API } from '../utils/constants';
import styles from '../styles/dashboard.module.scss';
import Profile from './Profile';
import List from './List';

export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    role: string;
    reporterId: null;
    createdAt: Date;
    updatedAt: Date;
    personalDetails: any;
}


const Dashboard:React.FC = () => {
  const [profile, setProfile] = useState<User | null>(null);

  const fetchProfile = async () => {
    try {
      const api = `${BASE_API}users/me`;
      const response = await axios.get(api) as any;
      if(response.data.user) {
        setProfile(response.data.user);
      }
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, [])

  return (
    <main className={styles.dashboardContainer}>
      <div className={styles.dashboard}>
        <Profile profile={profile} />
        <List profile={profile} />
      </div>
    </main>
  )
}

export default Dashboard