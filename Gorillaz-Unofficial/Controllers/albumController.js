app.controller("albumController", function ($scope, $firebaseObject) {
    var fireRef = new Firebase("https://gorillaz-unofficial.firebaseio.com/");
    
    var obj = $firebaseObject(fireRef);

    $scope.breadcrumbs = [
        {
            name: 'Studio Albums',
            location: '#',
            active: true
        }
    ];

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
                addBreadcrumb($scope.selectedAlbum.name,'#');
                return console.log("found: ", value);
            }
            else {
                ++i;
            }
        });
        console.log("selectedAlbum: ", $scope.selectedAlbum);
    }

    function addBreadcrumb(name, location) {
        angular.forEach($scope.breadcrumbs, function (obj, index) {
            obj.active = false;
        });
        $scope.breadcrumbs.push({
            name: name,
            location: location,
            active: true
        });
    }
});