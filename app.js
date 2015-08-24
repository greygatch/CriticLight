var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope, $http) {
  $scope.resultsDisplayed = false;
  $scope.error = false;

  $scope.findMovie = function(event){

    if (event && event.which !== 13){ return }

    $http.get('http://www.omdbapi.com/?tomatoes=true&plot=full&t=' + $scope.movie)
    .then(function(response){
      console.log(response);

      if(response.data.Error){
        $scope.error = true;
        $scope.errorMsg = '404: Movie Not Found!';
        return;
      }

      $scope.resultsDisplayed = true;
      $scope.error = false;

      $scope.$applyAsync(function(){
        $scope.title = response.data.Title;
        $scope.director = response.data.Director;
        $scope.actors = response.data.Actors;
        $scope.released = response.data.Released.split(' ')[2];
        $scope.plot = response.data.Plot;
        $scope.rating = response.data.imdbRating;
        $scope.rating2 = response.data.tomatoMeter;
        $scope.avgRating = $scope.rating2 !== 'N/A' ? ($scope.rating * 10 + $scope.rating2 * 1) / 2 : $scope.rating;
      });
    });
    $scope.movie = '';
  };
});
