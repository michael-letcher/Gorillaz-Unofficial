app.controller("albumController", function ($scope, $firebaseObject) {
    var fireRef = new Firebase("https://gorillaz-unofficial.firebaseio.com/");
    
    var obj = $firebaseObject(fireRef);

    // to take an action after the data loads, use the $loaded() promise
    obj.$loaded().then(function () {
        console.log("loaded record:", obj.$id, obj.someOtherKeyInData);

        // To iterate the key/value pairs of the object, use angular.forEach()
        angular.forEach(obj, function (value, key) {
            console.log(key, value);
        });
    });
});