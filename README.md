# ToySwitch
<br>

## Description
Switch toys with other parents from your city.
<br>

## User stories
- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.
- **401** - As a user I want to see a nice 401 page when I go to a page that I'm not allowed to enter so that I know it was my fault.
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **login-signup** - As a user I want to see a welcome page that gives me the option to either log in as an existing user, or sign up with a new account. If I have not logged out I'll be automatically redirected to the main page.
- **add-signup** - As a user I want to sign up with my full information so that I can safely switch toys with other people. If I have already signed up I'll get a message to let me know I've already used this email.
- **homepage** - As a user I want to see switch options within my location and be able to either search a toy by name, or go to my profile from the home page.
- **toy-search-results** - As a user I want to see the search results with an overview image, the title, the toy's description, and the switch mode. Also, to go back to the home page if I don't want to see that search anymore.
- **toy-switch-page** - As a user I want to see more information about the selected toy and when I click on the Request Switch button, I can send a message to the toy owner to request a switch. Also, to go back to the search results page if I don't want to see that item anymore.
- **success** - As a user I want to see a confirmation of my message been sent to the toy owner. Also, to be able to go back to the home page when I'm done.
- **user-profile** - As a user I want to check my profile information and be able to edit it, and add new toys to my switch library. Also, to go back to the home page if I don't want to see the profile anymore.
- **messages** - As a user I want to check my messages in-depth, to see who has requested a switch or which toys I've requested for a switch.
<br>

## API routes (back-end)

- GET / 
  - renders login-signup.hbs
- GET /signup
  - redirects to /main if user logged in
  - renders auth/signup.hbs
- POST /signup
  - redirects to /login after signup
  - body:
    - name
    - lastName
    - city
    - email
    - password
- POST /login
  - redirects to /main when user logged in
  - body:
    - email
    - password
- GET /logout
  - redirects to /
  - deletes user session data
- GET /main
  - renders main.hbs (the toy switches preview + search form)
 - renders toy switches result when searched
- GET /toypage/:id
  - renders toypage.hbs using the toyId params
  - includes buttons that redirect to /edit or /delete if it is my toy
  - includes request switch button that displays a form to send a message if it is not my toy
- POST /sendmessage/:toyId
  - body :
    - text
  - redirects to /toypage
- GET /addtoy
  - renders add-toy.hbs
- POST /addtoy
  - body: 
     - name
     - description
     - category
     - ageRange
     - gender
     - switchMode
     - photos
  - redirects to /profile after adding toy
- GET /edittoy/:id
  - renders edit-toy.hbs
- POST /edittoy/:id
  - body: 
     - name
     - description
     - category
     - ageRange
     - gender
     - switchMode
     - photos
 - redirects to /profile after editing toy
- GET /deletetoy/:id
  - redirects to /profile after deleting toy
- GET /profile
  - renders profile.hbs
  - includes edit profile button that redirects to /editprofile
  - includes my toys that redirect to /toypage/:id
- GET /editprofile
  - renders edit-profile.hbs
  - includes edit profile button to redirect to post
- POST /editprofile
  - body:
    - name
    - LastName
    - email
    - city
    - photo
  - redirects  to /profile after editing
- GET /messages
  - renders messages.hbs 
  - displays the user you have messaged with
  - includes button to redirect to /messageswith/:id
- GET /messageswith/:id
  - renders messages-with.hbs
  - redirects to / if user presses button
- POST /answermessage/:contactId/:toyId
  - body: 
    - text
  - redirects to /messageswith/:id after sending message

<br>

## Models
 
 - User 
    new Schema ({
     	_id:,
      name: {type: String,require: true},
      lastName: {type: String,require: true},
      email: {type: String,require: true,unique: true},
      password: {type: String,require: true,},
      photo: String,
      city: {type: String,ENUM: ['Amsterdam', 'Berlin', 'Frankfurt', 'Paris', 'other'],require: true}
		})
          
  - ToyModel 
    new Schema ({
      _id: ,
      name: {type: String,require: true},
      myOwner: {type: Schema.Types.ObjectId, ref: "user", require:true},
      description: { type: String },
      photos: { type: [String], default:[defaultImg] },
      category: {type: String, ENUM: ['Toy', 'Board Game', 'Teddy Bear', 'Puzzle', 'Sports', 'Books', 'Video games', 'other'], require: true},
      city: {type: String, ENUM: ['Amsterdam', 'Berlin', 'Frankfurt', 'Paris','other'],},
      ageRange: {type: String, ENUM: ['baby', 'toddler', '3 to 6 years old', '7 to 10 years old', '10 years old +'], },
      switchMode: {type: String, ENUM: ['switch', 'gift', 'temporary switch']}
    })

  - MessageModel
    new Schema({
      _id: ,
      text: {type: String,require: true},
      between: {type:[Schema.Types.ObjectId],ref: "user",require:true},
      toyRelated: {type: Schema.Types.ObjectId,ref: "toy",require:true},
      date: {type: Date, default: Date.now}
      });
    
    <br>
    
## Backlog

- Messages.hbs  
    -button to delete message
    -label for read and unread messages

- main.hbs
    -search by age range categories and switch mode

 - Confirmation.hbs
    - Summary of product
    - Confirmation button
    
 - User profile
    - Favorite toys
    - Add profile photo
    - Who favorited the games posted
    
    
<br>

## Links
[Trello Link]


### Git
[Repository Link]
https://github.com/georginamp87/toy-switch

[Deploy Link]


<br>

### Slides
[Google Slides Link]
https://docs.google.com/presentation/d/1ahiQuAI9aIQZCZmPwzaS3geQgmih86ZzwGWdWwxnbn8/edit?usp=sharing