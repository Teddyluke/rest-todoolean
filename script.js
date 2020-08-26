
var myDoor = 3014;


// listener sul click del bottone task
function addNewTaskListener() {

  var btn = $("#task_btn");

  btn.click(getTaskValue);
}

// acquisizione valore input new task
function getTaskValue() {
  var newTask = $('#new_task');
  var newTaskValue = newTask.val();
  newTask.val(" ");

  insertNewTask(newTaskValue)
}

// inserisce nuovo task nella lista
function insertNewTask(newTaskValue) {

  $.ajax({
    url: 'http://157.230.17.132:'+ myDoor +'/todos',
    method: 'POST',
    data: {
      text: newTaskValue
    },
    success: function (data) {
      getTaskList();
    },
    error: function (err) {

    }
  });

}

// recupera la lista delle task da compiere
function getTaskList() {

  $.ajax({
    url: `http://157.230.17.132:`+ myDoor +`/todos`,
    method: 'GET',
    success: function (data) {

      printTaskList(data)

    },
    error: function (error) {
      console.log(error);
    }
  });
}

// stampa a schermo la lista delle task da compiere
function printTaskList(tasks) {

  var target = $(".lista");
  target.text(" ");
  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i];
    target.append('<li data-id="'+ task.id +'"> '+ task.text +''+'<span class="delete" data-id="'+ task.id +'"> - X </span>'+'</li>')
  }

}

// intercetta il click sul target da eliminare
function deleteTaskListener() {

  $(document).on('click', '.delete', deleteTask);
}

// elimina il task cliccato
function deleteTask() {
  var deleteButton = $(this);
  var id = deleteButton.data('id');
  $.ajax ({
    url: `http://157.230.17.132:${myDoor}/todos/${id}`,
    method: 'DELETE',
    success: function (data) {
      console.log(data);
      getTaskList();
    },
    error: function (err) {
      console.log(err);
    }

  });
}


function init() {
  getTaskList();
  addNewTaskListener();
  deleteTaskListener();
}



$(document).ready(init);
