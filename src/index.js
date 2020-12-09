/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import $ from 'jquery';
import './style.css';
import api from './api';
import store from './store';
import bookmark from './bookmarks';

function main() {
  bookmark.render();
  bookmark.eventListeners();
  //console.log('DOM is loaded');

  api.getBookmarks()
    .then( bookmarks => {
      console.log('bookmark is loaded', bookmark);
      bookmarks.forEach(bookmark => store.addBookmark(bookmark));
      bookmark.render();
    });
  bookmark.render();


  // const startMsg = $('<p>Webpack is working!</p>');
  // $('#root').append(startMsg);
}
$(main);