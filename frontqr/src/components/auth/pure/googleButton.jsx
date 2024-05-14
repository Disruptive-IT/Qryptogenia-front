import google from "../../../assets/imgs/google.png";
import "./btns.css";

export const GoogleButton = ({ action, text }) => {
  return (
   
    <div className="items-center" style={{width:'100%',display:"flex", justifyContent:"center"}}>
        <button className="px-4 py-2 border flex gap-2 border-slate-200 bg-slate-50 dark:border-slate-700 rounded-lg text-slate-700"  onClick={action}>
            <img className="w-6 h-6" src={google} alt="Google" />
            <span>
                {text}
            </span>
        </button>
    </div>
  );
};
