import React from "react";

function SelectComp({ onChange, label, arr }) {
  return (
    <div className="px-8 py-3">
      <select
        onChange={(e) => onChange(e, label)}
        className="border-b outline-0 w-full border-gray-300 text-gray-600 py-3  px-2 "
      >
        <option value="">{label}</option>
        <option value="">ALL</option>
        {arr.map((item) => (
          <option key={item ? item : "20"} value={item ? item : "1"}>
            {item ? item : "1"}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectComp;
