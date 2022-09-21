import { history } from "../img";

function Sidebar() {
  return (
    <div className="w-[300px] h-[100%] bg-black fixed z-10">
      <div className="relative">
        <a
          href="/"
          className="bg-white py-4 px-2 rounded-full flex flex-col items-center w-max top-[30vh] left-[50px] absolute"
        >
          <img className="w-[30px] my-4" src={history} alt="history" />
          <span>History</span>
          <span>Call</span>
        </a>
      </div>
    </div>
  );
}

export default Sidebar;
