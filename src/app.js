/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-undef */

import bookmarks from '../src/bookmarks.js';


function render(){
  bookmarks.generateInput(); 
  bookmarks.genSavedBookmarks();
}


function main(){
  console.log('DOM Loaded');
  bookmarks.generateHtml();
  render();
}

$(main);