// Iteration #1
require('../db/index.js');
let images=require("../bin/imagesUrl")
const mongoose = require('mongoose');

//require the model

let ToyModel = require('../models/Toy.model')

//insert into the model

const toys = [
    { name: 'Bicycle', description: 'bicycle with basket', photos: [images.bikeImg] , category: 'Sports', city: 'Berlin', ageRange: 'toddler', gender: 'gender neutral', switchMode: 'switch'},
   { name: 'Book', description: '`Guess how much I love you` book', photos: [images.bookImg] , category: 'Books', city: 'Berlin', ageRange: 'toddler', gender: 'gender neutral', switchMode: 'switch'},
 { name: 'Teddy Bear', description: 'Fluffy animal', photos: [images.teddyBearImg] , category: 'Teddy Bear', city: 'Berlin', ageRange: 'toddler', gender: 'gender neutral', switchMode: 'switch'}
    ]

ToyModel.create(toys)
    .then((result)=> {
        console.log('Data seeded', result.length)
        //always close the connection after seeding
        //please make sure you require mongoose at the top of the file
        mongoose.disconnect()
    })
    .catch(()=> {
        console.log('Data seeding went wrong!')
    })
