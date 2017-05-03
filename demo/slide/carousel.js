

// 1.封装函数，第一步放在匿名函数自执行里
// 2.jquery传递进去,主要为了使用jquery语法
;(function($){

//3.定义函数的形式  定义这个类型

var Carousel = function(postimg){
	//alert(a)
	var _this = this;
	this.postimg = postimg;     //拿到传起来的dom来进行dom操作
	this.postimg_ul = postimg.find("ul");
	this.items = this.postimg_ul.find("li");
	this.firstli = this.items.eq(0);
	this.lastli = this.items.last();
	this.prevbtn = this.postimg.find("#prevbtn");
	this.nextbtn = this.postimg.find("#nextbtn");
	this.btn = this.postimg.find("a");
	this.animatetrue = true;
	

	//默认配置参数
	this.setting = {
					"width":1000,     	//幻灯片的宽度
					"height":500,	 	//幻灯片的宽度
					"imgwidth":600,		//第1帧图片的宽度
					"imgheight":300,	//第1帧图片的高度
					"scale":0.8,		//图片之间比例
					"speed":500,		//切换速度
					"vertical":"middle" //对齐方式
					}
	this.backgroundcc = [
					"red",
					"yellow",
					"green",
					"gray",
						] 
	$.extend(this.setting,this.getsetting())  //扩展默认值，刷新默认设置

	//console.log(this.getsetting())
	this.setsettingValue()       //设置默认值
	this.setotherli()
	//绑定按钮事件
	this.prevbtn.click(function(){
		if(_this.animatetrue){
		_this.setscrollanimate("prev")
		_this.animatetrue = false;

		}
		
	})

	this.nextbtn.click(function(){
		if(_this.animatetrue){
		_this.setscrollanimate("next")
		_this.animatetrue = false;

		}
	
	})
	this.btn.hover(function(){clearInterval(_this.auto)},
				function(){_this.autoanimate()}
					)
				
	
	//设置自动滚动动画
	this.autoanimate()
}

Carousel.prototype = {
	constructor : Carousel ,  //因为原型指向了{} 也就是object所以constructor属性发生改变
	//获取人工配置参数
	 getsetting : function(){
	 	var setting =this.postimg.attr("data-setting")
	 	if(setting && setting !== ""){
	 		
			return 	$.parseJSON(setting)
	 	}
	 	else{

	 		return {}
	 	}

	},
	//设置配置参数去控制基本的宽高
	setsettingValue:function(){

		var firstleft = (this.setting.width - this.setting.imgwidth )/2;
		var otherli = this.items.slice(1).size()/2


		this.postimg.css({
 					
 					width:this.setting.width,
 					height:this.setting.height,


					})

		this.postimg_ul.css({
						width:this.setting.width,
						background:"red",
						
							})
		this.firstli.css({
						width:this.setting.imgwidth,
						height:this.setting.imgheight,
						left:firstleft + "px",
						background:"green",
						zIndex:otherli+1,

						})
		this.prevbtn.css({
					position:"absolute",
					top:0,
					left:0,
					width:firstleft,
					height:this.setting.imgheight,
					lineHeight:this.setting.imgheight+"px",
					zIndex:otherli+1,
						})
		this.nextbtn.css({
					position:"absolute",
					top:0,
					left:this.setting.imgwidth + firstleft +"px",
					width:firstleft,
					height:this.setting.imgheight,
					lineHeight:this.setting.imgheight+"px",
					zIndex:otherli+1,
						})

	},
	//设置列表其他项参数
	setotherli : function(){
			var _this = this;
			var firstleft = (this.setting.width - this.setting.imgwidth )/2
			//设置左边参数
			var leftnum = this.items.slice(1).size()/2
			var leftotherli = this.items.slice(1,leftnum+1)
			var rw = _this.setting.imgwidth,
				rh = _this.setting.imgheight,
				gap = firstleft/leftotherli.size(),
				j = leftotherli.size(),
				op = 1
				//设置右边参数
			var rightotherli = this.items.slice(leftnum+1);

			function setotherli(obj,posi){
				if(posi === "left"){
				obj.each(function(i,ele){
					rw = rw * _this.setting.scale;
					rh = rh * _this.setting.scale;
					// op = op * _this.setting.scale;

					$(this).css({
								width : rw,
								height : rh,
								background:_this.backgroundcc[i],
								left:firstleft +_this.setting.imgwidth + gap*++i - rw + "px",
								zIndex:j--,
								top:(_this.setting.imgheight -rh)/2, 
								// opacity:op,

									})

						}

						)}
				else{
					lw = leftotherli.last().width();
					lh = leftotherli.last().height();
					gap = firstleft/rightotherli.size();
					j = rightotherli.size();
					// op = leftotherli.last().css("opacity");

					obj.each(function(i,ele){
						
						$(this).css({
								width : lw,
								height : lh,
								background:_this.backgroundcc[i],
								left:gap*i  + "px",
								zIndex:++i,
								top:(_this.setting.imgheight - lh)/2, 
								// opacity:op

									})

							lw = lw / _this.setting.scale;
							lh = lh / _this.setting.scale;
							op = op / _this.setting.scale;
					
						})
					
					}
				
			}
			


		setotherli(leftotherli,"left")
		setotherli(rightotherli,"right")

	},
	//滚动动画
	setscrollanimate:function(dir){
		var _this = this;
	
		this.items.each(function(){
			if(dir === "prev"){var previtem = $(this).prev("li").get(0)?$(this).prev():_this.lastli;}
			else{var previtem = $(this).next("li").get(0)?$(this).next():_this.firstli;}
			
			var wd = previtem.css("width"),
				he = previtem.css("height"),
				zi = previtem.css("zIndex"),
				le = previtem.css("left"),
				op = previtem.css("opacity"),
				tp = previtem.css("top");
				
				$(this).animate({
						width:wd,
						height:he,
						zIndex:zi,
						left:le,
						opacity:op,
						top:tp
							},_this.setting.speed,function(){
								_this.animatetrue = true;

							})


		})
		


	},
	//动画函数
	autoanimate:function(){
				var _this = this;
			this.auto = setInterval(function(){_this.setscrollanimate()},5000)
	}
	

}



//other方法
// Carousel.init = function(obj){
// 		var _this = this;
// 		obj.each(function(){

// 			new _this($(this));
// 		})
// }

$.fn.Carousel = function(){
	
		return this.each(function(){
			new Carousel($(this))
		})
}
//other方法
//4.这是闭包无法访问这个类 所以全局注册一下
// window["Carousel"] = Carousel;

})(jQuery)