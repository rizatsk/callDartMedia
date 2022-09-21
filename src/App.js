import { useEffect, useState } from "react";
import CallDetail from "./component/CallDetail";
import HistoryCall from "./combine/HistoryCall";
import Notes from "./component/Notes";
import Recent from "./component/Recent";
import Sidebar from "./component/Sidebar";
import {
  requestAndShowPermission,
  showNotification,
} from "./utils/notifcation";
import ModalCall from "./component/ModalCall";
import NexmoClient from "nexmo-client";

function App() {
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

  const nexmoClient = new NexmoClient({ debug: true }).createSession(
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjMyMTc1MzEsImp0aSI6IjI5MjdmMTYwLTM0YjItMTFlZC1iZWRmLTg5MGJiNzNkNDI1MyIsImFwcGxpY2F0aW9uX2lkIjoiZTU0NDI4NWQtMWJlZC00MDAxLWI0MTMtMDdhNTYzNTBiNTg5Iiwic3ViIjoiY3MxIiwiZXhwIjoxNjYzMjE3NTUzMzY1LCJhY2wiOnsicGF0aHMiOnsiLyovdXNlcnMvKioiOnt9LCIvKi9jb252ZXJzYXRpb25zLyoqIjp7fSwiLyovc2Vzc2lvbnMvKioiOnt9LCIvKi9kZXZpY2VzLyoqIjp7fSwiLyovaW1hZ2UvKioiOnt9LCIvKi9tZWRpYS8qKiI6e30sIi8qL2FwcGxpY2F0aW9ucy8qKiI6e30sIi8qL3B1c2gvKioiOnt9LCIvKi9rbm9ja2luZy8qKiI6e30sIi8qL2xlZ3MvKioiOnt9fX19.E62eiutMn4GQzFDYnb_3fSZJEZgFpsDzoDyi4mbTHrF8MlwEZUDG-KeltkFh-0-Y3t9oTc4B2VlJqqZrIeMq60QiQoDCXtAKGX7gOtYUmgc17qJwTIGmKR5zKzqa086pleLwffhei2gERx3Hunu_IsFkMUvAHLPgPDDOjo6fq_CcgH_pXcZB9AlyTR6fuLh7uYicYHTLRTTwed5vuT5lDuyUTq3GVnqbrVWzQauxFx1Y3_PzsMS3y6mwClrJdQLhYSW0GIxhs95Iz10YrjFUKvuJ4ET-ZkN8r8Plt6xYwzWr9CLVh6Vr7NKciJH4FQvdNgsMEzdU1a5Jp6fuWO2NFA"
  );

  useEffect(() => {
    nexmoClient
      .then((app) => {
        app.on("member:call", (member, call) => {
          showNotification();
          console.log(member);
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

          app.on("call:status:changed", (call) => {
            setNotification("Call Status: " + call.status);
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div>
      <Sidebar />

      {/* Main Start */}
      <div className="left-[180px] 2xl:left-[200px] absolute z-20 w-[85%] h-[100%] flex">
        <HistoryCall active={active} detail={detail} />
        <div className="pl-10 2xl:ml-20 mt-10 w-[50%]">
          <h2 className="text-2xl 2xl:text-3xl font-bold">Recents</h2>
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

export default App;
