//required modules
var express = require("express");
var bodyParser = require("body-parser");
var session	=	require('express-session');
var fs = require("fs");

//set up our express app object
var app = express();

//global variables
var port = 8807;

//configure our middleware
app.use(express.static("myStatic")); // contains html, css and images
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
				secret:	'crmorytp8vyp98p%&ADIB66^^&fjdfdfaklfdhf',
				resave:	false,
				saveUninitialized:	true,
				cookie:	{	maxAge:	60000*11000	}
}));


app.use(express.static("public"));
// app.set("views", "myTemplates");
app.set("view engine", "html");
app.engine('html', require('ejs').renderFile);




//make the app listen for request
app.listen(port); //listen on that port
console.log("Server running on http://localhost:"+port);


//------- WRITTING JSON -----------------//
//Setting json Q1
const dataFile = "./myjsonfile.json";
var word = fs.readFileSync("myjsonfile.json");
var data = JSON.parse(word); // this makes readable ths things
console.log(dataFile);
console.log(data);


// First question
app.post("/question1", function(request, response) {
     //check the credentials
    var firstname = request.body.name;
    console.log(firstname); //WORKING
    // TO DO: the firstname into an object then write it to json file
		fs.readFile( dataFile, function read(err, data) {
		    if (err) {
		        throw err;
						console.log("error readfile");
		    }
		    dataObj = JSON.parse(data); // transform the JSON file into a readable thing to humans
				console.log(dataObj);
				dataObj = [
					  {
					    "name": firstname,
					  }]
					; // WORKING
				//dataObj.name.push({id: 2, square:3});
		    //console.log(dataObj);
				console.log(dataObj);

		    fs.writeFile("./myjsonfile.json", JSON.stringify(dataObj), function(err) {
		        if(err) {
		            return console.log(err);
		        }
							console.log("Json has been updated")
		    });
		});
	  response.redirect("ad/ads1.html");
});

// Question 2 -- ELEGANT FORM BUT NOT WORKING
/*app.post("/question2", function(request, response) {
     //check the credentials
    var gender = request.body.gender;
    console.log(gender); //WORKING
    // TO DO: the firstname into an object then write it to json file
		fs.readFile( dataFile, function read(err, data) {
		    if (err) {
		        throw err;
						console.log("error readfile");
		    }
		    dataObj = JSON.parse(data); // transform the JSON file into a readable thing to humans
				console.log(dataObj);
				dataObj.gender = gender
					  //{
					  //  "gender": gender,
					  //}
					; // WORKING
				//dataObj.name.push({id: 2, square:3});
		    //console.log(dataObj);
				console.log(dataObj);

		    fs.writeFile("./myjsonfile.json", JSON.stringify(dataObj), function(err) {
		        if(err) {
		            return console.log(err);
		        }
							console.log("Json has been updated")
		    });
		});
	  response.redirect("ad/ads1.html");
});*/


//Setting JSON Q2
const dataFile2 = "./myjsonfileq2.json";
var word2 = fs.readFileSync("myjsonfile.json");
var data2 = JSON.parse(word); // this makes readable ths things
console.log(dataFile2);
console.log(data2);

// Second question
app.post("/question2", function(request, response) {
     //check the credentials
    var gender = request.body.gender;
    console.log(gender); //WORKING
    // TO DO: the firstname into an object then write it to json file
		fs.readFile( dataFile2, function read(err, data) {
		    if (err) {
		        throw err;
						console.log("error readfile");
		    }
		    dataObj = JSON.parse(data); // transform the JSON file into a readable thing to humans
				console.log(dataObj);
				dataObj = [
					  {
					    "gender": gender,
					  }
					]; // WORKING
				//dataObj.name.push({id: 2, square:3});
		    //console.log(dataObj);
				console.log(dataObj);

		    fs.writeFile("./myjsonfileq2.json", JSON.stringify(dataObj), function(err) {
		        if(err) {
		            return console.log(err);
		        }
							console.log("Json has been updated")
		    });
		});


	  response.redirect("final.html");
});

// FINAL AND DELETING DATA
app.post("/delete", function(request, response) {
    //JSON name
		fs.readFile( dataFile, function read(err, data) {
		    if (err) {
		        throw err;
						console.log("error readfile");
		    }
		    dataObj = JSON.parse(data); // transform the JSON file into a readable thing to humans
				console.log(dataObj);
				dataObj = [
					  {

					  }]
					; // WORKING
				//dataObj.name.push({id: 2, square:3});
		    //console.log(dataObj);
				console.log(dataObj);

		    fs.writeFile("./myjsonfile.json", JSON.stringify(dataObj), function(err) {
		        if(err) {
		            return console.log(err);
		        }
							console.log("Json has been updated")
		    });
		});
		//JSON gender
		fs.readFile( dataFile2, function read(err, data) {
				if (err) {
						throw err;
						console.log("error readfile");
				}
				dataObj = JSON.parse(data); // transform the JSON file into a readable thing to humans
				console.log(dataObj);
				dataObj = [
						{

						}
					]; // WORKING
				//dataObj.name.push({id: 2, square:3});
				//console.log(dataObj);
				console.log(dataObj);

				fs.writeFile("./myjsonfileq2.json", JSON.stringify(dataObj), function(err) {
						if(err) {
								return console.log(err);
						}
							console.log("Json has been updated")
				});
		});
	  response.redirect("index.html");
});


/*  dont know what this work
app.post("/question-2", function (req, res) {
  var firstname = request.session.name;
  response.redirect("/index.ejs");


}); */

// -------- GET SECTION ----------------//

// Question 2
app.get("question-2.html",  function (req, res) {
	res.redirect("question-2.ejs", {"sex": req.body.name} );
}
);
