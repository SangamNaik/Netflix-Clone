/* 
🌟 APP: Make Netflix

Here we have the Netflix app but it's up to you to make it work by pulling all the movies using an API!

Create a fetchMovies() function that will make a dynamic API call to what you need 👇
========================================

- fetchMovies()

** fetchMovies takes in an URL, a div id or class from the HTML, and a path (poster or backdrop)



These are the 3 main functions and their URL'S you must create  👇
========================================

- getOriginals()
  * URL : 'https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213'

- getTrendingNow()
  * URL : 'https://api.themoviedb.org/3/trending/movie/week?api_key=19f84e11932abbc79e6d83f82d6d1045'

- getTopRated()
  * URL : 'https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1'


** These functions will provide the URL you need to fetch() movies of that genere **

These are all the DIV ID's you're gonna need access to 👇
========================================================
#1 CLASS 👉 'original__movies' = Div that holds Netflix Originals
#2 ID 👉 'trending' = Div that holds trending Movies
#3 ID 👉 'top_rated' = Div that holds top rated Movies
*/

// Call the main functions the page is loaded
window.onload = () => {
  getOriginals();
  getTrendingNow();
  getTopRated();
  document.querySelector('.button__play').style.display = 'none';
  document.querySelector('.button__wishlist').style.display = 'none';
};

// ** Helper function that makes dynamic API calls **
function fetchMovies(url, dom_element, path_type) {
  // Use Fetch with the url passed down
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong!');
      }
    })
    .then((data) => {
      showMovies(data, dom_element, path_type);
    })
    .catch((error) => {
      console.log(error);
    });

  // Within Fetch get the response and call showMovies() with the data , dom_element, and path type
}

// showFeaturedMovie()

showFeaturedMovie = (movieId, movieName, movieDescription, movieImage) => {
  const featuredMovie = document.querySelector('.featured');
  const featuredMovieTitle = document.querySelector('.featuredMovieTitle');
  const wishlist_icon = document.querySelector('#wishlist_icon');
  const featuredMovieDescription = document.querySelector(
    '.featured__description'
  );
  featuredMovieTitle.innerText = movieName;
  featuredMovieDescription.innerText = movieDescription;
  featuredMovie.style.backgroundImage = `url(${movieImage})`;
  document.querySelector('.button__play').style.display = '';
  document.querySelector('.button__wishlist').style.display = '';
  document.querySelector('.button__play').onclick = () => {
    // we need to call the api with the ID
    handleMovieSelection(movieId);
  };

  const wishlistDiv = document.getElementById('wishlist');

  Array.from(wishlistDiv.getElementsByTagName('img')).forEach((img) => {
    if (!(movieImage === img.src)) {
      wishlist_icon.removeAttribute('fa-solid fa-heart');
      wishlist_icon.setAttribute('class', 'fa-regular fa-heart');
    }
    if (movieImage === img.src) {
      wishlist_icon.removeAttribute('fa-regular fa-heart');
      wishlist_icon.setAttribute('class', 'fa-solid fa-heart');
    }
  });

  document.querySelector('.button__wishlist').onclick = () => {
    if (wishlist_icon.classList.value === 'fa-regular fa-heart') {
      wishlist_icon.removeAttribute('fa-regular fa-heart');
      wishlist_icon.setAttribute('class', 'fa-solid fa-heart');
      addWishlistedMovie(movieImage);
    } else {
      wishlist_icon.removeAttribute('fa-solid fa-heart');
      wishlist_icon.setAttribute('class', 'fa-regular fa-heart');
      removeWishlistedMovie(movieImage);
    }
  };
};

