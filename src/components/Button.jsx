import React from "react";

function Button({label}) {
  return (
    <button className="w-full py-2 rounded-lg bg-[#7452EB] text-[#efefef] my-8">
      {label}
    </button>
  );
}

export default Button;
