import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, fetchSubcategories } from "../../app/Redux/Action/action";
import { ChevronDown } from "lucide-react";

export default function Navigation() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const subcategories = useSelector((state) => state.categories.subcategories);
  const [expandedCategory, setExpandedCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

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
      <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg relative z-40">
        <div className="bg-gray-800">
          <div className="flex flex-wrap items-center space-x-1 h-8 max-w-full">
            {/* Category navigation */}
            {categories.map((category) => (
              <div key={category.catid} className="relative group">
                <button
                  onClick={() => toggleCategory(category)}
                  className="text-sm font-sm flex items-center justify-between hover:bg-gray-600 px-5 py-1 rounded-md whitespace-nowrap transition duration-150 ease-in-out"
                >
                  {category.catname}
                  <ChevronDown className="ml-1 h-4 group-hover:rotate-180 w-4 text-gray-400" />
                </button>

                {/* Show subcategories when the category is expanded */}
                {expandedCategory &&
                  expandedCategory.catid === category.catid && (
                    <div className="absolute z-50 bg-gray-800 mt-1 border border-gray-600 rounded-md p-2 left-0 right-0 max-w-xs">
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
    </div>
  );
}
