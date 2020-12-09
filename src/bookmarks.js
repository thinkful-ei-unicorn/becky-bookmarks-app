/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import $ from 'jquery';
import api from './api';
import store from './store';

/******************* 1. TEMPLATE FUNCTIONS ************************/
const generateDefaultView = function () {
  return `<form class='item'>
      <h2>New Bookmark </h2>
      <button type="submit" tabindex="1" value="Submit" id='new'>New Bookmark</button>
      <label for='filter'>Filter by rating:</label>
      <select tabindex="1" id="filter" name='filter'>
        <option value="">Select</option>
        <option value="zero" selected>☆☆☆☆☆</option>
        <option value="one">★☆☆☆☆</option>
        <option value="two">★★☆☆☆</option>
        <option value="three">★★★☆☆</option>
        <option value="four">★★★★☆</option>
        <option value="five">★★★★★</option>
      </select>
      </form>`;
};

const generateBookmarkElement = function (bookmark) {
  let rating = generateRatingStars(bookmark);
    
  return `<li class="bookmark-list-item item" data-item-id="${bookmark.id}">
    <h4><span><span>Title:</span>${bookmark.title}</span></h4>  
    <p><span>Rating:</span><br>${rating}</p>
    <button class='item' type="submit" id='expand'>More Info</button>
    <button class='item' type="submit" id='delete'>Delete</button>
  </li>`;
};

const generateExpandedBookmarkElementView = function (bookmark) {
  let rating = generateRatingStars(bookmark);
  
  return `<li class="bookmark-list-item item" data-item-id="${bookmark.id}">
    <span><span>Title:</span><br>${bookmark.title}</span>
    <p><span>Visit Link:</span><br><a tabindex="1" href="${bookmark.url}" target="_blank">${bookmark.url}</a></p>  
    <p><span>Rating:</span><br>${rating}</p>
    <p>${bookmark.desc}</p>
    <div>
        <button class='item' tabindex="1" type="submit" id='condense'>Close</button>
        <button class='item' tabindex="1" type="submit" id='delete'>Delete</button>
    </div>
    </li>`;
};

const generateNewBookmarkView = function () {
  return `<h2>New Bookmark</h2>
    <form class='new-bookmark'>
      <label class='item' for="link-title">Title:</label><br>
      <input id="link-title" tabindex="1" type="text" name="title" autofocus='on'>
      <label class='item' for="link-url">Link:</label><br>
      <input id="link-url" tabindex="1" type="url" name="url" >
      <label class='item' for="link-description">Description:</label>
      <textarea tabindex="1" id="link-description" name="desc"></textarea>
      <h3>Rating:</h3>
        
        <input name="rating" tabindex="1" type="radio" value="1">
         <label for="1">★</label>
        <input name="rating" tabindex="1" type="radio" value="2">
         <label for="2">★★</label>
        <input name="rating" tabindex="1" type="radio" value="3">
         <label for="3">★★★</label>
        <input name="rating" tabindex="1" type="radio" value="4">
         <label for="4">★★★★</label>
        <input name="rating" tabindex="1" type="radio" value="5">
         <label for="5">★★★★★</label>
      <button class='item' tabindex="1" type="submit" id='cancel'>Cancel</button>
      <button class='item' tabindex="1" type="submit" id='create'>Create</button>
    </form>`;
};

/******************* 2. ERROR HANDLING ************************/
const generateError = function (message) {
  return `
      <section class="error-content">
        <button id="cancel-error">X</button>
        <p>${message}</p>
      </section>
    `;
};

const renderError = function () {
  if (store.error) {
    const el = generateError(store.error);
    //generate error html
    $('.error-container').html(el);
  } else {
    $('.error-container').empty();
  }
};

const handleCloseError = function () {
  $('.error-container').on('click', '#cancel-error', () => {
    store.setError(null);
    render();
  });
};

/******************* 3. EVENT HANDLING FUNCTIONS  ************************/
const handleNewBookmarkView = function () { 
  //grader doesnt like "Updating the DOM should only occur within the render functions as specified in the requirements."
  // New bookmark page button
  $('main').on('click', '#new', event => {
    event.preventDefault();
    store.view = 'new';
    render();
  });
};

