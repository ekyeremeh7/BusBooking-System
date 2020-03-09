const express = require('express');
const bodyParser = require("body-parser");
const ejs = require('ejs');
const mongoose = require('mongoose');
const _ = require("lodash");
const bcrypt = require("mongoose-bcrypt");

let global_name = "";
let global_signup_name = "";
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));


//connecting/creating bus booking database
mongoose.connect("mongodb+srv://admin:admin@cluster0-x17jw.mongodb.net/busbooking", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//Create a database Schema
const userInfoSchema = new mongoose.Schema({
        fullName: {
            type: String,
            required: [true, 'Name is required']
        },
        userName: String,
        email: String,
        phone: Number,
        password: String
    })
    //compile our model
const UserInfo = mongoose.model("UserInfo", userInfoSchema);

//creating admin user
// const admin = new UserInfo({
//     fullName: "Emmmanuel Kwabena Kyeremeh",
//     userName: "admin",
//     email: "ekyeremeh7@gmail.com",
//     phone: +233558121540,
//     password: "admin"
// });
// admin.save();




// // const fruit = new Fruit({
// //     name: "Apple",
// //     rating: 7,
// //     review: "Peaches are so yummy."
// // });

// // fruit.save();

// const banana = new Fruit({
//     name: "Banana",
//     rating: 7,
//     review: "Taste great."
// });

// banana.save();


// //Admin schema
// const adminSchema = new mongoose.Schema({
//     name: String,
//     password: String
// });

// //model the new mongoose model or retrieve the adminSchema
// const Admin = new mongoose.model("admin", adminSchema);

// //create a admin doc
// const user1 = new Admin({
//     name: "admin",
//     password: "admin"
// });
// user1.save();

// //create a admin doc
// const user2 = new Admin({
//     name: "emmanuel",
//     password: "kyeremeh"
// });
// user1.save();
// //Customer schema
// const customerSchema = new mongoose.Schema({
//         name: String,
//         password: String,
//         email: String,
//         phone: Number,
//         age: Number
//     })
//     //model the  customer Schema
// const Customer = new mongoose.model("customer", customerSchema);

// const customer1 = new Customer({
//     name: "Aziz",
//     password: "kindof",
//     email: "ekyeremeh7@gmail.com",
//     phone: "0558121540",
//     age: 13
// })
// customer1.save();

// //Seat schema
// const seatSchema = new mongoose.Schema({
//         bus_name: String,
//         class: String,
//         seats: String
//     })
//     //model the Seat Schema
// const Seat = new mongoose.model("seat", seatSchema);


// //Bus Schema
// const busSchema = new mongoose.model({
//     bus_name: String,
//     dept_time: Date,
//     arr_time: Date,
//     src: String,
//     destination: String,
//     fare: String
// })

// //model the Bus Schema
// const Bus = new mongoose.model("bus", busSchema);

app.get("/", function(req, res) {
    res.render("login");

});

app.post("/", function(req, res) {
    const username = req.body.username;
    //global_name = username;
    const userPassword = req.body.password;
    let data = UserInfo.findOne({ userName: username, password: userPassword }, function(err, userInfo) {});

    if (data) {
        res.render("home", {
            username: username
        });
    } else if (userName !== username || password !== userPassword) {
        res.render("sign_up");
    }
});


app.get("/signup_form", function(req, res) {
    res.render("signup_form");
});
app.post("/home", function(req, res) {
    const fullName = req.body.full_name;
    const signUpUsername = req.body.signUpUsername;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const userPassword = req.body.userPassword;
    //global_signup_name = signup_username;


    const userInfo = new UserInfo({
        fullName: fullName,
        userName: signUpUsername,
        email: email,
        phone: phoneNumber,
        password: userPassword
    });
    userInfo.save();

    UserInfo.findOne({ userName: signUpUsername }, function(err, result) {
        res.render("home", {
            username: signUpUsername

        });
    });


});


app.get("/home", function(req, res) {
    const username = global_name;
    const sigup_username = global_signup_name;

    if (sigup_username) {
        res.render("home", {
            username: sigup_username
        })
    } else if (username) {
        res.render("home", {
            username: username
        })
    }
})

app.get("/customers", function(req, res) {
    res.render("customers");
});

app.get("/bookings", function(req, res) {
    res.render("bookings");
})

app.get("/buses", function(req, res) {
    res.render("buses");
})


app.get("/seats", function(req, res) {
    res.render("seats");
});

app.get("/availability", function(req, res) {
    res.render("availability");
});

app.get("/routes", function(req, res) {
    res.render("routes");
});

app.get("/reports", function(req, res) {
    res.render("reports");
});

app.listen(3000, function() {

    console.log("Server started successfully on Port 3000");
});