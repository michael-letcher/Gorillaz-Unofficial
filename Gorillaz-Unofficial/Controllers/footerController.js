app.controller('footerController', function ($scope) {

    $scope.information = {
        copyright: {
            title: 'Copyright',
            message: "All song commentary, and biographical information unless otherwise stated, along with news and design is copyright © 2-J 2004-2009. Website design copyright © Michael Letcher\n\n" +
                     "For details of copyright on the official Gorillaz artwork that appears here and the articles that appear here see the disclaimer.",
            buttonTitle: 'Disclaimer',
            buttonLocation: 'disclaimer'
        },
        disclaimer: {
            title: 'Disclaimer',
            message: 'All Gorillaz artwork and official statements, stories and music is copyright © Warner Music Group. This site is not affiliated with, or endorsed by Warner Music Group in any way.\n\n' +
                     'If you own the copyright to any text or images that appears on this site (Gorillaz or otherwise) and you would like them removed, please contact us and we will comply as soon as possible.\n\n' +
                     'This is a not-for-profit unofficial site for fans of Gorillaz. All lyrics, articles, tabs and artwork that appears here are for private educational and scholarly use only and must not be used for commercial purposes.',
            buttonTitle: null,
            buttonLocation: null
        },
        credits: {
            title: 'Credits',
            message: "Gorillaz-Unofficial.com has now been constantly updated since its launch in 2004 We have over tens of thousands of unique readers visiting the site each month now, and have received millions of visits since launch.\n\n" +
                     "We're lucky enough to count members of Zombie Flesh Eaters, Gorillaz' management, EMI, Passion Pictures and Gorillaz artistic teams amongst our regular visitors. Damon Albarn and Jamie Hewlett have both kindly granted interviews to the site in the past and have been very supportive.",
            buttonTitle: null,
            buttonLocation: null
        }
    };

    $scope.footerModal = function (selected) {
        $scope.footer = $scope.information[selected];
    }
});