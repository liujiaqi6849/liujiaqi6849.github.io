;(function($){
//声明一个对象
var Barage = function(ele,userdata){
var _this = this;
this.ele = ele;
this.items = this.ele.find("li");
this.button = this.ele.find("button");
this.setting = {
		verticalmiddle:"full",
		color:["#f6e658","red","blue"],
		fontsize:16,
		opacity:1,
			}

this.data = $.extend([],this.setting,userdata);

this.setsetting();

 this.setscroll();
 this.button.on("click",function(){
 	_this.items.each(function(){$(this).stop()})
 })


}

Barage.prototype = {

	constructor:Barage,
	setsetting:function(){
		var _this = this;
		
		var winheight = document.documentElement.clientHeight || document.body.clientHeight
		
		this.items.each(function(){
			//设置随机TOP
			var randomtop = Math.floor(Math.random()*winheight)
			//设置随机颜色
			var randomcolor = Math.floor(Math.random()*_this.data.color.length)
			$(this).css({
					fontSize:_this.data.fontsize,
					color:_this.data.color[randomcolor],
					opacity:_this.data.opacity,
					left:120+"%",
					top:randomtop+"px",

					})

		})
	},
	setscroll:function(){
		var _this = this;
		this.items.each(function(i,ele){
			if(i===0){
					$(this).animate({
						left:-60+"%"
							},8000,"linear")}
			else{		
					$(this).animate({
						left:-i*20+"%"
							},40000,"linear")
				}
		})

	}


}


$.fn.Barage = function(usersetting){

	return new Barage(this,usersetting)
		
}





})(jQuery)