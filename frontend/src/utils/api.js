export class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  /*
  _getHeader() {
    const token = localStorage.getItem('token');
    return {
      ...this._headers,
      Authorization: `Bearer ${token}`,
    }
  }
  */

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse) //Aquí está vinculado el checkResponse que confirma el res.ok 
  }

  _checkResponse(res) { //Aquí se checa y si está bien, continúa
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  /*
  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._getHeader(),
    })
  }
  */

  getInitialCards(token) {
    return this._request(`${this._baseUrl}/cards`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },    
    })
  }

  /*
  getProfileInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._getHeader(),
    })
  }
  */

  getProfileInfo(token) {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
  }

  editProfile(name, about, token) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },    
      body: JSON.stringify({
        name: name,
        about: about,
      })
    })
  }

  addNewCard(cardData, token){
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },    
      body: JSON.stringify({
        name: cardData.name, 
        link: cardData.link
      })
    })
  }

  deleteCard(cardId, token) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },    
    })
  }

  changeAvatar(link, token) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },    
      body: JSON.stringify({
        avatar: link
      })
    })
  }

  changeLikeCardStatus(cardId, isLiked, token) {
    if(isLiked) {
      return this._request(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },    
      })
    } else {
      return this._request(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },  
      })
    }
  }

}

const api = new Api({
  baseUrl: "https://api.around-full.students.nomoredomainssbs.ru",
});

export default api;
