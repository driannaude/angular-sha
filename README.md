# angular-sha
jsSHA wrapped in Angular 1.x goodness

## Getting Stared
You can use `bower` or `npm`, although `bower` is now deprecated and will be removed in future releases.

#### Bower
Install using `bower install`:

```shell
$ bower install --save angular-sha
```

Then simply add the files to your project:

```html
<!-- angular-sha -->
<script type="text-javascript" src="bower_components/angular-sha/src/angular-sha.js">
```

#### NPM/Webpack
install using npm:
```shell
$ npm install --save angular-sha
```

Use your preferred method for adding `angular-sha` to your project (e.g. `require`, `import`, etc.)

## Usage
Using `angular-sha` is meant to be straightforward and requires little setup. You simply initialize it with the desired values, then use it.

#### Example:

```javascript
let angular.module('myApp');
module.controller('MyController', ['$sha' ,function($sha) {
	let valueToHash = 'boblovesalice';
    // Initialize angular-sha
	$sha.setConfig();
    // Hash the value; 
    let myHash = $sha.hash(valueToHash);
    // OR Using HMAC;
	let myHmac = $sha.hmac(valueToHash, 'MYSECRET');
}]);
```

#### Customize/Configure
`angular-sha` has a customizable configuration that uses the following defaults:

```javascript
$sha.setConfig({
   algorithm: 'SHA-256', // hashing algorithm to use
   inputType: 'TEXT', // Input type
   returnType: 'HEX', // Return type
   secretType: 'TEXT' // Secret for HMAC
 });
```
These defaults can be modified as per the [jsSHA documentation](https://github.com/Caligatio/jsSHA#hashing), as outlined below:

 The `algorithm` can be one of `SHA-1`, `SHA-224`, `SHA3-224`, `SHA-256`, `SHA3-256`, `SHA-384`, `SHA3-38`,`SHA-512`, `SHA3-512`, `SHAKE128`, or `SHAKE256`. 
 
 The `inputType`, `returnType` and `secretType` can be one of `HEX`, `TEXT`, `B64`, `BYTES`, or `ARRAYBUFFER`. 