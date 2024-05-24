import React from 'react';
import google from "../../../assets/imgs/google.png";
import "./btns.css";

export const GoogleButton = ({ action, text }) => {
  return (
    <div className="flex justify-center">
      <button
        type="button"
        className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 bg-slate-50 dark:border-slate-700 rounded-lg text-slate-700"
        onClick={action}
      >
        <img className="w-6 h-6" src={google} alt="Google" />
        <span>{text}</span>
      </button>
    </div>
  );
};