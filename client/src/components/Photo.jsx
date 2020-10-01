import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import { Dropdown } from 'react-bootstrap';

const mapStateToProps = state => ({
  tags: state.photos.tags,
});

const mapDispatchToProps = dispatch => ({
  handleDeletePhoto: (photoid) => dispatch(actions.deletePhoto(photoid)),
  handleAddTagPhoto: (photoid, tagObj) => dispatch(actions.addTagPhoto(photoid, tagObj)),
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

const addTagToPhoto = (photoid, tagid) => {
  console.log('PUT')
  fetch(`http://localhost:3000/tags/${tagid}?photoid=${photoid}`, {
    method: 'PUT',
  })
    .then(res => res.json())
    .catch(err => console.log('Error: ', err))
}

const Photo = (props) => {
  const { url, photoid, photoTags } = props;

  const dropTagList = props.tags.map((tag, index) => {

    return (
      <Dropdown.Item key={`tagDropDown${index}`}>
        <button
          className={photoTags.includes(tag.tag) ? "highlight-tag" : "button-tag"}
          onClick={() => {
            props.handleAddTagPhoto(photoid, tag);
            addTagToPhoto(photoid, tag.tagid);
          }}
        >{tag.tag}</button>
      </Dropdown.Item >
    )
  });

  return (
    <div className="photo-container">

      {/* <div className="photo-options-hover" > */}
      <div className="photo-options appear" >
        <>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" size="md" className="p-1">
              Tag
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {dropTagList}
            </Dropdown.Menu>
          </Dropdown>
        </>

        <button
          className="photo-delete-button"
          photoid={photoid}
          onClick={() => {
            props.handleDeletePhoto(photoid);
            deleteFromServer(photoid);
          }}
        >X</button>
      </div>
      {/* </div> */}
      <a href={url} >
        <img src={url}></img>
      </a>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Photo);

