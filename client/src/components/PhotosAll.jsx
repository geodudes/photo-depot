import React from 'react';
import Photo from './Photo.jsx'

const PhotosAll = (props) => {
  const { photos, filteredPhotos } = props;

  const displayPhotos = (photoArr) => {
    const photoGallery = [];
    console.log('photoArr', photoArr)
    for (let i = photoArr.length - 1; i >= 0; i--) {
      photoGallery.push(
        <Photo
          key={`image${i}`}
          photoid={photoArr[i].photoid}
          photoTags={photoArr[i].tags}
          url={photoArr[i].url}
        />
      );
    }
    return photoGallery;
  }
  console.log(filteredPhotos)
  const photoGallery = filteredPhotos.length ? displayPhotos(filteredPhotos) : displayPhotos(photos);



  return (
    <div className="photosAll">
      {photoGallery}
    </div>
  )
}

export default PhotosAll;