// var assert = require('assert');
// let chai = require('chai');
// let chaiHttp = require('chai-http');
// let server = require('../index');
// let should = chai.should();
// chai.use(chaiHttp);

// // ---------- GET ----------

// // PUBLICATIONS

// it ('Should GET all Publications', (done) => {
//   chai.request(server)
//     .get('/publications/')
//     .end((err, result) => {
//       result.should.have.status(200);
//       console.log('Got' , result.body.data, ' docs')
//       done()
//     })
// }) 

// it ('Should GET all Publications by id', (done) => {
//   chai.request(server)
//     .get('/publications/:publication_id')
//     .end((err, result) => {
//       result.should.have.status(200);
//       console.log('Got particular publication using /GET/publications/:publication_id')
//       done()
//     })
// })



// // REVIEW 
// it ('Should GET reviews for all Publications', (done) => {
//   chai.request(server)
//     .get('/publications/reviews')
//     .end((err, result) => {
//       result.should.have.status(200);
//       console.log('Got' , result.body.data, ' docs')
//       done()
//     })
// })

// it ('Should GET all reviews for a given publication', (done) => {
//   chai.request(server)
//     .get('/publications/:publication_id/reviews')
//     .end((err, result) => {
//       result.should.have.status(200);
//       console.log('Got' , result.body.data, ' docs')
//       done()
//     })
// }) 
/*
it ('Should GET users review for a publication', (done) => {
  chai.request(server)
    .get('/publications/:publication_id/reviews/:user_id')
    .end((err, result) => {
      result.should.have.status(200);
      console.log('Got' , result.body.data, ' docs')
      done()
    })
}) */

// USERS
/*
it ('Should GET all users', (done) => {
  chai.request(server)
    .get('/users')
    .end((err, result) => {
      result.should.have.status(200);
      console.log('Got' , result.body.data, ' docs')
      done()
    })
})

*/


// ---------- POST ----------

// PUBLICATIONS


