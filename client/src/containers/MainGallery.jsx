import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import PhotosAll from '../components/PhotosAll'
import {
  w3cwebsocket as W3CWebSocket
} from "websocket";

//initialize websocket connection
const client = new W3CWebSocket('ws://localhost:3000');


const mapStateToProps = state => ({
  photos: state.photos.photos,
  filteredPhotos: state.photos.filteredPhotos,
});

const mapDispatchToProps = dispatch => ({
  handleGetPhotos: (photos) => dispatch(actions.getPhotos(photos)),
  handleAppendPhoto: (photo) => dispatch(actions.appendPhoto(photo))
});

const MainGallery = (props) => {
  useEffect(() => {
    //websockets
    client.onopen = () => {
      client.send(JSON.stringify({
        type: "getimages"
      }))
      console.log('WebSocket Client Connected');
    }
    client.onmessage = (message) => {
      const { data, type } = JSON.parse(message.data);
      if (type === "getimages") {
        data && props.handleGetPhotos(data)
      } else if (type === "newimage") {
        data && props.handleAppendPhoto(data)
      }
    }
  }, []);

  return (
    <div id="main-gallery">
      <PhotosAll 
        photos={props.photos} 
        filteredPhotos={props.filteredPhotos} 
      />
    </div >
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(MainGallery);
