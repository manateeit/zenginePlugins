n dropTable Controller
 */
plugin.controller('dropTableCntl', ['$scope','znData', function ($scope, znData) {
	
 $scope.showCount = false;
  var params = { workspaceId:3482, limit: 400 };
  znData('Forms').get(params, function (records) {
    $scope.forms = records; 
  });
	

 $scope.showHowMany = false;
 $scope.showCount = false;
 $scope.deletedRecords = 0;
 $scope.totalRecords = 0;
	 
   $scope.deleteRecords = function () {
       $scope.deletecomplete = false;
       $scope.showCount = true;
       $scope.deleteRecordCount = 0;
       
       
       console.log("Deleting Records from : " + $scope.formSelected.name);
       console.log("Form ID : " + $scope.formSelected.id);
       
       var formparams2 = { workspaceId:3482, formId: $scope.formSelected.id, limit: 400};

             znData('FormRecords').get(formparams2, function (records) {
                 for (var index in records) {

                   var formparams3 = { workspaceId:3482, formId: $scope.formSelected.id, id: records[index].id};
                        znData('FormRecords').delete(formparams3, function () { ++$scope.deleteRecordCount});
                             
              }
             });
  };
  
$scope.getRecordCount = function (formid) {
    

    $scope.showHowMany = true;
    $scope.showCount = false;
    $scope.deletedRecords = 0;
    $scope.totalRecords = 0;
    
       var formparams2 = { workspaceId:3482, formId: formid, limit: 400};

             znData('FormRecords').get(formparams2, function (records) {

                 for (var index in records) {
                     
                      ++$scope.totalRecords;
                      }                  
             });

    
    
};


$scope.confirmationTest= function() { 
    
    if ($scope.confirmation === "YES"){
       
         return true;}
    else{
     
        return false;
    }
    
    
};
	
}])


/**
 * Plugin Registration
 */
.register('dropTable', {
	route: '/droptable',
	controller: 'dropTableCntl',
	template: 'drop-table-main',
	title: 'Delete All Records',
	pageTitle: false,
	type: 'fullPage',
	topNav: true,
	order: 300,
	icon: 'icon-eraser'
});

