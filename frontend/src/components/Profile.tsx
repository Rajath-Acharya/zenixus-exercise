import React, { useEffect, useState } from 'react'
import { User } from './Dashboard'
import styles from '../styles/dashboard.module.scss';
import axios from '../utils/interceptor';
import { BASE_API } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

interface Props {
  profile: User | null
}

const Profile:React.FC<Props> = ({profile}) => {
  const [editName, setEditName] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const updateName = async () => {
    if(fullName) {
      try {
        const api = `${BASE_API}personalDetails`;
        const response = await axios.post(api, {
          userId: profile?.id,
          fullName,
        }) as any;
         console.log(response);
      } catch(error) {
        console.log(error);
      }
      setEditName(false);
    }
  }

  const updateAddress = async () => {
    if(address) {
      try {
        const api = `${BASE_API}personalDetails`;
        const response = await axios.post(api, {
          userId: profile?.id,
          address
        }) as any;
        console.log(response);
      } catch(error) {
        console.log(error);
      }
       setEditAddress(false);
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    navigate('/login', { replace: true });
  }

  useEffect(() => {
    if(profile) {
      if(profile?.personalDetails?.fullName) {
        setFullName(profile?.personalDetails?.fullName);
      }
      if(profile?.personalDetails?.address) {
        setAddress(profile?.personalDetails?.address);
      }
    }
  }, [profile])

  return (
    <div className={styles.profile}>
      <div>
        <p>Email: {profile?.email}</p>
        <p>Username: {profile?.username}</p>
        <p>Role: {profile?.role} </p>
      </div>
      <div className={styles.profileInfo}>
        <div>
          {editName ? 
            <>
            <p>FullName: </p>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </>
            :  
            <p>FullName: {fullName || '-'}</p>
          }
          {editName ? 
            <button onClick={updateName}>Save</button> :
            <button onClick={() => setEditName(true)}>Edit</button>
          }
        </div>
        <div>
          {editAddress ? 
            <>
            <p>Address: </p>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            </>
             :  
            <p>Address: {address || '-'}</p>
          }
          {editAddress ?
            <button onClick={updateAddress}>Save</button> :
            <button onClick={() => setEditAddress(true)}>Edit</button>
          }
        </div>
        <button className={styles.logoutCTA} onClick={logout}>Logout</button>
      </div>
      </div>
  )
}

export default Profile