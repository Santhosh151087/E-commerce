import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";
const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (location.pathname.includes("collection") ) {
      setVisible(true);
    }
    else{
      setVisible(false);
    }
  }, [location]);
  return showSearch && visible? (
    <div className="w-full border-t border-b bg-gray-100 flex justify-center py-6">
      <div className="w-3/4 sm:w-1/2 flex items-center bg-white border border-gray-300 rounded-full px-6 py-3 shadow-sm">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search"
          className="flex-1 outline-none bg-transparent text-sm"
        />

        <img src={assets.search_icon} alt="" className="w-5 mr-4" />

        <button onClick={() => setShowSearch(false)}>
          <img
            src={assets.cross_icon}
            alt=""
            className="w-4 opacity-60 hover:opacity-100"
          />
        </button>
      </div>
    </div>
  ) : null;
};

export default SearchBar;
