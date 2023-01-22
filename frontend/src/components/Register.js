import React from 'react';

function Register({ email, setEmail, password, setPassword, handleRegisterSubmit }) {
   
  return (
    <>
      <div className='auth__container'>
        <h2 className='auth__title'>Sign up</h2>
        <form
          className='auth'
          title='Sign up'
          onSubmit={handleRegisterSubmit}
        >
          <input
            className='form__input_dark'
            placeholder='Email'
            name='email'
            type='email'
            required
            value={email}
            onChange={(e) => {setEmail(e.target.value);}}
          />
          <input
            className='form__input_dark'
            placeholder='Password'
            name='password'
            type='password'
            required
            value={password}
            onChange={(e) => {setPassword(e.target.value)}}
          />
          <button
            type='submit'
            className='form__submit-button_dark'
            onSubmit={handleRegisterSubmit}
          >
            Sign up
          </button>
        </form>
        <a href='/signin' className='auth__link'>
          Already a member? Log in here!
        </a>
      </div>
    </>
  );
}
export default Register; 