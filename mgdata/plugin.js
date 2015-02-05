n mgdata Controller
 */
plugin.controller('mgdataCntl', ['$scope', '$window', '$parse', '$http', 'znData', '$routeParams', 'znModal','$templateCache', '$timeout', '$location', 'mgdataDataSvc',
    function ($scope, $window, $parse, $http, znData, $routeParams, znModal, $templateCache, $timeout, $location, mgdataDataSvc ) {

 setTimeout(function() {
    var supplierParams = { workspaceId:3482,formId: 7870,field71088: 'supplier', limit:1000};
    znData('FormRecords')
        .get(supplierParams, function (records) {
                $scope.suppliers = records; 
        });
 });
  
  setTimeout(function() {
    var customersParams = { workspaceId:3482,formId: 7870,field71088: 'customer', limit:1000};
    znData('FormRecords')
        .get(customersParams, function (records) {
            $scope.customers = records;
        });
});
   
   setTimeout(function() {
    var contactsParams = { workspaceId:3482,formId: 7870,limit:1000};
    znData('FormRecords')
        .get(contactsParams, function (records) {
            $scope.contacts = records;
        });
   });
   setTimeout(function() {
    var materialsParams = { workspaceId:3482,formId: 7870,limit:1000};
    znData('FormRecords')
        .get(materialsParams, function (records) {
            $scope.materials = records;
        });  
   });    



$scope.migrate = function(type){
    
    if (type == 'customers'){
        var customers = [];
        var customerObj = {};
        var cs = $scope.customers;
        
        mgdataDataSvc.getIndexCounter(function(index){
        
        for (var i=0; i < cs.length; i++){
            customerObj = {
                id:   'CUS'+index,
                zengine_id:   cs[i].id,
                name: cs[i].name,
                description: cs[i].field71087,
                industry: cs[i].field83256,
                tags: ' ',
                website: cs[i].field71091,
                billingAddress: cs[i].field83251,
                billingAddress2: cs[i].field83252,
                billingCity: cs[i].field83253,
                billingState: cs[i].field83254,
                billingZipcode: cs[i].field83255,
                billingCountry: cs[i].field84905,
                billingPhone: cs[i].field84492,
                billingFax: cs[i].field84493,
                billingNonUSzip: cs[i].field122354  
            };
         index++;
        mgdataDataSvc.addRecord('customers',customerObj); 
        }
        mgdataDataSvc.setIndexCounter(index);
        });

    }
    
    
    if (type == 'suppliers'){
        // convert data
        var suppliers = [];
        var supplierObj = {};
        var sp = $scope.suppliers;
         mgdataDataSvc.getIndexCounter(function(index){
            for (x=34; x < sp.length; x++){
                supplierObj = {
                    zengine_id:   sp[x].id,
                    id:   'SUP'+index,
                    name: sp[x].name,
                    description: sp[x].field71087,
                    industry: sp[x].field83256,
                    tags: ' ',
                    website: sp[x].field71091,
                    billingAddress: sp[x].field83251,
                    billingAddress2: sp[x].field83252,
                    billingCity: sp[x].field83253,
                    billingState: sp[x].field83254,
                    billingZipcode: sp[x].field83255,
                    billingCountry: sp[x].field84905,
                    billingPhone: sp[x].field84492,
                    billingFax: sp[x].field84493,
                    billingNonUSzip: sp[x].field122354  
                };
         
        index++;
         mgdataDataSvc.addRecord('suppliers',supplierObj); 
        } 
         mgdataDataSvc.setIndexCounter(index);
         });


    }        
        
        
        


    if (type == 'materials'){
    mgdataDataSvc.fullSave(type,$scope.materials);
    console.log('mgdataDataSvc.fullSave(type,$scope.materials);');}
    if (type == 'contacts'){
    mgdataDataSvc.fullSave(type,$scope.materials);
    console.log('mgdataDataSvc.fullSave(type,$scope.contacts);');}
};


}])
.service('mgdataDataSvc', [ function() {
    var FIREBASEDB = "https://mdtwebapp.firebaseio.com/";
    return {
        addRecord: function addRecord(type,recordObj){
          var fbUrl = FIREBASEDB + type + '/';
          var companyRef = new Firebase(fbUrl);
          companyRef.child(recordObj.id).set(recordObj);
        },
        childAdded: function childAdded(id,type,cb) {
            var fbUrl = FIREBASEDB + type + '/' + id;
            var companyRef = new Firebase(fbUrl);
            companyRef.on('child_added', function (snapshot) {
                cb.call(this, snapshot.val());
            });
        },
        childDelete: function childDelete(type,id) {
            var fbUrl = FIREBASEDB + type + '/' + id;
            var companyRef = new Firebase(fbUrl);
            companyRef.remove();
        },
        getIndexCounter: function getIndexCounter(cb){
            var fbUrl = FIREBASEDB + "indexCounter";
            var companyRef = new Firebase(fbUrl);
            companyRef.once('value', function (snapshot) {
                cb.call(this, snapshot.val());
            });
        },
        setIndexCounter: function setIndexCounter(index){
            var fbUrl = FIREBASEDB + "indexCounter";
            var companyRef = new Firebase(fbUrl);
            companyRef.set(index); 
        },
        fullSave: function fullSave(type,recordObj) {
            var fbUrl = FIREBASEDB + type + '/';
            console.log(fbUrl);
            var companyRef = new Firebase(fbUrl);

            var objArry = Object.keys(recordObj);
            for(var i=0; i< objArry.length; ++i)
            {
                if (typeof recordObj[objArry[i]] === 'undefined') { recordObj[objArry[i]] = "" }
            }

            console.log(recordObj);
            companyRef.set(recordObj);
        }
    };

}])
/**
 * Plugin Registration
 */
    .register('mgdata', {
        route: '/mgdata',
        controller: 'mgdataCntl',
        template: 'mgdata-main',
        title: 'mgdata Plugin',
        pageTitle: false,
        type: 'fullPage',
        topNav: true,
        order: 300,
        icon: 'icon-puzzle'
    });


