/**
 * Created by brecht on 18/04/2016.
 */
app.controller("mainCtrl", ['$scope', '$http', function($scope){
    $scope.headerTitle = "Be Connected";
    $scope.user = {
        loggedin: false,
        id: ""
    };
    $scope.loggedin = false;

    $scope.loadMyMedia = function(){
        $.ajax({
            method: "GET",
            url: "../backend/handle-request.php/mymedia",
            data: {
                id: $scope.user.id
            }
        }).done(function(response){
            console.log("succes", response);
        }).fail(function(response){
            console.log("fail", response)
        })
    };

    $scope.loadNewMedia = function(){
        $.ajax({
            method: "GET",
            url: "../backend/handle-request.php/newmedia"
        }).done(function(response){

        }).fail(function(response){

        })
    };
    $scope.saveUserToMedia = function(){
        $.ajax({
            method: "Post",
            url: "../backend/handle-request.php/mymedia",
            data:{
                userid: $scope.user.id,
                mediaid: 1
            }
        }).done(function(response){
            //do something - Notification
        }).fail(function(response){

        })
    };

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

    //$scope.setup = function(){
    //  var person = localStorage.getItem("form-persoon");
    //};

    $scope.formprogress = {
        page: 1,
        password: {
            ctrlPassword: "",
            checkPasswords: function(){
                $scope.formprogress.password.valid =
                    $scope.formprogress.password.ctrlPassword === $scope.persoon.password;

            },
            valid: true
        },
        goNext: function(){
            if(this.page <=2 && this.password.valid){
                this.page +=1 ;

                //localStorage.setItem("form-persoon", $scope.persoon);
        }},
        goBack: function(){if(this.page >=2) {
            this.page -=1 ;
        }}
    };

    $scope.cancel = function(){
        $scope.persoon= {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            gender: "",
            birthday: new Date()
        }
    };


    $scope.register = function(){
        var persoon = $scope.persoon;
        $.ajax({
            method: "POST",
            url: "../backend/handle-request.php/register",
            data: {
                firstname: persoon.firstname,
                lastname: persoon.lastname,
                email: persoon.email,
                password: persoon.password,
                gender: persoon.gender,
                birthday: persoon.birthday
            }
        }).done(function successCallback(response) {
            console.log("succes", response);
            location.href = "#/home";

            localStorage.setItem("email", persoon.email);
            localStorage.setItem("password", persoon.password);
        }).fail( function errorCallback(response) {
            console.log("fail", response);

        });
    };

});




app.controller("loginCtrl", function($scope){
    $scope.headerTitle = "Login";
    $scope.showForm = false;

    $scope.error = {
        status: false,
        message: ""
    };

    $scope.user = {
        email: "brecht@nonexist.com",
        password: "root",
        rememberme: true
    };

    $scope.login = function(){
        var user = $scope.user;
        console.log("logging in...");
        $.ajax({
            method: "POST",
            url: "../backend/handle-request.php/requestLogin",
            data: {
                email: user.email,
                password: user.password
            }
        }).done(function successCallback(response) {
            //response = response.substring(1, response.length-1);
            console.log(response);

            if( response[1] != "]" ){
                $scope.loggedin = true;
                $scope.error.status = false;
                $scope.error.message = "";
                location.href = "#/myMedia";
                $scope.loadMyMedia();
            }
            else {
                $scope.error.status = true;
                $scope.error.message = "Username or Password incorrect";
            }

        }).fail( function errorCallback(response) {
            console.log("fail", response);
            $scope.error.status = true;
            $scope.error.message = "Failed to connect";
        });
    };
});

app.controller("mymedia", function($scope){
    $scope.headerTitle = "My Media";
    $scope.media = {
        img: "assets/images/favicon.ico",
        title: "Facebook"
    };


    $scope.nextMedia = function(){
        console.log("swiped");
    };
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



//<script type="text/javascript" src="https://cdn.rawgit.com/alexgibson/shake.js/master/shake.js"></script>
//<script>
////listen to shake event
//var shakeEvent = new Shake({threshold: 15});
//shakeEvent.start();
//window.addEventListener('shake', function(){
//    alert("Shaked");
//}, false);
//
////stop listening
//function stopShake(){
//    shakeEvent.stop();
//}
//
////check if shake is supported or not.
//if(!("ondevicemotion" in window)){alert("Not Supported");}
//</script>
