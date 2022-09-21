import ringtone from "./ringtone.mpeg";

function showNotification() {
  if (Notification.permission !== "granted") {
    requestAndShowPermission();
  }

  // Sound Notification
  const mp3Source = `<source src=${ringtone} type="audio/mpeg">`;
  const embedSource = `<embed hidden="true" autostart="true" loop="true" src=${ringtone}>`;
  document.getElementById("sound").innerHTML =
    '<audio autoplay="autoplay">' + mp3Source + embedSource + "</audio>";

  const title = "Calling From Customer";
  const icon =
    "https://play-lh.googleusercontent.com/wwzWuDb8ivbarUCpB7sEaUkx-vq6HbbqNZ2Eg5a_HpXNNyQpp-cFcNCcG-O9T28N8RLv";
  const body = "Calling From Customer";
  const notification = new Notification(title, {
    body,
    icon,
  });
  notification.onclick = () => {
    notification.close();
    window.parent.focus();
  };
}

function requestAndShowPermission() {
  Notification.requestPermission();
}

export { showNotification, requestAndShowPermission };
