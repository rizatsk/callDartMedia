import CardCall from "../component/CardCall";
import HeaderHistoryCall from "../component/HeaderHistoryCall";
import historyCalls from "../historyCalls";

function HistoryCall({ active, detail }) {
  return (
    <div className="w-[450px] 2xl:w-[600px] h-[100%] bg-current rounded-[50px] 2xl:rounded-[80px]">
      <HeaderHistoryCall />
      <div className="h-[77%] 2xl:h-[85%] overflow-y-auto mt-5">
        {historyCalls.map((data, index) => (
          <CardCall
            key={index}
            number={data.number}
            status={data.status}
            exp={data.exp}
            time={data.time}
            detail={detail}
            active={active}
          />
        ))}
      </div>
    </div>
  );
}

export default HistoryCall;
