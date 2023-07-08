import $ from 'jquery';

export var successCB = function (response) {
    console.log(response);
    renderTasks(response.task);
}

export var errorCB = function (error) {
    console.log('Error: ' + error);
}

$.ajaxSetup({
    headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
});

export var indexTasks = function (successCB, errorCB) {
    var request = {
        type: 'GET',
        url: 'api/tasks?api_key=1',
        success: successCB,
        error: errorCB
    };
    $.ajax(request);
}

export var postTask = function (content, successCB, errorCB) {
    var request = {
      type: 'POST',
      url: 'api/tasks?api_key=1',
      data: JSON.stringify({
        task: {
          content: content
        }
      }),
      contentType: 'application/json',
      success: successCB,
      error: errorCB
    };
    $.ajax(request);
};
  

export var deleteTask = function (id, successCB, errorCB) {
    var request = {
        type: 'DELETE',
        url: 'api/tasks/' + id + '?api_key=1',
        data: {
            task: {
                id: id
            }
        },
        success: successCB,
        error: errorCB
    }
    $.ajax(request);
}

export var updateTask = function (id, content, successCB, errorCB) {
    var request = {
        type: 'PUT',
        url: 'api/tasks/:id?api_key=1',
        data: {
            task: {
                id: id,
                content: content
            }
        },
        success: successCB,
        error: errorCB
    }
    $.ajax(request);
}

export var markTaskComplete = function (id, successCB, errorCB) {
    var request = {
        type: 'PUT',
        url: 'api/tasks/:id/mark_complete?api_key=1',
        data: {
            task: {
                id: id
            }
        },
        success: successCB,
        error: errorCB
    }
    $.ajax(request);
}

export var markTaskActive = function (id, successCB, errorCB) {
    var request = {
        type: 'PUT',
        url: 'api/tasks/:id/mark_active?api_key=1',
        data: {
            task: {
                id: id
            }
        },
        success: successCB,
        error: errorCB
    }
    $.ajax(request);
}