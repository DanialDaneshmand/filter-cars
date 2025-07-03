import Button from "@/components/Button";
import Link from "next/link";
import React from "react";

function App() {
  return (
    <div className=" w-full flex justify-center py-32">
      <Link href="/login" className="w-32">
        <Button label="ورود / ثبت نام"/>
      </Link>
    </div>
  );
}

export default App;
