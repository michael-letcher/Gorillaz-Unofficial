app.controller('bandController', function ($scope) {
    $scope.phase = 4;
    $scope.members = [
            {
                id: 0,
                name: 'Murdoc',
                fullName: 'Murdoc Alphonce Niccals',
                gender: 'Male',
                dob: 'June 6, 1966',
                height: "5'7",
                active: '1998 - Present',
                imagePhase1: 'Images/phase1/Murdoc.jpg',
                imagePhase2: 'Images/phase2/Murdoc.jpg',
                imagePhase3: 'Images/phase3/Murdoc.jpg',
                imagePhase4: 'Images/phase4/Murdoc.jpg'
            },
            {
                id: 1,
                name: '2-D',
                fullName: 'Stuart Pot',
                gender: 'Male',
                dob: 'May 23, 1978',
                height: "6'2",
                active: '1998 - Present',
                imagePhase1: 'Images/phase1/2D.png',
                imagePhase2: 'Images/phase2/2D.jpg',
                imagePhase3: 'Images/phase3/2D.jpg',
                imagePhase4: 'Images/phase4/2D.jpg'
            },
            {
                id: 2,
                name: 'Noodle',
                fullName: 'Noodle',
                gender: 'Female',
                dob: 'October 31, 1990',
                height: 'Unknown',
                active: '1998-2006, 2010 - Present',
                imagePhase1: 'Images/phase1/Noodle.png',
                imagePhase2: 'Images/phase2/Noodle.jpg',
                imagePhase3: 'Images/phase3/Noodle.jpg',
                imagePhase4: 'Images/phase4/Noodle.jpg'
            },
            {
                id: 3,
                name: 'Russel',
                fullName: 'Russel Hobbs',
                gender: 'Male',
                dob: 'June 3, 1975',
                height: "5'9",
                active: '1998-2006, 2012 - Present',
                imagePhase1: 'Images/phase1/Russel.jpg',
                imagePhase2: 'Images/phase2/Russel.jpg',
                imagePhase3: 'Images/phase3/Russel.jpg',
                imagePhase4: 'Images/phase4/Russel.jpg'
            }
    ];
    $scope.selectedMember = null;

    $scope.bandModal = function (id) {
        //find band memeber
        for (var i = 0; i < $scope.members.length; i += 1) {
            var member = $scope.members[i];
            if (member.id === id) {
                //Set found memeber to selectedMember
                $scope.selectedMember = member;
            }
        }
    }
});