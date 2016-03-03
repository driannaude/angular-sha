(function () {
  'use strict';
  var sha = angular.module('dn.sha', []);

  sha.factory('$sha', [function () {
    //
    // Global Default Config
    //

    function setConfig(configObject) {
      // Set the defaults if no config object is present
      if (angular.isUndefined(configObject)) {
        self.config = {
          algorithm: 'SHA-256',
          inputType: 'TEXT',
          returnType: 'HEX',
          secretType: 'TEXT'
        };
      } else {
        self.config = configObject;
      }
      // Return the config object once set.
      return self.config;
    }
    // Returns the config Object;
    function getConfig() {
      return self.config;
    }

    // args
    //
    //    algorithm - [STRING] the SHA algorithm to use (e.g. SHA-256, SHA-512);
    //    inputType - [STRING] the Input Type, e.g. TEXT.
    //   returnType - [STRING] the type you want to return (e.g. TEXT, HEX, B64, BYTES)
    // stringToHash - [STRING] The string you would like to hash.
    function _doHash(algorithm, inputType, returnType, stringToHash) {
        inputType = inputType.toUpperCase();
        returnType = returnType.toUpperCase();
        var shaObj = new jsSHA(algorithm, inputType);
        shaObj.update(stringToHash);
        var hash = shaObj.getHash(returnType);
        return hash;
    }
    // See hash() for argument explanations
    //     secret - [STRING] The secret key you want to use
    // secretType - [STRING] The secret Type (e.g. TEXT);
    function _doHMAC(algorithm, inputType, returnType, stringToHash, secret, secretType) {
      inputType = inputType.toUpperCase();
      secretType = secretType.toUpperCase();
      returnType = returnType.toUpperCase();
      var shaObj = new jsSHA(algorithm, inputType);
      shaObj.setHMACKey(secret, secretType);
      shaObj.update(stringToHash);
      var hmac = shaObj.getHMAC(returnType);
      return hmac;
    }

    function objectsMissing(data, isHMAC) {
      var returnArray = [];
      if (!data.hasOwnProperty('algorithm')) {
        returnArray.push('algorithm');
      }
      if (!data.hasOwnProperty('inputType')) {
        returnArray.push('inputType');
      }
      if (!data.hasOwnProperty('returnType')) {
        returnArray.push('returnType');
      }
      if (!data.hasOwnProperty('stringToHash')) {
        returnArray.push('stringToHash');
      }
      if (isHMAC === true) {
        if (!data.hasOwnProperty('secret')) {
          returnArray.push('secret');
        }
        if (!data.hasOwnProperty('secretType')) {
          returnArray.push('secretType');
        }
      }

      var hasMissingMembers = false;
      if (returnArray.length > 0) {
        hasMissingMembers = true;
      }
      var returnStr = returnArray.join(', ');
      return {
        hasMissingMembers: hasMissingMembers,
        missingMembers: returnStr
      };
    }

    function hashString(data) {
      if (angular.isString(data) || angular.isNumber(data)) {
        // If we just have a string, hash it with the defaults.
        return _doHash(self.config.algorithm, self.config.inputType, self.config.returnType, data);
      } else if (angular.isObject(data) && !angular.isArray(data)) {
        // If we have an object, we can use the config from the object
        var missingObjects = objectsMissing(data);
        // check to make sure the object is not missing any members;
        if (missingObjects.hasMissingMembers === true) {
          console.error('Object is missing: ' + missingObjects.missingMembers);
          // Object is missing members, return false, hash cannot be completed.
          return false;
        }
        return _doHash(data.algorithm, data.inputType, data.returnType, data.value);
      } else {
        // for invalid data, just return false;
        return false;
      }
    }

    function hmacString(data, secret) {
      if (angular.isString(data) || angular.isNumber(data)) {
        // If we just have a string, hash it with the defaults.
        return _doHMAC(self.config.algorithm, self.config.inputType, self.config.returnType, secret, self.config.secretType, data);
      } else if (angular.isObject(data) && !angular.isArray(data)) {
        // If we have an object, we can use the config from the object
        var missingObjects = objectsMissing(data, true);
        if (missingObjects.hasMissingMembers === true) {
          console.error('Object is missing: ' + missingObjects.missingMembers);
          return false;
        }
        return _doHMAC(data.algorithm, data.inputType, data.returnType, data.value, data.secret, data.secretType);
      } else {
        // for invalid data,just return false;
        return false;
      }
    }

    var self = {
      hash: hashString,
      hmac: hmacString,
      setConfig: setConfig,
      getConfig: getConfig,
      config: {}
    };
    return self;
  }]);
}());
