import { conversation, phoneHangUp } from "../img";

function ModalCallOut({ modalCallOut, statusCallOut }) {
  return (
    <div
      className={`${
        !modalCallOut && "hidden"
      } fixed h-[100%] bg-modal w-full top-0 left-0 z-[99] flex justify-center`}
      id="modal"
    >
      <div className="w-[400px] 2xl:w-[500px] fixed top-10 h-[70%] bg-white shadow-xl rounded-xl">
        <div className="flex flex-col items-center my-[40px] 2xl:my-[70px]">
          <div className="bg-current w-max p-20 rounded-full">
            <img
              src={conversation}
              alt="conversation"
              className="w-[70px] 2xl:w-[140px]"
            />
          </div>
          <p className="font-bold text-base 2xl:text-lg mt-4 text-gray">
            {statusCallOut}
          </p>
        </div>

        <div className={`flex justify-center`}>
          <div className="flex flex-col items-center">
            <button
              className="text-xl 2xl:text-2xl font-bold bg-red-500 p-4 rounded-full text-white"
              id="hangUpBtnCallOut"
            >
              <img
                className="w-[30px] 2xl:w-[60px]"
                src={phoneHangUp}
                alt="phone hang up"
              />
            </button>
            <p className="mt-2 font-bold text-sm 2xl:text-base">Hang Up</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalCallOut;
