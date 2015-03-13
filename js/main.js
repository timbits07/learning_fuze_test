$(document).ready(function(){

  // Call Ace Editor and set theme and mode
  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.getSession().setMode("ace/mode/html");
  editor.setBehavioursEnabled(false);

  // Call to retrieve lesson data
  $.ajax({
    url: 'https://gist.githubusercontent.com/thireven/841b585de43a7d708bff/raw/abe8f8ceacff3817fb3ee5bf8219408819563629/sequence_sample.json',
    type: 'GET',
    dataType: 'json',
    //handle successful ajax call
    success: function(data) { 
      var lesson = data[0];
      buildLesson(lesson);
    }
  });

  // function that builds menu for lesson tasks
  function buildLesson(lesson){
    $('#lessonTitle').html(lesson.name);
    var tasks = lesson.sequences[0].tasks;
    for (i = 0; i < tasks.length; i++){
      $('#tasks').append('<li class="task" data-order="' + i + '">' + tasks[i].name + '</li>');
    }

    // When a task is clicked the lines from that task are loaded in and if code sequence is initiated.
    $('.task').click(function(){
      $('#lines').html('');
      var num = $(this).attr('data-order');
      var task = lesson.sequences[0].tasks[num];
      var lines = lesson.sequences[0].tasks[num].lines;
      if (task.options.type == "code") {
        $('#lines').html(lines[0] + "<br>");
        var index = 1;
        $('#editor').keypress(function(e){
          if (e.which == 13 && index < lines.length) {
            $('#lines').append(lines[index] + "<br>");
            index++;
          }
        });
      }
      else {
        $('#lines').html(lines);
      }
    });

    // Checking for accurate input by user
    editor.getSession().on('change', function(e) {
      
    });
  }

  




});
