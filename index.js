import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const apiKey = "";
const API_URL = "https://api.weatherapi.com/v1/forecast.json";
var response;
var units;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render("index.ejs", { data: response, units: units });
});

app.post("/weather", async (req, res) => {
    try {
        console.log(req.body);
        const result = await axios.get(API_URL, {
            params: {
                key: apiKey,
                q: req.body.city,
                aqi: "no"
            }
        });

        response = JSON.stringify(result.data);
        units = req.body.weather;
        console.log(response);
        res.redirect("/");

    } catch (error) {
        if (error.response) {
            console.log(JSON.stringify(error.response.data));
        }
    }
});


app.listen(port,()=>{
    console.log(`Running Server on port ${port}`);
});
