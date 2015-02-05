/**
* Plugin samplein Controller
*/
plugin.controller('sampleinCntl', ['$scope', '$window', '$parse', '$http', 'znData', '$routeParams', 'znModal','$templateCache', '$timeout', '$location', 'sampleinDataShare', 'sampleinDataSvc',
function ($scope, $window, $parse, $http, znData, $routeParams, znModal,$templateCache, $timeout, $location, sampleinDataShare, sampleinDataSvc ) {

    var SAMPLESIN = 'samplesin';
  $scope.workspaceId = null;
  $scope.CompanySet="false";
  $scope.ContactSet="false";
  $scope.LocationSet="false";
  $scope.orderByField = 'date';
  $scope.reverseSort = false;


  $scope.varC = "contact";
  $scope.varL = "location";
  $scope.contactlookup = {};
  $scope.locationlookup = {};
  $scope.companyQuotes = [];



  $scope.showNewSampleInForm = 'false';
  $scope.showSamplesIn = 'true';
  $scope.showCompanyInfo = 'false';

  $scope.showNewSampleInForm = 'false';
  $scope.showNewSampleInItem = 'false';
  $scope.showCompanyEdit = 'false';
  $scope.showDashboard = true;
  $scope.showSampleIn = true;

  $scope.samplesin = [];
  $scope.sampleinCnt = 0;
  $scope.samplein = {};
  $scope.samplein.supplier = {};
  var  itemsArry = [];


  $scope.ifimage = function () {

    console.log($scope.samplein.image);

    if ($scope.samplein.image.name !== null ) {
      return true;
    } else {
      return false;
    }
  };


  var todaysDate = function() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
      dd='0'+dd;
    }
    if(mm<10){
      mm='0'+mm;
    }
    today = mm+'/'+dd+'/'+yyyy;
    return today;
  };

  $scope.samplesinLoad = function (companyId) {
    $scope.samplesin = [];
    sampleinDataSvc.childAdded(companyId,function(addedChild) {
      $timeout(function() {
        $scope.samplesin.push(addedChild);
      });
    });
  };



  var initializeSpec = function (option){
    if (option === 'set') {
        
      $scope.samplein = {
        date : todaysDate() ,
        material: {},
        contact: '',
        supplier: {},
        id: '',
        description: '',
        suuplierPartNumber: '',
        pricing: '',
        dateReceived: todaysDate(),
        amountReceived: '',
        meltflow: '',
        fillerContent: '',
        density: '',
        tensileStrength: '',
        colorReading: '',
        color: '',
        izodNotched: '',
        ash: '',
        comments: '',
        monthlyVolume: '',
        frequency: '',
        fob: '',
        colorChipImage: {exist: false, name: "", type: "image/png", base64: "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"},
      };
      $scope.freshSpec = angular.copy($scope.samplein);
    }
    if (option === 'reset') {
      $scope.samplein = angular.copy($scope.freshSpec);
    }
  };

  initializeSpec("set");

  $scope.checkData = function () {

    console.log("test");
    console.log($scope.image);

  };

  $scope.sampleinImageDelete = function(){
    $scope.samplein.image = {exist: false, name: "", type: "image/png", base64: "iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAIAAAD2HxkiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAADVRJREFUeNrs3S9wG0cbB+D0m6DilNq0xsE1jWhCa2zs0AY7WDTFDrWpDe3g4oS61KEN/t7xTne2e6f1SbqTbPl5QMZWpNNat7/bP7e6++n6+voFsD3/8xGAEIIQAtvzsvzl8PDQJwIbcHNzoyUE3VFACEEIASEEIQQhBIQQhBAQQhBCQAhBCAEhBCEEhBCEEBBCEEJACEEIASEEIQSEEIQQEEIQQkAIQQgBIQQhBIQQhBAQQhBCQAhBCAEhBCEEhBCEEBBCEEJACEEIASEEIQSEEIQQEEIQQkAIQQgBIQQhBIQQhBAQQhBCQAhBCAEhBCEEhBCEEBBCEEJACEEIASEEIQQhBIQQhBAQQhBCQAhBCAEhBCEEhBCEEBBCEEJACEEIASEEIQSEEIQQEEIQQkAIQQgBIQQhBIQQhBAQQhBCQAhBCAEhBCEEhBCEEBBCeJpe+giep+/fv9/d3aWf9/f3f/75Z5+JED52t7e3FxcX+de3b99G3e0+7erq6uvXr/HD8fFxu2afnZ1FEl69enV0dDS8GO/fv//x48e7d+/evHmz7J8QL/zy5cvXe9V/RVFfv37922+/9f5R1d8+xMnJiTojhCOLGlzW3UUZyFX8r7/+ijrdaIgiD+nn4SGMl0Qx4oebm5tlQxhHh8vLy/TyRfkMEcUoT3X4qP52jAkftVxZ27U2Itp9yYPyqyLDw18VEfr48eP5+fmiBFZvEVm1H4XwCXdZy9rcqPRlCP/++++Bo7gyeOUW2gmcz+dlwXL/8+Be9Ier/zo8PLQrdUefqipOi3qkEacyFXmCpC26oFXXNEaGD06odBMYHc7oypZjvyhPbDz1daPA3VhW4n339vbsbiF8jKo4RcPVG8KqERvYEnabvvawM40DqwTGeK/7kkhd5Go2m0WXNX54sCSRwGhC7W7d0afREvb2SKs4dfuKvS+J9qp6ME/tLOq+VqO73gSWHdTulAxC+MR0J0u6j0Qsu6l7cJaldwR4e6/xkvIQkM5A2EdCuMt689BNV2+c2j3SaNPKV0WchjSG1RhySD8TIdypvuiiyPU2eu25mSqBZQgX9Xi/38u/7u/vPzjdwraYmBlNb5AiIZGTHJv067ItYdmmHRwcxNZi5JaylzbY7WdWhSlzu76Li4urq6vu43t7e9pbIXx0LWFq+nIGFp3caw/tyjYtbSr+zR3R+KEbwqow4zaDQ2aSEMItKPuZ0f3LNTVSlBemLXpO+q/eef+qL5pmL+OZOYRpeqZ3zWe2aM4z3nQ+n3cfj+1b/GlM+IQTGKJpyvU+d0Grvmh1Wry3Ia1eklOa09huYNESPt++aIyOImN54BQtVcSmCmp6JHc1e/t41eRnObSreqSbHIwtWjHjHKOW8LHMykRdjM5hNYdZtZapqSz7kL0hLKdkqtav7Lum70A08jBwUc5AacVMV7tLjBBuriVMdbE8K5AWi3Y7lmV3NJ5TnWwo28kqdQ/2SKuZmEWnQGKbn/5lJZru6NNWtmO5Nh8eHp6fn6efP3/+nDMWCUntZNV0xEbKJFS5irauMfZLic3ZqxJVTg6hJdz9WZmchLJHWqY0Px7PLFuzsjnt9jBjC1//q2o5qyUy5bt3t4YQ7vKsTG7fImO9w6TyC3uLhoUrZKZ6SdUYDvxSL0L45GdlXt0rJ2C6w7DyCWVUyhCWzVr+Am57LqRq7qpTIOnbvXJoTPhcZmXKPuHZ2dmiXuKL/05jprmZeCTSWE7JRJwWnYGIp3348KHsGJexj1f9+eefZchPT09ns1n30BCDRutghHBHZmWqEKarmOUJlfRr+YTqhFuam2mcHqxEWxfPz4PStMatHJS+efOmXOcZ/xsHhcvLy/178cg///zT+2XFht5FNpVPnz6pGEK4nVmZ7lnsMoTVeYVuaKNRjUfKWdBFA8ty+9W1Z8oLsUVj2J2VSd+xaMy1Ou1uTLgLszJlSHKd7m3TqmFh98u47QJUT6jmSF/cf6F+yNVocvziycfHx/aslvCpzsr01vW0xCx1Hbv/G41nbsqq0eCQEFY93tTEVa+KtjEeiV5o4xpwaaanXPXKZvx0fX2df3Gtu+kGjd++fcvn6LdemGi9cxQjcouODkyn7LBoCTchz4IoDMaEIISAEIIQAkIIQggIIQghIIQghCCEgBCCEAJCCEIICCEIISCEIISAEMJzstELPd3e3l5cXORf375927ji0Pn5eb6k597eXnkd+Lyd169fd6/ovvI7Zu/fv//x40e8Y3kV3a6zs7Py8oRHR0fVXQG7rq6uygv1Hh8fN64vOLAYQ/7S1T6HUT6lqgB3d3fdq30fHBzkG4+OuB97XzvEycnJzoYw9llZBds7LxJYXdy6u534N3ZeY38s9Y7Jly9f0uUAb25u2s+P/DQufd3r8vIyX2swit1I4PBiDPlLV/gcxvqUegtQSXd6iyNUhLA3YOuUv/3WuqMjKG++OYryKrrtnVddprVxVfn8hLKo7TZ8eDG2YqLixabm8/lzuzXNkw9h7LB8N9z1VVWqnavqLhHdi2cvqrgv+u4Ms3IxNm/94sXnlu/uVnUH4ji1bO/RmHD7omsUO7XdsAxU3cghtty+i0MEqTxsN3qkUbfKytq9M8w6xdiw9YsXfc5y+BdbKO9hGgmPT3WiKxRHUbs37dESjiB24VI39xrSWA05zFfJ796MZdF22tfDX7YY2+qLjlW8+Bhns1n5yLdv3yYqfJ4BahDCFad8yrthrly3uklu37a66lXGyxeNZ8rttO/9sEIxNpzAKYr32FonIdzO4LD3cH57r/Gqqk3r3UgVzvaNd1YrxhabwVGK95zv471TJ+urs3DLTjZUY7aBh/lqdNdbR4f3RVcuxsamZCYq3vCbEwvhYxed0tWOqVXdKitB455+3ZFhb4+0HCvGlhvn9NcpxoabwbGKFy+cz+fVacAHlz3skl2YHY0M5ONoGhyusOKhzEkM2FL7lmpVmthszL7Gk8v7wqfZ2rKrVg6i2uP+dYqxAWMVr3HX+0hguTpqdBcXF+XOKgelk77vjreE1eK1tPZincmGdIAf3teq7vhXdT7L10aVbVTTNYux4SmZKYoXwZ76TrVxTPzap7rtuRAuLY5hZQzOz8+XmifoPYNX3Up++PRMdUpw0SBqimJssi86RfEiDKenp49nKlgIlxAV4vfffy8nSIYPDqvM5Fo1ZMZlUbryCGf4UrVRijGdcYsXn8O7f8XP5QE03ujs7GzZvowx4aMQO3I2m+WzFNFxin05ZIjSmJeLn/P/pnUhizaS7kefq2D8cHR0VFXK9n2qRynGdMYtXrykGhvHYas8bsZ+bM9grdNp6j0nucUFSTs1Oxpj+mq+bsiBuZq6LHdGWVGifrS7Sd0nd5eqbaAYG5iSmaJ4sZHj4+NF7ziiRStmJlol9+xC+KLzpb4HK0QcgBtTl0v1taLVLZ8cW66e32iWRyzGFDZTvNhsue+mW7mmOzr54DAOqB8/flxhsiGFtlGHUl1s9JHKjll3LrHR4Rm3GJNOyUxavF9++SV/aM/nC00vd+9Pin5F9PuHLGHr9p0e3PHRR2qMecozltXWGn3R0Ysx+pTMYy7eDthod7RqChpLzKpvQy87aK4GhwMnG1aYn+jmv7cFSNM2GyvGpFMykxZvnZ2uJRzaRlW7ajab9X7W1V5cYdAcg8MHv2VbDv2jGIveJY4I+difmoXG6O7w8LDbCA+fkhmrGBNNyUxavOq0xOa/UvRcuqPlPH7sqvl8HkO4qvWInVHV4xWW8z44OKwims5c9T4znvbhw4fyaN1ewtYNYWMVyETFGMtmipfWhVefmxBOJXZMOaaPfRx7LipuOr7e3d111wGvvJy3PTgcvmw/ff2vPP/emHiontzoo05ajLbG0s3s06dP0xWvXMAZdaC7rCI21cjw8PKP+9pdGBOmD7d7AYh0FAz5Gl5lDa6+c73s4LD3gFqdwauuFtPbvlUFHv7k4atkxi3GKFMyExWvXMDZTWC8S3XO0MTMyAZeqTIl9uTkZM0Beu+1Pav29sHubvWE9nnk8mxE+4JOkxZjfZsvXnxcUT3++OOP5zMr82JbJ+vjg450NTr9af3E+gnMg8OVO4G9Waq+29p4cvv04KTFWN/Gipdmj6NWnJ6ern9N1Cfnp+vr6yHzB9N1eKJnUn6LJF3Md/QDYRqiTLQcsbe7lRZ8/Prrr1tcD8WjVXYTthxCEEI3hIFnOSYEhBCEEBBCEEJACEEIQQgBIQQhBIQQhBAQQhBCQAhBCAEhBCEEhBCEEBBCEEJACEEIASEEIQSEEIQQEEIQQkAIQQgBIQQhBIQQhBAQQhBCQAhBCAEhBCEEhBCEEBBCEEJACEEIASEEIQSEEIQQEEIQQkAIQQgBIQQhBIQQhBAQQhBCQAhBCAEhBCEEhBCEEBBCEEJACEEIQQgBIQQhBIQQhBAQQhBCQAhBCAEhBCEEhBCEEBBCEEJACEEIASEEIQSEEIQQEEIQQkAIQQgBIQQhBIQQhBAQQhBCQAhBCAEhhKfrZfnLzc2NTwS0hCCEgBDC8/F/AQYAfsXpnjb2ThcAAAAASUVORK5CYII="};

  };

    $scope.genId = function(){
        sampleinDataSvc.getId(function(currentId){
            $timeout(function(){
                $scope.samplein.id = 'SAMPIN-' + currentId;
                $scope.currentId = currentId;

            });
        },SAMPLESIN);
    };



  var genSpecId = function () {

    var specNumber  = new Date();
    var dd = specNumber.getDate();
    var mm = specNumber.getMonth()+1;//January is 0!
    var yy = specNumber.getFullYear();
    var hours = specNumber.getHours();
    var minutes = specNumber.getMinutes();
    var seconds = specNumber.getSeconds();
    yy = yy.toString().substr(2,2);

    if(dd<10){
      dd='0'+dd;
    }
    if(mm<10){
      mm='0'+mm;
    }
    specNumber  = 'SAMPIN - ' + mm + dd + yy + ' - ' + hours + minutes + seconds;
    return specNumber;

  };




  $scope.companyModel =[];

  $scope.isCompanyAddress = function(billingAddress) {
    if (billingAddress === null) return false;
    return true;
  };



  $scope.setCompanyModel = function(companyIn) {

    if (companyIn.id !== $scope.companyModel.id) {
      $scope.showCompanyInfo = "true";
      $scope.showNewSampleInForm = 'false';


      $scope.companyQuotes = [];
      $scope.companyModel = companyIn;

      $scope.samplesinLoad(companyIn.id);

    }


  };  /* Close of set CompanyModel */




  $scope.sampleinNew= function () {
    $scope.showCompanyInfo = "false";
    $scope.showNewSampleInForm = 'true';
    initializeSpec("reset");
    document.getElementById('fileUploader').value = null;
    $scope.samplein.supplier = angular.copy($scope.companyModel);
    $scope.genId();
    $scope.samplesinLoad($scope.companyModel.id);
  };


  $scope.sampleinSave = function (){
    // Save the data to firebase
    /* bump the counter up */ 

    sampleinDataSvc.setId($scope.currentId,SAMPLESIN);
    sampleinDataSvc.childSave($scope.samplein);
    initializeSpec("reset");
    $scope.showCompanyInfo = true;
    $scope.showNewSampleInForm =  false;


    setTimeout(function(){
      $scope.samplesinLoad($scope.companyModel.id);
    },100);


  };


  $scope.sampleinCancel = function (){

    initializeSpec("reset");
    $scope.showCompanyInfo = true;
    $scope.showNewSampleInForm =  false;

    $scope.samplesinLoad($scope.companyModel.id);
  };


  $scope.sampleinEdit = function (item, row){

    initializeSpec("reset");
    sampleinDataSvc.childlookup($scope.companyModel.id,item,function(addedChild) {
      $timeout(function() {
        $scope.samplein = angular.copy(addedChild);
      console.log($scope.samplein);
      });
    });

    console.log($scope.samplein);
    $scope.showCompanyInfo = "false";
    $scope.showNewSampleInForm = 'true';

    $scope.samplesinLoad($scope.companyModel.id);
  };


  $scope.sampleinDelete = function (item,row) {
    var companyId = $scope.companyModel.id + "/" + item;

    sampleinDataSvc.childDelete(companyId);
    setTimeout(function(){
      $scope.samplesinLoad($scope.companyModel.id);
    },100);

    $scope.samplesinLoad($scope.companyModel.id);

  };



  $scope.isActive = function(companyIn){
    if (companyIn == $scope.companyModel.name) {return "active" }else {return ""}
  };


  if ($routeParams.workspace_id) {
    // Set Selected Workspace ID
    $scope.workspaceId = $routeParams.workspace_id;
  }

  var companyParams = { workspaceId:3482,formId: 7870,field71088: 'supplier'};
  znData('FormRecords').get(companyParams, function (records) {$scope.companies = records;});


  $scope.editCompanyInfo = function() {

    formId = 7870;
    recordId = $scope.companyModel.id;
    $location.search('record', formId + '.' + recordId);

  };

  $scope.refreshCompanyData = function (companyIn) {
    var companyParams = { workspaceId:3482,formId: 7870,id: companyIn.id, field71088: 'supplier'};
    znData('FormRecords').get(companyParams, function (record) {
      $scope.companyModel = record;
    });
  };




  var mparms = { workspaceId:3482,formId: 9302, limit: 500};
  znData('FormRecords').get(mparms, function (records) {
    $scope.materials = records;

  });



  $scope.sampleinDownload = function (id, supplier) {
    console.log(id);
    console.log(supplier);
    var firehostURL = "https://mdtechapp.firebaseapp.com/index.html#/sampin/" + supplier + "/" + id + "/";
    console.log(firehostURL);
    var myWindow = $window.open(firehostURL, "MsgWindow", "width=800, height=820", "true");
    myWindow.document.close();
    myWindow.focus();

  };














}])
.directive('sampleinFileInput', ['$parse', function($parse){
  return {
    restrict: 'A',
    link: function(scope,elm,attrs){
      console.log('debug sampleinFileInput');
      elm.bind('change', function() {
        console.log("Attrs = " + attrs);

        console.log(elm);

        $parse(attrs.sampleinFileInput).assign(scope,elm[0].files[0]);
        //scope.$parent.samplein.image = angular.copy(elm[0].files[0]);
        scope.$apply();
        console.log(scope.$parent.samplein.image);

      });
    }
  };





}])



