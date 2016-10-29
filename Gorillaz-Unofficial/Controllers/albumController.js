app.controller("albumController", function ($scope, $firebaseObject, $location) {
    var fireRef = new Firebase("https://gorillaz-unofficial.firebaseio.com/");
    
    var obj = $firebaseObject(fireRef);

    // to take an action after the data loads, use the $loaded() promise
    obj.$loaded().then(function () {
        console.log("loaded record:", obj);

        $scope.studioAlbums = obj.albums;
        console.log("studioAlbums:", obj.albums);

        $(".loading").hide();
    });

    $scope.openAlbum = function (albumName) {
        $location.path('/album');
        $location.search('album', albumName);
    }
});