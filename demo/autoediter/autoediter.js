;(function($){

//声明一个对象
var autoediter = function(ele,userdata){
this.ele = ele;
this.setting = {
		time:100,
		col:"false",
			};
this.data = $.extend([],this.setting,userdata);
if(this.data.col !== "false"){this.setcol()}
this.setauto()
//完成


}


autoediter.prototype = {

	constructor:autoediter,
	setcol:function(){
		var str = this.ele.text().trim();
		var hei = Math.ceil(str.length / this.data.col);
		this.ele.html("");
		str= str.replace(/[\r\n]/g, "")

		for(var i =0 ;i<this.data.col;i++){
			
			this.ele.append("<span>"+str.substring(i*hei,hei*(i+1)) +"</span>")
		}
		
		// this.ele.find("span").css({
		// 	display: "inline-block",
		// 	width:1+"em",
		// 	wordWrap:"break-word",
		// 	float:"left",
		// 	marginLeft:"2em",
		// })

	},
	setauto:function(){
		var _this= this;
		var index = 0;
		var str = this.ele.html();
		this.ele.html("");
		var auto = setInterval(function(){
				if(index<str.length){
					if(str.charAt(index) ==="<"){index+=3}
					_this.ele.html(str.substring(0,index)+"_") 
					index++ 
				}
				else{
					clearInterval(auto)
					_this.ele.html(str)
					_this.ele.parent().parent().siblings("#btn").css({display:"block"})  //那个按钮

				}
			},_this.data.time)
 
	}
}

$.fn.autoediter = function(data){
	return this.each(function(){
		new autoediter($(this),data)
	})
}

})(jQuery)