.directive('sampleinEncode', [function () {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, elem, attrs, ngModel) {
      var fileObject = {};

      //var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

      function base64ArrayBuffer(arrayBuffer) {
        var base64    = ''
        var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

        var bytes         = new Uint8Array(arrayBuffer)
        var byteLength    = bytes.byteLength
        var byteRemainder = byteLength % 3
        var mainLength    = byteLength - byteRemainder

        var a, b, c, d
        var chunk

        // Main loop deals with bytes in chunks of 3
        for (var i = 0; i < mainLength; i = i + 3) {
          // Combine the three bytes into a single integer
          chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]

          // Use bitmasks to extract 6-bit segments from the triplet
          a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
          b = (chunk & 258048)   >> 12 // 258048   = (2^6 - 1) << 12
          c = (chunk & 4032)     >>  6 // 4032     = (2^6 - 1) << 6
          d = chunk & 63               // 63       = 2^6 - 1

          // Convert the raw binary segments to the appropriate ASCII encoding
          base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
        }

        // Deal with the remaining bytes and padding
        if (byteRemainder == 1) {
          chunk = bytes[mainLength]

          a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2

          // Set the 4 least significant bits to zero
          b = (chunk & 3)   << 4 // 3   = 2^2 - 1

          base64 += encodings[a] + encodings[b] + '=='
        } else if (byteRemainder == 2) {
          chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]

          a = (chunk & 64512) >> 10 // 64512 = (2^6 - 1) << 10
          b = (chunk & 1008)  >>  4 // 1008  = (2^6 - 1) << 4

          // Set the 2 least significant bits to zero
          c = (chunk & 15)    <<  2 // 15    = 2^4 - 1

          base64 += encodings[a] + encodings[b] + encodings[c] + '='
        }

        return base64
      }

      scope.readerOnload = function(e){
        //var base64 = _arrayBufferToBase64(e.target.result);
        var base64 = base64ArrayBuffer(e.target.result);

        fileObject.base64 = base64;
        scope.$apply(function(){
          ngModel.$setViewValue(fileObject);
        });
      };

      var reader = new FileReader();
      reader.onload = scope.readerOnload;

      elem.on('change', function() {
        var file = elem[0].files[0];
        fileObject.type = file.type;
        fileObject.name = file.name;
        fileObject.size = file.size;
        fileObject.exist = true;
        reader.readAsArrayBuffer(file);
      });

      //http://stackoverflow.com/questions/9267899/arraybuffer-to-base64-encoded-string
      function _arrayBufferToBase64( buffer ) {
        var binary = '';
        var bytes = new Uint8Array( buffer );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
          binary += String.fromCharCode( bytes[ i ] );
        }
        return Base64.encode( binary );
      }
    }
  };
}])

