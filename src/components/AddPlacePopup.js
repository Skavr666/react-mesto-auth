import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const [name, setName] = useState({});
  const [link, setLink] = useState({});

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  function handleAddName(e) {
    setName(e.target.value);
  };

  function handleAddLink(e) {
    setLink(e.target.value);
  };
  
  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link,
    });
  };

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      isOpen={isOpen}
      buttonText="Создать"
      formName="new-card"
      size="default"
      onClose={onClose}
      onSubmit={handleAddPlaceSubmit}>
      <input value={name} onChange={handleAddName} type="text" name="name" className="form__input" id="card-name" placeholder="Название" required minLength="2" maxLength="30"/>
      <span className="form__input-error card-name-error">#</span>
      <input value={link} onChange={handleAddLink} type="url" name="link" className="form__input" id="image-link" placeholder="Ссылка на картинку" required/>
      <span className="form__input-error image-link-error">#</span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;