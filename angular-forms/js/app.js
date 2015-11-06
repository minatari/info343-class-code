/*
    script file for the index.html page
*/

angular.module('ContactsApp', ['ui.router', 'angular-uuid', 'LocalStorageModule'])
    .constant('storageKey', 'contacts-list') //name and a value you want available to other controllers/factories created
    .factory('contacts', function(uuid, localStorageService, storageKey) {//fancy way of fetching data and making them available to multiple controllers
        return localStorageService.get(storageKey) || [];
        //return [{
        //    id: 'default-delete-me',
        //    fname: 'Peggy',
        //    lname: 'Carter',
        //    phone: '360-444-9169',
        //    dob: '4/9/1921'
        //}];
    })
    .config(function($stateProvider, $urlRouterProvider) { //make sure spelling is exact //declares our various ui-routes and partials, when to show them, etc
        $stateProvider
            .state('list', {
                url: '/contacts', //url will appear in html address
                templateUrl: 'views/contacts-list.html', //where is the partial html file that defines this view?
                controller: 'ContactsController' //which controller do I want to use?
            })
            .state('detail', {
                url: '/contacts/:id',
                templateUrl: 'views/contact-detail.html',
                controller: 'ContactDetailController'
            })
            .state('edit', {
                url: '/contacts/:id/edit',
                templateUrl: 'views/edit-contact.html',
                controller: 'EditContactController'

            });

        $urlRouterProvider.otherwise('/contacts'); //just reset that the address ends in this
    })
    // weird ass syntax time
    // register a directive for custom validation of dates in the past
    .directive('inThePast', function() {  //camelcase! like constants and factories, give name and function
        return {
            require: 'ngModel',
            link: function(scope, elem, attrs, controller) {
                controller.$validators.inThePast = function(modelValue) { //modelvalue = what user has typed in
                    var today = new Date(); //how we declare a date of right meow
                    return (new Date(modelValue) <= today);
                }
            }
        };
    })

    .controller('ContactsController', function($scope, contacts) {
        $scope.contacts = contacts;
    })
    .controller('ContactDetailController', function($scope, $stateParams,
                                                    $state, contacts) {
        $scope.contact = contacts.find(function(contact) {
            return contact.id === $stateParams.id; //same as /contacts/:id, id is id property of object
        });
    })
    .controller('EditContactController', function($scope, $stateParams, $state,
                                                  uuid, localStorageService, storageKey, contacts) {
        var existingContact = contacts.find(function(contact) {
            return contact.id === $stateParams.id;
        });

        $scope.contact = angular.copy(existingContact);

        $scope.save = function() {
            if ($scope.contact.id) {
                angular.copy($scope.contact, existingContact); //propogate those properties    (left: source, right: destination)
            } else {
                $scope.contact.id = uuid.v4(); //i want a version 4 universal id!
                contacts.push($scope.contact);
            }
            localStorageService.set(storageKey, contacts);


            //use $state to go back to the list view
            $state.go('list');
        }
    });
