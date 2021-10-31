import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import s from "../ImageGallery/ImageGallery.module.css";
import { PixabayFetch } from "../../services/pixabay";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import { Button } from "../Button/Button";
import "../../../node_modules/react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { toast } from "react-toastify";

const newPixabayFetch = new PixabayFetch();

export default function ImageGallery({value}) {

    const [searchResult, setSearchResult] = useState([]);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loader, setLoader] = useState(false);
    const [modalImg, setModalImg] = useState('');

  useEffect(
    () => {
      newPixabayFetch.resetPage();
      setLoader(true);
      newPixabayFetch.searchQuery = value;
      newPixabayFetch
        .searchPhotos()
        .then((searchResult) => {
          if (searchResult.length === 0) {
            toast.warn("Nothihg found for this name! Enter correct name!");
            setSearchResult([]);
            return;
          }
          setSearchResult(searchResult);
          setLoader(false);
        })
        .catch((error) => setError('error'));
    }, [value]
  );

  const onLoadMore = () => {
    newPixabayFetch.page = 1;
    setLoader(true);
    newPixabayFetch
      .searchPhotos()
      .then((searchResult) => {
        setSearchResult(prevState =>
        [...prevState.searchResult, ...searchResult])
          setLoader(false);
      })
      .then(ScrollImages)
      .catch((error) => setError('error'));
  }

  const ScrollImages = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  }

  const onClickModalImg = (e) => {
    const { img } = e.target.dataset;
    setModalImg(img);
    toggleModal();
  }
    
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