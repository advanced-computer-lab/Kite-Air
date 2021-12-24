<a> <img src="https://github.com/advanced-computer-lab/Kite-Air/blob/main/src/client/src/assets/kiteAirBabyBlue.png" width="300">
</a>

 _Our flight reservation system is here to assist you with all your flight arrangements. So, whether you’re booking a flight, making a change to your booking, or cancelling altogether, you can always rely on Kite Air to help you save money on your next trip._

[![Netlify Status](https://api.netlify.com/api/v1/badges/4f8b5aae-1ba9-4a09-a749-8348e96081ff/deploy-status)](https://app.netlify.com/sites/blissful-almeida-0c8a8f/deploys)



# Collaborators:
- [Maryam Ayman ElOraby](https://www.github.com/mareloraby) ✨ 
- [Hadeer El Hussein](https://github.com/Hadeer1111) ✨ 
- [Mariam Tamer](https://github.com/Mariam-369) ✨ 
- [Rawan Reda Fouda](https://github.com/RawanReda) ✨ 
- [Rowan Amgad](https://github.com/rowanamgad) ✨ 

# Motivation
This project’s goal was to implement an airline reservation system using the Agile Methodology split into three sprints, following the assigned System Requirements and implementing it using the MERN Stack (MongoDB, Express.js, React and Node.js).

<!-- ![kiteAirBabyBlye](https://user-images.githubusercontent.com/42250266/147371905-e70d931a-e396-4e57-93d7-daeb0c59cca6.png)
 -->
<a> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" width="125">
</a>
<a> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" width="125">
</a>
<a> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" width="125">
</a>
<a> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" width="125">
</a>
</div>



# Features
Our web application offers a smooth process of reserving a flight by providing a user experience that fosters satisfiability, efficiency, learnability and visibility. Some examples of this is seen in choosing seats where the user gets to view all seats on the flight and choose seats accordingly. Furthermore, navigation is always reversible; the app allows the users to go back and change a previously made choice while making a reservation. We also allow for immediate feedback through sending emails right after a reservation is confirmed or canceled and throughout the website, the user is sent a confirmation message upon any action taken.

Main website features for a guest User:
- Search for a desired flight based on number of passengers, departure and arrival airports, departure and arrival dates, and cabin class and gets all available options.
- Register
- Log-in

Main website features for an existing User:
- Search for a desired flight based on number of passengers, departure and arrival airports, departure and arrival dates, and cabin class and gets all available options.
- Make a reservation by selecting the desired seats on the choosen flight
- View a summary of their selected flight and seats
- Online payment using a visa/CreditCard
- View all previously made reservations.
- Cancel a previously made reservation.
- Request an email to be sent with a certain reservation information 
- Update the seats of a previously made reservation.
- Access profile page and edit personal information and password.
- Log-out


Main website features for the  Admin:
- Search for a flight
- Add a flight to the system.
- Update an already existing flight information.
- Log-in
- Log-out


# How to Run

### Port Numbers
- Backend:
     - app.js runs on port `3000` 
     - authServer.js runs on port `4000`
- Frontend: 
    -  App.js runs on port `8000`

### Which files to run
_We are working on deploying the app on herokuapp and Netlify. In the meantime, you can follow these steps to run the app._

Open 3 terminals:

  a. In the first terminal run `cd src` and then `node app.js`

  b. In the second terminal run `cd src` then `authServer.js`

  c. In the third terminal run `cd src/client/src` then `npm start`

> Notes: a & b run the backend, while c runs the frontend.
> Anything inside the client directory is related to the frontend.

# Libraries
Initially, run `npm init` and `npm i` in the terminal to download all node modules and install some basic libraries.

 - express
 - cors
 - Body-parser
 - jsonwebtoken
 - stripe 
 - bcrypt
 - axios
 - mongoose
 - material ui components
    - @mui/material/
    - @mui/lab
    - @mui/icons-material
    - @mui/utils
- antd components
    - antd
    - antd/dist/antd.css
    - @ant-design/icons
- react-router-dom
- react-scripts
- react-country-region-selector
- react-seat-picker
- react-stripe-checkout
- react-toastify
- nodemailer
- jquery


# Database
 To provide database access for Kite Air, we used mongoose (a MongoDB object modeling tool designed to work in an asynchronous environment).
 We have 3 models:
- User
- Flight
- Reservation

<a><img src="https://github.com/advanced-computer-lab/Kite-Air/blob/main/DBModelnobg.png"/></a>


# License
MIT
