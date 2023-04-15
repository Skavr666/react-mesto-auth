import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const user = useContext(CurrentUserContext);
  const isOwn = card.owner._id === user._id;
  const isLiked = card.likes.some(i => i._id === user._id);
  const cardLikeButtonClassName = ( 
    `card__like ${isLiked && 'card__like_active'}` 
  );
  
  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card._id);
  }

  return (
    <div className="card">
      <img src={card.link} alt={card.name} className="card__image" onClick={handleClick}/>
      {isOwn && <button className="card__trash opacity" onClick={handleDeleteClick} />}
      <div className="card__elements">
        <h2 className="card__name">{card.name}</h2>
        <div className="card__like-container">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} />
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Card;