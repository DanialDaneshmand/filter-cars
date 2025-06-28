"use client";
import React, { useState } from "react";

function SelectComp({ onChange, label, arr }) {
  
  return (
    <div className="px-8 py-3">
      <select
        value={label}
        onChange={(e) => onChange(e, label)}
        className="border-b outline-0 w-full border-gray-300 text-gray-600 py-3  px-2 "
      >
        <option value="">{label}</option>
        <option value="">ALL</option>
        {arr.map(
          (item) =>
            item && (
              <option key={item} value={item}>
                {item}
              </option>
            )
        )}
      </select>
    </div>
  );
}

export default SelectComp;
