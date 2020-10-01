import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import {
  DropdownButton,
  SplitButton,
  ButtonGroup,
  Dropdown
} from 'react-bootstrap';

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
    <div className="photo-container">
      <div className="photo-options" >
        <>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" size="sm">
              Tags
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>

        <button photoid={photoid} onClick={() => {
          props.handleDeletePhoto(photoid);
          deleteFromServer(photoid);
        }} >X</button>
      </div>

      <img src={url}></img>
    </div>
  )
}

export default connect(null, mapDispatchToProps)(Photo);

