
export default function WebLinkMenuFood({FormValues,ContentName}){



    return(
        <div className="w-full h-full p-4 overscroll-auto" id='main-container'>
            <div className="w-[70%] p-4 rounded-[10px] ml-[15%] mr-[15%] my-6 bg-slate-500" id="logo-container">
                <img className="bg-contain" src="https://img.freepik.com/vector-premium/logo-restaurante-retro_23-2148474404.jpg" alt="restaurantLogo" />
            </div>
            <div className="w-[80%] bg-slate-100 h-auto p-3 mx-[10%] my-[2%]" id="name-container">
                <h1 className="text-center font-semibold text-[25px]">restaurant name</h1>
            </div>
            <div className="w-[80%] bg-slate-100 h-auto p-3 mx-[10%] my-[2%]">
                <h1 className="text-center font-semibold text-[25px]">CATEGORIES</h1>
            </div>
        </div>
    )
}