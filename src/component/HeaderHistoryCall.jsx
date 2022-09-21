import { search } from "../img";

function HeaderHistoryCall() {
  return (
    <div className="pt-14 px-6 flex justify-between items-center">
      <div className="flex justify-center bg-current2 pr-4 rounded-full">
        <button className="bg-black text-white px-8 py-2 rounded-full text-sm 2xl:text-base">
          All
        </button>
        <button className="font-bold px-2 text-sm 2xl:text-base">Missed</button>
      </div>
      <div className="bg-white w-max rounded-full py-2 flex justify-between items-center">
        <input
          type="searcSh"
          placeholder="Search..."
          className="bg-transparent pl-4 focus:outline-none focus:ring-0 focus:border-none w-[150px] 2xl:w-[200px] text-sm 2xL:text-base"
        />
        <img src={search} alt="search" className="pr-3 w-[25px] h-[18px]" />
      </div>
    </div>
  );
}

export default HeaderHistoryCall;
