/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */





function generateHtml(){
  $('body').html(`
  <header><h1>Bookmarks</h1></header> 
  <div class="inputArea"></div><br> 
  <div class="bookmarkField"></div>
  `);
}


function generateInput(){
  $('.inputArea').html(`

  <div class="newBookmark"> 
    <h2>New Bookmark</h2>
    <form id="bookmark">
      <label for="title">Name: </label>
      <input type="text" id="title" name="title"><br>
      <label for="url">Link: </label>
      <input type="text" id="url" name="url"><br>
      <label for="descr">Description: </label>
      <input type="text" id="descr" name="descr"><br>
      <label for="rating">Rating: </label>
      <select name="rating">
        <option value="zero" selected>☆☆☆☆☆</option>
        <option value="one">★☆☆☆☆</option>
        <option value="two">★★☆☆☆</option>
        <option value="three">★★★☆☆</option>
        <option value="four">★★★★☆</option>
        <option value="five">★★★★★</option>
      </select>
      <button id="saveNewBookmark" type="submit">Save</button>
    </form>
  </div>
  `);
}

function genSavedBookmarks(){
  $('.bookmarkField').html(`
  
  <div class="savedBookmarks">  <br>

    <h2>Saved Bookmarks</h2>
    <select name ="filter" id="filter">
        <option value="ascend">Highest to Lowest</option>
        <option value="descend">Lowest to Highest</option>
        <option value="alpha">A to Z</option>
        <option value="ahpla">Z to A</option>
    </select><br>
    <div class="saved">
      <h3>Collapsed</h3>
      <section id="collapsed">
        <div id="collapse">
          <p>Sample</p>
          <p>Rating</p>
        </div>
      </section><br>
      <h3>Bookmark List:</h3>
      <section id="bookmarkList">
        <div></div>
      </section>
    </div>
 

  </div> 
  `);
}

// function handleAddNewBookmarkClicked(){
//   $('.saveNewBookmark').on('click', function(event){
    
    
//     render();
//     console.log('SAVED');
//   });
// }


export default{
  generateHtml,
  generateInput,
  genSavedBookmarks
  // handleAddNewBookmarkClicked
};