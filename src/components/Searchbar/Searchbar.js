import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import s from "../Searchbar/Searchbar.module.css";

export default function Searchbar({onSubmit}) {
    const [searchValue, setSearchValue] = useState('');

    const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim() === "") {
      toast.warn("Enter a name to search!");
      return;
    }
    onSubmit(searchValue);
    setSearchValue("");
  };

    const handleSearchChange = (e) => {
    setSearchValue(e.target.value.toLowerCase());
  };
   



    return (
      <header className={s.searchbar}>
        <form className={s.searchForm} onSubmit={handleSearchSubmit}>
          <button type="submit" className={s.searchButton}>
            <span className={s.searchButtonLabel}>Search</span>
          </button>
          <input
            className={s.searchInput}
            type="text"
            name="value"
            value={searchValue}
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            onChange={handleSearchChange}
          />
        </form>
      </header>
    );

}

Searchbar.propTypes = {
  handleSearchChange: PropTypes.func.isRequired,
  handleSearchSubmit: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
};