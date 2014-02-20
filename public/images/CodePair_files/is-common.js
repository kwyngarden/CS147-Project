/**
 * This file is common to everyone - both client & server
 * Be very careful before writing any code. 
 * It can either break client or server.
 **/


(function (parent) {

    parent.serverOffset = 0;

    parent.getDocName = function (slug, prefix) {
        return prefix + '-' + slug;
    };

    parent.getSettingsDoc = function (slug) {
        return parent.getDocName(slug, 'settings');
    };

    parent.getChannel = function (suffix, host, protocol) {
        var url = "";
        url += protocol ? protocol + '://' : '';
        url += host ? host : '';
        url += suffix || '/channel';
        return url;
    };

    parent.randomString = function(strlen) {
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz",
            rnum = 0,
            i = 0,
            randomstring = '';

        strlen = strlen || 8;

        for (i = 0; i < strlen; i++) {
            rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
        }
        return randomstring;
    };

    parent.getServerTime = function () {
        var cur = new Date().getTime();
        if (parent.serverOffset) {
            cur = cur + IS.serverOffset;
        }
        return cur;
    };

})(typeof exports === 'undefined' ? IS : exports);
