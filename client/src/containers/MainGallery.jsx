import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const mapStateToProps = state => ({
  photos: state.photos.photos,
});

const mapDispatchToProps = dispatch => ({
  getPhotos: (photos) => dispatch(actions.getPhotos(photos))
});

const MainGallery = (props) => {
  useEffect(() => {
    fetch('/images')
      .then(res => res.json())
      .then(res => props.getPhotos(res))
      .then(() => {
        console.log('initialState: ', props.photos)
        // const photos = props.photos.map(photo => {
        //   return photo.url;
        // })
      })
      .catch(err => console.log(err))
  }, []);

  return (
    <div id="main-gallery">photos</div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(MainGallery);