export const BoxLink = ({ data }) => {

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {data &&
        data.map((item, index) => (
          <button className="w-[300px] h-[100px] bg-slate-300 flex items-center p-3 justify-center gap-3 rounded-lg text-black hover:bg-teal-800 hover:border-spacing-48 hover:text-neutral-100">
            <img className="h-[60px]" src={item.img} alt="" />
            <div className="flex flex-col text-start">
                <p className=" font-bold ">{item.name}</p>
                <span className="">{item.description}</span>
            </div>
          </button>
        ))}
    </div>
  );
};
