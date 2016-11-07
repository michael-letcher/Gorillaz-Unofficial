app.controller('footerController', function ($scope) {

    $scope.information = {
        copyright: {
            title: 'Copyright',
            message: 'Murdoc Alphonce Niccals'
        },
        disclaimer: {
            title: 'Disclaimer',
            message: 'All Gorillaz artwork and official statements, stories and music is copyright © Warner Music Group. All articles are owned by the authors of the articles and / or the magazines in which they were published. This site is not affiliated with, or endorsed by Warner Music Group in any way.\n\n' +
                     'If you own the copyright to any text or images that appears on this site (Gorillaz or otherwise) and you would like them removed, please contact us and we will comply as soon as possible.\n\n' +
                     'This is a not-for-profit unofficial site for fans of Gorillaz. All lyrics, articles, tabs and artwork that appears here are for private educational and scholarly use only and must not be used for commercial purposes.'
        },
        credits: {
            title: 'Credits',
            message: 'Murdoc Alphonce Niccals'
        }
    };

    $scope.footerModal = function (selected) {
        $scope.footer = $scope.information[selected];
    }

});