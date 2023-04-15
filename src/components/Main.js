import { useContext } from "react";
import Card from "./Card.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards}) {

  const user = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__info">
          <button className="profile__edit-avatar" onClick={onEditAvatar}>
            <img src={user.avatar} alt="Аватар" className="profile__avatar"/>
          </button>
          <div className="profile__first-line">
            <h1 className="profile__name">{user.name}</h1>
            <button className="profile__edit-button opacity" onClick={onEditProfile}></button>
            <p className="profile__title">{user.about}</p>
          </div>
        </div>
        <button className="profile__add-button opacity" onClick={onAddPlace}></button>
      </section>
      <section className="cards">
        {cards.map((card) => {
          return (
            <Card
            card={card}
            link={card.link}
            name={card.name}
            likes={card.likes}
            key={card._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            ></Card>
          )
        })}
      </section>
    </main>
  )
}

export default Main;