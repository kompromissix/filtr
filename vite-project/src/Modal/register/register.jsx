import { useState } from 'react';
import axios from 'axios';
import './register.scss'
import krest from './img/krest.png'

function Register({ onClose }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        username,
        email,
        password,
      });
      console.log(response.data);
      alert('Регистрация успешна!');
      onClose();
    } catch (err) {
      console.error(err);
      alert('Ошибка регистрации');
    }
  };

  return (
    <>
    <div className="modal1">
      <form onSubmit={handleSubmit}>
        <div className='zg1'>
          <p>Зарегистрировать аккаунт</p>
          <img onClick={onClose} src={krest}/>
        </div>
        <div className='email1'>
          <p>Имя*:</p>
          <input type="text" placeholder="Имя пользователя" value={username} onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className='email1'>
          <p>Почта*:</p>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className='email1'>
          <p>Пароль*:</p>
          <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
    </>
  );
}

export default Register;