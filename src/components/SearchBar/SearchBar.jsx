import { Field, Form, Formik } from "formik";
import { BsSearch } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";

export const SearchBar = ({ onSearch }) => {
  const notify = () => toast.error("Please, enter the searchword!");
  const required = () => toast.error("Please, enter more than one symbol!");
  return (
    <header className={css.header}>
      <Formik
        initialValues={{ search: "" }}
        onSubmit={(values, actions) => {
          if (values.search.length == 0) {
            notify();
          } else if (values.search.length == 1) {
            required();
          } else {
            onSearch(values.search);
            actions.resetForm();
          }
        }}
      >
        <Form>
          <div className={css.searchContainer}>
            <Field
              name="search"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              className={css.searchInput}
            />
            <button type="submit" className={css.searchButton}>
              <BsSearch className="my-icon" size="20" />
            </button>
            <div>
              <Toaster position="top-right" reverseOrder={false} />
            </div>
          </div>
        </Form>
      </Formik>
    </header>
  );
};
