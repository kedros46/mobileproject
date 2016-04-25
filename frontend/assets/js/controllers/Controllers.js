/**
 * Created by brecht on 18/04/2016.
 */
app.controller("mainCtrl", ['$scope', '$http', function($scope){
    $scope.headerTitle = "Be Connected"

}]);

app.controller("registerCtrl", function($scope, $http){
    $scope.headerTitle = "Sign Up";

    $scope.persoon = {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        gender: "",
        birthday: new Date()
    };

    $scope.formprogress = {
        page: 1,
        password: {
            ctrlPassword: "",
            checkPasswords: function(){

                if($scope.ctrlPassword === $scope.password){
                    this.valid = true;
                }
                else this.valid = false;
            },
            valid: false
        },
        continue: function(){if(this.page <=2) this.page +=1 ;},
        goBack: function(){if(this.page >=2) this.page -=1 ;}
    };

    $scope.print = function(e){
        e.preventDefault();
        console.log($scope.persoon);
        console.log($scope.formprogress.password)
    };

    $scope.register = function(){
        $http({
            method: "POST",
            url: "backend/handle-request.php/register",
            data: {persoon: $scope.persoon}
        }, function succes(){
            console.log("succes");
            location.href = "#/home"
        }, function fail(){

        });
    };







});
app.controller("loginCtrl", function($scope){
    $scope.headerTitle = "Login";
    $scope.showForm = false;

    $scope.login = function(){

    }
});

app.controller("mymedia", function($scope){
    $scope.headerTitle = "My Media";
    $scope.media = {
        img: "assets/images/favicon.ico",
        title: "Facebook"
    }

    $scope.swipeLeft = function(){
        console.log("swiped");
    }
    // API voor social media!
});

app.controller("newmedia", function($scope){
    $scope.headerTitle = "New Media";

    $scope.media = {
        img: "assets/images/favicon.ico",
        title: "Facebook",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut, nobis."
    }
});

