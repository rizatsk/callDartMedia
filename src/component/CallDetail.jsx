import { arrow, date, inboundCall } from "../img";

function CallDetail({ dataActive }) {
  return (
    <div>
      <div className="flex justify-between mt-2 text-gray">
        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center">
            <img className="mr-2 w-[20px]" src={inboundCall} alt="inbound" />
            <p className="text-sm 2xl:text-base">(+62) {dataActive.number}</p>
          </div>
          <p className="mx-4"> ---- </p>
          <div className="flex justify-between items-center">
            <img
              className="mr-2 -rotate-90 w-[20px]"
              src={inboundCall}
              alt="inbound"
            />
            <p className="text-sm 2xl:text-base">(021) 1500-121</p>
          </div>
        </div>
        <div className="flex items-center">
          <img className="mr-2 w-[20px]" src={date} alt="date" />
          <p className="text-sm 2xl:text-base">{dataActive.time}</p>
        </div>
      </div>
      <div className="flex items-center mt-2 text-gray">
        <img className="mr-2 w-[20px]" src={arrow} alt="arrow" />
        <p className="text-sm 2xl:text-base">
          <span className="capitalize">{dataActive.status}</span> Call - Exp{" "}
          {dataActive.exp} (Representative)
        </p>
      </div>
    </div>
  );
}

export default CallDetail;
