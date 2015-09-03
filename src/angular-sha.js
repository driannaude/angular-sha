(function(){
  'use strict';

  var sha = angular.module('dn.sha', []);

  sha.factory('$sha', [function(){
    // args
    //
    //    algorithm - [STRING] the SHA algorithm to use (e.g. SHA-256, SHA-512);
    //    inputType - [STRING] the Input Type, e.g. TEXT.
    //   returnType - [STRING] the type you want to return (e.g. TEXT, HEX, B64, BYTES)
    // stringToHash - [STRING] The string you would like to hash.
    function doHash(algorithm, inputType, returnType, stringToHash){
      inputType = inputType.toUpperCase();
      returnType = returnType.toUpperCase();
      algorithm = 'SHA-' + algorithm;
      var shaObj = new jsSHA(algorithm, inputType);
      shaObj.update(stringToHash);
      var hash = shaObj.getHash(returnType);
      return hash;
    }
    // See hash() for argument explanations
    //     secret - [STRING] The secret key you want to use
    // secretType - [STRING] The secret Type (e.g. TEXT);
    function doHMAC(algorithm, inputType, returnType, stringToHash, secret, secretType){
      inputType = inputType.toUpperCase();
      secretType = secretType.toUpperCase();
      returnType = returnType.toUpperCase();
      algorithm = 'SHA-' + algorithm;
      var shaObj = new jsSHA(algorithm, inputType);
      shaObj.setHMACKey(secret, secretType);
      shaObj.update(stringToHash);
      var hmac = shaObj.getHMAC(returnType);
      return hmac;
    }

    var self = {
      hash: doHash,
      hmac: doHMAC
    };
    return self;
  }]);

}());
