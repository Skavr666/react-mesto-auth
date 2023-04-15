import { useContext, useState, useEffect } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const user = useContext(CurrentUserContext);
  const [name, setName] = useState({});
  const [description, setDescription] = useState({});

  useEffect(() => {
    setName(user.name);
    setDescription(user.about);
  }, [user, isOpen]
  );

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      description,
    });
  }
  
  return (
    <PopupWithForm
      name="edit-profle"
      title="Редактировать профиль"
      isOpen={isOpen}
      buttonText="Сохранить"
      formName="profile"
      size="default"
      onClose={onClose}
      onSubmit={handleSubmit}>
      <input value={name || ''} onChange={handleNameChange} type="text" name="name" className="form__input" id="name" required minLength="2" maxLength="40" placeholder="Имя" />
      <span className="form__input-error name-error">#</span>
      <input value={description || ''} onChange={handleDescriptionChange} type="text" name="description" className="form__input" id="title" required minLength="2" maxLength="200" placeholder="О себе" />
      <span className="form__input-error title-error">#</span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;