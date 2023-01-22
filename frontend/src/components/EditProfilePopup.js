import React from 'react'
import PopupWithForm from './PopupWithForm'

export function EditProfilePopup({isOpen, onClose, onUpdateUser, currentUser}) {

  const nameRef = React.useRef()
  const aboutRef = React.useRef()

  function handleSubmit(e) {
    // Evita que el navegador navegue hacia la dirección del formulario
    e.preventDefault();
  
    // Pasa los valores de los componentes gestionados al controlador externo
    onUpdateUser({
      name: nameRef.current.value,
      about: aboutRef.current.value,
    });
  }



  return(
    <PopupWithForm title="Edit Profile" name="profile" buttonText="Save"
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}>
      <input ref={nameRef} className="popup__input" type="text" placeholder="Name" required minLength={2} maxLength={40} name="name" />
      <span className="popup__input-error inputUsername-input-error"></span>
      <input ref={aboutRef} className="popup__input" type="text" placeholder="About me" required minLength={2} maxLength={200} name="about" />  
      <span className="popup__input-error popup__input-error-lower inputSubtitle-input-error"></span>
    </PopupWithForm>
  )
}  
