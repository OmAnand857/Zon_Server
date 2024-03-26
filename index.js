/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const express=require("express");
const cors=require("cors");
const stripe =  require("stripe")('sk_test_51Oqg2NSHOjhcLLUqhXbsSVifJJPqH9hdiqiIN9EexqykH39N2Xshs6BhzKuR1C9Ns1Y1me21FioVjXAgm5d6LJM0003mB3SIMs');

//API



//APICONFIG
const app=express();


//MIDDLEWARE
app.use(cors({origin:true}));
app.use(express.json());



//API ROUTES
app.get("/",(request,response)=>{
    response.status(200).send("hello world");
})
app.post('/payments/create',async(request,response)=>{
    const total=request.query.total;
   console.log('payment Request received BOOM!!! for this amout>>>',total)

  
         const paymentIntent =await stripe.paymentIntents.create({
        description: 'Software development services',
        shipping: {
          name: 'Jenny Rosen',
          address: {
            line1: '510 Townsend St',
            postal_code: '98140',
            city: 'San Francisco',
            state: 'CA',
            country: 'US',
          },
        },
        amount:total,
        currency:"inr",
    });
    const customer = await stripe.customers.create({
        name: 'Jenny Rosen',
        address: {
          line1: '510 Townsend St',
          postal_code: '98140',
          city: 'San Francisco',
          state: 'CA',
          country: 'US',
        },
      });
    console.log(paymentIntent);
    response.status(201).send({
        clientSecret:paymentIntent.client_secret,
    })
  


  
  
  }
  
    
)
//LISTEN COMMANDS
app.listen(3000,(req,res)=>{
  console.log('Your Server is Listening on Port 3000');
})