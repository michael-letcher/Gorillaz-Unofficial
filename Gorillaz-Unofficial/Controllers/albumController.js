app.controller("albumController", function ($scope, $firebaseObject) {
    var fireRef = new Firebase("https://gorillaz-unofficial.firebaseio.com/");
    
    var obj = $firebaseObject(fireRef);
    $scope.view = 'albums';
    $scope.breadcrumbs = [
        {
            name: 'Studio Albums',
            view: 'albums',
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
                // Populate View
                $scope.selectedAlbum = value;
                // Show View
                $scope.move($scope.selectedAlbum.name, 'album')
                
            }
            else {
                ++i;
            }
        });
        console.log("selectedAlbum: ", $scope.selectedAlbum);
    }

    function updateBreadcrumbs(viewName, view) {
        angular.forEach($scope.breadcrumbs, function (obj, index) {
            obj.active = false;
        });
        if (view == 'albums') {
            $scope.breadcrumbs = [{
                name: viewName,
                view: view,
                active: true
            }];
        } else {
            $scope.breadcrumbs.push({
                name: viewName,
                view: view,
                active: true
            });
        }
    }

    $scope.move = function (viewName, view) {
        updateBreadcrumbs(viewName, view);
        $scope.view = view;
        console.log('Moving to ' + view);

    }
});