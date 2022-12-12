### Introduction
This project is a quiz app that receives questions from an api called “the trivia app” (https://the-trivia-api.com/). The intent is to build an app where different users can challenge each other to quizzes where the state of a game is stored in a firebase database. In its current state, however, there is no way to save the score or to make an account, so the results of a game are not displayed properly. 
 
### What is completed
So far we have a working prototype of what the different views will look like and a game view that displays questions that are fetched from the api based on categories chosen by the user. For each round of the game a user gets to play 5 rounds with 3 questions each with a new category for each round. A correct answer is indicated by the button turning green and an incorrect answer is indicated by the button turning red. There is also a mockup of a mode where the user can practice by getting questions without storing if the answer was correct or not. 
 
### What is planned
For the finished project we plan to make a working prototype where users and games can be created and saved to the database. The score of the game should be saved and displayed properly and the game objects should be received from the database by both users. We plan to create two more views, a sidebar and a leaderboard. There are also a magnitude of small changes that need to be done with regards to the interactions and functions. We also plan to make the design more uniform through standardized fonts, color schemes and presets for layouts.
 
### Project file structure
The src map is structured in the following way:
model (QuizModel.js)
firebase
presenters
views and css-files
assets (eg. images, gifs)
components
helpfunctions
navigation
 
Views and presenters:
login
loginPresenter.js
loginView
loginView.css
loginView.js
Done: The view and presenter files for the login are for the most part done in terms of the layout for rending and what custom events are going to be called upon to allow a user to login and create an account. 
Todo: At the moment we have the possibility to log in, create an account and sign out on the same page which won’t be the case once we’re done. We also need to implement conditions/observers to check if a user is logged in or signed out and showcase appropriate page in that case.
 
home: the files listed below are used to create and display the home page. 
 
Done: The home page includes 3 components: a new game button, a practice button and a gameList component being rendered twice depending on player’s turn. The new game button opens a pop-up where the player can input text and click on an invite button. Clicking the practice button directs to #category and can be used to test the flow of the game. Clicking on a game sends the user to #searchResults.
 
To-do: The invite button in the pop up should create a game and save it in the database. Games should be fetched from the database instead of from dummy data. Clicking on a game should direct to the appropriate game results based on gameID.
 
	Files:
gameList component
gameList.js - the gameList component is created, where usernames and icons are displayed. 
gameList.css - styling for gameList component
homePresenter.js - games are filtered so only active games are displayed. gameList rendered twice depending on player turn
homeView 
homeView.js - new game, practice button and modal are created
homeView.css - styling for buttons and for modal
 
gameResults
Files:
gameResultsView.js
gameResultsView.css
gameResultPresenter.js
Done: contains files for the view and presenter of gameResults, whose purpose is displaying game results. It will render the score for both players and the results of each round. If a round is not played yet it will render three gray circles (one for each question). A correct answer will be displayed as a green circle with a check mark and a wrong answer as a red circle with a cross. Now it uses example data (eg. const exampleResult1 )
To-do: adjust to “real data”
game
gamePresenter.js
The presenter for the whole game view. This file shows first the category view until a category is chosen. When a category is chosen it instead shows the gameView. This is also where questions are fetched from the api and sent to the game view.
categoryView.js
The view where a category is selected. Displays the category cards and calls the function for receiving questions from the api.
components
categoryCard.js
Renders a card that displays a category which when clicked, calls the function for receiving questions from the api within that category.
gameView.js
The game view displays the components of the game and stores the important logic and score for the game. It also updates the current question after a question is completed.
components
question.js
The component that renders the question card with the current question and displays the answers as answer components. 
answer.js
This file renders an answer and changes its color depending on whether the answer chosen was correct or not.
 
 
leaderboard (to be implemented)
sidebar (to be implemented)

Firebase:
firebaseModel
used to set up an observer that checks for changes in the model. Contains promise function to check the state of firebase, as well as update functions to update det Model from Firebase and vice versa. 
firebase configuration
copied code for the configuration of firebase and connection to real time database

