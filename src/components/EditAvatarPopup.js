import React from "react";
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const avatarRef = React.useRef();
  React.useEffect(() => {
    avatarRef.current.value = '';
  })

  function handleAvatarSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    })
  }

  return (
    <PopupWithForm
      name="upload-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      buttonText="Сохранить"
      formName="change-avatar"
      size="medium"
      onClose={onClose}
      onSubmit={handleAvatarSubmit}>
      <input ref={avatarRef} type="url" name="link" className="form__input" id="avatar-link" placeholder="Ссылка на картинку" required/>
      <span className="form__input-error avatar-link-error">#</span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;