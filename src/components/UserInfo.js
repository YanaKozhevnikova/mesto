export default class UserInfo {
  constructor({usernameSelector, aboutSelector}) {
    this._username = document.querySelector(usernameSelector);
    this._about = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    return {
      username: this._username.textContent,
      about: this._about.textContent
    }
  }

  setUserInfo(info) {
    this._username.textContent = info.username;
    this._about.textContent = info.about;
  }
}
