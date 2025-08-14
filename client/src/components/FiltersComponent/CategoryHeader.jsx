import {
  ListBulletIcon,
  Squares2X2Icon,
  FunnelIcon,
} from "@heroicons/react/24/outline";

const CategoryHeader = ({
  category,
  limit,
  setLimit,
  sortOption,
  handleSortChange,
  sortOptions,
  toggleView,
  isGridView,
  setMobileFiltersOpen,
}) => {
  return (
    <div className="flex flex-wrap gap-5 items-baseline justify-between border-b border-gray-200 pb-6">
      <div className="flex flex-wrap justify-between gap-3 items-center">
        <h1
          className="lg:text-2xl font-bold 
        tracking-tight text-gray-900"
        >
          {category} Category
        </h1>
        <div className="flex md:hidden gap-3 items-center">
          <label className="text-sm font-medium text-gray-700">
            Items per page
          </label>
          <div className="">
            <select
              value={limit}
              onChange={(e) => setLimit(parseInt(e.target.value))}
              className="mt-1 block w-full px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={150}>150</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="md:flex gap-3 hidden items-center">
          <label className="text-sm font-medium text-gray-700">
            Items per page
          </label>
          <div className="">
            <select
              value={limit}
              onChange={(e) => setLimit(parseInt(e.target.value))}
              className="mt-1 block w-full px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={150}>150</option>
            </select>
          </div>
        </div>

        <div className="relative inline-block text-left">
          <div className="z-10 w- 40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5">
            <div className="py-1 cursor-pointer">
              <select
                value={sortOption}
                onChange={handleSortChange}
                className=""
              >
                <option value="">Sort By</option>
                {sortOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className="text-gray-500 capitalize hover:bg-[#fafafa] -400 block px-4 py-2 text-sm"
                  >
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={toggleView}
          className="-m-2 ml-5 p-2 hidden text-gray-400 hover:text-gray-500 sm:ml-7"
        >
          <span className="sr-only">View grid</span>
          {isGridView ? (
            <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />
          ) : (
            <ListBulletIcon aria-hidden="true" className="h-5 w-5" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setMobileFiltersOpen(true)}
          className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
        >
          <span className="sr-only">Filters</span>
          <FunnelIcon aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default CategoryHeader;
