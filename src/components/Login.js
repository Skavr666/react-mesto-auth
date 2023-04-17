import { useState } from "react";

function Login({onSignIn}) {
  const [email, setUserEmail] = useState('');
  const [password, setUserPassword] = useState('');

  function handleEmailChange(e) {
    setUserEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setUserPassword(e.target.value);
  }

  function handleLogInSubmit(e) {
    e.preventDefault();
    onSignIn({
      email,
      password,
    });
  }

  return (
    <section className="auth">
      <div className="auth__container">
        <h2 className="auth__header">Вход</h2>
        <form className="auth__form" onSubmit={handleLogInSubmit}>
          <input className="auth__input" placeholder="Email" type="email" required value={email} onChange={handleEmailChange}></input>
          <input className="auth__input" placeholder="Пароль" type="password" required minLength="5" maxLength="15" value={password} onChange={handlePasswordChange}></input>
          <button className="auth__button opacity">Войти</button>
        </form>
      </div>
    </section>
  )
}

export default Login;