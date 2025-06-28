"use client";
import CarCard from "@/components/CarCard";
import Loading from "@/components/Loading";
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
  const [bodyStyleLabel, setBodyStyleLabel] = useState("Body Style");
  const [makesLabel, setMakesLabel] = useState("Make");
  const [modelLabel, setModelLabel] = useState("Model");
  const [modelYearLabel, setModelYearLabel] = useState("Model Year");
  const [doorsLabel, setDoorsLabel] = useState("Doors");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const {
          data: { midVehicleDealerships },
        } = await axios.get(
          "https://api.hillzusers.com/api/dealership/vehicles/localhost:3000"
        );
        setIsLoading(false);
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
        console.log(uniqueSetDoor);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
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
  }, [
    bodyStyleFilterValue,
    makesFilterValue,
    modelFilterValue,
    modelYearFilterValue,
    doorFilterValue,
  ]);

  const handleChange = (e, label) => {
    // switch (label) {
    //   case "Body Style": {
    //     return setBodyStyleFilterValue(e.target.value);
    //   }
    //   case "Make": {
    //     return setMakesFilterValue(e.target.value);
    //   }
    //   case "Model": {
    //     return setModelFilterValue(e.target.value);
    //   }
    //   case "Model Year": {
    //     return setModelYearFilterValue(e.target.value);
    //   }
    //   case "Doors": {
    //     return setDoorFilterValue(e.target.value);
    //   }

    //   default

    // }
    if (label === "Body Style") {
      setBodyStyleFilterValue((prevState) => (prevState = e.target.value));
      setBodyStyleLabel(e.target.value);
    }
    if (label === "Make") {
      setMakesFilterValue((prevState) => (prevState = e.target.value));
      setMakesLabel(e.target.value);
    }
    if (label === "Model") {
      setModelFilterValue((prevState) => (prevState = e.target.value));
      setModelLabel(e.target.value);
    }
    if (label === "Model Year") {
      setModelYearFilterValue((prevState) => (prevState = e.target.value));
      setModelYearLabel(e.target.value);
    }
    if (label === "Doors") {
      setBodyStyleFilterValue((prevState) => (prevState = e.target.value));
      setDoorsLabel(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBodyStyleFilterValue("");
    setDoorFilterValue("");
    setMakesFilterValue("");
    setModelFilterValue("");
    setModelYearFilterValue("");
    setBodyStyleLabel("Body Style");
    setMakesLabel("make");
    setModelLabel("Model");
    setModelYearLabel("Model Year");
    setDoorsLabel("Doors");
  };

  if (isLoading){
    return <Loading/>
  }

  return (
    <div>
      <div className=" grid grid-cols-12 ">
        <div className="col-span-4 border-r border-gray-400 px-8">
          <div className="border-b text-gray-600 border-gray-400 pb-6 text-4xl text-center">
            <p>Quick Search</p>
          </div>
          <form onSubmit={handleSubmit}>
            <SelectComp
              label={bodyStyleLabel}
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
              vehicleType={item.Vehicle.make}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarList;
