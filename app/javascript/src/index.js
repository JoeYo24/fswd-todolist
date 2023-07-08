import $ from 'jquery';
import { indexTasks, postTask, deleteTask } from "./requests.js";

$(document).ready(function () {
  // Retrieve and render tasks
  indexTasks(function (response) {
    var htmlString = response.tasks.map(function (task) {
      return `<div class="col-12 mb-3 p-2 border rounded task" data-id="${task.id}">
        <div class="d-flex justify-content-between align-items-center">
          <span>${task.content}</span>
          <button class="btn btn-xs btn-danger remove">X</button>
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
              <button class="btn btn-xs btn-danger remove">X</button>
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
                <button class="btn btn-xs btn-danger remove">X</button>
              </div>
            </div>`;
          });

          $("#tasks").html(htmlString.join(""));
        });
      });
    }
  });
});

