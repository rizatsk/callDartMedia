import Cookies from "js-cookie";

class WebStore {
  static getCookies() {
    let cookies = null;
    cookies = Cookies.get("token");
    return cookies;
  }

  static checkCookies() {
    const getCookies = this.getCookies();
    if (!getCookies) {
      return false;
    }

    return getCookies;
  }
}

export default WebStore;
