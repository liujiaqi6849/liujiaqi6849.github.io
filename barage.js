;(function($){
//声明一个对象
var Barage = function(ele,userdata){
var _this = this;
this.ele = ele;
this.items = this.ele.find("li");
this.button = this.ele.find("button");
this.text = this.ele.find("#baragetext");
this.setting = {
		verticalmiddle:"full",
		color:["#f6e658","red","blue"],
		fontsize:16,
		opacity:1,
		speed:"7s",
			}

this.data = $.extend([],this.setting,userdata);

this.setsetting();

this.setscroll();

this.setinput();





}

Barage.prototype = {

	constructor:Barage,
	setsetting:function(){
		var _this = this;
		
		var winwid = document.documentElement.clientWidth || document.body.clientWidth
		
		this.items.each(function(i,e){
			//设置随机TOP
			var randomtop = Math.floor(Math.random()*9)*10
			//设置随机颜色
			var randomcolor = Math.floor(Math.random()*_this.data.color.length)
			$(this).css({
					fontSize:_this.data.fontsize,
					color:_this.data.color[randomcolor],
					opacity:_this.data.opacity,
					left:100+"%",
					top:randomtop+"%",


					})

		})
	},
	setscroll:function(){
		var _this = this;
		var waittime = 0;
		this.items.each(function(i,ele){
					var wid = $(this).width()
					$(this).css({
						left:-wid+"px",
						transition:"all "+_this.data.speed+ " linear "+ waittime +"s",
							})
				waittime += 0.5;
		})

	},
	setinput:function(){
		
		var prompttext ="";
		this.text.focus(function(){
						prompttext = this.value;
						this.value = " ";
						$(this).css({color:"#000"})
						});
		this.text.blur(function(){
						this.value = prompttext;
						$(this).css({color:"#9e9e9e"})
						})

	},
	setbutton:function(){


		
	}


}


$.fn.Barage = function(usersetting){

	return new Barage(this,usersetting)
		
}





})(jQuery)