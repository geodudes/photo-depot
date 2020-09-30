import React from 'react';

const Photos = (props) => {
  const { photos } = props;
  console.log("photos", photos)

  const imgList = photos.map(photo => {
    return (
      <img src={photo.url}></img>
    )
  });

  return (
    <div id="photos">{imgList}</div>
  )
}

export default Photos;