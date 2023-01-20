import React from 'react'
import PopupWithForm from './PopupWithForm'

export function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

  const avatarRef = React.useRef()

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    })
  }

  return(
    <PopupWithForm title="Change profile picture" name="avatar" buttonText="Change"
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}>
      <input ref={avatarRef} className="popup__input" type="url" placeholder="Image's URL" required name="link" />
      <span className="popup__input-error inputAvatar-input-error"></span>
    </PopupWithForm>
  )
}

