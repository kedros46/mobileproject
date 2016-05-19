/**
 * Created by brecht on 18/04/2016.
 */
app.directive("sidenav", function(){
    return {
        restrict: 'C',
        templateUrl: "assets/js/directives/sidenav.html",
        scope: {
            name: "=",
            pic: "=",
            logout: "&"
        },
        link : function(scope, element, attrs){
            scope.open = false;

            scope.openMenu = function(){
                scope.open = true;
                console.log("opening side menu", element);
                element.addClass("open");
            };

            scope.closeMenu = function(){
                element.removeClass("open")
                scope.open = false;
            };
        }
    }
});