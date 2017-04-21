;(function($){
//声明一个对象
var Barage = function(ele,userdata){
var _this = this;
this.ele = ele;
this.list = this.ele.find("ul");
this.items = this.ele.find("li");
this.text = this.ele.find("input[type='text']");
this.btn = this.ele.find("input[type='submit']");
this.setting = {
		verticalmiddle:"full",
		color:["#ef5b9c","#f58f98","#f47920","#f58220","#a3cf62","#2a5caa","#45b97c","#00a6ac"],
		fontsize:16,
		opacity:1,
		speed:"7s",
			}

this.data = $.extend([],this.setting,userdata);

this.setsetting();
this.setinput();
this.setscroll();





}

Barage.prototype = {

	constructor:Barage,
	setsetting:function(){
		var _this = this;
		
		var winwid = document.documentElement.clientWidth || document.body.clientWidth;
		
		var lasttop = "";

		this.items.each(function(i,e){
			//设置随机TOP
			var randomtop = Math.floor(Math.random()*9)*10;
			//设置避免后一个top与前面一样
			 if(lasttop === randomtop){randomtop = (lasttop===90)?lasttop-=10 : lasttop+=10}

			//设置随机颜色
			var randomcolor = Math.floor(Math.random()*_this.data.color.length)
			$(this).css({
					fontSize:_this.data.fontsize,
					whiteSpace:"nowrap",
					zIndex:999,
					color:_this.data.color[randomcolor],
					opacity:_this.data.opacity,				
					top:randomtop+"%",


					})
			lasttop = randomtop;

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
		var _this = this;
		var whiteprompt = "┗|｀O′|┛填充弹药喂";
		var promptinit =_this.text.attr("placeholder");	
		var lasttop = "";

		
		

		//焦点事件
		_this.text.focus(function(){
		_this.text.attr("placeholder",promptinit)
		$(this).css({color:"#000",textAlign:"left"})
			if( this.value == whiteprompt){
					this.value = "";
					
					}
					});

		//biu~~~发送弹幕
		function sendbarage(){
					
					//为空的情况
					if(_this.text.val() === "" || _this.text.val() === whiteprompt){

						_this.text.attr("placeholder",whiteprompt)
						
						_this.text.css({
									textAlign:"center",
						 				})
					}
					//发送弹幕
					else{
						_this.list.append("<li>"+_this.text.val()+"</li>");
						
						setnewbarage()
						_this.text.val("")
						

					}
					

		}
		_this.text.keypress(function(){
				if(event.keyCode == 13 ){sendbarage()}
					else{
						_this.text.css({
									textAlign:"left",
						 				})
						_this.text.attr("placeholder",promptinit)
				}
			}
		);


		_this.btn.click(function(){sendbarage()})

		//弹幕新设置函数
		function setnewbarage(){
			//改变了DOM结构 不能使用之前获取的DOM对象
			var  lists = $(".barage").find("li");
			var newele = $(lists[lists.length-1]);
	
			var randomcolor = Math.floor(Math.random()*_this.data.color.length);
			var randomtop = Math.floor(Math.random()*9)*10;
			var wid=0;
			 if(lasttop === randomtop){randomtop = (lasttop===90)?lasttop-=10 : lasttop+=10}
			newele.css({
						fontSize:_this.data.fontsize,
						whiteSpace:"nowrap",
						zIndex:999,
						position:"absolute",
						color:_this.data.color[randomcolor],
						opacity:_this.data.opacity,
						left:100+"%",
						top:randomtop+"%",
						border:"2px solid #fff",								
						})
			
			lasttop = randomtop;
			 wid = newele.width()
			newele.css({
					left:-wid-4+"px",
					transition:"all "+_this.data.speed+ " linear " +"0s",
						})

		}

	},
	


}


$.fn.Barage = function(usersetting){

	return new Barage(this,usersetting)
		
}





})(jQuery)