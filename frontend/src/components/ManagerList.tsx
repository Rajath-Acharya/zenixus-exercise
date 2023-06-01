import React, { useEffect, useState } from 'react';
import styles from '../styles/dashboard.module.scss';
import { User } from './Dashboard';
import axios from '../utils/interceptor';
import { BASE_API } from '../utils/constants';
import { Role } from './List';

interface Props {
  subordinates: User[],
  profile: User | null,
  fetcAllSubordinates: () => void
}


const ManagerList:React.FC<Props> = ({ subordinates, profile, fetcAllSubordinates }) => {
const [reportees, setReportees] = useState<User[]>([]);
  const [unassignedLeads, setUnassignedLeads] = useState<User[]>([]);
  const [unassignedDevelopers, setUnassignedDevelopers] = useState<User[]>([]);

  const removeReportee = async (reporteeId:string) => {
    try {
      const api = `${BASE_API}users/${reporteeId}`;
      await axios.delete(api);
      await fetcAllSubordinates();
    } catch(error) {
      console.log(error);
    }
  }

  const addReportee = async (reporteeId:string) => {
    try {
      const api = `${BASE_API}users/${reporteeId}`;
      await axios.post(api);
      await fetcAllSubordinates();
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(subordinates?.length > 0 && profile?.id) {
      const result = subordinates.filter((user) => user?.reporterId === profile?.id);
      const unassignedLeadsResult = subordinates.filter((user) => !user?.reporterId && user.role === Role.LEAD);
      const unassignedDevelopersResult = subordinates.filter((user) => !user?.reporterId && user.role === Role.DEVELOPER);
      setReportees(result);
      setUnassignedLeads(unassignedLeadsResult);
      setUnassignedDevelopers(unassignedDevelopersResult);
    }
  }, [subordinates, profile?.id])

  return (
    <div className={styles.leadListContainer}>
      <div className={styles.reportees}>
        <h1>Reportees</h1>
        {
          reportees?.length > 0 ? 
          reportees.map((user) => {
            return (
              <div key={user.id} className={styles.box}>
                <div>
                <p>{user?.username}</p>
                <p>{user?.email}</p>
                <p>{user?.role}</p>
                </div>
                <button onClick={() => removeReportee(user.id)}>Remove</button>
              </div>
            )
          })
          : <p>No Reportees</p>
        }
      </div>
      <div className={styles.unassignedUsers}>
         <h1>Unassigned Leads</h1>
        {
          unassignedLeads?.length > 0 ? 
          unassignedLeads.map((user) => {
            return (
              <div key={user.id} className={styles.box}>
                <div>
                <p>{user?.username}</p>
                <p>{user?.email}</p>
                <p>{user?.role}</p>
                </div>
                <button onClick={() => addReportee(user.id)}>Add Reportee</button>
              </div>
            )
          })
          : <p>All Leads have Reporter assigned</p>
        }
      </div>
      <div className={styles.unassignedUsers}>
         <h1>Unassigned Developers</h1>
        {
          unassignedDevelopers?.length > 0 ? 
          unassignedDevelopers.map((user) => {
            return (
              <div key={user.id} className={styles.box}>
                <div>
                <p>{user?.username}</p>
                <p>{user?.email}</p>
                <p>{user?.role}</p>
                </div>
                <button onClick={() => addReportee(user.id)}>Add Reportee</button>
              </div>
            )
          })
          : <p>All Developers have Reporter assigned</p>
        }
      </div>
      </div>
  )
}

export default ManagerList