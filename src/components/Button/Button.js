import PropTypes from "prop-types";
import s from "../Button/Button.module.css";

export function Button({ onClick }) {
  return (
    <button className={s.button} type="button" onClick={onClick}>
      Load more
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
