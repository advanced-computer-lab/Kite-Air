<a> <img src="https://github.com/advanced-computer-lab/Kite-Air/blob/main/src/client/src/assets/kiteAirBabyBlue.png" width="300">
</a>

 _Our flight reservation system is here to assist you with all your flight arrangements. So, whether you’re booking a flight, making a change to your booking, or cancelling altogether, you can always rely on Kite Air to help you save money on your next trip._

[![Netlify Status](https://api.netlify.com/api/v1/badges/4f8b5aae-1ba9-4a09-a749-8348e96081ff/deploy-status)](https://app.netlify.com/sites/blissful-almeida-0c8a8f/deploys)



# Collaborators:
- [Maryam Ayman ElOraby](https://www.github.com/mareloraby) ✨ _( Scrum Master )_
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

![Screen2](https://user-images.githubusercontent.com/42250266/147373838-5bee99ef-403a-4db9-bf7a-c70b1c8f80f6.jpg)



Our web application offers a smooth process of reserving a flight by providing a user experience that fosters satisfiability, efficiency, learnability and visibility. Some examples of this is seen in choosing seats where the user gets to view all seats on the flight and choose seats accordingly. Furthermore, navigation is always reversible; the app allows the users to go back and change a previously made choice while making a reservation. We also allow for immediate feedback through sending emails right after a reservation is confirmed or canceled and throughout the website, the user is sent a confirmation message upon any action taken.



![Screen1](https://user-images.githubusercontent.com/42250266/147373832-ab4ff152-644f-4077-8d25-697ff95843a4.jpg)



Main website features for a guest User:
- Search for a desired flight based on number of passengers, departure and arrival airports, departure and arrival dates, and cabin class and gets all available options.
- Register
- Log-in

![Screen11](https://user-images.githubusercontent.com/42250266/147373859-dd18fd93-7a4e-4e02-894b-ae5790937fe3.jpg)

![Screen10](https://user-images.githubusercontent.com/42250266/147373864-197c09d0-834e-4784-bc36-d8603ed4a610.jpg)


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




![Screen3](https://user-images.githubusercontent.com/42250266/147373918-022a99ef-1135-4f77-9e89-22f9a544306d.jpg)


![Screen4](https://user-images.githubusercontent.com/42250266/147373911-ad045b6d-9a73-4872-b99c-c6725bbbca93.jpg)

![Screen5](https://user-images.githubusercontent.com/42250266/147373909-2c7ce567-e32c-4e5f-8138-7a209cdd93cf.jpg)

![First](https://user-images.githubusercontent.com/42250266/147379597-14a83dbd-d48a-4c07-b1cf-6c47b00b0630.jpg)


![Screen7](https://user-images.githubusercontent.com/42250266/147373878-d4eb02d6-eb80-426f-b987-26500172b3a4.jpg)


![Screen8](https://user-images.githubusercontent.com/42250266/147373882-38654961-6cf5-4e11-86bc-c69c295f0339.jpg)

<!-- ![Screen9](https://user-images.githubusercontent.com/42250266/147373931-1fed783a-6d48-49eb-80cf-8b73036cbfaa.jpg)
 -->

Main website features for the  Admin:
- Search for a flight
- Add a flight to the system.
- Update an already existing flight information.
- Log-in
- Log-out

![Screen12](https://user-images.githubusercontent.com/42250266/147373852-d110def0-fa12-4c4a-a3b8-02d5818711a5.jpg)


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

# Credits
- Our great project manager [Ahmed Alaa](https://github.com/ahmedalaaseif) for giving all the help he could and for supporting us throughout the sprints :)
- [Dr. Angela Yu's Udemy Course](https://www.udemy.com/course/the-complete-web-development-bootcamp/)
- [Ryan Dhungel's Udemy Course](https://www.udemy.com/course/mern-stack-bootcamp-react-node-socket-io/)
