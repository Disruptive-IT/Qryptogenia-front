import React from "react";

export const SubmitButton = ({ text }) => {
  return (
    <div className="flex justify-center w-full"  type="submit">
      <button className="w-[250px]  text-white text-md bg-light-blue hover:bg-dark-blue border border-gray-300 focus:outline-none  font-medium rounded-lg  px-5 py-2.5     transition-all duration-300 ease-in-out hover:scale-105 ">
        {text}
      </button>
    </div>
  );
};