.service('sampleinDataShare', [ function () {
  this.companyIn = '';

}])

.service('sampleinDataSvc', ['sampleinDataShare', function(sampleinDataShare) {
    var FIREBASEDB = "https://mdtwebapp.firebaseio.com/";
  return {
    childAdded: function childAdded(id,cb) {
      var fbUrl = 'https://mdtwebapp.firebaseio.com/samplesin/' + id;
      var companyRef = new Firebase(fbUrl);
      companyRef.on('child_added', function (snapshot) {
        cb.call(this, snapshot.val());
      });
    },
    childDelete: function childDelete(childDeleteId) {
      var fbUrl = 'https://mdtwebapp.firebaseio.com/samplesin/' + childDeleteId ;
      var companyRef = new Firebase(fbUrl);
      companyRef.remove();
    },
    childSave: function childSave(samplein) {
      var fbUrl = 'https://mdtwebapp.firebaseio.com/samplesin/' + samplein.supplier.id + '/';

      var companyRef = new Firebase(fbUrl);

      

      var recordObj = {
        contact: samplein.contact,
        date : samplein.date,
        material: samplein.material,
        supplier: samplein.supplier,
        id: samplein.id,
        description: samplein.description,
        supplierPartNumber: samplein.supplierPartNumber,
        pricing: samplein.pricing,
        dateReceived: samplein.dateReceived,
        amountReceived: samplein.amountReceived,
        comments: samplein.comments,
        monthlyVolume: samplein.monthlyVolume,
        color: samplein.color,
          fob: samplein.fob,
        colorChipImage: samplein.colorChipImage,
        provided: samplein.provided,
        tested: samplein.tested
      };
      

      var objArry = Object.keys(recordObj);
      for(var i=0; i< objArry.length; ++i)
      {
        if (typeof recordObj[objArry[i]] === 'undefined') { recordObj[objArry[i]] = "" }
      }

      console.log(recordObj);
      companyRef.child(samplein.id).set(recordObj);
    },
    setId: function setId(currentId,dbtype){
    var fbUrl = FIREBASEDB + 'counters/';
    console.log("raise counter");
    console.log(currentId);
    console.log(dbtype);
    var companyRef = new Firebase(fbUrl);
    currentId++;
    
    /* 
    switch(dbtype) {
        case 'customers':
            countersType = {customers:currentId};
            break;
        case 'suppliers':
            countersType = {suppliers:currentId};
            break;
        case 'locations':
            countersType = {locations:currentId};
            break;
        case 'contacts':
            countersType = {contacts:currentId};
            break;
        case 'materials':
            countersType = {materials:currentId};
            break;
        case 'samplesin':
            
            break;
    } */
    
    var countersType = {samplesin: currentId};
    

    companyRef.update(countersType);

    },
    getId: function getId(cb,db){
        var fbUrl = FIREBASEDB + 'counters/' + db;
        
        var companyRef = new Firebase(fbUrl);
        companyRef.once('value', function (snapshot) {
            cb.call(this, snapshot.val());
            });
    },
    childlookup: function childlookup (id,recordid,cb) {
      var fbUrl = 'https://mdtwebapp.firebaseio.com/samplesin/' + id + "/" + recordid;
      var companyRef = new Firebase(fbUrl);
      companyRef.on('value', function (snapshot) {
        cb.call(this, snapshot.val());
      });
    },
    queryAll: function queryAll(id,cb) {
      var fbUrl = 'https://mdtwebapp.firebaseio.com/samplesin/';
      var companyRef = new Firebase(fbUrl);
      companyRef.on('child_added', function (snapshot) {
        cb.call(this, snapshot.val());
      });
    },
  };

}])

/**
* Plugin Registration
*/

.register('samplein', {
  route: '/samplein',
  controller: 'sampleinCntl',
  template: 'samplein-main',
  title: 'Sample In',
  pageTitle: false,
  type: 'fullPage',
  topNav: true,
  order: 300,
  icon: 'icon-road'
});

