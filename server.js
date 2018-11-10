/*******************************************************************************************************************
THIS IS OUR MAIN SERVER FILE. SERVERS LISTEN AND RESPOND TO REQUESTS, SO WE'RE GOING TO BUILD A SERVER USING
NODE/EXPRESS TO DO JUST THAT.
*******************************************************************************************************************/

// MAKE SURE TO INSTALL AND SAVE THESE TO YOUR PACKAGE.JSON FILE!
import express from "express";
import { urlencoded } from "body-parser";
const MongoClient = require ("mongodb").MongoClient;

// THIS IS WHERE WE INITIALIZE AN INSTANCE OF EXPRESS.
const app = express();

//LISTENING ON SPECIFIED PORT.
const port = process.env.PORT || 8000;

//BODY-PARSER MIDDLEWARE FOR URL-ENCODED REQUESTS COMING IN.
app.use(urlencoded({ extended: true }))


//SETTING UP OUR MONGODB CLIENT AND CONNECTING TO OUR DATABASE
MongoClient.connect("mongodb-url", (err, database) => {
    //ERROR HANDLER
    if (err) return console.log(err);
    // APP.LISTEN TAKES A PORT NUMBER TO LISTEN TO, AND A CALLBACK FUNCTION THAT EXECUTES WHEN THAT PORT IS ACCESSED.
    app.listen(port, () => {
        console.log(`Server listening on ${port}`);
    })
    //CALL API FUNCTIONS AND PASS IN OUR MONGODB DATABASE AS AN ARGUMENT
    apiRoutes(database);
})

//FUNCTION TO PASS IN OUR DATABASE AS A PARAMETER INTO OUR API ROUTES
function apiRoutes (db) {

    //POST METHOD (CREATE)
    app.post("/post", (req, res) => {
        console.log(req.body);
        db.collection("mycollection").insert({}, (err, result) => {
            if (err) {
                res.send(`An Error has occured: ${err}`);
            } else {
                res.send(result);
            }
        })
    })

    //GET METHOD (READ)
    app.get("/get/:id", (req, res) => {
        console.log(req.body);
        const id = req.params.id;
        db.collection("mycollection").findOne({}, (err, item) => {
            if (err) {
                res.send(`An Error has occured: ${err}`);
            } else {
                res.send(item);
            }
        })
    })

    //PUT METHOD (UPDATE)
    app.put("/put/:id", (req, res) => {
        console.log(req.body);
        const id = req.params.id;
        db.collection("mycollection").update({}, {}, (err, item) => {
            if (err) {
                res.send(`An Error has occured: ${err}`);
            } else {
                res.send(item);
            }
        })
    })

    //DELETE METHOD (DELETE)
    app.delete("/delete/:id", (req, res) => {
        console.log(req.body);
        const id = req.params.id;
        db.collection("mycollection").remove({}, (err, item) => {
            if (err) {
                res.send(`An Error has occured: ${err}`);
            } else {
                res.send(`Item ${id} deleted.`);
            }
        })
    })
}
