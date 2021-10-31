import { Component } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import s from "../Searchbar/Searchbar.module.css";

export class Searchbar extends Component {
  state = {
    searchValue: "",
  };

  handleSearchSubmit = (e) => {
    e.preventDefault();
    if (this.state.searchValue.trim() === "") {
      toast.warn("Enter a name to search!");
      return;
    }
    this.props.onSubmit(this.state.searchValue);
    this.setState({ searchValue: "" });
  };

  handleSearchChange = (e) => {
    this.setState({ searchValue: e.target.value.toLowerCase() });
  };

  render() {
    const { handleSearchSubmit, handleSearchChange } = this;
    const { searchValue } = this.state;
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
}

Searchbar.propTypes = {
  handleSearchChange: PropTypes.func.isRequired,
  handleSearchSubmit: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
};
