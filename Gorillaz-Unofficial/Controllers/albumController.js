app.controller("albumController", function ($scope, $firebaseObject) {
    var fireRef = new Firebase("https://gorillaz-unofficial.firebaseio.com/");
    
    var obj = $firebaseObject(fireRef);

    // to take an action after the data loads, use the $loaded() promise
    obj.$loaded().then(function () {
        console.log("loaded record:", obj);

        $scope.studioAlbums = obj.albums;
        console.log("studioAlbums:", obj.albums);

        $("#loading").hide();
    });

    $scope.openAlbum = function (id) {
        var i = 0;
        console.log(id);
        // To iterate the key/value pairs of the object, use angular.forEach()
        angular.forEach($scope.studioAlbums, function (value, key) {
            if(i === id) {
                ++i;
                $scope.selectedAlbum = value;
                return console.log("found: ", value);
            }
            else {
                ++i;
            }
        });
        console.log("selectedAlbum: ", $scope.selectedAlbum);
    }
});