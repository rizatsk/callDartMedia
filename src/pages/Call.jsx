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
import ModalCallOut from "../component/ModalCallOut";
import NexmoClient from "nexmo-client";

function Call({ jwt }) {
  const [modalCall, setModalCall] = useState(false);
  const [active, setActive] = useState(null);
  const [answerBtn, setAnswerBtn] = useState(false);
  const [notifcation, setNotification] = useState(null);
  const [dataActive, setDataActive] = useState({
    number: null,
    status: null,
    exp: null,
    time: null,
  });
  const [modalCallOut, setModalCallOut] = useState(false);
  const [callStatusOut, setCallStatusOut] = useState("Waiting...");

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

  const nexmoClient = new NexmoClient({ debug: true }).createSession(jwt);
  // const nexmoClient = new NexmoClient({ debug: true }).createSession();

  // Button Call Out
  const btnCall = document.getElementById("callApp");
  const btnHangUpCallOut = document.getElementById("hangUpBtnCallOut");
  // End Button Call Out

  useEffect(() => {
    nexmoClient
      .then((app) => {
        // Call out
        btnCall.addEventListener("click", () => {
          setModalCallOut(true);
          setCallStatusOut("Waiting...");
          app
            .inAppCall(["user1"])
            .then(() => {
              setCallStatusOut("Calling...");
            })
            .catch((error) => {
              console.error(error);
            });
          // app.callServer("user1", "app");
          // app.callServer("6281282085511");
          // setCallStatusOut("Calling...");
        });

        // Recived Call
        const answer = document.getElementById("answerBtn");
        const reject = document.getElementById("rejectBtn");
        const hangUp = document.getElementById("hangUpBtn");

        app.on("member:call", (member, call) => {
          btnHangUpCallOut.addEventListener("click", async () => {
            await call.hangUp();
            // window.location.reload();
            setCallStatusOut("Waiting...");
            setModalCallOut(false);
            console.log("ok");
          });

          if (member.user.name === "cs1") {
            showNotification();
            setModalCall(true);

            setNotification("You are receiving a call");
            // Answer the call.
            answer.addEventListener("click", () => {
              call.answer();
              setAnswerBtn(true);
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
          }
        });

        app.on("call:status:changed", async (call) => {
          setNotification("Call Status: " + call.status);
          setCallStatusOut(call.status);
          if (call.status === "rejected") {
            setModalCall(false);
            stopNotification();

            setCallStatusOut("Waiting...");
            setModalCallOut(false);
          }
          if (call.status === "unanswered") {
            setModalCall(false);
            stopNotification();

            setCallStatusOut("Waiting...");
            setModalCallOut(false);
          }
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
        notifcation={notifcation}
      />

      <ModalCallOut modalCallOut={modalCallOut} statusCallOut={callStatusOut} />
    </div>
  );
}

export default Call;
