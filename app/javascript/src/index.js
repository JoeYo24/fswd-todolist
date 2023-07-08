import $ from 'jquery';
import { indexTasks, postTask, deleteTask, markTaskComplete, markTaskActive } from "./requests.js";

$(document).ready(function () {
  // Retrieve and render tasks
  indexTasks(function (response) {
    var htmlString = response.tasks.map(function (task) {
      return `<div class="col-12 mb-3 p-2 border rounded task" data-id="${task.id}">
        <div class="d-flex justify-content-between align-items-center">
          <span>${task.content}</span>
          <div>
            <button class="btn btn-xs btn-danger remove">X</button>
            <button class="btn btn-xs btn-success mark-complete">Mark Complete</button>
            <button class="btn btn-xs btn-primary mark-active">Mark Active</button>
          </div>
        </div>
      </div>`;
    });

    $("#tasks").html(htmlString.join(""));
  });

  // Add task form submission
  $("#new-task").on("submit", function (e) {
    e.preventDefault();
    var newTaskContent = $("#new-task-content").val();

    postTask(newTaskContent, function (response) {
      console.log('Task posted successfully', response);
      // Refresh tasks after successful creation
      indexTasks(function (response) {
        var htmlString = response.tasks.map(function (task) {
          return `<div class="col-12 mb-3 p-2 border rounded task" data-id="${task.id}">
            <div class="d-flex justify-content-between align-items-center">
              <span>${task.content}</span>
              <div>
                <button class="btn btn-xs btn-danger remove">X</button>
                <button class="btn btn-xs btn-success mark-complete">Mark Complete</button>
                <button class="btn btn-xs btn-primary mark-active">Mark Active</button>
              </div>
            </div>
          </div>`;
        });

        newTaskContent = $("#new-task-content").val("");
        $("#tasks").html(htmlString.join(""));
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
          var htmlString = response.tasks.map(function (task) {
            return `<div class="col-12 mb-3 p-2 border rounded task" data-id="${task.id}">
              <div class="d-flex justify-content-between align-items-center">
                <span>${task.content}</span>
                <div>
                  <button class="btn btn-xs btn-danger remove">X</button>
                  <button class="btn btn-xs btn-success mark-complete">Mark Complete</button>
                  <button class="btn btn-xs btn-primary mark-active">Mark Active</button>
                </div>
              </div>
            </div>`;
          });

          $("#tasks").html(htmlString.join(""));
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
          var htmlString = response.tasks.map(function (task) {
            return `<div class="col-12 mb-3 p-2 border rounded task" data-id="${task.id}">
              <div class="d-flex justify-content-between align-items-center">
                <span>${task.content}</span>
                <div>
                  <button class="btn btn-xs btn-danger remove">X</button>
                  <button class="btn btn-xs btn-success mark-complete">Mark Complete</button>
                  <button class="btn btn-xs btn-primary mark-active">Mark Active</button>
                </div>
              </div>
            </div>`;
          });

          $("#tasks").html(htmlString.join(""));
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
          var htmlString = response.tasks.map(function (task) {
            return `<div class="col-12 mb-3 p-2 border rounded task" data-id="${task.id}">
              <div class="d-flex justify-content-between align-items-center">
                <span>${task.content}</span>
                <div>
                  <button class="btn btn-xs btn-danger remove">X</button>
                  <button class="btn btn-xs btn-success mark-complete">Mark Complete</button>
                  <button class="btn btn-xs btn-primary mark-active">Mark Active</button>
                </div>
              </div>
            </div>`;
          });

          $("#tasks").html(htmlString.join(""));
        });
      });
    }
  });
});



