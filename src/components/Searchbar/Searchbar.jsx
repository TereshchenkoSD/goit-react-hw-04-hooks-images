import PropTypes from 'prop-types';

import {
  Header,
  Form,
  FormBtn,
  FormBtnLabel,
  FormBtnInput,
} from './Searchbar.styles';

const Searchbar = ({ onSearch }) => {
  const handleSearch = e => {
    e.preventDefault();
    onSearch(e.target.elements.imageName.value);
  };

  return (
    <Header>
      <Form onSubmit={handleSearch}>
        <FormBtn type="submit">
          <FormBtnLabel>Search</FormBtnLabel>
        </FormBtn>

        <FormBtnInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="imageName"
        />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  onSearch: PropTypes.func,
};

export default Searchbar;
