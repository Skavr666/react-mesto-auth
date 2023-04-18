import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import "../pages/index.css";
import success from "../images/success.png";
import denial from "../images/denial.png";

import api from "../utils/api.js";
import * as auth from "../utils/auth.js";

import CurrentUserContext from "../contexts/CurrentUserContext.js";

import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ConfirmationPopup from "./ConfirmationPopup.js";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute.js";
import Login from "./Login.js";
import InfoTooltip from "./InfoTooltip.js";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cardId, setCardId] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [tooltipImg, setTooltipImg] = useState("");
  const [tooltipTxt, setTooltipTxt] = useState("");
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if(isLoggedIn === false) {
      return;
    }
    
    Promise.all([api.getUserData(), api.getCards()])
      .then((res) => {
        const [resUserData, resCardsArray] = res;
        setCards(resCardsArray);
        setCurrentUser(resUserData);
      })
      .catch((error) => {
        console.log(
          `Ошибка ${error} при добавлении карточек или получении данных пользователя`
        );
      });
  }, [isLoggedIn]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .getToken(token)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setUserEmail(res.data.email);
          }
        })
        .catch((error) => {
          console.log(`Ошибка ${error} при сохранении токена`);
        });
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  function onSignUp({ email, password }) {
    auth
      .handleRegistration({ email, password })
      .then(() => {
        setTooltipImg(success);
        setTooltipTxt("Вы успешно зарегистрировались!");
        setIsTooltipPopupOpen(true);
        navigate("/sign-in");
      })
      .catch(() => {
        setTooltipImg(denial);
        setTooltipTxt("Что-то пошло не так! Попробуйте ещё раз.");
        setIsTooltipPopupOpen(true);
      });
  }

  function onSignIn({ email, password }) {
    auth
      .handleLogIn({ email, password })
      .then((res) => {
        localStorage.setItem("token", res.token);
        setIsLoggedIn(true);
        setUserEmail(email);
        navigate("/");
      })
      .catch(() => {
        setTooltipImg(denial);
        setTooltipTxt("Что-то пошло не так! Попробуйте ещё раз.");
        setIsTooltipPopupOpen(true);
      });
  }

  function onSignOut() {
    setIsLoggedIn(false);
    setUserEmail(null);
    navigate("/sign-in");
    localStorage.removeItem("token");
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .enableLikeCounting(!isLiked, card._id)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => {
        console.log(`Ошибка ${error} лайка`);
      });
  }

  function handleCardDelete(cardId) {
    api
      .deleteCard(cardId)
      .then(() => {
        setCards(cards.filter((c) => c._id !== cardId));
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка ${error} при удалении карточки`);
      });
  }

  function handleUpdateUser(userData) {
    api
      .applyUserData(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка ${error} при обновлении данных пользователя`);
      });
  }

  function handleUpdateAvatar(refData) {
    api
      .changeAvatarImg(refData.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка ${error} при обновлении автара`);
      });
  }

  function handleAddPlaceSubmit(cardData) {
    api
      .createCard(cardData)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка ${error} при добавлении новой карточки`);
      });
  }
 
  function handleCardClick(card) {
    setSelectedCard(card);
    enableAdditionalListeners();
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    enableAdditionalListeners();
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    enableAdditionalListeners();
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    enableAdditionalListeners();
  }

  function handleDeleteClick(cardId) {
    setCardId(cardId);
    setIsConfirmationPopupOpen(true);
    enableAdditionalListeners();
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setIsTooltipPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    setCardId({});
    document.removeEventListener("keyup", handleEscClose);
    document.removeEventListener("click", handleSideClick);
  }

  function enableAdditionalListeners() {
    document.addEventListener("keyup", handleEscClose);
    document.addEventListener("click", handleSideClick);
  }

  const handleEscClose = (e) => {
    if (e.key === "Escape") {
      closeAllPopups();
    }
  };

  const handleSideClick = (e) => {
    if (e.target.classList.contains("popup")) {
      closeAllPopups();
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <ConfirmationPopup
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
          onDelete={handleCardDelete}
          cardId={cardId}
        />
        <InfoTooltip
          imgLink={tooltipImg}
          txt={tooltipTxt}
          isOpen={isTooltipPopupOpen}
          onClose={closeAllPopups}
        />
        <div className="page__container">
          <Routes>
            <Route
              path="/sign-up"
              element={
                <>
                  <Header text="Войти" route="/sign-in" shade="light" />
                  <Register onSignUp={onSignUp} />
                </>
              }
            />
            <Route
              path="/sign-in"
              element={
                <>
                  <Header text="Регистрация" route="/sign-up" shade="light" />
                  <Login onSignIn={onSignIn} />
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  <Header
                    text="Выйти"
                    email={userEmail}
                    onClick={onSignOut}
                    route="/sign-in"
                    shade="dark"
                  />
                  <ProtectedRoute
                    component={Main}
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleDeleteClick}
                    cards={cards}
                    isLoggedIn={isLoggedIn}
                  />
                  <Footer />
                </>
              }
            />
            <Route
              path="*"
              element={<Navigate to={isLoggedIn ? "/" : "/sign-in"} />}
            />
          </Routes>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
