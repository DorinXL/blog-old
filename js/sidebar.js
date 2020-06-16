/*关于我们侧边栏弹出*/
document.querySelector('#aboutus').addEventListener('click', function () {
	document.querySelector('#sidebar').style.right = '0';
}, false);

document.querySelector('#closebar').addEventListener('click', function () {
	document.querySelector('#sidebar').style.right = '-300px';
}, false);