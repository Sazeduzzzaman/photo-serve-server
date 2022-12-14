const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

// middleware 
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kystxht.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const servicesCollection = client.db('photo-serve').collection('services');
        const bookingCollection = client.db('photo-serve').collection('booking');
        const reviewCollection = client.db('photo-serve').collection('review');
        const customerCollection = client.db('photo-serve').collection('customerService');
        const userServiceBookingCollection = client.db('photo-serve').collection('usrServiceBooking');


        // get service  Data 
        app.get('/services', async (req, res) => {
            const query = {}
            const cursor = servicesCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })
        // get limited  Data 
        app.get('/services-limit', async (req, res) => {
            const query = {}
            const cursor = servicesCollection.find(query).limit(3);
            const services = await cursor.toArray();
            res.send(services);
        })
        // get service Data with id
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const find = { _id: ObjectId(id) }
            const service = await servicesCollection.findOne(find);
            res.send(service)
        })



        // get All booking Data
        app.get('/booking', async (req, res) => {
            console.log();
            let query = {}
            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const cursor = bookingCollection.find(query);
            const booking = await cursor.toArray();
            res.send(booking)
        })
        // get booking Data With Id
        app.get('/booking/:id', async (req, res) => {
            const id = req.params.id;
            const find = { _id: ObjectId(id) }
            const service = await servicesCollection.findOne(find);
            res.send(service)
        })
        // delete booking Data With Id
        app.delete('/booking/:id', async (req, res) => {
            const id = req.params.id;
            const find = { _id: ObjectId(id) }
            const result = await bookingCollection.deleteOne(find);
            res.send(result);
        })
        // Post booking Data
        app.post('/booking', async (req, res) => {
            const booking = req.body;
            const result = await bookingCollection.insertOne(booking);
            console.log(result)
            res.send(result);
        })
        // get booking Data With query Id
        app.get('/booking', async (req, res) => {
            console.log();
            let query = {}
            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const cursor = bookingCollection.find(query);
            const booking = await cursor.toArray();
            res.send(booking)
        })




        // post review Data
        app.post('/review', async (req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review)
            console.log(result);
            res.send(result)
        })
        app.delete('/review/:id', async (req, res) => {
            const id = req.params.id;
            const find = { _id: ObjectId(id) }
            const result = await reviewCollection.deleteOne(find);
            res.send(result);
        })
        // get review Data With query Id 
        app.get('/review', async (req, res) => {
            let query = {}
            if (req.query.reviewId) {
                query = {
                    reviewId: req.query.reviewId
                }
            }
            const cursor = reviewCollection.find(query)
            const review = await cursor.toArray();
            res.send(review)
        })
        // get All review Data With query 
        app.get('/all-review', async (req, res) => {
            let query = {}
            console.log(req.query.email)
            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const cursor = reviewCollection.find(query)
            const review = await cursor.toArray();
            res.send(review)
        })


        // Post user service booking Data 
        app.post('/user-service-booking', async (req, res) => {
            const usrServiceBooking = req.body;
            const result = await userServiceBookingCollection.insertOne(usrServiceBooking)
            res.send(result)
        })
        // get user service booking Data 
        app.get('/user-service-booking', async (req, res) => {
            const find = {}
            const cursor = userServiceBookingCollection.find(find);
            const usrServiceBooking = await cursor.toArray();
            res.send(usrServiceBooking)
        })
        // get user service booking Data with id
        app.get('/user-service-booking/:id', async (req, res) => {
            const id = req.params.id;
            const find = { _id: ObjectId(id) }
            const result = await userServiceBookingCollection.findOne(find);
            res.send(result);
        })




        // Post user service  Data 
        app.post('/user-services', async (req, res) => {
            const userServices = req.body;
            const result = await customerCollection.insertOne(userServices)
            res.send(result)
        })
        // get user service  Data 
        app.get('/user-services', async (req, res) => {
            const find = {}
            const cursor = customerCollection.find(find);
            const userServices = await cursor.toArray();
            res.send(userServices)
        })
        // get user service  Data with id
        app.get('/user-services/:id', async (req, res) => {
            const id = req.params.id;
            const find = { _id: ObjectId(id) }
            const result = await customerCollection.findOne(find);
            res.send(result);
        })
        // delete user service  Data with id
        app.delete('/user-services/:id', async (req, res) => {
            const id = req.params.id;
            const find = { _id: ObjectId(id) }
            const result = await customerCollection.deleteOne(find);
            console.log(result)
            res.send(result);
        })


        // get Specific Data With query Id 
        app.get('/specific-data', async (req, res) => {
            let query = {};
            console.log(req.query.email)
            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const cursor = customerCollection.find(query);
            const review = await cursor.toArray();
            res.send(review);
        })


    }
    finally {

    }

}
run().catch(error => console.error(error))





app.get('/', (req, res) => {
    res.send('Photo-serve Api Server is Running')
})
app.listen(port, () => {
    console.log(`Photo-serve server running in ${port} `);
})


