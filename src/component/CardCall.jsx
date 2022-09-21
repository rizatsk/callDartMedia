import { inboundCall, missedCall } from "../img";

function CardCall({ number, status, exp, time, active, detail }) {
  return (
    <div
      className={`py-2 cursor-pointer hover:bg-white ${
        number === active ? "bg-white" : ""
      }`}
      onClick={() => detail({ number, status, exp, time })}
    >
      <div className="flex justify-between pt-3 px-8 text-gray">
        <div className="flex">
          <div>
            <img
              className="w-[30px] mr-4 mt-2"
              src={status === "missed" ? missedCall : inboundCall}
              alt="misedCall"
            />
          </div>
          <div>
            <h3 className="font-bold text-lg 2xl:text-xl text-black">
              (+62) {number}
            </h3>
            <p
              className={`mt-2  ${
                status === "missed" ? "text-red-500" : "text-gray"
              } text-sm 2xl:text-base`}
            >
              <span className="capitalize">{status} Call </span> - exp {exp}
            </p>
          </div>
        </div>
        <span className="text-sm 2xl:text-base capitalize">{time}</span>
      </div>
    </div>
  );
}

export default CardCall;
