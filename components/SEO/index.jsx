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
    'https://firebasestorage.googleapis.com/v0/b/gomap-55ce4.appspot.com/o/ZIK_STREAM.svg?alt=media&token=5e4558a4-d77e-43e9-9ec7-e9c419d452bc',
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};

export default SEO;
