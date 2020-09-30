import React from 'react';
import {Container, Row, Col, Image} from 'react-bootstrap'

const Photos = (props) => {
  const { photos } = props;

  const imgList = photos.map((photo, index) => {
    return (
      // <img src={photo.url}></img>
      <Image key={`image${index}`} src={photo.url} thumbnail />
    )
  });

  return (
    <div>
      <Container>
        <Row>
          <Col xs={6} md={4}>
            {imgList}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Photos;