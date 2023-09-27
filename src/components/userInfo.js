export default class UserInfo {
  constructor(userNameSelector, jobTitleSelector) {
    this._name = document.querySelector(userNameSelector);
    this._job = document.querySelector(jobTitleSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      job: this._job.textContent,
    };
    return userInfo;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent = data.job;
  }
}
