const BAS_URL = 'https://pixabay.com/api';
const End_POINT = '/?';
const API_KEY = '37549280-c708feca670f76edfee67d8a3';
import axios from "axios";


export const API = {
  page: 1,
  query: '',

  async getImages() {
    const Params = new URLSearchParams({
      key: API_KEY,
      image_type: 'photo',
      q: this.query,
      safesearch: 'true',
      orientation: 'horizontal',
      page: this.page,
      per_page: 40,
    });
    const url = BAS_URL + End_POINT + Params;

    this.page += 1;
    const res = await axios.get(url)
    return res.data;
  },
};
