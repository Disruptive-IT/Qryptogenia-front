
export const BoxLink = ({data}) =>{

    return(
        <div className="gridItem">
            {data && data.map((item, index)=>(
                <button className="linkBox text-black hover:text-neutral-100">
                    
                    <div className="w-full flex justify-center items-center mt-5">
                        <img className="imgLink" src={item.img} alt="" />
                    </div>
                    <div className="w-full flex justify-center " >
                        <p className=" font-bold ">{item.name}</p>
                    </div>
                    
                </button>
            ))}
        </div>
    )
}