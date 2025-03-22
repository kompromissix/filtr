import './Str8.scss';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useState, useEffect } from 'react';
import krest from './img/krest.png';

export default function User({ onClose }) {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('');
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        console.log('Декодированный токен:', decodedToken);

        if (!decodedToken.id) {
          setError('Ошибка: userId не найден в токене');
          return;
        }

        const response = await axios.get(`http://localhost:5000/users/${decodedToken.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Ответ сервера:', response.data);

        if (!response.data) {
          setError('Ошибка: данные пользователя не получены');
          return;
        }

        setUserData(response.data);
      } catch (err) {
        console.error('Ошибка при запросе данных пользователя:', err);
        setError(err.message);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    setUserData(null);
    localStorage.removeItem('token');
    onClose();
    window.location.reload();
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div></div>;
  }

  return (
    <div className="modal">
      <div className="ukyerg">
        <img src={krest} onClick={onClose} className="mtrnt"/>
        <h1>Личный кабинет</h1>
        <div className="danse">
          <div className="user">
            <p><span>Имя пользователя:</span> {userData[0] ? userData[0].username : 'N/A'}</p>
            <p><span>Почта:</span> {userData[0] ? userData[0].email : 'N/A'}</p>
          </div>
          
        </div>
        <div className='button'>
          <button type="button" onClick={handleLogout}>Выход</button>
        </div>
      </div>
    </div>
  );
}