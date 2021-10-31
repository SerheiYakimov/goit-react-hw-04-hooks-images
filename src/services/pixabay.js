import axios from "axios";

export class PixabayFetch {
  constructor() {
    this._searchQuery = "";
    this._page = 1;
    this.perPage = 12;
  }

  get searchQuery() {
    return this._searchQuery;
  }
  set searchQuery(value) {
    return (this._searchQuery = value);
  }

  get page() {
    return this._page;
  }
  set page(value) {
    return (this._page += value);
  }

  resetPage() {
    return (this._page = 1);
  }

  searchPhotos() {
    const url = "https://pixabay.com/api/";
    const apiKey = "23141272-55f7853bfecadbbcd9800c5ad";
    const params = `?key=${apiKey}&q=${this._searchQuery}&page=${this.page}&image_type=photo&orientation=horizontal&per_page=${this.perPage}`;
    const fetch = url + params;
    return axios
      .get(fetch)
      .then((result) => {
        // console.log(result);
        return result.data;
      })
      .then((data) => {
        // console.log(data.hits);
        return data.hits;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
