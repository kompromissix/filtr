import React, { useState } from 'react';
import axios from 'axios';
import './login.scss';
import krest from './img/krest.png';

function Login({ onClose, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });
      console.log(response.data);
      localStorage.setItem('token', response.data.token); 
      alert('Вход выполнен успешно!');
      onClose();
      onLogin(); // Вызываем onLogin для обновления состояния авторизации
      window.location.reload(); // Перезагружаем страницу (опционально)
    } catch (err) {
      console.error(err);
      alert('Ошибка входа');
    }
  };

  return (
    <>
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <div className='zg'>
            <p>Вход в аккаунт</p>
            <img onClick={onClose} src={krest} alt="Закрыть" />
          </div>
          <div className='email'>
            <p>Почта*:</p>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <p>Пароль*:</p>
            <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit">Войти</button>
        </form>
      </div>
    </>
  );
}

export default Login;