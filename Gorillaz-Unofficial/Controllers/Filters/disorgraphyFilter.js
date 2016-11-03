app.filter('typeFilter', function () {
    return function (input, type) {
        var i, c, txt = "";
        for (i = 0; i < input.length; i++) {
            c = x[i];
            if (i % 2 == 0) {
                c = c.toUpperCase();
            }
            txt += c;
        }
        return txt;
    };
});