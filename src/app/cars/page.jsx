"use client";
import CarCard from "@/components/CarCard";
import SelectComp from "@/components/SelectComp";
import axios from "axios";

import React, { useState, useEffect } from "react";

const CarList = () => {
  const [uniqueMakes, setUniqueMakes] = useState([]);
  const [uniqueBodyStyle, setUniqueBodyStyle] = useState([]);
  const [uniqueModel, setUniqueModel] = useState([]);
  const [uniqueModelYear, setUniqueModelYear] = useState([]);
  const [uniqueDoor, setUniqueDoor] = useState([]);
  const [carList, setCarList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [makesFilterValue, setMakesFilterValue] = useState("");
  const [bodyStyleFilterValue, setBodyStyleFilterValue] = useState("");
  const [modelFilterValue, setModelFilterValue] = useState("");
  const [modelYearFilterValue, setModelYearFilterValue] = useState("");
  const [doorFilterValue, setDoorFilterValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { midVehicleDealerships },
        } = await axios.get(
          "https://api.hillzusers.com/api/dealership/vehicles/localhost:3000"
        );
        setCarList(midVehicleDealerships);
        setFilteredData(midVehicleDealerships);

        console.log(midVehicleDealerships);

        // makes
        const makes = midVehicleDealerships.map((item) => item.Vehicle.make);

        const uniqueSet = new Set(makes);
        setUniqueMakes(Array.from(uniqueSet));
        // body style
        const bodyStyle = midVehicleDealerships.map(
          (item) => item.Vehicle.body_style
        );
        const uniqueSetBodyStyle = new Set(bodyStyle);
        setUniqueBodyStyle(Array.from(uniqueSetBodyStyle));
        // model
        const model = midVehicleDealerships.map((item) => item.Vehicle.model);
        const uniqueSetModel = new Set(model);
        setUniqueModel(Array.from(uniqueSetModel));
        // model-year
        const modelYear = midVehicleDealerships.map(
          (item) => item.Vehicle.model_year
        );
        const uniqueSetModelYear = new Set(modelYear);
        setUniqueModelYear(Array.from(uniqueSetModelYear));
        // door
        const doors = midVehicleDealerships.map((item) => item.Vehicle.doors);
        const uniqueSetDoor = new Set(doors);
        setUniqueDoor(Array.from(uniqueSetDoor));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // استخراج مقادیر make
  }, []);

  const handleChange = (e, label) => {
    switch (label) {
      case "Body Style": {
        return setBodyStyleFilterValue(e.target.value);
      }
      case "Make": {
        return setMakesFilterValue(e.target.value);
      }
      case "Model": {
        return setModelFilterValue(e.target.value);
      }
      case "Model Year": {
        return setModelYearFilterValue(e.target.value);
      }
      case "Doors": {
        return setDoorFilterValue(e.target.value);
      }

      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredList = carList.filter((item) => {
      if (
        bodyStyleFilterValue &&
        item.Vehicle.body_style !== bodyStyleFilterValue
      ) {
        return false;
      }
      if (makesFilterValue && item.Vehicle.make !== makesFilterValue) {
        return false;
      }
      if (modelFilterValue && item.Vehicle.model !== modelFilterValue) {
        return false;
      }
      if (
        modelYearFilterValue &&
        item.Vehicle.model_year !== +modelYearFilterValue
      ) {
        return false;
      }
      if (doorFilterValue && item.Vehicle.doors !== +doorFilterValue) {
        return false;
      }
      return true;
    });
    setFilteredData(filteredList);
  };

  return (
    <div>
      <div className=" grid grid-cols-12 ">
        <div className="col-span-4 border-r border-gray-400 px-8">
          <div className="border-b text-gray-600 border-gray-400 pb-6 text-4xl text-center">
            <p>Quick Search</p>
          </div>
          <form onSubmit={handleSubmit}>
            <SelectComp
              label="Body Style"
              onChange={handleChange}
              arr={uniqueBodyStyle}
            />

            <SelectComp
              label="Make"
              onChange={handleChange}
              arr={uniqueMakes}
            />
            <SelectComp
              label="Model"
              onChange={handleChange}
              arr={uniqueModel}
            />
            <SelectComp
              label="Model Year"
              onChange={handleChange}
              arr={uniqueModelYear}
            />
            <SelectComp
              label="Doors"
              onChange={handleChange}
              arr={uniqueDoor}
            />
            <div className=" w-full flex justify-center p-8">
              <button
                type="submit"
                className=" text-gray-600 border w-full border-gray-400 py-3 px-6 rounded-lg"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
        <div className="col-span-8 px-30">
          {filteredData.map((item) => (
            <CarCard
              key={item.cover_image}
              imageUrl={`https://image123.azureedge.net${item.cover_image}`}
              manufactureYear={item.Vehicle.model_year}
              model={item.Vehicle.model}
              vehicleType="benz"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarList;

// import React, { useState } from 'react';

// function VehicleFilter() {
//   const [vehicleList, setVehicleList] = useState([
//     {
//       Vehicle: {
//         body_style: "sedan",
//         doors: 4,
//         make: "Toyota",
//         model: "Camry",
//         model_year: 2020
//       }
//     },
//     {
//       Vehicle: {
//         body_style: "SUV",
//         doors: 5,
//         make: "Honda",
//         model: "CR-V",
//         model_year: 2021
//       }
//     },
//     {
//       Vehicle: {
//         body_style: "coupe",
//         doors: 2,
//         make: "BMW",
//         model: "M4",
//         model_year: 2019
//       }
//     }
//   ]);

//   // استیت‌های فیلتر
//   const [filterBodyStyle, setFilterBodyStyle] = useState(''); // مثلا "sedan"
//   const [filterMake, setFilterMake] = useState(''); // مثلا "Toyota"

//   // تابع برای فیلتر کردن لیست
//   const handleFilter = () => {
//     const filteredList = vehicleList.filter(item => {
//       // اگر مقدار فیلتر خالی است، فایده ای ندارد، پس برنمی‌گرداند
//       if (filterBodyStyle && item.Vehicle.body_style !== filterBodyStyle) {
//         return false;
//       }
//       if (filterMake && item.Vehicle.make !== filterMake) {
//         return false;
//       }
//       return true;
//     });
//     setVehicleList(filteredList);
//   };

//   // تابع برای بازگرداندن لیست اولیه یا پاک کردن فیلتر
//   const handleReset = () => {
//     // درواقع باید آرایه اولیه رو برگردونی، پس بهتر است آرایه اولیه رو نگه داریم
//     // این کار را با داشتن آرایه کامل (قبل از فیلتر) ممکن می‌کنیم
//   };

//   return (
//     <div>
//       <h2>فیلتر خودروها</h2>

//       {/* ورودی فیلتر بر اساس body_style */}
//       <input
//         type="text"
//         placeholder="نوع بدنه (مثلاً sedan)"
//         value={filterBodyStyle}
//         onChange={(e) => setFilterBodyStyle(e.target.value)}
//       />

//       {/* ورودی فیلتر بر اساس make */}
//       <input
//         type="text"
//         placeholder="سازنده"
//         value={filterMake}
//         onChange={(e) => setFilterMake(e.target.value)}
//       />

//       {/* دکمه فیلتر */}
//       <button onClick={handleFilter}>فیلتر کنید</button>

//       {/* مثلا، دکمه ریست کردن */}
//       {/* اگر می‌خواهی لیست رو به حالت اولیه برگردونی، باید آرایه کامل رو یه استیت دیگه ذخیره کنی */}

//       {vehicleList.map((item, index) => (
//         <div key={index}>
//           {item.Vehicle.body_style} | {item.Vehicle.make} | {item.Vehicle.model} | {item.Vehicle.model_year}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default VehicleFilter;
