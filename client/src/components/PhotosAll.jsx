import React from 'react';
import Photo from './Photo.jsx'

const PhotosAll = (props) => {
  const { photos } = props;

  const photoGallery = photos.map((photo, index) => {
    return (
      <Photo
        key={`image${index}`}
        photoid={photo.photoid}
        url={photo.url}
      />
    )
  });

  return (
    <div className="photosAll">
      {photoGallery}
    </div>
  )
}

export default PhotosAll;