const cancelNewBookmarkView = function () {
  //return to default view here
  $('main').on('click', '#cancel', event => {
    event.preventDefault();
    store.view = 'default';
    render();
  });
};

// Submit new bookmark
const handleNewBookmarkSubmit = function () {
  $('main').on('submit', '.new-bookmark', event => {
    event.preventDefault();
    const newBookmarkName = $(event.target).serializeJson();
    console.log(newBookmarkName);
    api.addBookmark(newBookmarkName)
      .then((newBookmark) => {
        store.addBookmark(newBookmark);
        console.log('hello');
        store.view = 'default';
        render();
      })
      .catch((error) => {
        console.log('something diff');
        store.setError(error.message); 
        //grader doesnt like "Updating store and then rendering each time is expected and some event handlers do not do this."
        render();
      });
  });
};

//Filter bookmarks on default view
const handleFilterView = function () {
  $('main').on('change', '#filter', event => {
    event.preventDefault();
    let filter = parseInt($('option:selected').val());
    let bookmarks = [...store.bookmarks];
    let filterView =[];
    console.log(filter);
      
    if(filter === 0)
    {filterView = bookmarks;}
    else{filterView = bookmarks.filter(bookmark => bookmark.rating >= filter);}
            
    console.log(filterView);
    filteredView(filterView);
  });
};
  
// Delete a bookmark
const handleDeletedBookmarkClick = function () {
  $('main').on('click', '#delete', event => {
    event.preventDefault();
    const id = getBookmarkIdFromElement(event.currentTarget);
    api.deleteBookmark(id).then(() => {
      store.findAndDelete(id);
      store.view = 'default';
      render();
    }).catch((error) => {
      console.log(error);
      store.setError(error.message);
      alert(error.message);
      render();
    });
  });
};
  
  
//Expanded and condensed views
const handleExpandedView = function () {
  $('main').on('click', '#expand', event => {
    event.preventDefault();
    const id = getBookmarkIdFromElement(event.currentTarget);
    const bookmark = store.findById(id);
    $('main').html(generateExpandedBookmarkElementView(bookmark));
  });
};
  
const handleCloseExpandedView = function () {
  $('main').on('click', '#condense', event => {
    event.preventDefault();
    render();
  });
};

/******************* HELPER FUNCTIONS  ************************/
const getBookmarkIdFromElement = function (bookmark) {
  return $(bookmark).closest('.bookmark-list-item').data('item-id');
};

const generateRatingStars = function (bookmark) {
  let rating = '';
  switch (bookmark.rating) {
  case 5:
    rating = '★★★★★';
    break;
  case 4:
    rating = '★★★★☆';
    break;
  case 3:
    rating = '★★★☆☆';
    break;
  case 2:
    rating = '★★☆☆☆';
    break;
  case 1:
    rating = '★☆☆☆☆';
    break;
  default:
    rating = '☆☆☆☆☆';
  }
  return rating;
};

/******************* RENDER FUNCTIONS  ************************/
//Main render function
const render = function () {
  renderError();

  if ( store.view === 'new' ){
    newBookbarkView();
  } else {
    defaultView();
  }
};

const newBookbarkView = function () {
  $('main').html(generateNewBookmarkView());
};

//Default view
const defaultView = function () {
  $('option:selected').val('');
  let bookmarks = [...store.bookmarks];
  console.log(bookmarks);
  // insert that HTML into the DOM
  $('main').html(generateDefaultView() + generateBookmarkItemsString(bookmarks));
};

const filteredView = function (bookmarks){
  $('main').html(generateDefaultView() + generateBookmarkItemsString(bookmarks));
};
  
const generateBookmarkItemsString = function (bookmark) {
  const bookmarks = bookmark.map((bookmark) => generateBookmarkElement(bookmark));
  return bookmarks.join('');
};

const eventListeners = function () {
  handleNewBookmarkView();
  cancelNewBookmarkView();
  handleNewBookmarkSubmit();
  handleExpandedView();
  handleCloseExpandedView();
  handleDeletedBookmarkClick();
  handleFilterView(); 
  handleCloseError();
};
  
export default {
  render,
  eventListeners
};
//**Read through and understand what you went over with Teddy */
//Bringing everything together, render template first, upon seeing get errors, upon errors handle events,