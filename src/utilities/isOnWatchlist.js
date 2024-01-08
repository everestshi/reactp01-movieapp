// Is On Watchlist

function isOnWatchlist(arr, path, id){

    // If we are on the watchlsit page...then no 
    // need to check for watchlist as all the kittens
    // on this page are favourited...
    if(path === '/watchlist'){
        return true;
    }

    // If there are no favourited kittens...
    // then no need to check if the kitten has
    // been favourited...
    if(arr.length === 0){
      return false;
    }

    // Checks whether the object is favourited
    return arr.some((obj) => obj.id === id);

}

export default isOnWatchlist;