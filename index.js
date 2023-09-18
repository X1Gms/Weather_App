import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const apiKey = "";
const API_URL = "https://api.weatherapi.com/v1/forecast.json";
var response = null;
var units;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", async (req,res)=>{
    if(req.body.weather){
        units = req.body.weather;
    }
    if(response === null){
        const result = await axios.get(API_URL, {
            params: {
                key: apiKey,
                q: "Lisbon",
                aqi: "no"
            }
        });
        response = JSON.stringify(result.data);
    }


    if(!units){
        units = "Celsius";
    }
    res.render("index.ejs", { data: response, units: units});
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

        res.render("index.ejs", { data: response, units: units});

    } catch (error) {
        if (error.response) {
            console.log(JSON.stringify(error.response.data));
        }
    }
});


app.listen(port,()=>{
    console.log(`Running Server on port ${port}`);
});
