import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import ZikStreamLogo from '../vectors/zikStreamLogo';

const SEO = (props) => {
  const { title, description, image } = props;
  return (
    <Head>
      <title>{title}</title>
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
  image:
    'https://firebasestorage.googleapis.com/v0/b/gomap-55ce4.appspot.com/o/zikk.jpg?alt=media&token=dc66b721-3ef0-4f16-8e5a-f47d150c584e',
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};

export default SEO;
