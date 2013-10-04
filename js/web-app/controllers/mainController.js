app.controller("mainController", function($scope, $http){

	$scope.initialLocation;
  $scope.siberia = new google.maps.LatLng(60, 105);
  $scope.newyork = new google.maps.LatLng(40.7463, -73.9913);
  $scope.browserSupportFlag =  new Boolean();
  $scope.map;
  $scope.retina = window.devicePixelRatio > 1;

	$scope.init = function () {
		var mapOptions = {
          zoom: 13,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        console.log('In main init');

        //first test——map uses hard-coded location, next will get user's location and pull deals
        $scope.map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);

        // Try W3C Geolocation (Preferred)
        if (navigator.geolocation) {
          $scope.browserSupportFlag = true;
          navigator.geolocation.getCurrentPosition(function(position) {
            $scope.initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var currentLat = position.coords.latitude;
            var currentLon = position.coords.longitude;
            $scope.map.setCenter($scope.initialLocation);
            // performApiCall(currentLat, currentLon);

            //definite custom map pin for user location & plot it on map
            var pinColor = "5ea9ff";
            var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_spin&chld=0.6|0|" + pinColor + "|0|_|k",
            new google.maps.Size(25, 60),
            new google.maps.Point(0,0),
            new google.maps.Point(10, 24));
            var marker = new google.maps.Marker({
                position: $scope.initialLocation,
                map: $scope.map,
                icon: pinImage,
            });
          }, function() {
            handleNoGeolocation($scope.browserSupportFlag);
          });
        }

        // Browser doesn't support Geolocation
        else {
          $scope.browserSupportFlag = false;
          handleNoGeolocation($scope.browserSupportFlag);
        }

        function handleNoGeolocation(errorFlag) {
          if (errorFlag == true) {
            alert("Geolocation service failed.");
            $scope.initialLocation = newyork;
          } else {
            alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
            $scope.initialLocation = siberia;
          }
          map.setCenter($scope.initialLocation);
        }
	};

	google.maps.event.addDomListener(window, 'load', $scope.init);
});