import Spinner from 'react-loader-spinner';

import { LoaderContainer } from './Loader.styles';

const Loader = () => {
  return (
    <LoaderContainer>
      <Spinner
        type="Bars"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={7000}
      />
    </LoaderContainer>
  );
};

export default Loader;
