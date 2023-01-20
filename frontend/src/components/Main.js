import React from 'react';
import editProfilePicturePath from '../images/profile-edit-button.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';


function Main({onEditAvatarClick, onAddPlaceClick, onEditProfileClick, onCardClick, cards, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile-grid">
        <div className="profile-grid__avatar-box">
          <img className="profile-grid__avatar-edit" src={editProfilePicturePath} onClick={onEditAvatarClick} alt="Edit profile btn" />
          <img className="profile-grid__avatar" src={currentUser.avatar} alt="Profile" />
        </div>
        <div className="profile-grid__information">
          <p className="profile-grid__username">{currentUser.name}</p>
          <button className="profile-grid__edit-button" onClick={onEditProfileClick}></button>
          <p className="profile-grid__subtitle">{currentUser.about}</p>
        </div>
        <button className="profile-grid__add-button" onClick={onAddPlaceClick}></button>
      </section>

      <section className="elements-grid">
        {cards.map(card => {
          return (
            <Card card={card} key={card._id} link={card.link} name={card.name} likes={card.likes} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
  );})}
      </section>
     </main>
  );
}

export default Main;