import { useState } from "react";
import "./App.css";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from './components/ImageGallery/ImageGallery';
import { ToastContainer } from "react-toastify";
import "../node_modules/react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";


export default function App() {

    const [value, setValue] = useState('');

    const getFormSubmitValue = (value) => {
    setValue(value);
  };
    
return (
      <div className="App">
        <Searchbar onSubmit={getFormSubmitValue} />
        <ImageGallery value={value} />
        <ToastContainer position="top-left" autoClose={3000} />
      </div>
    );
}

App.propTypes = {
  onSubmit: PropTypes.func,
  value: PropTypes.string,
};