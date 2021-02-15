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
            name: "Test1",
            lastName: "Berlin",
            email: "test1@berlin.com",
            password: hash1,
            city: "Berlin"
        },
        {
            name: "Test2",
            lastName: "Berlin",
            email: "test2@berlin.com",
            password: hash2,
            city: "Berlin"
        },
        {
            name: "Test1",
            lastName: "Paris",
            email: "test1@paris.com",
            password: hash3,
            city: "Paris"
        },
        {
            name: "Test2",
            lastName: "Paris",
            email: "test2@paris.com",
            password: hash4,
            city: "Paris"
        },
        {
            name: "Test1",
            lastName: "Frankfurt",
            email: "test1@frankfurt.com",
            password: hash5,
            city: "Frankfurt"
        },
        {
            name: "Test2",
            lastName: "Frankfurt",
            email: "test2@frankfurt.com",
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
                gender: 'gender neutral',
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
                gender: 'gender neutral',
                switchMode: 'switch'
            },
            {
                myOwner: users[1]._id,
                name: 'Teddy Bear',
                description: 'Fluffy animal',
                photos: [images.teddyBearImg],
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
                photos: [images.teddyBearImg],
                category: 'Teddy Bear',
                city: 'Paris',
                ageRange: 'toddler',
                gender: 'gender neutral',
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
                gender: 'gender neutral',
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
                gender: 'gender neutral',
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
                gender: 'gender neutral',
                switchMode: 'switch'
            },
            {
                myOwner: users[5]._id,
                name: 'Teddy Bear',
                description: 'Fluffy animal',
                photos: [images.teddyBearImg],
                category: 'Teddy Bear',
                city: 'Frankfurt',
                ageRange: 'toddler',
                gender: 'gender neutral',
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
                gender: 'gender neutral',
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