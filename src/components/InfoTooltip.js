function InfoTooltip({imgLink, txt, isOpen, onClose}) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_size_default">
        <button className="popup__close-button opacity" onClick={onClose}></button>
        <img src={imgLink} alt="Подсказка" className="popup__tooltip-img"></img>
        <p className="popup__tooltip-txt">{txt}</p>
      </div>
    </div>
  )
}

export default InfoTooltip;