app.controller('homeController', function ($scope) {
    $scope.slides = [
        {
            imageURL: 'Images/Cover_01.jpg',
            isActive: 'active'
        },
        {
            imageURL: 'Images/Cover_02.jpg',
            isActive: ''
        },
        {
            imageURL: 'Images/Cover_03.jpg',
            isActive: ''
        }
    ];
    
});