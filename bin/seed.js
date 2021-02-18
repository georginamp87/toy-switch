require('../db/index.js');
let images = require("./imagesUrl")
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

let UserModel = require('../models/User.model')
let ToyModel = require('../models/Toy.model')
let salt = bcrypt.genSaltSync(10);

let hash1 = bcrypt.hashSync("Berlin12.", salt);
let hash2 = bcrypt.hashSync("Berlin12.", salt);
let hash3 = bcrypt.hashSync("Paris12.", salt);
let hash4 = bcrypt.hashSync("Paris12.", salt);
let hash5 = bcrypt.hashSync("Frankfurt12.", salt);
let hash6 = bcrypt.hashSync("Frankfurt12.", salt);

UserModel.create([{
            name: "Arthur",
            lastName: "Simith",
            email: "arthur@berlin.com",
            password: hash1,
            city: "Berlin"
        },
        {
            name: "Jenny",
            lastName: "Wall",
            email: "jenny@berlin.com",
            password: hash2,
            city: "Berlin"
        },
        {
            name: "David",
            lastName: "Schneider",
            email: "david@paris.com",
            password: hash3,
            city: "Paris"
        },
        {
            name: "Mary",
            lastName: "Black",
            email: "mary@paris.com",
            password: hash4,
            city: "Paris"
        },
        {
            name: "Julia",
            lastName: "Bauer",
            email: "julia@frankfurt.com",
            password: hash5,
            city: "Frankfurt"
        },
        {
            name: "Jonas",
            lastName: "Schwarz",
            email: "jonas@frankfurt.com",
            password: hash6,
            city: "Frankfurt"
        }
    ])
    .then((users) => {
        console.log('Users seeded', users.length)
        const toys = [{
                myOwner: users[0]._id,
                name: 'Bicycle',
                description: 'bicycle with basket',
                photos: [images.bikeImg],
                category: 'Sports',
                city: 'Berlin',
                ageRange: 'toddler',
                switchMode: 'switch'
            },
            {
                myOwner: users[0]._id,
                name: 'Book',
                description: '`Guess how much I love you` book',
                photos: [images.bookImg],
                category: 'Books',
                city: 'Berlin',
                ageRange: 'toddler',
                switchMode: 'switch'
            },
            {
                myOwner: users[1]._id,
                name: 'Teddy Bear',
                description: 'Fluffy animal',
                photos: [images.teddyBearImg, images.teddyBear2],
                category: 'Teddy Bear',
                city: 'Berlin',
                ageRange: 'toddler',
                gender: 'gender neutral',
                switchMode: 'switch'
            },
            {
                myOwner: users[2]._id,
                name: 'Teddy Bear',
                description: 'Fluffy animal',
                photos: [images.teddyBearImg, images.teddyBear2],
                category: 'Teddy Bear',
                city: 'Paris',
                ageRange: 'toddler',
                switchMode: 'switch'
            },
            {
                myOwner: users[3]._id,
                name: 'Bicycle',
                description: 'bicycle with basket',
                photos: [images.bikeImg],
                category: 'Sports',
                city: 'Paris',
                ageRange: 'toddler',
                switchMode: 'switch'
            },
            {
                myOwner: users[3]._id,
                name: 'Book',
                description: '`Guess how much I love you` book',
                photos: [images.bookImg],
                category: 'Books',
                city: 'Paris',
                ageRange: 'toddler',
                switchMode: 'switch'
            },
            {
                myOwner: users[4]._id,
                name: 'Book',
                description: '`Guess how much I love you` book',
                photos: [images.bookImg],
                category: 'Books',
                city: 'Frankfurt',
                ageRange: 'toddler',
                switchMode: 'switch'
            },
            {
                myOwner: users[5]._id,
                name: 'Teddy Bear',
                description: 'Fluffy animal',
                photos: [images.teddyBearImg, images.teddyBear2],
                category: 'Teddy Bear',
                city: 'Frankfurt',
                ageRange: 'toddler',
                switchMode: 'switch'
            },
            {
                myOwner: users[5]._id,
                name: 'Bicycle',
                description: 'bicycle with basket',
                photos: [images.bikeImg],
                category: 'Sports',
                city: 'Frankfurt',
                ageRange: 'toddler',
                switchMode: 'switch'
            }
        ]
        ToyModel.insertMany(toys)
            .then((result) => {
                console.log('Toys seeded', result.length)
                mongoose.disconnect()
            })
            .catch((err) => {
                console.log(err)
            })
    })
    .catch((err) => {
        console.log(err)
    })