import './App.scss'
import axios from 'axios';
import { useState, useEffect} from 'react'
import Register from './Modal/register/register'; 
import Login from './Modal/login/login';
import User from './Modal/user/Str8';

export default function App(){
    const [tovar, setTovar] = useState([]);
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showUser, setShowUser] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
      axios.get('http://localhost:5000/api/tovars')
        .then(response => setTovar(response.data))
        .catch(error => console.error(error));
    }, []);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          setIsAuthenticated(true);
        }
      }, []);
    
      // Функция для выхода
    const handleLogout = () => {
      localStorage.removeItem('token'); // Удаляем токен
      setIsAuthenticated(false); // Сбрасываем состояние авторизации
      setShowUser(false); // Закрываем модальное окно пользователя
    };
    // useEffect(() => {
    //     fetchOneDevice(id_tovar).then(data => setTovar(data))
    // }, []);

    return(
        <>
            {tovar.map((tovar,index) => (
                <div key={index}>
                    <p>{tovar.id_tovar}</p>
                    <p>{tovar.tovar}</p>
                    <p>{tovar.tovar123}</p>
                </div>
            ))}
            {!isAuthenticated && (
              <>
                <button className="login" id='log' onClick={() => setShowLogin(true)}>ВХОД</button>
                <button className="register" id='reg' onClick={() => setShowRegister(true)}>РЕГИСТРАЦИЯ</button>
              </>
            )}

            {/* Показываем кнопку "USER", если пользователь авторизован */}
            {isAuthenticated && (
              <button className="user" onClick={() => setShowUser(true)}>USER</button>
            )}
            {showUser && <User onClose={() => setShowUser(false)} onLogout={handleLogout} />}
            {showRegister && <Register onClose={() => setShowRegister(false)} />}
            {showLogin && <Login onClose={() => setShowLogin(false)} onLogin={() => setIsAuthenticated(true)} />}
        </>
    )
}