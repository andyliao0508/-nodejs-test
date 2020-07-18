
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

app.use(express.static("www1"));
//express 接收post方式 (express 套件support)
app.use(parser.urlencoded({extended:true}));


app.post("/post", function(req, res) {

	 let name 		= req.body.name
	 let content 	= req.body.content
	 let time 		= (new Date()).getTime();

 let ref = database.ref('/messages');

	ref.push({name : name , content : content, time : time},function(error) {
		if (error) {
			res.send("Error");
		} else {
			res.send("Ok");
		}
	});
});


app.get("/get", function(req, res) {

	let time = parseInt(req.query.time);
	let ref = database.ref("/messages");

	ref.orderByChild("time").startAt(time).once("value", function(snapshot) {

		let data = [];
		snapshot.forEach(function(messageSnapshot) {
			data.push(messageSnapshot.val());
		});
		res.send(data);
	});


});


//啟動伺服器 http://localhost:3000/
app.listen(3000, function() {

	console.log("Server Started");

}); 