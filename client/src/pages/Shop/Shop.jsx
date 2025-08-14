import { useEffect, useState } from "react";
import Container from "./../../components/Container/Container";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { categories, sortOptions } from "../../Utils";
import { productFilter } from "../../Context/ApiServices";
import { useLocation, useNavigate } from "react-router-dom";
import useDebounce from "../../Hook/useDebounce";
import ProductCard from "../../components/card/ProductCard";
import FiltersComponent from "../../components/FiltersComponent/FiltersComponent";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import CategoryHeader from "../../components/FiltersComponent/CategoryHeader";
import ProductListView from "../../components/card/ProductListView";
import Skeleton from "../../components/Skeleton/Skeleton";

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [isGridView, setIsGridView] = useState(true);
  const [filter, setFilter] = useState([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState({});
  const [priceRange, setPriceRange] = useState([100, 1000000]);
  const [limit, setLimit] = useState(6);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  // console.log("sfsdfsdffffff", location);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  const sub = queryParams.get("subcategory");
  const tag = queryParams.get("tag");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const debouncedPriceRange = useDebounce(priceRange, 300);
  const removeTagQueryParam = () => {
    const params = new URLSearchParams(location.search);
    params.delete("tag");

    const newSearch = params.toString();
    navigate(`${location.pathname}${newSearch ? `?${newSearch}` : ""}`);
  };
  const handlePriceChange = (newValue) => {
    setPriceRange(newValue);
  };

  const handleSortChange = (e) => {
    if (e.target.value) {
      removeTagQueryParam();
    }
    setSortOption(e.target.value);
  };
  useEffect(() => {
    productFilter(
      setFilter,
      setPagination,
      debouncedSearchTerm,
      category,
      sub,
      "",
      debouncedPriceRange,
      "",
      tag,
      "",
      "",
      "",
      page,
      limit
    ).then(() => {
      setLoading(false); // Set loading to false once the data is fetched
    });
  }, [tag]);
  const toggleFilter = (id) => {
    setOpenFilter((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCategoryClick = (category) => {
    setSelectedSubcategory(null);
    navigate(`?category=${encodeURIComponent(category)}`);
  };

  const handleSubcategoryClick = (category, subcategory) => {
    setSelectedSubcategory(subcategory);
    navigate(
      `?category=${encodeURIComponent(
        category
      )}&subcategory=${encodeURIComponent(subcategory)}`
    );
  };
  useEffect(() => {
    setSearchTerm(location.state);
  }, [location]);
  useEffect(() => {
    if (tag) {
      return;
    }
    setLoading(true); // Start loading

    productFilter(
      setFilter,
      setPagination,
      debouncedSearchTerm,
      category,
      sub,
      "",
      debouncedPriceRange,
      "",
      sortOption,
      "",
      "",
      "",
      page,
      limit
    ).then(() => {
      setLoading(false); // Set loading to false once the data is fetched
    });
  }, [
    category,
    sub,
    debouncedSearchTerm,
    debouncedPriceRange,
    sortOption,
    limit,
    page,
    tag,
  ]);

  const handleNext = () => {
    if (pagination.page < pagination.totalPages) {
      setPage((old) => old + 1);
    }
  };

  const handlePrevious = () => {
    if (pagination.page > 1) {
      setPage((old) => Math.max(old - 1, 1));
    }
  };

  // Function to toggle view based on screen width
  const toggleView = () => {
    // setIsGridView((prev) => !prev);
  };

  // Run toggleView on initial load
  useEffect(() => {
    toggleView();
  }, []);
  // console.log(filter);
  return (
    <div className="py-20 lg:pt-20">
      {loading ? (
        <div className="my-10 h-screen flex justify-center items-center">
          <Skeleton />
        </div>
      ) : (
        <Container>
          <div className="py-5">
            <Breadcrumbs category={category} sub={sub} location={location} />
          </div>
          <div className="bg-white">
            <div>
              {/* Mobile filter dialog */}
              {mobileFiltersOpen && (
                <div className="fixed inset-0  z-[999999] lg:hidden">
                  <div
                    className="fixed inset-0 bg-black bg-opacity-25
                 transition-opacity duration-300 ease-linear"
                  ></div>
                  <div className="fixed inset-0 z-40 flex">
                    <div className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out">
                      <div className="flex items-center justify-between px-4">
                        <h2 className="text-lg font-medium text-gray-900">
                          Filters
                        </h2>
                        <button
                          type="button"
                          onClick={() => setMobileFiltersOpen(false)}
                          className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                        >
                          <span className="sr-only">Close menu</span>
                          <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                      </div>

                      {/* Filters */}
                      <FiltersComponent
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        priceRange={priceRange}
                        handlePriceChange={handlePriceChange}
                        categories={categories}
                        handleCategoryClick={handleCategoryClick}
                        toggleFilter={toggleFilter}
                        openFilter={openFilter}
                        selectedSubcategory={selectedSubcategory}
                        handleSubcategoryClick={handleSubcategoryClick}
                      />
                    </div>
                  </div>
                </div>
              )}

              <main className=" ">
                <CategoryHeader
                  category={category}
                  limit={limit}
                  setLimit={setLimit}
                  sortOption={sortOption}
                  handleSortChange={handleSortChange}
                  sortOptions={sortOptions}
                  toggleView={toggleView}
                  isGridView={isGridView}
                  setMobileFiltersOpen={setMobileFiltersOpen}
                />
                <section
                  aria-labelledby="products-heading"
                  className="pb-24 pt-6"
                >
                  <h1 id="products-heading" className="sr-only">
                    Products
                  </h1>

                  <div className="grid grid-cols-1  gap-x-8 gap-y-10 lg:grid-cols-4">
                    {/* Filters */}
                    <div className=" hidden lg:block">
                      <FiltersComponent
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        priceRange={priceRange}
                        handlePriceChange={handlePriceChange}
                        categories={categories}
                        handleCategoryClick={handleCategoryClick}
                        toggleFilter={toggleFilter}
                        openFilter={openFilter}
                        selectedSubcategory={selectedSubcategory}
                        handleSubcategoryClick={handleSubcategoryClick}
                      />
                    </div>
                    {/* product grid */}
                    <div className="lg:col-span-3 px-5 sm:px-0 ">
                      {filter?.length ? (
                        isGridView ? (
                          <div className="grid grid-cols-1  justify-center mt-4 w-full sm:grid-cols-2 xl:grid-cols-3 lg:gap-5">
                            {filter?.map((item, index) => {
                              const discountPercentage = item?.discount
                                ? Math.round((item.discount / item.price) * 100)
                                : 0;
                              const discountedPrice =
                                item?.price - item?.discount;
                              return (
                                <ProductCard
                                  key={index}
                                  item={item}
                                  discountPercentage={discountPercentage}
                                  discountedPrice={discountedPrice}
                                />
                              );
                            })}
                          </div>
                        ) : (
                          <div className="space-y-4 mt-4 ">
                            {filter?.map((item, index) => {
                              const discountPercentage = item?.discount
                                ? Math.round((item.discount / item.price) * 100)
                                : 0;
                              const discountedPrice =
                                item?.price - item?.discount;
                              return (
                                <ProductListView
                                  key={index}
                                  item={item}
                                  discountPercentage={discountPercentage}
                                  discountedPrice={discountedPrice}
                                  isListView={true}
                                />
                              );
                            })}
                          </div>
                        )
                      ) : (
                        <div className="h-[50vh] max-w-2xl flex flex-col gap-5 justify-center items-center">
                          <p className="text-2xl font-bold capitalize">
                            No products available in this{" "}
                            <span className="text-primary">{category}</span>{" "}
                            Category.
                          </p>
                          <p>Try Another Category...</p>
                        </div>
                      )}

                      {filter.length > 0 && (
                        <div className="flex justify-center gap-10 items-center px-5 mt-10">
                          {/* Previous Button */}
                          <button
                            onClick={handlePrevious}
                            disabled={pagination.page === 1}
                            className="px-2 py-2 bg-gray-500 text-white rounded-full"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="size-5"
                            >
                              <path
                                fillRule="evenodd"
                                d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                          <span className="px-2 py-2 bg-secondary text-white rounded-full">
                            {pagination.page}
                          </span>
                          {/* Next Button */}
                          <button
                            onClick={handleNext}
                            disabled={pagination.page === pagination.totalPages}
                            className="px-2 py-2 bg-blue-500 text-white rounded-full"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="size-5"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              </main>
            </div>
          </div>
        </Container>
      )}
    </div>
  );
};

export default Shop;
