export default class Api {
  constructor(baseUrl, token) {
    this._baseUrl = baseUrl;
    this._token = token;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
       return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
    }
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: {
        authorization: this._token
      }
    })
    .then(this._checkResponse)
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: {
        authorization: this._token
      }
    })
    .then(this._checkResponse)
  }

  setUserInfo(info) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
      })
    .then(this._checkResponse)
  }

  postCard({name, link}) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: name, link: link})
    })
    .then(this._checkResponse)
  }

  deleteCard(card) {
    this._cardId = card.cardId;
    return fetch(`${this._baseUrl}cards/${this._cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    })
    .then(this._checkResponse)
  }

  putLike(card) {
    this._cardId = card.cardId;
    return fetch(`${this._baseUrl}cards/likes/${this._cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
      },
    })
    .then(this._checkResponse)
  }

  removeLike(card) {
    this._cardId = card.cardId;
    return fetch(`${this._baseUrl}cards/likes/${this._cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    })
    .then(this._checkResponse)
  }

  changeAvatar(avatar) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({avatar})
      })
    .then(this._checkResponse)
  }
}
