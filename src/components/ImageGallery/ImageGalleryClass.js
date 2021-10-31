import { Component } from "react";
import PropTypes from "prop-types";
import s from "../ImageGallery/ImageGallery.module.css";
import { PixabayFetch } from "../../services/pixabay";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import { Button } from "../Button/Button";
import "../../../node_modules/react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { toast } from "react-toastify";

const newPixabayFetch = new PixabayFetch();

export class ImageGallery extends Component {
  state = {
    searchResult: [],
    error: null,
    // status: "idle",
    showModal: false,
    loader: false,
    modalImg: "",
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.value !== this.props.value) {
      newPixabayFetch.resetPage();
      this.setState({ loader: true });
      newPixabayFetch.searchQuery = this.props.value;
      newPixabayFetch
        .searchPhotos()
        .then((searchResult) => {
          if (searchResult.length === 0) {
            toast.warn("Nothihg found for this name! Enter correct name!");
            this.setState({ searchResult: [] });
            return;
          }
          this.setState({ searchResult, loader: false });
        })
        .catch((error) => this.setState({ error }));
    }
  }

  onLoadMore = () => {
    newPixabayFetch.page = 1;
    this.setState({ loader: true });
    newPixabayFetch
      .searchPhotos()
      .then((searchResult) => {
        this.setState((prevState) => ({
          searchResult: [...prevState.searchResult, ...searchResult],
          loader: false,
        }));
      })
      .then(this.ScrollImages)
      .catch((error) => this.setState({ error }));
  };

  ScrollImages = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onClickModalImg = (e) => {
    const { img } = e.target.dataset;
    this.setState({ modalImg: img });
    this.toggleModal();
  };

  render() {
    const { loader, searchResult, modalImg, showModal } = this.state;
    const { toggleModal, onClickModalImg, onLoadMore } = this;
    return (
      <>
        {loader && (
          <Loader
            type="Bars"
            color="#00BFFF"
            height={200}
            width={200}
            timeout={3000}
          />
        )}
        <ul className={s.gallery}>
          {searchResult.length > 0 &&
            searchResult.map(({ id, webformatURL, tags, largeImageURL }) => (
              <ImageGalleryItem
                onClick={onClickModalImg}
                key={id}
                id={id}
                webformatURL={webformatURL}
                tags={tags}
                largeImageURL={largeImageURL}
                modalImg={modalImg}
                showModal={showModal}
                toggleModal={toggleModal}
              />
            ))}
        </ul>
        {searchResult.length >= 12 && <Button onClick={onLoadMore} />}
      </>
    );
  }
}

ImageGallery.propTypes = {
  id: PropTypes.number,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
  largeImageURL: PropTypes.string,
  modalImg: PropTypes.string,
  showModal: PropTypes.bool,
  toggleModal: PropTypes.func,
  onLoadMore: PropTypes.func,
};

// StateMachine
//   if (this.state.status === 'idle') {
//     return <h1>Enter name to find</h1>;
//   }

//   if (this.state.status === 'pending') {
//     return <Loader />;
//   }

//   if (this.state.status === 'rejected') {
//     return <h1>Error</h1>;
//   }

//   if (this.state.status === 'resolved') {
//     return (
//       <>
//         <ul className="ImageGallery">
//           {this.state.searchResult.length > 0 &&
//             this.state.searchResult.map(
//               ({ id, webformatURL, tags, largeImageURL }) => (
//                 <ImageGalleryItem
//                   onClick={this.onClickModalImg}
//                   key={id}
//                   id={id}
//                   webformatURL={webformatURL}
//                   tags={tags}
//                   largeImageURL={largeImageURL}
//                   modalImg={this.state.modalImg}
//                   showModal={this.state.showModal}
//                   toggleModal={this.toggleModal}
//                 />
//               )
//             )}
//         </ul>
//         {this.state.searchResult.length >= 12 && (
//           <Button onClick={this.onLoadMore} />
//         )}
//       </>
//     );
//   }
