import { useEffect, useState } from "react";
import { getAllBooks } from "../fetches/fetches";

export const AllBooks = () => {
  const [allBooks, setAllBooks] = useState([
    // having dummy data for initial state is common practice?
    {
      id: 1,
      title: "error",
      author: "Zach",
      isbn_number: 12345678,
      url_img:
        "https://upload.wikimedia.org/wikipedia/commons/6/67/Nope_logo.jpg?20220811105328",
      user_id: 1,
      is_owner: true,
      categories: [
        {
          id: 1,
          type: "Not Real Data",
        },
      ],
    },
  ]);

  useEffect(() => {
    getAllBooks().then((bookArray) => {
      setAllBooks(bookArray);
    });
  }, []);

  return (
    <div className="__home-page-container__ self-center flex flex-col justify-center">
      <div className="__home-page-title__ text-xl text-black">
        Welcome to Readers Digest!
      </div>
      <ul className="__book-list-container__ ">
        {allBooks.map((book) => {
          return (
            <li key={book.id}>
              <div>{book.title}</div>
              <div>Written by: {book.author}</div>
              <img
                className="__book-image"
                src={book.img_url}
                alt={book.title}
              ></img>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
