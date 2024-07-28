import React from "react"
import { useNavigate } from "react-router-dom";


/*
 * @Author : Nicolas Barrios,   @date 2024-07-25 10:00:16
 * @description : vista error escaneos no permitidos
 * @Props : image,message,title,labelLink,path
 * @return :
 */

function Alert({image,message,title,labelLink,path}){
     const navigate=useNavigate();
    return(
<>
<div className="bg-fixed bg-[url('./../../../public/fondo-alert.png')] bg-cover bg-center w-full h-full min-h-screen flex items-center justify-center flex-col pt-[4%] px-4 md:px-8 lg:px-16">
    <div className="w-[60%] md:w-[40%] lg:w-[20%] h-[20%] my-4">
        <img src={image} alt="alerta" className="max-w-full h-auto" />
    </div>       
    <div className="w-full max-w-xs md:max-w-sm lg:max-w-md h-max text-center text-white text-sm mb-4 font-mono bg-yellow-400 rounded-lg p-1">
        <p>{title}</p>
    </div>     
    <div className="w-full max-w-xs md:max-w-sm lg:max-w-md h-auto text-center text-white text-xl my-4 font-mono bg-cyan-950 rounded-lg p-4">
        <p>{message}</p>
    </div>
    <div className="w-full max-w-xs md:max-w-sm lg:max-w-md h-auto text-center text-purple-500 text-xl my-4 font-mono hover:underline cursor-pointer">
        <h1 onClick={()=>navigate(path)}>{labelLink}</h1>
    </div>    
</div>
</>
    )
}

export default function ShowAlert(){
     return(
          <Alert
          image={"./../../../public/icono-alert.png"}
          title={"You have exceeded the scan limit"}
          message={"please contact with the QR provider"}
          labelLink={"click to go to home page"}
          path={"/user"}
          />
     )
}