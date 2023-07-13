const MovieModel = require("../models/Movie.model");

// starter code in both routes/celebrities.js and routes/movies.js
var router = require("express").Router();

// all your routes here
//ADDING A NEW MOVIE (GET)
router.get('/create', (req, res, next) => {
    res.render('movies/movie-create.hbs')
  })
  
  router.post('/create', (req, res, next) => {
  
    console.log(req.body);
  
    const { title, genre, plot } = req.body
  
    MovieModel.create(
        { 
        title, 
        genre, 
        plot,
        }
    )
    .then((newMovie) => {
        console.log(`New movie added: ${newMovie.title}.`, newMovie)
        res.redirect('/movies')
    })
    .catch((error) => {
        console.log(error)
        next(error)
    });
  
  });

//ADDING A NEW MOVIE (POST)
  router.post('/create', (req, res, next) => {

    console.log(req.body);
  
    const {  title, genre, plot } = req.body
  
    MovieModel.create(
        { 
        title, 
        genre, 
        plot,
        }
    )
    .then((newMovie) => {
        console.log(`New movie added: ${newMovie.title}.`, newMovie)
        res.redirect('/movies')
    })
    .catch((error) => {
        console.log(err)
        next(error)
    });
  
  });

  
  // LISTING THE MOVIES (GET)
  router.get('/', (req, res, next) => {
    MovieModel.find()
    .then(allTheMoviesFromDB => {
      // -> allTheMoviesFromDB is a placeholder, it can be any word
      console.log('Retrieved movies from DB:', allTheMoviesFromDB);
 
      // we call the render method after we obtain the movies data from the database -> allTheBooksFromDB
      res.render('movies/movies.hbs', { movies: allTheMoviesFromDB }); // pass `allTheBooksFromDB` to the view (as a variable books to be used in the HBS)
    })
    .catch(error => {
      console.log('Error while getting the movies from the DB: ', error);
 
      // Call the error-middleware to display the error page to the user
      next(error);
    });
});

//SEEING MOVIE'S DETAILS 
router.get('/details/:movieId', (req, res, next) => {

    MovieModel.findById(req.params.movieId)
        .then((movie) => {
            console.log("Found movie:", movie)
            res.render('movies/movie-details.hbs', movie)
        })
        .catch((error) => {
            console.log(error)
            next(error)
        })
})


//DELETE MOVIES (GET)

router.get("/delete/:movieId", (req, res, next) => {

    MovieModel.findByIdAndDelete(req.params.movieId)
        .then((result) => {
            console.log("Deleted:", result)
            res.redirect('/movies')
        })
        .catch((err) => {
            console.log(err)
        })
  
  })

module.exports = router;


//EDIT MOVIE DETAILS (GET)

router.get('/edit/:movieId', (req, res, next) => {
    const { movieId } = req.params;
   
    MovieModel.findById(movieId)
      .then(movieToEdit => {
        console.log(movieToEdit);
        res.render("movies/movie-edit.hbs", movieToEdit)
      })
      .catch(error => next(error));
  });
  
  //EDIT MOVIE DETAILS (POST)
  router.post('/edit/:movieId', (req, res, next) => {
  
    const { movieId } = req.params;
    const { title, genre, plot} = req.body;
  
    MovieModel.findByIdAndUpdate(
        movieId, 
        { 
            title, 
            genre, 
            plot, 
        }, 
        { new: true }
        )
        .then((updatedMovie) => {
            console.log("Updated Movie:", updatedMovie)
            res.redirect(`/movies/details/${updatedMovie._id}`)
        }) // go to the details page to see the updates
        .catch((error) => {
            console.log(error)
            next(error)});
  });