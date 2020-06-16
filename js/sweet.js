var bodyWidth = parseInt(document.body.clientWidth);
var imgWidth = 400;
var colCount = parseInt(bodyWidth / (imgWidth + 20));
var l_margin = (bodyWidth - colCount * imgWidth) / (colCount + 1);
var t_margin = 10;
var imgs = document.querySelectorAll('.waterimg');


function waterfull() {
	var leftCount;
	for (var i = 0; i < imgs.length; i++) {
		leftCount = (i % colCount + 1);
		imgs[i].style.left = leftCount * l_margin + (leftCount - 1) * imgWidth + "px";
		if (i >= colCount) {
			imgs[i].style.top = parseInt(imgs[i - colCount].style.top) + parseInt(imgs[i - colCount].offsetHeight) + t_margin + "px";
		} else {
			imgs[i].style.top = t_margin + "px";
		}
	}
}

window.onload = waterfull();


