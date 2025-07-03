import Link from "next/link";
import React from "react";

function Input({
  label,
  forgetPassword,
  toggleType,
  name,
  icon,
  setToggleType,
  register,
  errors,
}) {
  return (
    <div className="w-full my-4">
      <div className="flex text-gray-400 justify-between pb-2 gap-x-6 w-full text-xs">
        <label htmlFor="userName">{label}</label>
        {forgetPassword && (
          <Link href="/forget-password" className="text-[#7452EB]">
            رمز عبور خود را فراموش کردم
          </Link>
        )}
      </div>
      <div className="flex items-center w-full ">
        <input
          type={toggleType ? "password" : "text"}
          name={name}
          {...register(name)}
          className="border-0 px-3 w-full outline-0 bg-gray-200 rounded-lg py-2 "
        />
        {icon && (
          <button
            className="-mr-8 cursor-pointer text-gray-400 text-xl"
            onClick={setToggleType}
          >
            {icon}
          </button>
        )}
      </div>
      {errors && errors[name] && (
        <span className="text-xs block text-red-600 mt-4">
          {errors[name]?.message}
        </span>
      )}
    </div>
  );
}

export default Input;
