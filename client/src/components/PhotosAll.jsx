import React from 'react';
import Photo from './Photo.jsx'

const PhotosAll = (props) => {
  const { photos } = props;

  // const photoGallery = photos.map((photo, index) => {
  //   return (
  //     <Photo
  //       key={`image${index}`}
  //       photoid={photo.photoid}
  //       url={photo.url}
  //     />
  //   )
  // });

  const displayPhotos = (photoArr) => {
    const photoGallery = [];
    for (let i = photos.length - 1; i > 0; i--) {
      photoGallery.push(
        <Photo
          key={`image${i}`}
          photoid={photos[i].photoid}
          photoTags={photos[i].tags}
          url={photos[i].url}
        />
      );
    }
    return photoGallery;
  }

  const photoGallery = displayPhotos(photos);

  return (
    <div className="photosAll">
      {photoGallery}
    </div>
  )
}

export default PhotosAll;