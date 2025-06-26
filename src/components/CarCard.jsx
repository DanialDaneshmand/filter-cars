const CarCard = ({ imageUrl, vehicleType, manufactureYear, model }) => {
  return (
    <div className="w-full grid grid-cols-2 bg-white rounded-lg shadow-lg overflow-hidden my-10 font-sans rtl">
      <div>
        <img src={imageUrl} alt="Car" className="w-64 h-48 " />
      </div>
      <div>
        <div className="p-4 text-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Vehicle Type: {vehicleType}
          </h2>
          <div className="text-gray-600 mb-1">
            <strong>Year of Manufacture:</strong> {manufactureYear}
          </div>
          <div className="text-gray-600">
            <strong>Model:</strong> {model}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard