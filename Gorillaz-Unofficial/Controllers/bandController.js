app.controller('bandController', function ($scope) {
    $scope.phase = 4;
    $scope.members = [
            {
                name: 'Murdoc',
                imagePhase1: 'Images/phase1/Murdoc.jpg',
                imagePhase2: 'Images/phase2/Murdoc.jpg',
                imagePhase3: 'Images/phase3/Murdoc.jpg',
                imagePhase4: 'Images/phase4/Murdoc.jpg'
            },
            {
                name: '2-D',
                imagePhase1: 'Images/phase1/2D.png',
                imagePhase2: 'Images/phase2/2D.jpg',
                imagePhase3: 'Images/phase3/2D.jpg',
                imagePhase4: 'Images/phase4/2D.jpg'
            },
            {
                name: 'Noodle',
                imagePhase1: 'Images/phase1/Noodle.png',
                imagePhase2: 'Images/phase2/Noodle.jpg',
                imagePhase3: 'Images/phase3/Noodle.jpg',
                imagePhase4: 'Images/phase4/Noodle.jpg'
            },
            {
                name: 'Russel',
                imagePhase1: 'Images/phase1/Russel.jpg',
                imagePhase2: 'Images/phase2/Russel.jpg',
                imagePhase3: 'Images/phase3/Russel.jpg',
                imagePhase4: 'Images/phase4/Russel.jpg'
            }
    ];
    $scope.selectedMember;

    $scope.bandModal = function (name) {
        $scope.selectedMember;
    }
});