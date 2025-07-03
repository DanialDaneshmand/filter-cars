"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import React, { use, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  userName: yup
    .string()
    .max(12, "تعداد کاراکترها نباید بیشتر از دوازده باشد")
    .required("وارد کردن نام کاربری الزامی است"),
  password: yup
    .string()
    .max(12, "تعداد کاراکترها نباید بیشتر از دوازده باشد")
    .required("وارد کردن رمز عبور الزامی است"),
});

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const [toggleType, setToggleType] = useState(true);

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="w-full h-auto flex justify-center py-8 bg-[#7351E8]">
      <div className=" flex flex-col w-[450px] pt-10 px-10  rounded-xl items-center bg-[#efefef]">
        <p className="text-2xl mb-10 font-bold text-[#7452EB]">
          به صفحه ورود خوش خوش امدید.
        </p>
        <Link href="/" className="w-full">
          <div className="flex items-center  justify-center rounded-lg py-2 gap-x-4 border w-full border-gray-400 text-gray-400">
            <span>ورود از طریق سرویس گوگل </span>
            <span className="text-black">
              <FaGoogle />
            </span>
          </div>
        </Link>
        <div className="w-full  flex  flex-col pt-10 pb-3">
          <div className="w-full flex justify-center relative">
            <p className=" px-5 bg-[#efefef] absolute -top-3 text-gray-400">
              یا
            </p>
          </div>
          <hr className="text-gray-300" />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col items-center"
        >
          <Input
            label="نام کاربری خود را وارد کنید"
            forgetPassword={false}
            name="userName"
            register={register}
            errors={errors}
          />
          <Input
            label="رمز عبور خود را وارد کنید"
            forgetPassword={true}
            icon={toggleType ? <FiEyeOff /> : <FiEye />}
            name="password"
            register={register}
            toggleType={toggleType}
            setToggleType={() => setToggleType((prevState) => !prevState)}
            errors={errors}
          />
          <div className="w-full flex items-center gap-x-1 mt-4">
            <input
              type="checkBox"
              className="appearance-none rounded-sm bg-gray-300 border-none w-5 h-5 cursor-pointer checked:bg-blue-600"
            />
            <label htmlFor="" className="text-xs text-gray-400">
              اطلاعات را ذخیره کنم
            </label>
          </div>
          <Button label="ورود" />
        </form>
        <div className="w-full flex flex-col items-center">
          <p className=" font-bold">اگر در سایت عضویت ندارید ؟</p>
          <Button label="عضویت در سایت" />
        </div>
      </div>
    </div>
  );
}

export default Login;
