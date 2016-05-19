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



    $scope.logout = function(){
        $scope.user.loggedin = false;
        $scope.user.id = -1;

        location.href = "#/home";
    };

    navigator.serviceWorker.ready.then(function(){
        console.log("service worker ready");
    })
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
        valid: true,
        errormsg: "",
        password: {
            ctrlPassword: "",
            checkPasswords: function(){
                if($scope.formprogress.password.ctrlPassword !== $scope.persoon.password){
                    $scope.formprogress.setError("Not the same password");
                }else{
                    $scope.formprogress.undoError();
                }

            }
        },
        setError: function(message){
            $scope.formprogress.valid = false;
            $scope.formprogress.errormsg = message;
        },
        undoError: function(){
            $scope.formprogress.valid = true;
            $scope.formprogress.errormsg = "";
        },

        goNext: function(){
            var persoon= $scope.persoon;
            if(this.page == 1){
                if(persoon.firstname != "" && persoon.email != "" && persoon.lastname != "") {
                    this.page += 1;
                    this.undoError();
                }
                else {
                    this.setError("Fill in required fields");
                }
            }
            else if(this.page == 2){
                if(this.valid && persoon.password != "") {
                    this.page += 1
                    this.undoError()
                }
                else{
                    this.setError("Fill in password first!")
                }
            }

        },
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
        };
        location.href = "#/home";
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


    //check if shake is supported or not.
    if(!("ondevicemotion" in window)){alert("Shake not supported");}
    else {

        //listen to shake event
        var shakeEvent = new Shake({threshold: 15});
        shakeEvent.start();
        window.addEventListener('shake', function(){
            $scope.cancel();
            location.reload(true);
            navigator.vibrate(100);
            new Audio("../assets/sounds/Drop.mp3").play();

        }, false);
    }

    function stopShake(){
        shakeEvent.stop();
    }


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
            },
            timeout: 5000
        }).done(function(response) {
            console.log(response);
            response = JSON.parse(response);
            $scope.handleLogin(response);

        }).fail(function(response) {
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

app.controller("settingsCtrl", function($scope){
    $scope.headerTitle = "Settings";

    $scope.settings = {
        pushable: true,
        push_notifications: false
    };

    $scope.profile = {
        updatePass: function(){
            //should be an ajax call
            // out of scope
            this.message = "out of scope"
        },
        message: ""
    }


});







