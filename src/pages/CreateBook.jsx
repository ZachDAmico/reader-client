import { useEffect, useState } from "react";
import { getAllCategories } from "../fetches/fetches";
import { useNavigate } from "react-router-dom";

export const CreateBook = () => {
  const navigate = useNavigate();

  const [newBook, setNewBook] = useState({});

  const [allCategories, setAllCategories] = useState([
    // setting initial dummy fetch for testing
    { id: 1, name: "Fake Fetch" },
  ]);

  const [chosenCategories, setChosenCategories] = useState(new Set());

  useEffect(() => {
    getAllCategories().then((categoryArray) => {
      setAllCategories(categoryArray);
    });
  }, []);

  // because other code here is dependent on the POST completion, it's important to make async...await
  // also, all code needs to be within CreateBook component to avoid errors
  // In React and many other JavaScript frameworks, when you define event handlers for user interactions (e.g., click, change, submit), the event object is automatically passed to the function as the first parameter. You can name this parameter whatever you like, but commonly it's named event for clarity.
  const AddBook = async (event) => {
    event.preventDefault();

    await fetch("http://localhost:8000/books", {
      method: "POST",
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("book_token")).token
        }`,
        "Content-Type": "application/json",
      },
      // need to attach the categories data from fetch to the newBook being created without altering it so the spread(...) operator needed to make copy of the newBook
      body: JSON.stringify({
        ...newBook,
        categories: Array.from(chosenCategories),
      }),
    });
    navigate("/");
  };
  // this event parameter is more specific than event so more explicit name used for readability
  const handleCategoryChoice = (chosenCategory) => {
    // let used because i'm reassigning new value to copy within function by creating new Set
    // watch steve's video from coursework to refresh
    const copy = new Set(chosenCategories);
    copy.has(chosenCategory.id)
      ? copy.delete(chosenCategory.id)
      : copy.add(chosenCategory.id);
    setChosenCategories(copy);
  };
  return (
    <div className="__book-form-container__">
      <h2 className="__book-form-header__">ADD A BOOK TO THE COLLECTION</h2>
      <form className="__book-form__ flex flex-col">
        <div className="__title-author-container__ flex justify-between">
          <fieldset className="__title__">
            <label>Title:</label>
            <input
              className="__title-input__"
              type="text"
              placeholder="Enter book title..."
              onChange={(event) => {
                const copy = { ...newBook };
                copy.title = event.target.value;
                setNewBook(copy);
              }}
            />
          </fieldset>
          <fieldset className="__author__">
            <label>Author: </label>
            <input
              className="__author-input__"
              type="text"
              placeholder="Input name of author..."
              onChange={(event) => {
                const copy = { ...newBook };
                copy.author = event.target.value;
                setNewBook(copy);
              }}
            />
          </fieldset>
        </div>
        <div className="__isbn-cover-container flex justify-between">
          <fieldset className="__isbn__">
            <label>ISBN Number: </label>
            <input
              className="__isbn-input"
              type="text"
              placeholder="Enter ISBN Number..."
              onChange={(event) => {
                const copy = { ...newBook };
                copy.isbn_number = event.target.value;
                setNewBook(copy);
              }}
            />
          </fieldset>
          <fieldset className="__img__">
            <label>Cover Image URL: </label>
            <input
              className="__img-url-input__"
              type="text"
              placeholder="Enter cover image URL..."
              onChange={(event) => {
                const copy = { ...newBook };
                copy.img_url = event.target.value;
                setNewBook(copy);
              }}
            />
          </fieldset>
        </div>
        <label className="__categories__ text-center">
          Select All Categories That Apply
        </label>
        <fieldset>
          {allCategories.map((category) => {
            return (
              <label key={category.id}>
                <input
                  type="checkbox"
                  checked={chosenCategories.has(category.id)}
                  onChange={() => {
                    handleCategoryChoice(category);
                  }}
                />
                {category.type}
              </label>
            );
          })}
        </fieldset>
        <button
          onClick={(event) => {
            AddBook(event);
          }}
        >
          Add Book to Collection
        </button>
      </form>
    </div>
  );
};
