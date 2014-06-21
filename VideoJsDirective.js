var corpo = angular.module('CorpLinkz');

corpo.directive('videojs',function(){
	var directive = {};
	
	directive.restrict = 'A';
	//directive.require = 'video';
    directive.scope = {
        options: '=',
        model: '=video'
    };
	directive.replace = true;
	
	directive.link = function($scope, element, attributes) {
		$scope.scope = $scope;
        $scope.$watch("model", function(newValue) {
        	document.body.scrollTop = document.documentElement.scrollTop = 0;
        	if(newValue.status==200){
        		var timer = setTimeout(function(){
	        		var setup = {
	                        'techOrder' : ['html5', 'flash'],
	                        'controls' : true,
	                        'preload' : 'auto',
	                        'autoplay' : false,
	                        'width' : '100%'
	                };
	        		var vid = '_' + Math.random().toString(36).substr(2, 9);
	        		var str = '<video id="video'+vid+'" width="100%" height="100%"  class="video-js vjs-default-skin vjs-big-play-centered" controls preload="none" data-setup="{}" poster="'+newValue.cover+'" >';
	        		/*$.each(newValue.sources,function(index,oo){
						str+='<source src="'+oo.url+'" type="video/'+oo.type+'" />';
					});*/
	        		str+='</video>';
	        		var srcc = [];
	        		$.each(newValue.sources,function(index,oo){
						srcc[index] = {type:"video/"+oo.type, src:oo.url};
					});
	        		element.html(str);
	        		var player = videojs("video"+vid, setup, function(){
	                    var source =(srcc);
	                    this.src(source);
	                });
        		},500);
        	}else if(newValue.status==404){
        		element.html("<p style='color:#fff;font-size:12pt;padding:5px;font-weight:bolder;'>This Video Does Not Exist</p><hr><p style='color:#fff;font-size:10pt;padding:5px;'>Sorry About That</p>");
        	}else{
        		element.html("<p style='color:#fff;font-size:15pt;padding:10px;font-weight:bolder;'>Loading............</p>");
        	}
        });
	};

    return directive;
});
