/**
 * Created by brecht on 18/04/2016.
 */
app.controller("mainCtrl", ['$scope', '$http', function($scope){
    $scope.headerTitle = "Be Connected";

    $scope.user = {
        loggedin: false,
        id: localStorage.getItem("user-id"),
        email: localStorage.getItem("user-email"),
        firstname: localStorage.getItem("user-fname"),
        profilepic: "https://pixabay.com/static/uploads/photo/2012/04/26/19/47/man-42934_960_720.png",
        password: "",
        rememberme: true
    };

    $scope.openMenu = function(){
        console.log("opening side menu");
        $("#sidenav").addClass("open");
    };

    $scope.closeMenu = function(){
        $("#sidenav").removeClass("open");
    };

    $scope.logout = function(){
        $scope.user.loggedin = false;
        $scope.user.id = -1;

        location.href = "#/home";
    }
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
                $scope.formprogress.password.valid =
                    $scope.formprogress.password.ctrlPassword === $scope.persoon.password;

            },
            valid: true
        },
        goNext: function(){
            if(this.page <=2 && this.password.valid){
                this.page +=1 ;
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
                firstname:  persoon.firstname,
                lastname:   persoon.lastname,
                email:      persoon.email,
                password:   persoon.password,
                gender:     persoon.gender,
                birthday:   persoon.birthday
            }
        }).done(function successCallback(response) {
            location.href = "#/home";

            localStorage.setItem("email", persoon.email);
        }).fail( function errorCallback(response) {
            console.log("fail", response);

        });
    };

    //listen to shake event
    var shakeEvent = new Shake({threshold: 15});
    shakeEvent.start();
    window.addEventListener('shake', function(){
        $scope.cancel();
        location.reload(true);
    }, false);

    //stop listening
    function stopShake(){
        shakeEvent.stop();
    }

    //check if shake is supported or not.
    if(!("ondevicemotion" in window)){alert("Not Supported");}

    function orientationevent(e) {
        console.log(e);
        console.log(e.alpha, e.beta, e.gamma);


        //if turned upside down => cancel
    }

    window.addEventListener("deviceorientaton", orientationevent, false);
});
app.controller("loginCtrl", function($scope){
    $scope.headerTitle = "Login";
    $scope.showForm = false;

    $scope.init = function(){
        console.log(JSON.parse(localStorage.getItem("user")));

        if(localStorage.getItem("user") != null){
            $scope.user.email = JSON.parse(localStorage.getItem("user"))["email"];
        }
    };

    $scope.error = {
        status: false,
        message: ""
    };

    $scope.requestlogin = function(){
        var _user = $scope.user;
        $.ajax({
            method: "POST",
            url: "../backend/handle-request.php/requestLogin",
            data: {
                email: _user.email,
                password: _user.password
            }
        }).done(function(response) {
            response = JSON.parse(response);
            $scope.handleLogin(response);

        }).fail(function(response) {
            console.log("fail", response);
            $scope.error.status = true;
            $scope.error.message = "Failed to connect";
        });

        $scope.handleLogin = function(data){
            console.log(data);
            if( data[0] != null ){
                $scope.user.id = data[0]["id"];
                $scope.user.firstname = data[0]["firstname"];
                $scope.user.loggedin = true;
                $scope.error.status = false;
                $scope.error.message = "";
                console.log($scope.user);

                if($scope.user.rememberme){
                    localStorage.setItem("user-id", $scope.user.id);
                    localStorage.setItem("user-email", $scope.user.email);
                    localStorage.setItem("user-fname", $scope.user.firstname);
                }

                location.href = "#/myMedia";
            }
            else {
                $scope.error.status = true;
                $scope.error.message = "Username or Password incorrect";
            }
        }
    };
});







