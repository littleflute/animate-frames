(function(jQuery){
	var defaults = {
		numFrames : 2,
		offset : 'horizontal',
		fps : 60,
		randomFirstFrame : false,
		loops : 0,
		callback : null
	};
	var toAnimate = [];
	jQuery.fn.animateFrames = function(settings){
		var config = $.extend({}, defaults, settings);
		$(this).each(function(){
			var lastFrameTime = new Date();
			var elm = $(this);
			var frameNum = config.randomFirstFrame ? Math.floor(Math.random() * config.numFrames) : 0;
			var width = elm.width();
			var height = elm.height();
			var loop = 0;
			var doFrame = function(){
				var bgX, bgY;
				var now = new Date();
				var elapsed = now.getTime() - lastFrameTime.getTime();
				if(elapsed > 1000/config.fps){
					frameNum++;
					if(frameNum >= config.numFrames){
						loop++;
						if(config.loops == 0 || loop < config.loops){
							frameNum = 0;
						}else{
							if(config.callback){
								config.callback();
							}
							toAnimate.remove(doFrame);
							elm.unbind("stopAnimation");
							return;
						}
					}
					if(config.offset == 'horizontal'){
						bgX = -width * frameNum;
						bgY = 0;
					}else if(typeof(config.offset) == 'object'){
						var x = frameNum % config.offset.x;
						bgX = -width * x;
						bgY = -height * Math.floor(frameNum / config.offset.y);
					}else{
						bgX = 0;
						bgY = -height * frameNum;
					}
					elm.css('background-position',bgX + 'px ' + bgY + 'px');
					lastFrameTime = now;
				}
			};
			elm.parent().bind('DOMNodeRemoved',function(e){
				if(e.target == elm.get(0)){
					toAnimate.remove(doFrame);
				}
			});
			elm.bind("stopAnimation", function(){
				toAnimate.remove(doFrame);
				elm.css('background-position','0 0');
				elm.unbind("stopAnimation");
			});
			if(toAnimate.length == 0){
				requestAnimationFrame(updateFrame);
			}
			toAnimate.push(doFrame)
		});
	};
	var updateFrame = function(){
		if(toAnimate.length > 0){
			for(var i=0;i<toAnimate.length;i++){
				toAnimate[i]();
			}
			requestAnimationFrame(updateFrame);
		}
	}
})(jQuery);
