import React from 'react'
import { data } from '../../db'
import Card from './Card';
import { FaUsers } from "react-icons/fa6";
import { FaUserShield } from "react-icons/fa";

const DisplayCard = () => {

    let totalUsers = (data) => {
        let count = 0;
        data.forEach((index) => {
            count++;
        })
        return count;
    }

    const activeUser = (data) => {
        let count = 0;
        data.forEach((elm) => {
            if(elm.about.status === "ACTIVE") {
                console.log(elm.details.status)
                count++;
            }
        })
        return count;
    }

    const inActiveUser = (data) => {
        let count = 0;
        data.forEach((elm) => {
            if(elm.about.status === "INACTIVE") {
                console.log(elm.details.status)
                count++;
            }
        })
        return count;
    }
    
    let blockUser = (data) => {
        let count = 0;
        data.forEach((elm) => {
            if(elm.about.status === "BLOCKED") {
                console.log(elm.details.status)
                count++;
            }
        })
        return count;
    }

  return (
    <div>
        <Card icon={<FaUsers />} title={<p>Total Users</p>} numberOfUsers={totalUsers(data)}/>
        <Card icon={<FaUserShield />} title={<p>Active Users</p>} numberOfUsers={activeUser(data)}/>
        <Card icon={<FaUserShield />} title={<p>Inactive Users</p>} numberOfUsers={inActiveUser(data)}/>
        <Card icon={<FaUserShield />} title={<p>Blocked Users</p>} numberOfUsers={blockUser(data)}/>
    </div>
  )
}

export default DisplayCard