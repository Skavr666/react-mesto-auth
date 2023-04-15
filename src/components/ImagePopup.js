function ImagePopup({card, onClose}) {
  return (
    <div className={`popup zoom-image ${card.link ? "popup_opened" : ""}`} id="opn-img">
      <div className="popup__image-container popup__container">
        <button className="popup__close-button opacity" id="close-img-popup" onClick={onClose}></button>
        <img src={card.link} alt={card.name} className="popup__image"/>
        <p className="popup__title">{card.name}</p>
      </div>
    </div>
  )
}

export default ImagePopup;