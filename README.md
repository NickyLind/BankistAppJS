# BankistAppJS

## **_Description_**
This application showcases array and array methods coupled with dates and timers in vanilla JS to create a banking application using hard-coded data

## **_Features_**
_two users are hardcoded into this application "Nick Lindau" & "Jessica Davis" who's login information is nl - 1111, and jd - 2222 respectively_
- converts a user's name into initials to login to the app coupled with their pin #
- users will be logged out of the app after a timer counts down due to inactivity
- users can request a "Loan" thats on a 4 second delay before it shows up in their account (loans can be approved up to 50% of users highest deposit)
- users can transfer money to other users
- users can close accounts
- uses internationalization for movement dates and currencies depending on area user is from
- users can sort movements by descending amount (*see issue below)

## **_Known Issues/Potential Updates_**
_Due to the nature of the application really only being created to showcase array methods, dates, and timers some features are purposefully omitted._ 
- when sorting a user's movements, the dates of the movements aren't sorted accordingly, 
this is due to the fact that these two pieces of data are in two seperate arrays vs the same object within the user object where it would be easier to associate them together
- the inactivity timer is only stopped by a user requesting a loan, transferring funds, or signing into a different account. It would be fairly easy to allow this to also be
reset with a keystroke or mouse movement in a larger application
- there is no error or warning message for incorrect login information or a way to create new users. This is due to the fact that it seemed silly to create this functionality for 
hardcoded data that's simply used to showcase some vanilla JS skills that isn't connected to any sort of backend.

## **_Setup_** 
simply copy this repo into the desired directory on your local system and open it with your favorite editor. My recommended method to run the app is to use Live Server from [Visual Studio Code](https://code.visualstudio.com/) and right click the index.html file to start a live server.
