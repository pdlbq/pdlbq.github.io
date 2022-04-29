let utils = {
    get: function(url, onsuccess) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if ((request.readyState == 4) && (request.status == 200))
                onsuccess(request);
        }
        request.open("GET", url, true);
        request.send();
    },

    timestamp: function() {
        if (window.performance && window.performance.now)
            return window.performance.now();
        else
            return new Date().getTime();
    },

    bound: function(x, min, max) {
        return Math.max(min, Math.min(max, x));
    },

    t2p: function(t, tile) {
        return t * tile;
    },

    p2t: function(p, tile) {
        return Math.floor(p/tile);
    },

    cell: function(x, y) {
        return tcell(p2t(x), p2t(y));
    },

    tcell: function(tx, ty, tw, data) {
        return data[tx + (ty * tw)];
    },

    overlap: function(x1, y1, w1, h1, x2, y2, w2, h2) {
        return !(((x1 + w1 - 1) < x2) ||
             ((x2 + w2 - 1) < x1) ||
             ((y1 + h1 - 1) < y2) ||
             ((y2 + h2 - 1) < y1))
    }
}
