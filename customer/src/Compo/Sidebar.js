import React from "react";
import { X, ChevronRight } from "lucide-react";

const Sidebar = ({ isOpen, toggleSidebar, categories, expandedCategory, subcategories, toggleCategory }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex">
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={toggleSidebar}></div>
      <div className="relative flex flex-col max-w-xs w-full bg-white text-gray-900 transform transition ease-in-out duration-300">
        <div className="absolute top-0 right-0 -mr-12 pt-2">
          <button onClick={toggleSidebar} className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span className="sr-only">Close sidebar</span>
            <X className="h-6 w-6 text-gray-900" />
          </button>
        </div>
        <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
          <nav className="mt-5 px-2 space-y-1">
            <div className="pb-3 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 px-2">Shop by Category</h3>
              {categories.map((category) => (
                <div key={category.catid} className="mb-2">
                  <button
                    onClick={() => toggleCategory(category)} // Use toggleCategory function
                    className="w-full flex items-center justify-between px-2 py-2 text-base font-medium rounded-md text-gray-900 hover:bg-blue-100 transition duration-150 ease-in-out"
                  >
                    {category.catname}
                    <ChevronRight className={`h-5 w-5 text-gray-400 transform transition-transform ${expandedCategory && expandedCategory.catid === category.catid ? 'rotate-90' : ''}`} />
                  </button>
                  {expandedCategory && expandedCategory.catid === category.catid && (
                    <div className="ml-4 mt-2 space-y-2">
                      {subcategories[category.catid]?.map((sub) => (
                        <div key={sub.sub_catid} className="text-gray-600">
                          {sub.subcat_name} {/* Display subcategory name */}
                        </div>
                      )) || (
                        <div className="text-gray-400">No subcategories found</div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
