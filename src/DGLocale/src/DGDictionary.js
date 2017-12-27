DG.Dictionary = {};

DG.Dictionary.ru = {
    pluralRules: function(n) { // (Number)
        if (n % 10 === 1 && n % 100 !== 11) { // 1, 21
            return 0;
        }
        if ((n % 10 >= 2 && n % 10 <= 4 && (n % 10) % 1 === 0) && (n % 100 < 12 || n % 100 > 14)) { // 2, 3
            return 1;
        }

        if ((n % 10 === 0) || (n % 10 >= 5 && n % 10 <= 9 && (n % 10) % 1 === 0) || (n % 100 >= 11 && (n % 100) <= 14 && (n % 100) % 1 === 0)) { // 13, 17
            return 2;
        }
    }
};

DG.Dictionary.en = {
    pluralRules: function(n) { // (Number)
        if (n === 1) { // 1
            return 0;
        } else {
            return 1; //0, 2, 3, 4 ..
        }
    }
};

DG.Dictionary.it = {
    pluralRules: function(n) { // (Number)
        if (n === 1) { // 1
            return 0;
        } else {
            return 1; //0, 2, 3, 4 ..
        }
    }
};

DG.Dictionary.cs = {
    pluralRules: function(n) { // (Number)
        return (n === 1) ? 0 : (n >= 2 && n <= 4) ? 1 : 2;
    }
};

DG.Dictionary.es = {
    pluralRules: function(n) { // (Number)
        return (n >= 2) ? 1 : 0;
    }
};

// Stub for Arabic language, we don't have cases with plural form usage
// Actually Arabic has 6 plural forms
DG.Dictionary.ar = {
    pluralRules: function() {
        return 0;
    }
};
