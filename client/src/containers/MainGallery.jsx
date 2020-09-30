import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import Photos from '../components/Photos'

const mapStateToProps = state => ({
  photos: state.photos.photos,
});

const mapDispatchToProps = dispatch => ({
 handleGetPhotos: (photos) => dispatch(actions.getPhotos(photos))
});

const MainGallery = (props) => {
  useEffect(() => {
    fetch('/images')
      .then(res => res.json())
      .then(res => props.handleGetPhotos(res))
      .catch(err => console.log(err))
  }, []);

  return (
    <div id="main-gallery">
      <Photos photos={props.photos} />    
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(MainGallery);