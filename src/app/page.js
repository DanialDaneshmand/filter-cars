import Link from "next/link";
import React from "react";

function App() {
  return (
    <div className=" w-full flex justify-center py-32">
      <Link href="/cars">
        <button className=" cursor-pointer outline-0 py-3 px-6 rounded-lg bg-blue-600 text-white">Go To Car List </button>
      </Link>
    </div>
  );
}

export default App;
