import React from "react";

function Loading() {
  return (
    <div className=" flex gap-x-2 w-full justify-center py-32">
      <p>Data Is Loading...</p>
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default Loading;
