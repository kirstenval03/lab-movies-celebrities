const CelebrityModel = require("../models/Celebrity.model");

// starter code in both routes/celebrities.js and routes/movies.js
var router = require("express").Router();

// all your routes here

//ADDING A NEW CELEBRITY (GET)
router.get('/create', (req, res, next) => {
    res.render('celebrities/celebrity-create.hbs')
  })
  
  router.post('/create', (req, res, next) => {
  
    console.log(req.body);
  
    const { name, occupation, catchPhrase } = req.body
  
    CelebrityModel.create(
        { 
        name, 
        occupation, 
        catchPhrase,
        }
    )
    .then((newCelebrity) => {
        console.log(`New celebrity added: ${newCelebrity.title}.`, newCelebrity)
        res.redirect('/celebrities')
    })
    .catch((error) => {
        console.log(error)
        next(error)
    });
  
  });

//ADDING A NEW CELEBRITY (POST)
  router.post('/create', (req, res, next) => {

    console.log(req.body);
  
    const { name, occupation, catchPhrase } = req.body
  
    CelebrityModel.create(
        { 
        name, 
        occupation, 
        catchPhrase,
        }
    )
    .then((newCelebrity) => {
        console.log(`New celebrity added: ${newCelebrity.name}.`, newCelebrity)
        res.redirect('/celebrities')
    })
    .catch((error) => {
        console.log(err)
        next(error)
    });
  
  });


  //ITERATION 4: LISTING THE CELEBRITIES (GET)
  router.get('/', (req, res, next) => {
    CelebrityModel.find()
    .then(allTheCelebritiesFromDB => {
      // -> allTheCelebritiesFromDB is a placeholder, it can be any word
      console.log('Retrieved celebrities from DB:', allTheCelebritiesFromDB);
 
      // we call the render method after we obtain the celebrities data from the database -> allTheBooksFromDB
      res.render('celebrities/celebrities.hbs', { celebrities: allTheCelebritiesFromDB }); // pass `allTheBooksFromDB` to the view (as a variable books to be used in the HBS)
    })
    .catch(error => {
      console.log('Error while getting the celebrities from the DB: ', error);
 
      // Call the error-middleware to display the error page to the user
      next(error);
    });
});

//EXTRA: DELETE CELEBRITIES

router.get("/delete/:celebrityId", (req, res, next) => {

    CelebrityModel.findByIdAndDelete(req.params.celebrityId)
        .then((result) => {
            console.log("Deleted:", result)
            res.redirect('/celebrities')
        })
        .catch((err) => {
            console.log(err)
        })
  
  })

module.exports = router;