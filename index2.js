
 //載入套件
 let express = require("express");
 //接收post參數的套件(express 已包進來)
 let parser  = require("body-parser");
 // 初始化firebase 套件
 let admin = require("firebase-admin");

// Admin SDK 設定程式碼片段
let serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://node-test-79fb6.firebaseio.com"
});
//建立韓資料庫的連線(gobal varable)
let database = admin.database();




//建立application 物件
let app = express();

app.use(express.static("www"));

//get 處理路徑  "/calculate"
app.get("/calculate", function(req, res) {

	let num 	= req.query.number
	let result 	= num * num

	res.send("<h3>Answer : "+result+"</h3>")
});

//建立接收post 方法的能力
/*app.use(parser.urlencoded({extended:true}));
//post 處理路徑  "/calculate"
app.post("/calculate", function(req, res) {

	let num 	= req.body.number

	// insert database
	// get 路徑參考
	let ref = database.ref("/number");
	ref.set(num , function(error){
		if (error) {
			res.send("Error");
		} else {
			res.send("Ok");
		}

	});
	// let result 	= num * num

	// res.send("<h3>Answer : "+result+"</h3>")




});*/

app.use(parser.urlencoded({extended:true}));
//post 處理路徑  "/calculate"
app.post("/save", function(req, res) {

	let name 	= req.body.name
	let time 	= (new Date()).getTime();

	// insert database
	// get 路徑參考
	let ref = database.ref("/user");
	ref.set( {name : name, time : time}, function(error){
		if (error) {
			res.send("Error");
		} else {
			res.send("Ok");
		}

	});
	// let result 	= num * num

	// res.send("<h3>Answer : "+result+"</h3>")

});

app.post("/signup", function(req, res) {

	let name 		= req.body.name
	let username 	= req.body.username
	let password 	= req.body.password
	let time 		= (new Date()).getTime();

	//user add database

	//parents
	let ref = database.ref('/users');

	ref.push({name : name , username : username, password : password, time : time},function(error) {
		if (error) {
			res.send("Error");
		} else {
			res.send("Ok");
		}
	});
});

app.post("/signin", function(req, res) {

	let username 	= req.body.username
	let password 	= req.body.password

	let ref = database.ref('/users');
	//從路徑把資料取出來
	ref.orderByChild('username').equalTo(username).once("value", function(snapshot){

	let data = [];
	snapshot.forEach(function(userSnapshot) {

		let  value 	= userSnapshot.val();
		value.key 	= userSnapshot.key;

		data.push(value);
	});

	//從資料中比對密碼
	let user  = data.find(function(item){
		return item.password == password;
	});

	if (user) {
		updateUserTime(user.key);
		res.send(user);
	} else {
		res.send('failed');
	}

	//let value = snapshot.val();
	
	});
});

function updateUserTime(key) {
	let time = (new Date()).getTime();
	let ref = database.ref("/users/" + key);

	ref.update({time}, function() {

	});

}


//啟動伺服器 http://localhost:3000/
app.listen(3000, function() {

	console.log("Server Started");

}); 