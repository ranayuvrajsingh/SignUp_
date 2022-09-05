const express=require("express");
const request=require("request");
const bodyParser=require("body-parser");
const https=require("https");

const app=express();

app.use(express.static("local"));
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req,res){
  const firstname=req.body.FName;
  const lastname=req.body.LName;
  const Email=req.body.Email;


  const data = {
   members: [
     {
       email_address: Email,
       status: 'subscribed',
       merge_fields: {
         FNAME: firstname,
         LNAME: lastname
       }
     }
   ]
 };
  const jsonData=JSON.stringify(data)
  // const url="https://usX.api.mailchimp.com/3.0/lists/40d0a8caab"
    var url="https://us18.api.mailchimp.com/3.0/lists/40d0a8caab"

    var options={
      method:"POST",
      auth:"Yuvz:b7cac882fa150e973211f29ac5f97ada-us18"
    }
   const request=https.request(url,options,function(response){
     console.log(response.statusCode);

     if (response.statusCode === 200)
     {
       res.sendFile(__dirname +"/success.html");
     }
     else
     {
       res.sendFile(__dirname +"/failure.html");

     }

    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);

  request.end();
});

app.post("/success",function(req,res){
  res.redirect("/");
})

app.post("/failure",function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT||3000,function(){
  console.log("Server is running on port 3000")
})

//api key
//b7cac882fa150e973211f29ac5f97ada-us18
 //list id
//40d0a8caab
