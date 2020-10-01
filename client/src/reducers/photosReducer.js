import * as types from '../constants/actionTypes';

const initialState = {
  photos: [],
  filteredPhotos: [],
  tags: [],
  inputTag: '',
};

const photosReducer = (state = initialState, action) => {
  let photos;
  let photosClone;
  let updatedPhotos;
  let tagsClone;
  let updatedTags;
  let updatedTagName;
  let filter;
  let filteredPhotos;

  switch (action.type) {
    case types.GET_PHOTOS:
      photos = action.payload;

      return {
        ...state, photos
      };

    case types.ADD_PHOTO:
      photos = [...state.photos];
      photos.push(action.payload);

      return {
        ...state, photos
      };

    case types.DELETE_PHOTO:
      photosClone = JSON.parse(JSON.stringify(state.photos));

      updatedPhotos = photosClone.filter(
        (photo) => {
          console.log(photo.photoid, action.payload)
          return photo.photoid !== action.payload
        });
      console.log('updated photos', updatedPhotos)

      return {
        ...state, photos: updatedPhotos
      };

    case types.ADD_RATING:
      photosClone = JSON.parse(JSON.stringify(state.photos));

      updatedPhotos = photosClone.map((photo) => {
        if (photo.photoid === action.payload.photoId) {
          photo.rating = action.payload.rating;
        }
      });

      return {
        ...state, photos: updatedPhotos
      };

    case types.GET_TAGS:
      updatedTags = action.payload;

      return {
        ...state, tags: updatedTags
      };

    case types.INPUT_TAG:
      updatedTagName = action.payload;

      return { ...state, inputTag: updatedTagName };

    case types.ADD_TAG_TYPE:
      // Note: Duplicate tags already handled by server on submit

      tagsClone = JSON.parse(JSON.stringify(state.tags));
      tagsClone.push(action.payload);

      return { ...state, tags: tagsClone };

    case types.ADD_TAG_PHOTO:
      photosClone = JSON.parse(JSON.stringify(state.photos));

      updatedPhotos = photosClone.map((photo) => {
        if (photo.photoid === action.payload.photoId) {
          // Add new tag object to the given photo's tags array
          photo.tags.push(action.payload.tagObj.tag);
        }
        return photo;
      });

      return { ...state, photos: updatedPhotos };

    case types.FILTER_BY_TAG:
      photosClone = JSON.parse(JSON.stringify(state.photos));
      filteredPhotos = photosClone.filter(photo => photo.tags.includes(action.payload))

      return { ...state, filteredPhotos };

    case types.REMOVE_TAG:
      photosClone = JSON.parse(JSON.stringify(state.photos));
      tagsClone = JSON.parse(JSON.stringify(state.tags));

      updatedPhotos = photosClone.map((photo) => {
        if (photo.photoid === action.payload.photoId) {
          // Remove tag object from the given photo's tags array
          photo.tags = photo.tags.filter(
            (tag) => tag.tagid !== action.payload.trashTag.tagID
          );
          // Add new tag object to available tags array
          updatedTags = tagsClone.filter(
            (tag) => tag.tagid !== action.payload.trashTag.tagID
          );
        }
      });

      return {
        ...state, photos: updatedPhotos, tags: updatedTags
      };

    default:
      return state;
  }
};

export default photosReducer;
