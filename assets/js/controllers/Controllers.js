/**
 * Created by brecht on 18/04/2016.
 */
app.controller("mainCtrl", ['$scope', '$http', function($scope, $http){
    $scope.headerTitle = "Be Connected"

}]);

app.controller("registerCtrl", function($scope){
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
        continue: function(e){e.preventDefault(); this.page +=1 ;}
    };

    $scope.print = function(e){
        e.preventDefault();
        console.log($scope.persoon);
        console.log($scope.formprogress.password)
    }



});

app.controller("myMedia", function($scope){
    $scope.headerTitle = "My Media";
    $scope.media = {
        img: "missing.jpg",
        title: "facebook"
    }
});

app.controller("newMedia", function($scope){
    $scope.headerTitle = "New Media";

    $scope.media = {
        description: "lorem"
    }
});

