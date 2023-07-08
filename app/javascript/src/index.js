import $ from 'jquery';
import { indexTasks, postTask, deleteTask, markTaskComplete, markTaskActive } from "./requests.js";

$(document).ready(function () {
  // Retrieve and render tasks
  indexTasks(function (response) {
    var tasks = response.tasks;
    var activeTasks = tasks.filter(task => !task.completed);
    var completedTasks = tasks.filter(task => task.completed);

    var activeTasksHtml = activeTasks.map(function (task) {
      return generateTaskHtml(task, false);
    });

    var completedTasksHtml = completedTasks.map(function (task) {
      return generateTaskHtml(task, true);
    });

    var htmlString = activeTasksHtml.concat(completedTasksHtml).join("");
    $("#tasks").html(htmlString);
  });

  // Add task form submission
  $("#new-task").on("submit", function (e) {
    e.preventDefault();
    var newTaskContent = $("#new-task-content").val();

    postTask(newTaskContent, function (response) {
      console.log('Task posted successfully', response);
      // Refresh tasks after successful creation
      indexTasks(function (response) {
        var tasks = response.tasks;
        var activeTasks = tasks.filter(task => !task.completed);
        var completedTasks = tasks.filter(task => task.completed);

        var activeTasksHtml = activeTasks.map(function (task) {
          return generateTaskHtml(task, false);
        });

        var completedTasksHtml = completedTasks.map(function (task) {
          return generateTaskHtml(task, true);
        });

        var htmlString = activeTasksHtml.concat(completedTasksHtml).join("");
        $("#tasks").html(htmlString);
        $("#new-task-content").val("");
      });
    }, function (error) {
      console.log('Error posting task', error);
    });
  });

  // Remove task
  $("#tasks").on("click", ".remove", function (e) {
    e.preventDefault();
    var task = $(this).closest(".task")
    var taskId = task.data("id");

    if (task && taskId) {
      deleteTask(taskId, function (response) {
        console.log('Task deleted successfully', response);
        // Refresh tasks after successful deletion
        indexTasks(function (response) {
          var tasks = response.tasks;
          var activeTasks = tasks.filter(task => !task.completed);
          var completedTasks = tasks.filter(task => task.completed);

          var activeTasksHtml = activeTasks.map(function (task) {
            return generateTaskHtml(task, false);
          });

          var completedTasksHtml = completedTasks.map(function (task) {
            return generateTaskHtml(task, true);
          });

          var htmlString = activeTasksHtml.concat(completedTasksHtml).join("");
          $("#tasks").html(htmlString);
        });
      });
    }
  });

  // Mark task as complete
  $("#tasks").on("click", ".mark-complete", function (e) {
    e.preventDefault();
    var task = $(this).closest(".task")
    var taskId = task.data("id");

    if (task && taskId) {
      markTaskComplete(taskId, function (response) {
        console.log('Task marked as complete', response);
        // Refresh tasks after marking as complete
        indexTasks(function (response) {
          var tasks = response.tasks;
          var activeTasks = tasks.filter(task => !task.completed);
          var completedTasks = tasks.filter(task => task.completed);

          var activeTasksHtml = activeTasks.map(function (task) {
            return generateTaskHtml(task, false);
          });

          var completedTasksHtml = completedTasks.map(function (task) {
            return generateTaskHtml(task, true);
          });

          var htmlString = activeTasksHtml.concat(completedTasksHtml).join("");
          $("#tasks").html(htmlString);
        });
      });
    }
  });

  // Mark task as active
  $("#tasks").on("click", ".mark-active", function (e) {
    e.preventDefault();
    var task = $(this).closest(".task")
    var taskId = task.data("id");

    if (task && taskId) {
      markTaskActive(taskId, function (response) {
        console.log('Task marked as active', response);
        // Refresh tasks after marking as active
        indexTasks(function (response) {
          var tasks = response.tasks;
          var activeTasks = tasks.filter(task => !task.completed);
          var completedTasks = tasks.filter(task => task.completed);

          var activeTasksHtml = activeTasks.map(function (task) {
            return generateTaskHtml(task, false);
          });

          var completedTasksHtml = completedTasks.map(function (task) {
            return generateTaskHtml(task, true);
          });

          var htmlString = activeTasksHtml.concat(completedTasksHtml).join("");
          $("#tasks").html(htmlString);
        });
      });
    }
  });

  // Helper function to generate task HTML based on completion status
  function generateTaskHtml(task, completed) {
    var taskClass = completed ? 'completed' : 'active';
    var taskContent = completed ? `<del>${task.content}</del>` : task.content;

    return `<div class="col-12 mb-3 p-2 border rounded task ${taskClass}" data-id="${task.id}">
      <div class="d-flex justify-content-between align-items-center">
        <span>${taskContent}</span>
        <div>
          <button class="btn btn-xs btn-danger remove">X</button>
          <button class="btn btn-xs btn-success mark-complete">Mark Complete</button>
          <button class="btn btn-xs btn-primary mark-active">Mark Active</button>
        </div>
      </div>
    </div>`;
  }
});



