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
        gender: localStorage.getItem("user-gender"),
        profilepic: "",
        password: "",
        rememberme: true
    };



    $scope.logout = function(){
        $scope.user.loggedin = false;
        $scope.user.id = -1;

        location.href = "#/home";
    };
}]);

app.controller("registerCtrl", function($scope){
    $scope.headerTitle = "Sign Up";

    $scope.persoon = {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        gender: 1,
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
                    this.page += 1;
                    this.undoError()
                }
                else{
                    this.setError("Fill in password first!")
                }
            }
            new Audio("assets/sounds/Drop.mp3").play();
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
    $scope.registering = function(){

        $.ajax({
            method: "POST",
            url: "../backend/handle-request.php/register",
            data: {
                firstname:  $scope.persoon.firstname,
                lastname:   $scope.persoon.lastname,
                email:      $scope.persoon.email,
                password:   $scope.persoon.password,
                gender:     $scope.persoon.gender,
                birthday:   $scope.persoon.birthday
            }
        }).done(function successCallback(response) {
            location.href = "#/home";
            localStorage.setItem("email", $scope.persoon.email);
        }).fail( function errorCallback(response) {
            $scope.setError("Connection failed");
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
            new Audio("assets/sounds/Drop.mp3").play();

        }, false);
    }


});


app.controller("loginCtrl", function($scope){
    $scope.headerTitle = "Login";
    $scope.showForm = true;

    $scope.init = function(){
        if(localStorage.getItem("user") != null){
            $scope.user.email = JSON.parse(localStorage.getItem("user"))["email"];
        }
    };

    $scope.error = {
        status: false,
        message: ""
    };

    $scope.requestlogin = function(){
        $.ajax({
            method: "POST",
            url: "../backend/handle-request.php/requestLogin",
            data: {
                email: $scope.user.email,
                password: $scope.user.password
            },
            timeout: 2000
        }).done(function(response) {
            $scope.handleLogin(JSON.parse(response));

        }).fail(function(response) {
            $scope.error.status = true;
            $scope.error.message = "Failed to connect";
        });

        $scope.handleLogin = function(data){
            if( data[0] != null ){
                $scope.user.loggedin = true;
                $scope.user.id = data[0]["id"];
                $scope.user.firstname = data[0]["firstname"];
                $scope.user.gender = data[0]["gender"];

                $scope.error.status = false;
                $scope.error.message = "";

                if($scope.user.rememberme){
                    localStorage.setItem("user-id", $scope.user.id);
                    localStorage.setItem("user-email", $scope.user.email);
                    localStorage.setItem("user-fname", $scope.user.firstname);
                    localStorage.setItem("user-gender", $scope.user.gender);
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
        pushEnabled: true,
        push_notifications: false
    };

    $scope.profile = {
        updatePass: function(){
            //should be an ajax call
            // out of scope
            this.message = "out of scope"
        },
        message: ""
    };


    //PUSH NOTIFICATIONS ARE WAY HARDER THAN GEOLOCATION! =(
    $scope.initialiseState = function() {
        if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
            console.warn('Notifications aren\'t supported.');
            return;
        }

        if (Notification.permission === 'denied') {
            console.warn('The user has blocked notifications.');
            return;
        }

        if (!('PushManager' in window)) {
            console.warn('Push messaging isn\'t supported.');
            return;
        }

        navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
            serviceWorkerRegistration.pushManager.getSubscription()
                .then(function(subscription) {
                    var pushButton = document.querySelector('#btn-push');
                    pushButton.disabled = false;

                    if (!subscription) {
                        return;
                    }

                    sendSubscriptionToServer(subscription);

                    pushButton.textContent = 'Disable Push Messages';
                    $scope.settings.pushEnabled = true;
                })
                .catch(function(err) {
                    console.warn('Error during getSubscription()', err);
                });
        });
    }

    window.addEventListener('load', function() {
        var pushButton = document.querySelector('#btn-push');
        pushButton.addEventListener('click', function() {
            if ($scope.settings.pushEnabled) {
                alert("unsubscribe not supported");
            } else {
                $scope.subscribe();
            }
        });

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js')
                .then(initialiseState);
        } else {
            console.warn('Service workers aren\'t supported in this browser.');
        }
    });



    $scope.subscribe = function() {
        var pushButton = document.querySelector('#btn-push');
        pushButton.disabled = true;

        navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
            serviceWorkerRegistration.pushManager.subscribe()
                .then(function(subscription) {
                    $scope.settings.pushEnabled = true;
                    pushButton.textContent = 'Disable Push Messages';
                    pushButton.disabled = false;

                    return sendSubscriptionToServer(subscription);
                })
                .catch(function(e) {
                    if (Notification.permission === 'denied') {
                        console.warn('Permission for Notifications was denied');
                        pushButton.disabled = true;
                    } else {
                        console.error('Unable to subscribe to push.', e);
                        pushButton.disabled = false;
                        pushButton.textContent = 'Enable Push Messages';
                    }
                });
        });
    }
});







