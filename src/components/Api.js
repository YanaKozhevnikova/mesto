export default class Api {
  constructor(baseUrl, token) {
    this._baseUrl = baseUrl;
    this._token = token;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: {
        authorization: this._token
      }
    })
    .then(res => (res.ok) ? res.json() : Promise.reject(`Ошибка: ${res.status} ${res.statusText}`))
    .catch(err => console.log(err))
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: {
        authorization: this._token
      }
    })
    .then(res => (res.ok) ? res.json() : Promise.reject(`Ошибка: ${res.status} ${res.statusText}`))
    .catch(err => console.log(err))
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
    .then(res => (res.ok) ? res.json() : Promise.reject(`Ошибка: ${res.status} ${res.statusText}`))
    .catch(err => console.log(err))
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
    .then(res => (res.ok) ? res.json() : Promise.reject(`Ошибка: ${res.status} ${res.statusText}`))
    .catch(err => console.log(err))
  }

  deleteCard(card) {
    this._cardId = card.cardId;
    return fetch(`${this._baseUrl}cards/${this._cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    })
    .then(res => (res.ok) ? res.json() : Promise.reject(`Ошибка: ${res.status} ${res.statusText}`))
    .catch(err => console.log(err))
  }

  putLike(card) {
    this._cardId = card.cardId;
    return fetch(`${this._baseUrl}cards/likes/${this._cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
      },
    })
    .then(res => (res.ok) ? res.json() : Promise.reject(`Ошибка: ${res.status} ${res.statusText}`))
    .catch(err => console.log(err))
  }

  removeLike(card) {
    this._cardId = card.cardId;
    return fetch(`${this._baseUrl}cards/likes/${this._cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    })
    .then(res => (res.ok) ? res.json() : Promise.reject(`Ошибка: ${res.status} ${res.statusText}`))
    .catch(err => console.log(err))
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
    .then(res => (res.ok) ? res.json() : Promise.reject(`Ошибка: ${res.status} ${res.statusText}`))
    .catch(err => console.log(err))
  }
}
