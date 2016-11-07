app.filter('typeSortFilter', function () {
    return function (input, type, attribute) {
        if (!angular.isObject(input)) return input;

        var results = [];

        //filter input
        angular.forEach(input, function (c) {
            if(c.data != null)
                if (c.data.type == type) {
                    results.push(c);
                }
        });
        //sort input
        results.sort(function (a, b) {
            a = parseInt(a.data[attribute]);
            b = parseInt(b.data[attribute]);
            return b - a;
        });

        return results;
    };
});