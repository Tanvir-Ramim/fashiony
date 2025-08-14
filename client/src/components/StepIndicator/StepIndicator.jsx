const StepIndicator = ({ currentStep }) => {
  const steps = [
    { label: "Shopping Cart", step: 1 },
    { label: "Address", step: 2 },
    // { label: "Payment", step: 3 },
    // { label: "Checkout", step: 4 },
  ];

  return (
    <div className="flex lg:pb-10 pb-4 pt-2 items-center justify-center space-x-4">
      {steps.map((item, index) => (
        <div key={item.step} className="flex items-center space-x-2">
          {/* Step icon */}
          <div
            className={`w-6 h-6 flex items-center justify-center ${
              currentStep > item.step
                ? "bg-green-500"
                : currentStep === item.step
                ? "bg-gray-800"
                : "bg-gray-300"
            } text-white rounded-full`}
          >
            {currentStep > item.step ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586l-3.293-3.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <span className="text-sm">{item.step}</span>
            )}
          </div>

          {/* Step label */}
          <span
            className={`text-gray-900 font-medium ${
              currentStep === item.step ? "text-black" : "text-gray-500"
            }`}
          >
            {item.label}
          </span>

          {/* Add a separator except after the last step */}
          {index < steps.length - 1 && (
            <div className="w-8 h-px bg-gray-300"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
