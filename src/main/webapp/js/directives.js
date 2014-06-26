'use strict';

angular.module('demoApp.directives', []).directive('disabler', function($compile) {
  return {
        link: function(scope, elm, attrs) {
        var btnContents = $compile(elm.contents())(scope);
        scope.$watch(attrs.ngModel, function(value) {
        if (value) {
          scope.initial_value = elm.attr('value');
          elm.attr('value', scope.$eval(attrs.disabler));
          setTimeout(function(){
      		    elm.attr('disabled',true);
	    	  }, 0);
        } else {
              elm.attr('value', scope.initial_value);
              elm.attr('disabled',false);
              }
          });
        }
	}
}).directive('xref',function($route, $location){
  return {
    link: function(scope, elm,attr){
      elm.on('click',function(){
        if ( $location.path() === attr.xref ) {
          $route.reload();
        } else {
          scope.$apply(function(){
            $location.path(attr.xref);
          });
        }      
      });
    }
  };
});