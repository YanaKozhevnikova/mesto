export default class UserInfo {
  constructor({usernameSelector, aboutSelector, avatarSelector}) {
    this._username = document.querySelector(usernameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._username.textContent,
      about: this._about.textContent.textContent,
    }
  }

  getUserId() {
    return this._id;
  }

  setUserInfo(info) {
    this._username.textContent = info.name;
    this._about.textContent = info.about;
    this._avatar.src = info.avatar;
    this._id = info._id;
  }
}
