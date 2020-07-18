
// 不能使用 html dom
//載入套件
 let express = require("express");
//建立application 物件
let app = express();

//建立靜態的網頁空間
//將專案資料夾中的www 子資料夾,直接對應到網址上

/*
	ex;
	專案資料夾/www/test.html
	http://localhost:3000/test.html

	專案資料夾/www/imgs/pic.jpg

*/
//app.use(express.static("www"));

//express 的中介涵式
app.use(function(req,res,next){
	console.log('Time:', Date.now());
	next();//交給下一個處理程式
});

app.get("/", function(req, res){
	res.send("hello middleware");
});
app.get("/getInfo", function(req, res){

	let obj = {
		status: 'success',
		name: 'andy',
		phone:[{'home':'3895335'},{'mobile':'0976014052'}]
	}
	res.send(obj);
});


//處理路徑/的要求
/*app.get("/", function(req, res) {

	//node.js 利用 set 設定response header
	 res.set("X-ANDY", "Header");


	let obj ={x:2, y:4};

	res.send(JSON.stringify(obj));
	

	//res.send("<h3> my image </h3><img  src='/image'/>");
	//res.send("<h3> my image </h3>");

	//取得連線的方法
	
	console.log(req.method);
	console.log(req.ip); // ip v6
	console.log(req.hostname);

	//利用 get 取得 request header
	let  lang =req.get("Accept-Language");
	console.log(lang);

		res.send("<h3> my image </h3><img  src='/image?name=pic.jpg'/>");
		
});*/


app.get("/image", function(req, res) {

	/*//使用 req.query 參數名稱  取得http 參數
	let name = req.query.name;

	//res.send(name);
	 res.download("./"+name);
	 */

});

//使用路徑做出彈性
/*  使用 express 提供的路徑參數
	http:localhost:3000/test/pic.jpg
	http:localhost:3000/test/aaa.json
*/

/*
app.get("/test/:name", function(req, res) {

/*let path = req.path;
let name = path.replace ('/test/', "");

res.download("./"+name);


let name = req.params.name;

res.send(name);

});
*/

 //網址的組成: http://主機名稱/路徑

//啟動伺服器 http://localhost:3000/
app.listen(3000, function() {

	console.log("Server Started");

}); 

// let lib = require("./a1.js");

// lib(4,4);






