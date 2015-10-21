/*
    script for the index.html file
*/

Parse.initialize("ajm3cWnUsqf8pp7hIHZCOUSzMB8szgQaplpO4lWA", "w3a1TanfHzObsqBn4hjOrugKK6rXNUahvZxEk9at");

$(function() {
    'use strict';

    //new Task class for parse
    var Task = Parse.Object.extend('Task'); // like a tablename!

    //new query that will return all tasks ordered by createAt
    var tasksQuery = new Parse.Query(Task);
    tasksQuery.ascending('createdAt'); // automatically comes with new parse object

    //reference to the task list element
    var tasksList = $('#tasks-list');

    //reference to the error message alert
    var errorMessage = $('#error-message'); //question to ask: can you html a jquery?

    //current set of tasks
    var tasks = [];

    //displays error message
    function displayError(err) {
        errorMessage.text(err.message); //helps avoid script injection attacks!
        errorMessage.fadeIn();
    }

    //hides error message
    function clearError() {
        errorMessage.hide();
    }

    function showSpinner() {
        $('.fa-spin').show();
    }

    function hideSpinner() {
        $('.fa-spin').hide();
    }

    function fetchTasks() {
        showSpinner();
        tasksQuery.find()
            .then(onData, displayError)
            .always(hideSpinner); //.then asks function to run when data returns. takes in two parameters: function and what to do w/ an error
    }

    function onData(results) { //passed in an array of results
        tasks = results;
        renderTasks();
    }

    function renderTasks() {
        tasksList.empty();
        tasks.forEach(function(task) {
            $(document.createElement('li'))
                .text(task.get('title'))
                .appendTo(tasksList);
        });
    }

    //when the user submits the new task form...
    $('#new-task-form').submit(function(evt) { //pass in event object
        evt.preventDefault(); //don't want browser to do act, we do. need this + return false for all browsers!

        var titleInput = $(this).find('[name="title"]');
        var title = titleInput.val();
        var task = new Task();
        task.set('title', title);
        task.save().then(fetchTasks, displayError).then(function() {
            titleInput.val('');
        });

        return false;
    });

    //go and fetch tasks from the server
    fetchTasks();

    //window.setInterval(fetchTasks, 10000) //refers to overall browser window
});