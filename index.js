
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs")

const app = express();

app.set('view engine', 'ejs');
/* app.set('views', __dirname + '/views'); */


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));







app.get("/", function(req, res) {

    fetch('https://fakestoreapi.com/products').then(res => res.json())
    .then(data => {

    let produtosTitle = [];
    let produtosPrice = [];
    let produtosDescription = [];
    let produtosImage = [];
    let cart = [];

    data.forEach(data => {
        produtosTitle.push(data.title);
        produtosPrice.push(data.price);
        produtosDescription.push(data.description);
        produtosImage.push(data.image);
    });

    res.render("home", {
        title: produtosTitle,
        price: produtosPrice,
        description: produtosDescription,
        image: produtosImage,
    })
});
})








app.listen(3000,function() {
    console.log("Server is running ou port 3000");
})