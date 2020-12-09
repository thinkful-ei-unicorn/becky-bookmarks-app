/* eslint-disable no-unused-vars */
import $ from 'jquery';
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/beckyTrevelyan';
const listApiFetch = function(...args){
  // setup promise chain outside of scope  
  let error;
  return fetch(...args)
    .then(res =>{
      if(!res.ok) {
        error.message = res.statusText;
        return Promise.reject(error);
      }
      return res.json();
    })
    .then(data => {
      if(error){
        error.message = data.message;
        return Promise.reject(error);
      }

      // otherwise, return the json as normal resolved Promise
      return data;
    });
};

// get
function getBookmarks(){
  return listApiFetch(`${BASE_URL}/bookmarks`);
}

// post
function addBookmark(object){

  return listApiFetch(`${BASE_URL}/bookmarks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: object
  });
}

// patch
function editBookmark(id, updateData){
  return listApiFetch(`${BASE_URL}/bookmarks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: updateData
  });
}

// delete
function deleteBookmark(id){
  return listApiFetch(`${BASE_URL}/bookmarks/${id}`, {
    method: 'DELETE'
  });
}

$.fn.extend({
  serializeJson: function(form) {
    const formData = new FormData(this[0]);
    const inputObject = {};
    formData.forEach((val, name) => inputObject[name] = val);
    return JSON.stringify(inputObject);
  }
});


export default {
  getBookmarks,
  addBookmark,
  editBookmark,
  deleteBookmark
};