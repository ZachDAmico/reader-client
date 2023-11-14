export const getAllBooks = () => {
  return fetch(` http://localhost:8000/books`, {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("book_token")).token
      }`,
    },
  }).then((response) => response.json());
};

export const getAllCategories = () => {
  return fetch(` http://localhost:8000/categories`, {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("book_token")).token
      }`,
    },
  }).then((response) => response.json());
};
