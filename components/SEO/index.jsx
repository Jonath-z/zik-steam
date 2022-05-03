import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import ZikStreamLogo from '../vectors/zikStreamLogo';

const SEO = (props) => {
  const { title, description, image } = props;
  return (
    <Head>
      <title>{title} | App</title>
      <meta name="description" content={description} />
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={image} />
    </Head>
  );
};

SEO.defaultProps = {
  title: 'Zik-Stream',
  description: 'Decentralized music streaming application',
  image: <ZikStreamLogo />,
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};

export default SEO;
