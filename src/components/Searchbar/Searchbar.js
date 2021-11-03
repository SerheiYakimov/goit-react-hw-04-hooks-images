import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import s from "../Searchbar/Searchbar.module.css";
import { BsSearch } from 'react-icons/bs'

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
   

// BsSearch

    return (
      <header className={s.searchbar}>
        <form className={s.searchForm} onSubmit={handleSearchSubmit}>
          <button type="submit" className={s.searchButton}>
            <BsSearch className={s.reactIcons}/>
          </button>
          <input
            className={s.searchInput}
            type="text"
            name="value"
            value={searchValue}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleSearchChange}
          />
        </form>
      </header>
    );

}

Searchbar.propTypes = {
  handleSearchChange: PropTypes.func,
  handleSearchSubmit: PropTypes.func,
  searchValue: PropTypes.string,
};