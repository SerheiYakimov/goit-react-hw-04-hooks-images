import { Component } from "react";
import "./App.css";
import { Searchbar } from "./components/Searchbar/Searchbar";
import ImageGallery from './components/ImageGallery/ImageGallery';
import { ToastContainer } from "react-toastify";
import "../node_modules/react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {
    value: "",
  };

  getFormSubmitValue = (value) => {
    this.setState({ value });
  };

  render() {
    const { getFormSubmitValue } = this;
    const { value } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={getFormSubmitValue} />
        <ImageGallery value={value} />
        <ToastContainer position="top-left" autoClose={3000} />
      </div>
    );
  }
}

export default App;
