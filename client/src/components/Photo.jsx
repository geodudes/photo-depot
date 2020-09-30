import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

// const mapStateToProps = state => ({
//     photos: state.photos.photos,
//   });
  
const mapDispatchToProps = dispatch => ({
  handleDeletePhoto: (photoid) => dispatch(actions.deletePhoto(photoid)),
  handleAddTag: (photoid, newTag) => dispatch(actions.addTag(photoid, newTag))
});

const deleteFromServer = (id) => {
  console.log('DELETE')
  fetch(`http://localhost:3000/images/${id}`, {
    method: 'DELETE',
    // headers: {
    //   'Access-Control-Allow-Origin': '*'
    // },
    // body: JSON.stringify({
    //   url: imageUrl
    // })
  })
  .then(res => res.json())
  .catch(err => console.log('Error: ', err))
}

const Photo = (props) => {
  const { url, photoid } = props;
  return (
    <div className="photo">
      <button photoid={photoid} onClick={() => {
        props.handleDeletePhoto(photoid);
        deleteFromServer(photoid);
      }} >X</button>
      <img src={url}></img>
      <input type="text"/>
      <button onClick={() => props.handleAddTag()}>Save Tag</button>
    </div>
  )
}

export default connect(null, mapDispatchToProps)(Photo);

