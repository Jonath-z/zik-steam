const checkImageSize = (imageUrl, setIsValide) => {
  let image = new Image();
  image.src = imageUrl;
  image.onload = () => {
    image.naturalHeight === image.naturalWidth
      ? setIsValide(true)
      : setIsValide(false);
  };
};

export default checkImageSize;
