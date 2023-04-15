import { useState, useEffect} from "react";
import '../pages/index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import api from "../utils/api.js";
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ConfirmationPopup from "./ConfirmationPopup.js";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({name: '', link: ''});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cardId, setCardId] = useState({});

  useEffect(() => {
    Promise.all([
      api.getUserData(),
      api.getCards()
    ])
    .then((res) => {
      const [ resUserData, resCardsArray ] = res;
      setCards(resCardsArray);
      setCurrentUser(resUserData);
    })
    .catch((error) => {
      console.log(`Ошибка ${error} при добавлении карточек или получении данных пользователя`)
    });
  }, []);

  const handleEscClose = (e) => {
    if(e.key === 'Escape') {
      closeAllPopups();
    }
  };

  const handleSideClick = (e) => {
    if(e.target.classList.contains('popup')) {
      closeAllPopups();
    }
  };

  function enableAdditionalListeners() {
    document.addEventListener('keyup', handleEscClose);
    document.addEventListener('click', handleSideClick);
  };
 
  function handleCardClick(card) {
    setSelectedCard(card);
    enableAdditionalListeners();
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    enableAdditionalListeners();
  };
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    enableAdditionalListeners();
  };
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    enableAdditionalListeners();
  };

  function handleDeleteClick(cardId) {
    setCardId(cardId);
    setIsConfirmationPopupOpen(true);
    enableAdditionalListeners();
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setSelectedCard({name: '', link: ''});
    setCardId({});
    document.removeEventListener('keyup', handleEscClose);
    document.removeEventListener('click', handleSideClick);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.enableLikeCounting(!isLiked, card._id)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((error) => {
      console.log(`Ошибка ${error} лайка`)
    });
  };
  
  function handleCardDelete(cardId) {
    api.deleteCard(cardId)
    .then(() => {
      setCards(cards.filter(c => c._id !== cardId));
      closeAllPopups();
    })
    .catch((error) => {
      console.log(`Ошибка ${error} при удалении карточки`)
    });
  };

  function handleUpdateUser(userData) {
    api.applyUserData(userData)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((error) => {
      console.log(`Ошибка ${error} при обновлении данных пользователя`)
    });
  };

  function handleUpdateAvatar(refData) {
    api.changeAvatarImg(refData.avatar)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((error) => {
      console.log(`Ошибка ${error} при обновлении автара`)
    });
  };

  function handleAddPlaceSubmit(cardData) {
    api.createCard(cardData)
    .then((res) => {
      setCards([res, ...cards]);
      closeAllPopups();
    })
    .catch((error) => {
      console.log(`Ошибка ${error} при добавлении новой карточки`)
    });
  };


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <ConfirmationPopup isOpen={isConfirmationPopupOpen} onClose={closeAllPopups} onDelete={handleCardDelete} cardId={cardId}/>
        <div className="page__container">
          <Header />
          <Main 
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteClick}
            cards={cards}/>
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
