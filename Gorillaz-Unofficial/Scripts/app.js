var app = angular.module('GorillazApp', ['ngRoute', 'firebase']);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "views/albums.htm"
        })
        .when("/album", {
            templateUrl: "views/album.htm"
        })
        .when("/green", {
            templateUrl: "views/song.htm"
        })
        .otherwise({
            template: "<h1>None</h1><p>Nothing has been selected.</p>"
        });

    // Turn on pretty URL (removes /#/ from URL
    //$locationProvider.html5Mode(true);

});
