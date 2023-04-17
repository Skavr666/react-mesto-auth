import logo from '../images/mesto-logo.svg';
import { Link } from "react-router-dom";

function Header({text, email, onClick, route, shade}) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Место"/>
      <nav className="header__nav">
        <p className="header__email">{email}</p>
        <Link to={route} onClick={onClick} className={`header__link header__link_style_${shade} opacity`}>{text}</Link>
      </nav>
    </header>
  )
}

export default Header;