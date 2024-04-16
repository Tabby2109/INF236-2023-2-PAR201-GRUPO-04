import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { ChangeCard } from '../../components/Cards/ChangeCard';

const ChangeHistory = ({ setToken,OnLogout }) => {
  let gettoken = sessionStorage.getItem('token');
  let token = JSON.parse(gettoken);
  const [changesHistory, setChangesHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchChangesHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/historial/getChangesHistory', {
          headers: {
            'Authorization': `Bearer ${token}`
          }})
        const data = response.data;
        setChangesHistory(data);
        setLoading(false);
      } catch(error) {
        console.log(error);
        setLoading(false);
      }
    }  
    fetchChangesHistory();
  }, [token])

  return (
    <>
      {!loading &&
      <div className='container mt-5'>
        <h2>Historial de cambios</h2>
        <h5>Todo cambio quedará registrado aquí.</h5>
        {changesHistory.length !== 0 && changesHistory.map((data, index) => 
          <ChangeCard
            key={data._id}
            data={data}
            index={index}
          />
        )}
      </div>
      }
    </>
  )
}

export default ChangeHistory;
