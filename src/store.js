
  
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