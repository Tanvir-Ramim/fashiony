import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useEffect, useState } from "react";
import ReactGA from "react-ga4";
const FiltersComponent = ({
  searchTerm,
  setSearchTerm,
  priceRange,
  handlePriceChange,
  categories,
  handleCategoryClick,
  toggleFilter,
  openFilter,
  selectedSubcategory,
  handleSubcategoryClick,
}) => {
  const handleLinkClick = (label, sub) => {
    // Track link click event
    ReactGA.event({
      category: `Category=${label} ${sub ? `& subCategory=${sub}` : ``}`,
      action: `${label} Category Clicked Link`,
      label: sub ? `${label} & ${sub}` : label,
    });
  };

  return (
    <form className="mt-4 border-t border-gray-200">
      <h3 className="sr-only">Categories</h3>
      {/* Search */}
      <div className="shadow-2 mb-5 p-2">
        <div className="relative  w-full flex  items-center justify-between rounded-md">
          <svg
            className="absolute left-2 block h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            name="search"
            className="h-12 w-full cursor-text rounded-md border border-gray-100 bg-gray-100 py-4 pl-12 shadow-sm outline-none focus:ring-blue-200"
            placeholder="Search by name etc"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Price */}
      <div className="shadow-2 mb-5 px-3">
        <h3 className="text-lg font-bold uppercase">Shop by price</h3>
        <div className="mt-5 font-medium">
          <ul className="flex flex-col gap-4 text-sm text-gray-800 lg:text-base">
            <li className="border-b-[1px] border-b-[#F0F0F0] pb-2 text-gray-800">
              <label className="mr-2">Price Range:</label>
              <span>৳{priceRange[0]}</span> - <span>৳{priceRange[1]}</span>
            </li>
            <li className="border-b-[1px] border-b-[#F0F0F0] pb-2">
              <Slider
                min={100}
                max={8000}
                step={1}
                value={priceRange}
                onChange={handlePriceChange}
                range
              />
            </li>
          </ul>
        </div>
      </div>

      {/* Category */}
      <div className="shadow-2 p-1">
        {categories.map((category) => (
          <div key={category.id} className="border-gray-200 px-4 py-6">
            <h3 className="-mx-2 -my-3 flow-root">
              <button
                type="button"
                onClick={() => {
                  handleCategoryClick(category.category);
                  handleLinkClick(category.category);
                }}
                className="group flex w-full items-center justify-between bg-white px-2 py-1 text-gray-400 hover:text-gray-500"
              >
                <span className="font-medium text-black">
                  {category.category}
                </span>
                {category.subCategories && (
                  <span
                    onClick={() => toggleFilter(category.id)}
                    className="ml-6 flex items-center"
                  >
                    {openFilter[category.id] ? (
                      <MinusIcon aria-hidden="true" className="h-5 w-5" />
                    ) : (
                      <PlusIcon aria-hidden="true" className="h-5 w-5" />
                    )}
                  </span>
                )}
              </button>
            </h3>
            {/* Show subcategories */}
            {openFilter[category.id] && category.subCategories && (
              <div className="pt-6">
                <div className="space-y-6">
                  {category.subCategories.map((option, optionIdx) => (
                    <div key={option} className="flex items-center">
                      <input
                        id={`filter-mobile-${category.id}-${optionIdx}`}
                        name={`${category.id}[]`}
                        type="checkbox"
                        checked={selectedSubcategory === option}
                        onChange={() => {
                          handleLinkClick(category.category, option);
                          handleSubcategoryClick(category.category, option);
                        }}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`filter-mobile-${category.id}-${optionIdx}`}
                        className="ml-3 min-w-0 flex-1 text-gray-500"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </form>
  );
};

export default FiltersComponent;
