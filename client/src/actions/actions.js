import * as types from '../constants/actionTypes';

export const getPhotos = (photos) => ({
  type: types.GET_PHOTOS,
  payload: photos,
});

export const appendPhoto = (photo) => ({
  type: types.ADD_PHOTO,
  payload: photo,
});

export const deletePhoto = (photoId) => ({
  type: types.DELETE_PHOTO,
  payload: photoId,
});

export const addRating = ({
  photoId,
  rating
}) => ({
  type: types.ADD_RATING,
  payload: {
    photoId,
    rating
  },
});

export const getTags = (tags) => ({
  type: types.GET_TAGS,
  payload: tags,
});

export const inputTag = (input) => ({
  type: types.INPUT_TAG,
  payload: input,
});

// Add tag to array in state
export const addTagType = (tagObj) => ({
  type: types.ADD_TAG_TYPE,
  payload: tagObj,
});

export const addTagPhoto = (photoId, tagObj) => ({
  type: types.ADD_TAG_PHOTO,
  payload: { photoId, tagObj },
});

// Need to wait to get new tagId from the server (database)
export const addTag = ({ photoId, newTag: { tagId, tag } }) => ({
  type: types.ADD_TAG,
  payload: { photoId, newTag },
});

export const removeTag = ({ photoId, trashTag: { tagId, tag } }) => ({
  type: types.REMOVE_TAG,
  payload: { photoId, trashTag },
});

export const filterByTag = (tagName) => ({
  type: types.FILTER_BY_TAG,
  payload: tagName,
});
