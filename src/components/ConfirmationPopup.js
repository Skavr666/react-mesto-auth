import PopupWithForm from "./PopupWithForm.js";

function ConfirmationPopup({isOpen, onClose, onDelete, cardId}) {
  function handleConfirmSubmit(e) {
    e.preventDefault();
    onDelete(cardId);
  }

  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      isOpen={isOpen}
      buttonText="Да"
      formName="confirmation"
      size="small"
      onClose={onClose}
      onSubmit={handleConfirmSubmit}>
    </PopupWithForm>
  )
}

export default ConfirmationPopup;