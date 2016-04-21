define(['angular', './sample-module'], function (angular, controllers) {
    'use strict';
     controllers.controller('DashboardsCtrl', ['$scope', '$log', '$http', 'PredixAssetService', 'PredixViewService', function($scope, $log, $http, PredixAssetService, PredixViewService) {
       $scope.tsData = null;
       $scope.message = "checking message";
    /*   $httpProvider.defaults.headers.post= {
 *             'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJlN2QxOWM1Mi03M2Y0LTQ1OGQtOWQzMS04MjJkNTc5OWYzMjkiLCJzdWIiOiJ0ZXN0X2NsaWVudDEiLCJzY29wZSI6WyJ0aW1lc2VyaWVzLnpvbmVzLjI0NWU2ZjNjLTRhZmYtNDc0Yy04ZWM0LThlOGFiMzIxMzU5NS51c2VyIiwidWFhLnJlc291cmNlIiwidGltZXNlcmllcy56b25lcy4yNDVlNmYzYy00YWZmLTQ3NGMtOGVjNC04ZThhYjMyMTM1OTUuaW5nZXN0Iiwib3BlbmlkIiwidWFhLm5vbmUiLCJ0aW1lc2VyaWVzLnpvbmVzLjI0NWU2ZjNjLTRhZmYtNDc0Yy04ZWM0LThlOGFiMzIxMzU5NS5xdWVyeSJdLCJjbGllbnRfaWQiOiJ0ZXN0X2NsaWVudDEiLCJjaWQiOiJ0ZXN0X2NsaWVudDEiLCJhenAiOiJ0ZXN0X2NsaWVudDEiLCJncmFudF90eXBlIjoiY2xpZW50X2NyZWRlbnRpYWxzIiwicmV2X3NpZyI6Ijk5NDVmZTBiIiwiaWF0IjoxNDYwMjM4MTUyLCJleHAiOjE0NjAyODEzNTIsImlzcyI6Imh0dHBzOi8vZWMyZDg5NzMtNzFiMC00YzY3LWEzZGUtMjBkMjc3M2VhMmE2LnByZWRpeC11YWEucnVuLmF3cy11c3cwMi1wci5pY2UucHJlZGl4LmlvL29hdXRoL3Rva2VuIiwiemlkIjoiZWMyZDg5NzMtNzFiMC00YzY3LWEzZGUtMjBkMjc3M2VhMmE2IiwiYXVkIjpbInRlc3RfY2xpZW50MSIsInRpbWVzZXJpZXMuem9uZXMuMjQ1ZTZmM2MtNGFmZi00NzRjLThlYzQtOGU4YWIzMjEzNTk1IiwidWFhIiwib3BlbmlkIl19.dkq9bWsX3Jm5jRt_fWE65hSzMn7gfvgimUcvdX9dDqaTlIuLR0mN5hjo7djwBG_gafeq6quDTXG3TzC2JkkQXRTQ-8eovV19WfGf0Q_iI8zI-uC_VN_DxmczVVu_QtKg_YVxUx9eC_hzv93Z0kD0KtDLDLEJM5tNc1mLawtTDwlnIOuciy6ykAbcfAkWUh9T1IircVyFe8R0u9c4W9eQGDsDoCcppXC-3m1BIFEL1meZqLeH39nDcn2E_LOnW1hTKXjW0PhoOKq_vt2GiSRVo8lTAm9qmVz9azFPFbVHkG3WPgcxMX9zDwMq1fL45izDaQoxHQq9BQkaXtkAggSROw',
 *                       'Content-Type': 'application/json',
 *                                 'Predix-Zone-Id': '245e6f3c-4aff-474c-8ec4-8e8ab3213595'
 *                                         };*/
       $http({
           method: 'POST',
           url: 'https://time-series-store-predix.run.aws-usw02-pr.ice.predix.io/v1/datapoints',
           data:'{"start": "1y-ago","tags": [{"name": "Soil-Moisture","order":"desc","limit":100,"groups": [{"name": "quality"}],"filters": {"attributes": {"Lawn-Type": "Cox-Statidium"}}}]}',
 headers : { 'Authorization':'Bearer eyJhbGciOiJSUzI1NiJ9.eyJqdGkiOiI4ZjliMjc1Ni1jODUyLTQyOTItYTdiNS00Mzg3M2NlMmI2NmQiLCJzdWIiOiJ0ZXN0X2NsaWVudDEiLCJzY29wZSI6WyJ0aW1lc2VyaWVzLnpvbmVzLjI0NWU2ZjNjLTRhZmYtNDc0Yy04ZWM0LThlOGFiMzIxMzU5NS51c2VyIiwidWFhLnJlc291cmNlIiwidGltZXNlcmllcy56b25lcy4yNDVlNmYzYy00YWZmLTQ3NGMtOGVjNC04ZThhYjMyMTM1OTUuaW5nZXN0Iiwib3BlbmlkIiwidWFhLm5vbmUiLCJ0aW1lc2VyaWVzLnpvbmVzLjI0NWU2ZjNjLTRhZmYtNDc0Yy04ZWM0LThlOGFiMzIxMzU5NS5xdWVyeSJdLCJjbGllbnRfaWQiOiJ0ZXN0X2NsaWVudDEiLCJjaWQiOiJ0ZXN0X2NsaWVudDEiLCJhenAiOiJ0ZXN0X2NsaWVudDEiLCJncmFudF90eXBlIjoiY2xpZW50X2NyZWRlbnRpYWxzIiwicmV2X3NpZyI6Ijk5NDVmZTBiIiwiaWF0IjoxNDYwNjcwMTU0LCJleHAiOjE0NjA3MTMzNTQsImlzcyI6Imh0dHBzOi8vZWMyZDg5NzMtNzFiMC00YzY3LWEzZGUtMjBkMjc3M2VhMmE2LnByZWRpeC11YWEucnVuLmF3cy11c3cwMi1wci5pY2UucHJlZGl4LmlvL29hdXRoL3Rva2VuIiwiemlkIjoiZWMyZDg5NzMtNzFiMC00YzY3LWEzZGUtMjBkMjc3M2VhMmE2IiwiYXVkIjpbInRlc3RfY2xpZW50MSIsInRpbWVzZXJpZXMuem9uZXMuMjQ1ZTZmM2MtNGFmZi00NzRjLThlYzQtOGU4YWIzMjEzNTk1IiwidWFhIiwib3BlbmlkIl19.IHZ4Jjw-V1FDTFzxf7v7fkbghB_CNs8mQ6XgOVi2ifhowkUxyCHiKs_0f4Rqhvc4QiAl_7-Wgn5OQf3iQbB3QoAHc14_KbAlFnnaS3SAUAwU4ZY4e1Bw_TFEMAEwwagRv5HnBH81A7NrbUNg7X1q3VGNVQ304UOtioX9R-dCqG8xdqyXBUL36jpqTXKetiQkc6hHEdgurzuBv5IGwJqSbcU1eA5HFhyeZOL4RI_-92UDoz7wTdNIhDGvfmYiZUryTcVter3KteCF1CxNGgdyWW-HZfwdtbQ-eC9tiZrivAMi5PUOnPHIJK5j1GcXYBxtxk2onFHCCCBB4lCGYY9I5w',
               'Content-Type': 'application/json',
               'Predix-Zone-Id': '245e6f3c-4aff-474c-8ec4-8e8ab3213595'
           }
       }).
       success(function(data, status, headers, config) {
           $scope.message = data.tags[0].results[0].values;  
           $scope.tsData = data.tags[0].results[0].values;
       }).error(function(data, status, headers, config) {

           $scope.message = 'error';
       });

        /*PredixAssetService.getAssetsByParentId('root').then(function (initialContext) {

            //pre-select the 1st asset
            initialContext.data[0].selectedAsset = true;
            $scope.initialContexts = initialContext;
            $scope.initialContextName = initialContext.data[0].name;

            //load view selector
            $scope.openContext($scope.initialContexts.data[0]);
        }, function (message) {
            $log.error(message);
        });

        $scope.decks = [];
        $scope.selectedDeckUrl = null;

        // callback for when the Open button is clicked
        $scope.openContext = function (contextDetails) {

            // need to clean up the context details so it doesn't have the infinite parent/children cycle,
            // which causes problems later (can't interpolate: {{context}} TypeError: Converting circular structure to JSON)
            var newContext = angular.copy(contextDetails);
            newContext.children = [];
            newContext.parent = [];

            // url end point can change from context to context
            // so the same card can display different data from different contexts

            var url = {
                'parent': {
                    'datagrid-data': '/sample-data/datagrid-data.json'
                },
                'child': {
                    'core-vibe-rear-cruise': '/sample-data/core-vibe-rear-cruise.json',
                    'delta-egt-cruise': '/sample-data/delta-egt-cruise.json'
                },
                'child2': {
                    'core-vibe-rear-cruise': '/sample-data/core-vibe-rear-cruise0.json',
                    'delta-egt-cruise': '/sample-data/delta-egt-cruise.json'
                },
                'child3': {
                    'core-vibe-rear-cruise': '/sample-data/core-vibe-rear-cruise1.json',
                    'delta-egt-cruise': '/sample-data/delta-egt-cruise.json'
                }
            };

            newContext.urls = url[newContext.id];

            $scope.context = newContext;

            //Tag string can be classification from contextDetails
            PredixViewService.getDecksByTags(newContext.classification) // gets all decks for this context
                .then(function (decks) {
                    $scope.decks = [];

                    if (decks && decks.length > 0) {
                        decks.forEach(function (deck) {
                            $scope.decks.push({name: deck.title, id: deck.id});
                        });
                    }
                });
        };

        $scope.viewServiceBaseUrl = PredixViewService.baseUrl;

        $scope.getChildren = function (parent, options) {
            return PredixAssetService.getAssetsByParentId(parent.id, options);
        };

        $scope.handlers = {
            itemOpenHandler: $scope.openContext,
            getChildren: $scope.getChildren
            // (optional) click handler: itemClickHandler: $scope.clickHandler
        };*/
    }]);
});
