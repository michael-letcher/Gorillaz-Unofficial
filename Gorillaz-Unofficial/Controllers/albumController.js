/* Created with assistence from Lyle Singleton */

app.controller("albumController", function ($scope, $firebaseObject, $log) {
    var fireRef = new Firebase("https://gorillaz-unofficial.firebaseio.com/");
    var obj = $firebaseObject(fireRef);
    // to take an action after the data loads, use the $loaded() promise
    obj.$loaded().then(function () {
        console.log("$firebaseObject", obj);

        $scope.studioAlbums = obj.albums;
        
        // Create View obj
        $scope.view = new view();

        //temp
        $scope.view.AddNavigable(new Navigable("Studio Albums", "albums"), null);

        // Initialise View
        $scope.view.Init(obj);

        $("#loading").hide();

        console.log('$scope', $scope);
    });



    /* Public UUID()
     * Parameters: NA
     * Return: (hopefully) unique string in the form of 'id-xxxxxxxxxxxxxxxxxxx'
     */
    function UUID() {
        return 'id-' + Math.random().toString(36).substr(2, 16);
    }

    function Navigable(title, display) {
        this.id = UUID(); // can be replaced with DB ids
        this.title = title;
        this.parent = null; // Navigable Object
        this.children = []; // Navigable Objects
        this.itemData = null; // Object
        this.display = display;
        /* Private AddChild()
         * Info: Adds another Navigable to the Navigable.children array and wires up the child's Navigable.parent
         * Parameters: newChildElement (Navigable ojbect)
         * Return: NA
         */
        this.AddChild = function (newChildElement){
            this.children.push(newChildElement);
            newChildElement.parent = this;
        };
    }

    function view() {
        this.selectedNavigable = null;
        this.rootNavigable = null;
        this.navigables = [];
        this.breadcrumbs = [];
        this.currentdisplay = "";

        // NavigableID can be omitted or a value held by a Navigable object 
        // added to this object using View.AddNavigable()

        /* Public init()
         * Info: Initialises the View object and sets the currently selected Navigable
         *       UPDATE, will read URL to select tree location & build tree from imported obj
         * Parameters: selectedNavigableID (Navigable ojbect ID)
         * Return: NA
         */
        this.Init = function (data) {
            if (typeof data == 'undefined') {
                // if data is not passed in, through error
                $log.error('Error: Breadcrumb data undefined.');
            } else {


                //read data (only albums currently)
                var lastID;
                var lastNavObject = null;
                // Create nav object
                var rootObject = new Navigable("Studio Albums", "album");
                angular.forEach(data.albums, function (value, key) {
                    // Set ID of new object
                    lastID = lastNavObject.id;
                    // Set to view
                    rootObject.AddChild(new Navigable("Studio Albums", "album"), lastID);
                });
                // update tree
                this.UpdateSelected(this.rootNavigable.id);
            }
        }


        //  added to this object using View.AddNavigable()

        /* Public UpdateSelected()
         * Info: Updates View.selectedNavigable with the object with the id NavigableID
         * Parameters: NavigableID (Navigable ojbect ID)
         * Return: NA
         */
        this.UpdateSelected = function (navigableID) {
            var newSelection = this.navigables[navigableID];

            if (typeof newSelection != 'undefined') {
                this.selectedNavigable = newSelection;
                this.UpdateBreadcrumbs();
                //this.HTMLBreadcrumbs();
            }
        }
        
        /* Public AddNavigable()
         * Info: Adds a Navigatable to the navigation tree, parentNavigatable is null it will set the new object as the tree root
         * Parameters: newNavigable (navigable ojbect), parentNavigable (navigable ojbect)
         * Return: navigable object
         */
        this.AddNavigable = function (newNavigable, parentNavigable) {
            if (parentNavigable != null) {
                parentNavigable.AddChild(newNavigable);
                this.navigables[newNavigable.id] = newNavigable;
            }
            else {
                if (this.rootNavigable == null) {
                    this.rootNavigable = newNavigable;
                    this.navigables[newNavigable.id] = newNavigable;
                }
                else {
                    return null;
                }
            }

            return newNavigable;
        };
        
        /* Public UpdateBreadcrumbs()
         * Info: Updates the View.breadcrumbs array
         * Parameters: NA
         * Return: NA
         */
        this.UpdateBreadcrumbs = function () {
            this.breadcrumbs = this.BuildBreadcrumbs();
        }

        /* Private BuildBreadcrumbs()
         * Info: Generates an array of breadcrumbs with a title and id from the View.selectedNavigable
         * Parameters: NA
         * Return: result (array)
         */
        this.BuildBreadcrumbs = function () {
            var result = [];
            for (i = this.selectedNavigable; i != null; i = i.parent) {
                result.unshift({
                    title: i.title,
                    id: i.id
                });
            }
            return result;
        }

        //Not required
        this.HTMLBreadcrumbs = function () {
            var div = document.getElementById(this.breadcumbsPlaceholderID);
            div.innerHTML = "<ol>";

            for (i = 0; i < this.breadcrumbs.length; i++) {
                div.innerHTML += '<li><a href="#" onclick="view.UpdateSelected(\'' + this.breadcrumbs[i].id + '\')">' + this.breadcrumbs[i].title + "</a></li>";
            }

            div.innerHTML += "</ol>";
        }
    }


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
                $scope.move($scope.selectedAlbum.name, 'album', -1)
                
            }
            else {
                ++i;
            }
        });
        console.log("selectedAlbum: ", $scope.selectedAlbum);
    }
    $scope.openSong = function (id) {
        var i = 0;
        console.log(id);
        // To iterate the key/value pairs of the object, use angular.forEach()
        angular.forEach($scope.selectedAlbum.songs, function (value, key) {
            if (i === id) {
                ++i;
                // Populate View
                $scope.selectedSong = {
                    name: key,
                    duration: value.duration
                };
                // Show View
                $scope.move($scope.selectedSong.name, 'song', -1)

            }
            else {
                ++i;
            }
        });
        console.log("selectedSong: ", $scope.selectedSong);
    }

    function updateBreadcrumbs(viewName, view) {
        // Set all active to false
        angular.forEach($scope.breadcrumbs, function (obj, index) {
            obj.active = false;
        });

        // Set new location
        // [BACK] if moving root (Lv 1)
        if (view == 'albums') {
            $scope.breadcrumbs = [{
                name: viewName,
                view: view,
                active: true
            }];
        // [BACK] if moving from Song to Album (Lv 3 to Lv 2)
        } else if (view == 'album' && $scope.view == 'song') {
            $scope.breadcrumbs.push({
                name: viewName,
                view: view,
                active: true
            });
        // [FORWARD] everything else
        } else {
            $scope.breadcrumbs.push({
                name: viewName,
                view: view,
                active: true
            });
        }
    }

    $scope.move = function (viewName, view, $index) {
        updateBreadcrumbs(viewName, view);
        $scope.view = view;
        console.log('Moving to ' + view);
    }
});