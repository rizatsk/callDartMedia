import { useEffect, useState } from "react";
import CallDetail from "../component/CallDetail";
import HistoryCall from "../combine/HistoryCall";
import Notes from "../component/Notes";
import Recent from "../component/Recent";
import Sidebar from "../component/Sidebar";
import {
  requestAndShowPermission,
  showNotification,
} from "../utils/notifcation";
import ModalCall from "../component/ModalCall";
import NexmoClient from "nexmo-client";
import WebStore from "../data/WebStore";

function Call({ jwt }) {
  const [modalCall, setModalCall] = useState(false);
  const [active, setActive] = useState(null);
  const [answerBtn, setAnswerBtn] = useState(false);
  const [rejectBtn, setRejectBtn] = useState(false);
  const [hangUpBtn, setHangUpBtn] = useState(false);
  const [notifcation, setNotification] = useState(null);
  const [dataActive, setDataActive] = useState({
    number: null,
    status: null,
    exp: null,
    time: null,
  });

  useEffect(() => {
    if (Notification.permission === "default") {
      requestAndShowPermission();
    }
  }, []);

  function stopNotification() {
    document.getElementById("sound").innerHTML = "";
  }

  function detail({ number, status, exp, time }) {
    setActive(number);
    setDataActive({ number, status, exp, time });
  }

  function answerCall() {
    setAnswerBtn(true);
    setRejectBtn(false);
    setHangUpBtn(false);
  }

  function rejectCall() {
    setAnswerBtn(false);
    setRejectBtn(true);
    setHangUpBtn(false);
  }

  function hangUpCall() {
    setAnswerBtn(false);
    setRejectBtn(false);
    setHangUpBtn(true);
  }

  const nexmoClient = new NexmoClient({ debug: true }).createSession(jwt);

  useEffect(() => {
    nexmoClient
      .then((app) => {
        app.on("member:call", (member, call) => {
          showNotification();
          setModalCall(true);

          const answer = document.getElementById("answerBtn");
          const reject = document.getElementById("rejectBtn");
          const hangUp = document.getElementById("hangUpBtn");

          setNotification("You are receiving a call");
          // Answer the call.
          answer.addEventListener("click", () => {
            call.answer();
            stopNotification();
            setNotification("You are in a call");
          });
          // Reject the call
          reject.addEventListener("click", () => {
            call.reject();
            stopNotification();
            setNotification(`You rejected the call`);
            setModalCall(false);
            setAnswerBtn(false);
          });
          // Hang-up the call
          hangUp.addEventListener("click", () => {
            call.hangUp();
            stopNotification();
            setNotification(`You ended the call`);
            setModalCall(false);
            setAnswerBtn(false);
          });

          // app.on("call:status:changed", (call) => {
          //   setNotification("Call Status: " + call.status);
          // });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });

  async function logout() {
    await deleteCookie();
    window.location.reload();
  }

  async function deleteCookie() {
    document.cookie =
      "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  }

  return (
    <div>
      <Sidebar />

      {/* Main Start */}
      <div className="left-[180px] 2xl:left-[200px] absolute z-20 w-[85%] h-[100%] flex">
        <HistoryCall active={active} detail={detail} />
        <div className="pl-10 2xl:ml-20 mt-10 w-[50%]">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl 2xl:text-3xl font-bold">Recents</h2>
            <button className="font-bold text-lg underline" onClick={logout}>
              Logout
            </button>
          </div>
          <Recent dataActive={dataActive} />
          <CallDetail dataActive={dataActive} />
          <Notes />
        </div>
      </div>

      <ModalCall
        modalCall={modalCall}
        answerBtn={answerBtn}
        answerCall={answerCall}
        rejectCall={rejectCall}
        hangUpCall={hangUpCall}
        notifcation={notifcation}
      />
    </div>
  );
}

export default Call;
