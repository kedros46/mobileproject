/**
 * Created by brecht on 2/05/2016.
 */

app.controller("mymedia", function($scope){
    $scope.headerTitle = "My Media";
    $scope.allmedia = {
        current: 0,
        arr: [] //description, id, img, name
    };

    $scope.media = {
        id: -1,
        img: "",
        name: ""
    };

    $scope.nextMedia = function(){
        console.log("swiped left");
        if($scope.allmedia.current < $scope.allmedia.arr.length-1){
            $scope.allmedia.current += 1;
        }
        else {
            $scope.allmedia.current = 0;
        }

        $scope.setMedia();
    };
    $scope.prevMedia = function(){
        console.log("swiped right");
        if($scope.allmedia.current > 0) {
            $scope.allmedia.current -= 1;
        }else {
            $scope.allmedia.current = $scope.allmedia.arr.length -1;
        }

        $scope.setMedia();
    };;

    $scope.setMedia = function () {
        var current = $scope.allmedia.current;

        $scope.media.id = $scope.allmedia.arr[current].id;
        $scope.media.img = $scope.allmedia.arr[current].img;
        $scope.media.name = $scope.allmedia.arr[current].name;
    };

    $scope.loadMyMedia = function(){
        $.ajax({
            method: "GET",
            url: "../backend/handle-request.php/mymedia/" + localStorage.getItem("user-id")

        }).done(function(response){
            $scope.allmedia.arr = JSON.parse(response);
            if($scope.allmedia.arr.length > 0){
                $scope.setMedia();
            }
            else
            {
                location.href = "#/newMedia";
            }
        }).fail(function(response){
            console.log("fail", response)
            $scope.media.name = "Could Not Load";
        })
    };

    //check if shake is supported or not.
    if(!("ondevicemotion" in window)){alert("Shake not supported");}
    else {

        //listen to shake event
        var shakeEvent = new Shake({threshold: 15});
        shakeEvent.start();
        window.addEventListener('shake', function(){
            location.reload(true);
            navigator.vibrate(100);
            new Audio("assets/sounds/Drop.mp3").play();

        }, false);
    }
});


app.controller("newmedia", function($scope){
    $scope.headerTitle = "New Media";

    $scope.media = {
        id: -1,
        img: "assets/images/favicon.ico",
        title: "",
        description: "You have Registered all available media"
    };

    //DUPLICATED : mymediaCtrl
    //START
    $scope.allmedia = {
        current: 0,
        arr: [] //description, id, img, name
    };

    $scope.nextMedia = function(){
        console.log("swiped left");
        if($scope.allmedia.current < $scope.allmedia.arr.length-1){
            $scope.allmedia.current += 1;
        }
        else {
            $scope.allmedia.current = 0;
        }

        $scope.setMedia();
    };
    $scope.prevMedia = function(){
        console.log("swiped right");
        if($scope.allmedia.current > 0) {
            $scope.allmedia.current -= 1;
        }else {
            $scope.allmedia.current = $scope.allmedia.arr.length -1;
        }

        $scope.setMedia();
    };
    //END

    $scope.setMedia = function () {
        var current = $scope.allmedia.current;
        if($scope.allmedia.arr[current]) {
            $scope.media.id = $scope.allmedia.arr[current].id;
            $scope.media.img = $scope.allmedia.arr[current].img;
            $scope.media.title = $scope.allmedia.arr[current].name;
            $scope.media.description = $scope.allmedia.arr[current].description;
        }
    };

    $scope.loadNewMedia = function(){
        $.ajax({
            method: "GET",
            url: "../backend/handle-request.php/newmedia/" + $scope.user.id

        }).done(function(response){
            $scope.allmedia.arr = JSON.parse(response);

            if($scope.allmedia.arr != null) {
                $scope.setMedia();
            }
        }).fail(function(response){
            alert("Something went wrong");
        })
    };

    //$scope.searchkey = "";
    //$scope.searchMedia = function(){
    //    console.log($scope.searchkey);
    //    $scope.allmedia.arr = $scope.allmedia.arr.filter(function(el, index, arr){!
    //        return el.name.includes($scope.searchkey);
    //    });
    //
    //    $scope.allmedia.current = 0;
    //    $scope.setMedia();
    //};

    $scope.saveUserToMedia = function(){
        $.ajax({
            method: "Post",
            url: "../backend/handle-request.php/mymedia",
            data:{
                userid: $scope.user.id,
                mediaid: $scope.media.id
            }
        }).done(function(response){

            var audio = new Audio("assets/sounds/Drop.mp3");
            audio.play();
            navigator.vibrate(100);
            //reload page
            location.reload(true);


            //do something - Notification

        }).fail(function(response){
            alert("Something went wrong");
        })
    };
});
