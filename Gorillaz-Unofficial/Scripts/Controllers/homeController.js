app.controller('homeController', function ($scope) {
    $scope.slides = [
        {
            imageURL: 'Images/Gorillaz_01.png',
            isActive: 'active'
        },
        {
            imageURL: 'Images/Gorillaz_02.jpg',
            isActive: ''
        },
        {
            imageURL: 'Images/Gorillaz_03.jpg',
            isActive: ''
        }
    ];

    $scope.members = [
        {
            name: 'Murdoc',
            imageURL: 'Images/Murdoc.jpg'
        },
        {
            name: '2-D',
            imageURL: 'Images/2D.jpg'
        }
    ];
});