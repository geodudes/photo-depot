import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

// const mapStateToProps = state => ({
//     photos: state.photos.photos,
//   });
  
const mapDispatchToProps = dispatch => ({
  handleDeletePhoto: (photoid) => dispatch(actions.deletePhoto(photoid))
});

const Photo = (props) => {
  const { url, photoid } = props;
  return (
    <div className="photo">
      <button photoid={photoid} onClick={() => props.handleDeletePhoto(photoid)} >X</button>
      <img src={url}></img>
      <input type="text"/>
      <button>Save Tag</button>
    </div>
  )
}

export default connect(null, mapDispatchToProps)(Photo);

