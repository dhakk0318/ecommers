import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, fetchSubcategories } from "../Redux/Action/action";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { ChevronDown } from "lucide-react";

export default function Navigation() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const subcategories = useSelector((state) => state.categories.subcategories);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const toggleCategory = (category) => {
    const isExpanded =
      expandedCategory && expandedCategory.catid === category.catid;
    setExpandedCategory(isExpanded ? null : category);

    if (!isExpanded) {
      dispatch(fetchSubcategories(category.catid)); // Fetch subcategories for the clicked category
    }
  };

  return (
    <div className="relative">
      <Header isSidebarOpen={isSidebarOpen} />
      <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg relative z-40">
        <div className="bg-gray-800">
          <div className="flex flex-wrap items-center space-x-1 h-12 max-w-full">
            {/* Added flex-wrap and reduced space-x */}
            <button
              onClick={toggleSidebar}
              className="flex items-center text-sm font-medium hover:bg-blue-600 px-3 py-2 rounded-md transition duration-150 ease-in-out"
            >
              All
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            {categories.map((category) => (
              <div key={category.catid} className="relative group">
                <button
                  onClick={() => toggleCategory(category)}
                  className="text-sm font-sm flex items-center justify-between hover:bg-gray-600 px-5 py-1 rounded-md whitespace-nowrap transition duration-150 ease-in-out"
                >
                  {category.catname}
                  <ChevronDown className="ml-2 h-4 w-4 text-gray-400" />{" "}
                  {/* Arrow icon */}
                </button>

                {expandedCategory &&
                  expandedCategory.catid === category.catid && (
                    <div className="absolute z-50 bg-gray-800 mt-1 border border-gray-600 rounded-md p-2 left-0 right-0 max-w-xs">
                      {" "}
                      {/* Limited dropdown width */}
                      {subcategories[category.catid]?.map((sub) => (
                        <div
                          key={sub.sub_catid}
                          className="text-sm text-gray-300 p-1 hover:bg-blue-700 cursor-pointer"
                        >
                          {sub.subcat_name}
                        </div>
                      )) || (
                        <div className="text-sm text-gray-400">
                          No subcategories found
                        </div>
                      )}
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>
      </nav>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        /> // Backdrop
      )}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        categories={categories}
        subcategories={subcategories}
        expandedCategory={expandedCategory}
        toggleCategory={toggleCategory}
      />
    </div>
  );
}
