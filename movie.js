async function loadMovies(searchTerm){
    var movieSearchBox=document.getElementById('movie-search-box');
    var searchList=document.getElementById('search-list');
    var resultGrid=document.getElementById('result-grid');
    const URL =`https://omdbapi.com/?s=${searchTerm}&page=1&apikey=773b8bb5`;
    const res = await fetch(`${URL}`);
    const data=await res.json();
    if(data.Response=="True")
        displayMovieList(data.Search);

}
function findMovies(){
    var movieSearchBox=document.getElementById('movie-search-box');
    var searchList=document.getElementById('search-list');
    let searchTerm=(movieSearchBox.value).trim();
    console.log(searchTerm);
    if(searchTerm.length>0){
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    }else{
        searchList.classList.add('hide-search-list');
    }
}
function displayMovieList(movies){
    var searchList=document.getElementById('search-list');
    searchList.innerHTML="";
    for(let idx=0;idx<Math.min(movies.length, 5);++idx){
        let movieListItem=document.createElement('div');
        ///console.log(movieListItem);
        movieListItem.dataset.id=movies[idx].imdbID;
        movieListItem.classList.add('search-list-item');
        if(movies[idx].Poster!="N/A")
            moviePoster=movies[idx].Poster;
       
        movieListItem.innerHTML=`
            <div>
            <div class ="search-item-thumbnail">
            <img src="${moviePoster}">
            </div>
            <div class="search-item-info">
                <h3>${movies[idx].Title}</h3>
                <p>${movies[idx].Year}</p>
            </div>
            </div>
        `;
        searchList.appendChild(movieListItem);
    }
}