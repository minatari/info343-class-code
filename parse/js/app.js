/*
    script for the index.html file
*/

<<<<<<< HEAD
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
=======

//OK to call this before the DOM is ready
Parse.initialize("u8fq2u4IqxKXBa9PuPjHB40HA39gqnxMq8lKJYkG", "R9zpakOjl4dXU3quSQ9tvTwwe0uQA2IJj3GdNKTt");

//when the document is ready...
$(function() {
    'use strict';

    //define a new Task object class with Parse
    var Task = Parse.Object.extend('Task');

    //define a query for querying Task objects
    var tasksQuery = new Parse.Query(Task);
    tasksQuery.ascending('createdAt');

    //varible to hold the current list of tasks
    var tasks = [];

    //reference to our error message alert
    var errorMessage = $('#error-message');

    //reference to the tasks list element
    var tasksList = $('#tasks-list');

    function displayError(err) {
        errorMessage.text(err.message);
        errorMessage.fadeIn();
    }

>>>>>>> 0e1f3c03a332ce37c172bdee43ad742a11ba4994
    function clearError() {
        errorMessage.hide();
    }

    function showSpinner() {
        $('.fa-spin').show();
    }

    function hideSpinner() {
        $('.fa-spin').hide();
    }

<<<<<<< HEAD
    function fetchTasks() {
        showSpinner();
        tasksQuery.find()
            .then(onData, displayError)
            .always(hideSpinner); //.then asks function to run when data returns. takes in two parameters: function and what to do w/ an error
    }

    function onData(results) { //passed in an array of results
=======
    function onData(results) {
>>>>>>> 0e1f3c03a332ce37c172bdee43ad742a11ba4994
        tasks = results;
        renderTasks();
    }

    function renderTasks() {
        tasksList.empty();
        tasks.forEach(function(task) {
<<<<<<< HEAD
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
=======
            $(document.createElement('li'))
                .text(task.get('title'))
                .appendTo(tasksList);
        });
    }

    function fetchTasks() {
        showSpinner();
        tasksQuery.find()
            .then(onData, displayError)
            .always(hideSpinner);
    }

    $('#new-task-form').submit(function(evt) {
        //tell the browser not to do its default behavior
        evt.preventDefault();

        //find the input element in this form 
        //with a name attribute set to "title"
        var titleInput = $(this).find('[name="title"]');
        
        //get the current value
        var title = titleInput.val();

        //create a new Task and set the title
        var task = new Task();
        task.set('title', title);

        //save the new task to your Parse database
        //if save is successful, fetch the tasks again
        //otherwise display the error
        //regardless, clear the title input
        //so the user can enter the next new task
        task.save()
            .then(fetchTasks, displayError)
            .then(function() {
                titleInput.val('');
            });

        //some browsers also require that we return false to
        //prevent the default behavior
        return false;
    }); //on new task form submit

    //fetch the tasks to kick everything off...
    fetchTasks();

    //refetch the tasks every so often
    //to get new tasks created by others
    window.setInterval(fetchTasks, 10000);
}); //on doc ready
>>>>>>> 0e1f3c03a332ce37c172bdee43ad742a11ba4994
