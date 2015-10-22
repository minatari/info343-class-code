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
    tasksQuery.notEqualTo('done', true);
//    tasksQuery.destory().then(success, destory)
    //reference to the task list element
    var tasksList = $('#tasks-list');

    //reference to our rating element
    var ratingElem = $('#rating');

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
            var li = $(document.createElement('li'))
                .text(task.get('title'))
                .addClass(task.get('done') ? 'completed-task' : '') //if task done, add completed-task, else add nothing
                .appendTo(tasksList)
                .click(function() {
                    task.set('done', !task.get('done')); //toggle between true and false
                    task.save().then(renderTasks, displayError);
                });
            $(document.createElement('span'))
                .raty({readOnly: true,
                    score: (task.get('rating') || 5), //actual rating, or what you want to default to
                    hints: ['meh', 'ehh', 'aight', 'cool', 'heart eyes emoji']})
                .appendTo(li);
        });
    }
    function showMessage(message) {
        message = message || 'Hello';
        alert(message);
    }
    //showMessage('World');

    //when the user submits the new task form...
    $('#new-task-form').submit(function(evt) { //pass in event object
        evt.preventDefault(); //don't want browser to do act, we do. need this + return false for all browsers!

        var titleInput = $(this).find('[name="title"]');
        var title = titleInput.val();

        var task = new Task();
        task.set('title', title);
        task.set('rating', ratingElem.raty('score')); //help

        task.save().then(fetchTasks, displayError).then(function() {
            titleInput.val('');
            ratingElem.raty('set', {});
        });

        return false;
    });

    //go and fetch tasks from the server
    fetchTasks();

    //enable rating user interface element
    ratingElem.raty(); //.raty({readOnly: true}) for just showing stuff

    //window.setInterval(fetchTasks, 10000) //refers to overall browser window
});