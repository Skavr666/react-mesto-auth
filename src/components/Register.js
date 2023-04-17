import { useState } from "react";
import { Link } from "react-router-dom";

function Register({onSignUp}) {
  const [email, setUserEmail] = useState('');
  const [password, setUserPassword] = useState('');

  function handleEmailChange(e) {
    setUserEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setUserPassword(e.target.value);
  }

  function handleRegistrationSubmit(e) {
    e.preventDefault();
    onSignUp({
      email,
      password,
    });
  }

  return (
    <section className="auth">
      <div className="auth__container">
        <h2 className="auth__header">Регистрация</h2>
        <form className="auth__form" onSubmit={handleRegistrationSubmit}>
          <input className="auth__input" placeholder="Email" type="email" required value={email} onChange={handleEmailChange}></input>
          <input className="auth__input" placeholder="Пароль" type="password" required minLength="5" maxLength="15" value={password} onChange={handlePasswordChange}></input>
          <button className="auth__button opacity">Зарегистрироваться</button>
        </form>
        <p className="auth__footnote">Уже зарегистрированы? <Link to="/sign-in" className="auth__footnote-hyperlink opacity">Войти</Link></p>
      </div>
    </section>
  )
}

export default Register;