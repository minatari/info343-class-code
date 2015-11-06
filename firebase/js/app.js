
angular.module('ChatApp', ['firebase'])
    .constant('firebaseUrl', 'https://info343chat.firebaseio.com/messages') //
    .controller('ChatController', function($scope, $firebaseArray, firebaseUrl) {
        //create a reference to the firebase
        var ref = new Firebase(firebaseUrl);
        ref.limitToLast(1000);
        $scope.messages = $firebaseArray(ref); //creates syncronized array. anytime local array changes, server side will change, sync back to local

        //initialize form fields
        $scope.name = null;
        $scope.body = null;

        $scope.sendMessage = function() {
            //adds a new object to the array and synchronizes with the server
            $scope.messages.$add({ //firebase array, has a special method of add
                name: $scope.name,
                body: $scope.body,
                createdAt: Firebase.ServerValue.TIMESTAMP //server will replace with current date/time on server
            });

            $scope.body = null;
        }; //sendMessage() ends


    });
