let movieList = []

let addBtn = document.getElementById('addMovieBtn');

addBtn.addEventListener("click" , (e) => {

    e.preventDefault();
    validate();


})

function validate() {

    let movieName = document.getElementById('movieName').value.trim();

    if (movieName === "") {
        alert("---> Please enter the Movie name first.");
        return
    }

    let genre = document.getElementById('genre').value;

    if (genre === "") {
        alert("---> Please select a genre from dropdown.");
        return
    }

    let inputRating = document.getElementById('rating').value;

    if (inputRating === "") {
        alert("---> No rating was eneterd.")
        return
    }

    let rating = Number(inputRating);

    if (Number.isNaN(rating)) {
        alert("---> Rating was Invalid.")
        return
    }

    if (rating < 1 || rating > 10) {
        alert("---> Rating must be between 1 to 10")
        return
    }

    let watched = false;

    movieList.push({
        movieName,
        genre,
        rating,
        watched
    })

    filterMovie();
    resetMovieInput();

}

function displayMovie() {
     
    document.getElementById('movieList').innerHTML = "";

    for (let i = 0 ; i < movieList.length ; i++) {

        let movie = movieList[i]

        let status = movie.watched ? "Watched" : "Pending";

        let newMovie = document.createElement('p');

        newMovie.innerHTML = `
        Movie  : ${movie.movieName}<br><br>
        Genre  : ${movie.genre}<br>
        Rating : ${movie.rating}<br>
        Status : ${status}<br><br>
        
        ${movie.watched
            ? `<button disabled>Watched</button>`
            : `<button onclick = "watchedMovie(${i})">Watched</button>`
        }
        
            <br><br>

        <button onclick = "deleteMovie(${i})">
            Delete
        </button>

        <hr>

        `
        document.getElementById('movieList').appendChild(newMovie);
    }
}

function resetMovieInput() {
    document.getElementById('movieName').value = "";
    document.getElementById('genre').value = "";
    document.getElementById('rating').value = "";
}

function watchedMovie(index){

    movieList[index].watched = true
    filterMovie();

}

function deleteMovie(index){

    movieList.splice(index , 1);
    filterMovie();

}

function filterMovie(){

    let filter = document.getElementById('filterMovie').value;

    if (filter === "All") {
        displayMovie();
    } else if (filter === "Not Watched" || filter === "Watched"){
        filterByStatus(filter);
    } else {
        filterByGenre(filter);
    }

    statistics()
}



function filterByGenre(filterGenre){
    
    document.getElementById('movieList').innerHTML = ""
    
    for (let i = 0 ; i < movieList.length ; i++) {
        
        let movie = movieList[i];
        
        let status = movie.watched ? "Watched" : "Pending";
        
        if (movie.genre === filterGenre) {
            
            let newMovie = document.createElement('p');

            newMovie.innerHTML = `
            Movie  : ${movie.movieName}<br><br>
            Genre  : ${movie.genre}<br>
            Rating : ${movie.rating}<br>
            Status : ${status}<br><br>
            
            ${movie.watched
                ? `<button disabled>Watched</button>`
                : `<button onclick = "watchedMovie(${i})">Watched</button>`
            }
            
            <br><br>
            
            <button onclick = "deleteMovie(${i})">
            Delete
            </button>

            <hr>
            
            `
            document.getElementById('movieList').appendChild(newMovie);
        }
    }
}
function filterByStatus(status) {

    document.getElementById('movieList').innerHTML = ""
    
    for (let i = 0 ; i < movieList.length ; i++) {
        
        let movie = movieList[i];
        
        let isPending = movie.watched ? "Watched" : "Pending";

        if (status === "Watched") {
            let filterName = true;
        } else {
            let filterName = false;
        }
        
        if (movie.watched === filterName) {
            
            let newMovie = document.createElement('p');

            newMovie.innerHTML = `
            Movie  : ${movie.movieName}<br><br>
            Genre  : ${movie.genre}<br>
            Rating : ${movie.rating}<br>
            Status : ${isPending}<br><br>
            
            ${movie.watched
                ? `<button disabled>Watched</button>`
                : `<button onclick = "watchedMovie(${i})">Watched</button>`
            }
            
            <br><br>
            
            <button onclick = "deleteMovie(${i})">
            Delete
            </button>

            <hr>
            
            `
            document.getElementById('movieList').appendChild(newMovie);
        }
    }
}

function statistics(){

    let totalMovies = 0;
    let watchedMovies = 0;
    let highestRating = 0;
    let ratingSum = 0;

    for (let movie of movieList) {
        
        totalMovies += 1;
        ratingSum += movie.rating;

        if (movie.watched) {
            watchedMovies += 1;
        }

        if (movie.rating > highestRating) {
            highestRating = movie.rating;
        }

    }

    document.getElementById('totalMovies').innerText = totalMovies;
    document.getElementById('watchedMovies').innerText = watchedMovies;
    document.getElementById('notWatchedMovies').innerText = totalMovies - watchedMovies;
    document.getElementById('highestRating').innerText = highestRating;
    document.getElementById('averageRating').innerText = Math.round(ratingSum / totalMovies);

}

document.getElementById('filterMovie').addEventListener("change" , filterMovie);