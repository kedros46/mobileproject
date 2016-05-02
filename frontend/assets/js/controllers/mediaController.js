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
            $scope.setMedia();
        }
    };
    $scope.prevMedia = function(){
        console.log("swiped right");
        if($scope.allmedia.current > 0) {
            $scope.allmedia.current -= 1;
            $scope.setMedia();
        }
    };

    $scope.setMedia = function () {
        var current = $scope.allmedia.current;

        $scope.media.id = $scope.allmedia.arr[current].id;
        $scope.media.img = $scope.allmedia.arr[current].img;
        $scope.media.name = $scope.allmedia.arr[current].name;
    };

    $scope.loadMyMedia = function(){
        $.ajax({
            method: "GET",
            url: "../backend/handle-request.php/mymedia/" + $scope.user.id

        }).done(function(response){
            $scope.allmedia.arr = JSON.parse(response);
            $scope.setMedia();
        }).fail(function(response){
            console.log("fail", response)
            $scope.media.name = "Could Not Load";
        })
    };
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
            $scope.setMedia();
        }
    };
    $scope.prevMedia = function(){
        console.log("swiped right");
        if($scope.allmedia.current > 0) {
            $scope.allmedia.current -= 1;
            $scope.setMedia();
        }
    };
    //END

    $scope.setMedia = function () {
        var current = $scope.allmedia.current;

        $scope.media.id = $scope.allmedia.arr[current].id;
        $scope.media.img = $scope.allmedia.arr[current].img;
        $scope.media.title = $scope.allmedia.arr[current].name;
        $scope.media.description = $scope.allmedia.arr[current].description;
    };

    $scope.loadNewMedia = function(){
        $.ajax({
            method: "GET",
            url: "../backend/handle-request.php/newmedia/" + $scope.user.id

        }).done(function(response){
            $scope.allmedia = JSON.parse(response);

            if($scope.allmedia.arr != null) {
                $scope.setMedia();
            }
        }).fail(function(response){

        })
    };

    $scope.searchMedia = function(){
        var word = "";
        var media = $scope.allmedia.arr;
        media = media.filter(function(el, index){
            return el.contains(word);
        });
        $scope.allmedia.arr = media;
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
});