//  ** Function that displays the movies to the DOM **
showMovies = (movies, dom_element, path_type) => {
  // Create a variable that grabs id or class
  let moviesDiv = document.querySelector(dom_element);

  // Loop through movies object
  for (let movie of movies.results) {
    // Within loop create an img element
    let moviesImages = document.createElement('div');
    let imageElement = document.createElement('img');
    let imageOverlay = document.createElement('div');

    // Set attribute
    moviesImages.setAttribute('class', 'movieImages');
    imageElement.setAttribute('data-id', movie.id);
    imageOverlay.setAttribute('class', 'imageOverlay');
    // Set source
    imageElement.src = `https://image.tmdb.org/t/p/original${movie[path_type]}`;
    if (dom_element == '#trending') {
      movieName = movie.original_title;
      imageOverlay.innerHTML = `<div class="movieTitle">${movieName.toUpperCase()}</div>`;
    } else {
      movieName = movie.name;
      imageOverlay.innerHTML = `<div class="movieTitle">${movieName.toUpperCase()}</div>`;
    }
    // Add event listener to handleMovieSelection() onClick

    let backdropImageUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
    if (dom_element == '#trending') {
      moviesImages.onclick = () => {
        showFeaturedMovie(
          movie.id,
          movie.original_title,
          movie.overview,
          backdropImageUrl
        );
      };
    } else {
      moviesImages.onclick = () =>
        showFeaturedMovie(
          movie.id,
          movie.name,
          movie.overview,
          backdropImageUrl
        );
    }

    // Append the imageElement to the dom_element selected
    moviesImages.appendChild(imageElement);
    moviesImages.appendChild(imageOverlay);
    moviesDiv.appendChild(moviesImages);
  }
};

// ** Function that fetches Netflix Originals **
function getOriginals() {
  let url =
    'https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213';
  fetchMovies(url, '.original__movies', 'poster_path');
}
// ** Function that fetches Trending Movies **
function getTrendingNow() {
  let url =
    'https://api.themoviedb.org/3/trending/movie/week?api_key=19f84e11932abbc79e6d83f82d6d1045';
  fetchMovies(url, '#trending', 'backdrop_path');
}
// ** Function that fetches Top Rated Movies **
function getTopRated() {
  let url =
    'https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213';
  fetchMovies(url, '#top_rated', 'backdrop_path');
}

// ** BONUS **

// ** Fetches URL provided and returns response.json()
async function getMovieTrailer(id) {
  //URL: `https://api.themoviedb.org/3/movie/${id}/videos?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US`
  // console.log(id)
  var url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US`;
  return await fetch(url).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Something went wrong!!');
    }
  });
}

// ** Function that adds movie data to the DOM
const setTrailer = (trailers) => {
  // Set up iframe variable to hold id of the movieTrailer Element
  const iframe = document.getElementById('movieTrailer');
  // Set up variable to select .movieNotFound element
  const movieNotFound = document.querySelector('.movieNotFound');
  // If there is a trailer add the src for it
  if (trailers.length > 0) {
    // add d-none class to movieNotFound and remove it from iframe
    movieNotFound.classList.add('d-none');
    iframe.classList.remove('d-none');
    // add youtube link with trailers key to iframe.src
    iframe.src = `https://www.youtube.com/embed/${trailers[0].key}`;
  } else {
    // Else remove d-none class to movieNotfound and ADD it to iframe
    movieNotFound.classList.remove('d-none');
    iframe.classList.add('d-none');
  }
};

// handleMovieSelection function
const handleMovieSelection = (id) => {
  console.log(id);
  // const id = e.target.getAttribute('data-id')
  const iframe = document.getElementById('movieTrailer');
  // here we need the id of the movie
  getMovieTrailer(id).then((data) => {
    const results = data.results;
    const youtubeTrailers = results.filter((result) => {
      if (result.site == 'YouTube' && result.type == 'Trailer') {
        return true;
      } else {
        return false;
      }
    });
    setTrailer(youtubeTrailers);
  });

  // open modal
  $('#trailerModal').modal({
    backdrop: 'static',
  });
};

const addWishlistedMovie = (movieImage) => {
  const wishlistDiv = document.getElementById('wishlist');
  let imageElement = document.createElement('img');
  imageElement.src = movieImage;
  wishlistDiv.appendChild(imageElement);
};

const removeWishlistedMovie = (movieImage) => {
  const wishlistDiv = document.getElementById('wishlist');
  Array.from(wishlistDiv.getElementsByTagName('img')).forEach((img) => {
    if (img.src === movieImage) {
      img.remove();
    }
  });
};
