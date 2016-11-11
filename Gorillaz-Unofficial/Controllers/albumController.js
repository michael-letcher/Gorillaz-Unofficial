/* Created with assistance from Lyle Singleton */

app.controller("albumController", function ($scope, $firebaseObject, $log) {
    var fireRef = new Firebase("https://gorillaz-unofficial.firebaseio.com/");
    var obj = $firebaseObject(fireRef);
    // to take an action after the data loads, use the $loaded() promise
    obj.$loaded().then(function () {
        console.log("$firebaseObject", obj);

        $scope.studioAlbums = obj.albums;
        
        // Create View obj
        $scope.view = new view();

        // Initialise View
        $scope.view.Init(obj);

        $("#loading").hide();
        $("#breadcrumbs").show();

        console.log("$scope", $scope);
    });
    
    $scope.type = "Studio Album";


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
        this.data = null; // Object
        this.display = display;
        /* Private AddChild()
         * Info: Adds another Navigable to the Navigable.children array and wires up the child's Navigable.parent
         * Parameters: newChildElement (Navigable ojbect)
         * Return: NA
         */
        this.AddChild = function (newChild){
            this.children.push(newChild);
            newChild.parent = this;
        };
    }

    function view() {
        this.selectedNavigable = null;
        this.rootNavigable = null;
        this.navigables = {};
        this.breadcrumbs = [];

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
                // Create Navigable object
                var rootObject = new Navigable("Home", "root");
                $scope.rootID = rootObject.id;
                // Add root to view
                this.AddNavigable(rootObject);

                angular.forEach(data.albums, function (value, key) {
                    var itemName;
                    //Set name, if value.name is specified
                    if (value.name != undefined) {
                        itemName = value.name;
                    } else {
                        itemName = key;
                    }

                    // Create Navigable object
                    var newAlbum = new Navigable(itemName, value.display);
                    // Set data to new object
                    newAlbum.data = value;

                    // Add album to View
                    $scope.view.AddNavigable(newAlbum, rootObject);

                    // Set Songs
                    angular.forEach(newAlbum.data.songs, function (value, key) {
                        // Create Navigable object
                        var newSong = new Navigable(key, value.type);
                        // Set data to new object
                        newSong.data = value;
                        // Set Song to View and Album
                        $scope.view.AddNavigable(newSong, newAlbum);
                    });
                });
                
                // Update tree
                this.UpdateSelected(this.rootNavigable.id, false);
            }
        }


        //  added to this object using View.AddNavigable()

        /* Public UpdateSelected()
         * Info: Updates View.selectedNavigable with the object with the id NavigableID
         * Parameters: NavigableID (Navigable ojbect ID)
         * Return: NA
         */
        this.UpdateSelected = function (navigableID, clicked) {
            if(clicked)
                window.location = '#discography-location';

            //console.log("Move too", navigableID);
            var newSelection = this.navigables[navigableID];

            if (typeof newSelection != 'undefined') {
                $scope.selected = this.selectedNavigable = newSelection;
                this.UpdateBreadcrumbs();
                //console.log(this.selectedNavigable);
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
    }
});
