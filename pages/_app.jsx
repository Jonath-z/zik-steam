import '../styles/globals.css';
import 'antd/dist/antd.css';
import 'antd-css-utilities/utility.min.css';
import PropTypes from 'prop-types';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

MyApp.propTypes = {
  Component: PropTypes.element,
  pageProps: PropTypes.element,
};

export default MyApp;
