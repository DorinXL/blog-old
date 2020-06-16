/*相恋时间*/
var lovetime = document.getElementById('lovetime');
var mylovetime = Date.parse("May 18,2020");
setInterval(function () {
	var date = new Date();
	var loveminute = (date.getTime() - mylovetime) / 1000 / 60;
	var lovesecond = (date.getTime() - mylovetime) / 1000 % 60;
	lovetime.textContent = "已相恋" + parseInt(loveminute) + "分钟" + parseInt(lovesecond) + "秒";
}, 1000);


