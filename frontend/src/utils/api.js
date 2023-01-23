export class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getHeader() {
    const token = localStorage.getItem('token');
    return {
      ...this._headers,
      Authorization: `Bearer ${token}`,
    }
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse) //Aquí está vinculado el checkResponse que confirma el res.ok 
  }

  _checkResponse(res) { //Aquí se checa y si está bien, continúa
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._getHeader(),
    })
  }

  getProfileInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._getHeader(),
    })
  }

  editProfile(name, about) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._getHeader(),
      body: JSON.stringify({
        name: name,
        about: about,
      })
    })
  }

  addNewCard(cardData){
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._getHeader(),
      body: JSON.stringify({
        name: cardData.name, 
        link: cardData.link
      })
    })
  }

  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._getHeader(),
    })
  }

  changeAvatar(link) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeader(),
      body: JSON.stringify({
        avatar: link
      })
    })
  }

  changeLikeCardStatus(cardId, isLiked) {
    if(isLiked) {
      return this._request(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: this._getHeader(),
      })
    } else {
      return this._request(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: this._getHeader(),
      })
    }
  }

}

const api = new Api({
  baseUrl: "http://localhost:3001",
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
