import React, { useState, useEffect } from 'react';
import axios from '../utils/interceptor';
import { User } from './Dashboard';
import styles from '../styles/dashboard.module.scss';
import { BASE_API } from '../utils/constants';
import ManagerList from './ManagerList';
import LeadList from './LeadList';

interface Props {
  profile: User | null
}

export enum Role {
  MANAGER = "MANAGER",
  LEAD = "LEAD",
  DEVELOPER = "DEVELOPER"
}

const List:React.FC<Props> = ({ profile }) => {
  const [subordinates, setSubordinates] = useState([]);

    const fetcAllSubordinates = async () => {
    try {
      const api = `${BASE_API}users`;
      const response = await axios.get(api) as any;
      console.log(response);
      if(response?.data?.users?.length > 0) {
        setSubordinates(response.data.users);
      }
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(profile) {
      fetcAllSubordinates();
    }
  }, [profile])

  if(!profile) {
    return null;
  }
  
  return (
    <div className={styles.list}>
      {profile?.role === Role.MANAGER &&
       <ManagerList 
          subordinates={subordinates}
          profile={profile} 
          fetcAllSubordinates={fetcAllSubordinates}
        />
       }
      {profile?.role === Role.LEAD && 
      <LeadList 
        subordinates={subordinates} 
        profile={profile} 
        fetcAllSubordinates={fetcAllSubordinates}
       />}
    </div>
  )
}

export default List