import { call, history, mic } from "../img";
import CallDetail from "./CallDetail";

function Recent({ dataActive }) {
  return (
    <div className="mt-5 2xl:mt-10 bg-current py-6 px-6 rounded-2xl">
      <div className="flex justify-between items-center gap-10">
        <h2 className="font-bold text-2xl 2xl:text-4xl">
          (+62) {dataActive.number}
        </h2>
        <div className="flex items-center gap-5 pr-8">
          <button className="bg-transparent hover:cursor-pointer">
            <img className="w-[13px] 2xl:w-[13px]" src={mic} alt="mic" />
          </button>
          <button className="bg-transparent hover:cursor-pointer">
            <img className="w-[20px]" src={history} alt="history" />
          </button>
          <button className="bg-transparent hover:cursor-pointer">
            <img className="w-[70px]" src={call} alt="call" />
          </button>
        </div>
      </div>
      <p className="text-sm 2xl:text-base text-gray">
        Call to John at exp {dataActive.exp}
      </p>
    </div>
  );
}

export default Recent;
