
// const storeItems = {
//   bookmarks: [
//     {
//       id: 'x56w',
//       title: 'Title 1',
//       rating: 3,
//       url: 'http://www.title1.com',
//       description: 'lorem ipsum dolor sit',
//       expanded: false
//     },
//     {
//       id: '6ffw',
//       title: 'Title 2',
//       rating: 5,
//       url: 'http://www.title2.com',
//       description: 'dolorum tempore deserunt',
//       expanded: false
//     } 
//   ],
//   adding: false,
//   error: null,
//   filter: 0
// };
  
const findById = function (id) {
  return this.bookmarks.find(currentItem => currentItem.id === id);
};
  
//function to expand bookmarks
const expand = function (id) {
  let selectedItem = findById(id);
  selectedItem.expanded = !selectedItem.expanded;
};
  
const addBookmark = function (item) {
  bookmarks.push(item);
};

const findAndUpdate = function(id, newData){
  const bookmark = this.findById(id);
  Object.assign(bookmark, newData);
};
  
const findAndDelete = function (id) {
  this.bookmarks = this.bookmarks.filter(currentItem => currentItem.id !== id);
};
  
const setError = function (error) {
  this.error = error;
};
let view = 'default';
const bookmarks = [];
export default {
  bookmarks,
  minimumRating: 0,
  findById,
  expand,
  addBookmark,
  findAndDelete,
  setError,
  findAndUpdate,
  view,
};