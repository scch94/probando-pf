import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { findBook } from "../../actions";
import "./Searchbar.css";

function SearchBar() {
  const [searchBook, setSearchBook] = useState("");
  const dispatch = useDispatch();

  const handleInput = (e) => {
    e.preventDefault();
    setSearchBook(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (searchBook.length === 0) return alert("Nothing in searchbar");
    dispatch(findBook(searchBook));
    setSearchBook("");
  };

  return (
    <div className="searchbar">
      <form onSubmit={onSubmit} className="searchbar-input">
        <div className="group">
          <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
          <input
            onChange={handleInput}
            placeholder="Buscar por nombre..."
            type="text"
            className="input-searchbar"
            value={searchBook}
          />
        </div>
        {/* <input className="searchbar-submit" type="submit" value="Submit" /> */}
      </form>
    </div>
  );
}

export default SearchBar;
