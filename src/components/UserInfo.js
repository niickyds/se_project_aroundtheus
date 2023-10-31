export default class UserInfo {
  constructor(userNameSelector, jobTitleSelector, avatarElement) {
    this._name = document.querySelector(userNameSelector);
    this._about = document.querySelector(jobTitleSelector);
    this._avatarElement = document.querySelector(avatarElement);
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      about: this._about.textContent,
    };
    return userInfo;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
  }

  setAvatar(data) {
    this._avatarElement.src = data;
  }
}
