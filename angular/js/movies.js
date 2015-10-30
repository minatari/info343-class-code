/*
    script for the movies.html file
*/

angular.module('Movies', ['ui.router'])
    .factory('moviesJSON', function($http) {
        return $http.get('data/movies-2014.min.json');
    })
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('list', {
                url: '/movies',
                templateUrl: 'views/movies-list.html',
                controller: 'MoviesController'
            })
            .state('detail', {
                url: '/movies/:index',
                templateUrl: 'views/movies-detail.html',
                controller: 'MovieDetailController'
            });

        $urlRouterProvider.otherwise('/movies');
    })
    .controller('MovieDetailController', function($scope, $stateParams, moviesJSON) {
        moviesJSON.then(function(results) {
            $scope.movie = results.data[$stateParams.index];
        });
    })
    .controller('MoviesController', function($scope, moviesJSON) { //without ui router, second parameter is $http
        var ratingsMap = {
            'Not Rated': 0,
            'G': 1,
            'PG': 2,
            'PG-13': 3,
            'R': 4,
            'NC-17': 5,
            'X': 6
        };
           moviesJSON.then(function(results) {
                $scope.movies = results.data.map(function(movie) {
                    movie.ratingOrdinal = ratingsMap[movie.rating]; //look up in ratings map by movie.rating value and return the corresponding value
                    return movie;
                });

                $scope.distributors = _.uniq(_.pluck($scope.movies, 'distributor'));

           });
        $scope.setSort = function(propertyName) {
            if ($scope.sortCol === propertyName) {
                $scope.sortReverse = !$scope.sortReverse;
            } else {
                $scope.sortCol = propertyName;
                $scope.sortReverse = false;
            }
        }
    });


/*/*
 script for the movies.html file
 */
/*
angular.module('Movies', [])
    .controller('MoviesController', function($scope, $http) {
        var ratingsMap = {
            'Not Rated': 0,
            'G': 1,
            'PG': 2,
            'PG-13': 3,
            'R': 4,
            'NC-17': 5,
            'X': 6
        };
        moviesJSON.then(function(results) {
            $scope.movies = results.data.map(function(movie) {
                movie.ratingOrdinal = ratingsMap[movie.rating]; //look up in ratings map by movie.rating value and return the corresponding value
                return movie;
            });

            $scope.distributors = _.uniq(_.pluck($scope.movies, 'distributor'));

        });
        $scope.setSort = function(propertyName) {
            if ($scope.sortCol === propertyName) {
                $scope.sortReverse = !$scope.sortReverse;
            } else {
                $scope.sortCol = propertyName;
                $scope.sortReverse = false;
            }
        }
    });
*/