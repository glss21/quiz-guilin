class Quiz {
  constructor() {
    this.questions = [];
    this.correctAnswers = 0;
  }
}

class Question {
  constructor(quest_number, question, options) {
    this.quest_number = quest_number;
    this.question = question;
    this.options = [];
    //this.category = null; // Not defined yet
    for (var option of options) {
      this.addOption(option.alt, option.correct);
    }
  }

  addOption(option_alt, option_correct) {
    var new_option = new Option(option_alt, option_correct);
    this.options.push(new_option)
  }
}

class Option {
  constructor(quiz_alt, quiz_correct) {
    this.alt = quiz_alt;
    this.correctStr = quiz_correct;
    this.correct = (quiz_correct == 'true');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var json = getJSON("https://quiz31.free.beeceptor.com");
  var quiz = new Quiz();

  for (var question_all of json) {
    var x = new Question(question_all.quest_number, question_all.question, question_all.options);
    quiz.questions.push(x);
  }

  var allQuestions_arr = Object.values(quiz)[0];
  var list = document.getElementById("all_questions");
  list.innerHTML = "";

  function initialAllQuestions() {
    for (var j = 0; j < allQuestions_arr.length; j++) {
      generateQuestion(j, list, "");
    }
  }

  function generateQuestion(i, div_container, id_prefix) {
    var questionDiv_i = document.createElement("div");
    questionDiv_i.id = id_prefix + "divQuestion_" + i;
    var questionAllQuest = document.createElement("p");
    questionAllQuest.id = id_prefix + "question_" + i;

    var questionAllOption1 = document.createElement("div");
    questionAllOption1.id = id_prefix + "divOption1_" + i;
    var Option1_check = document.createElement("input");
    Option1_check.type = "checkbox";
    Option1_check.id = id_prefix + "chkOption1_" + i;
    Option1_check.class = "checkOption";
    Option1_check.value = allQuestions_arr[i].options[0].correct;

    var questionAllOption2 = document.createElement("div");
    questionAllOption1.id = id_prefix + "divOption2_" + i;
    var Option2_check = document.createElement("input");
    Option2_check.type = "checkbox";
    Option2_check.id = id_prefix + "chkOption2_" + i;
    Option2_check.class = "checkOption";
    Option2_check.value = allQuestions_arr[i].options[1].correct;

    var questionAllOption3 = document.createElement("div");
    questionAllOption1.id = id_prefix + "divOption3_" + i;
    var Option3_check = document.createElement("input");
    Option3_check.type = "checkbox";
    Option3_check.id = id_prefix + "chkOption3_" + i;
    Option3_check.class = "checkOption";
    Option3_check.value = allQuestions_arr[i].options[2].correct;

    var questionAllOption4 = document.createElement("div");
    questionAllOption1.id = id_prefix + "divOption4_" + i;
    var Option4_check = document.createElement("input");
    Option4_check.type = "checkbox";
    Option4_check.id = id_prefix + "chkOption4_" + i;
    Option4_check.class = "checkOption";
    Option1_check.value = allQuestions_arr[i].options[3].correct;

    questionAllOption1.appendChild(Option1_check);
    questionAllOption2.appendChild(Option2_check);
    questionAllOption3.appendChild(Option3_check);
    questionAllOption4.appendChild(Option4_check);

    questionDiv_i.appendChild(questionAllQuest);
    questionDiv_i.appendChild(questionAllOption1);
    questionDiv_i.appendChild(questionAllOption2);
    questionDiv_i.appendChild(questionAllOption3);
    questionDiv_i.appendChild(questionAllOption4);

    questionAllQuest.innerHTML = allQuestions_arr[i].quest_number + ". " + allQuestions_arr[i].question;
    questionAllOption1.innerHTML += " " + allQuestions_arr[i].options[0].alt + " " + allQuestions_arr[i].options[0].correct;
    questionAllOption2.innerHTML += " " + allQuestions_arr[i].options[1].alt + " " + allQuestions_arr[i].options[1].correct;
    questionAllOption3.innerHTML += " " + allQuestions_arr[i].options[2].alt + " " + allQuestions_arr[i].options[2].correct;
    questionAllOption4.innerHTML += " " + allQuestions_arr[i].options[3].alt + " " + allQuestions_arr[i].options[3].correct;

    div_container.appendChild(questionDiv_i);
  }

  // Define global variables
  //var allQuestionsArea = document.getElementById("allQuestionsArea"); //will dispear when click "Start"
  var startArea = document.getElementById("startArea"); ////will dispear when click "Start"
  var welcome_message = document.getElementById("welcome"); ////will add visitors's name when click "Start"
  var name = document.getElementById("name"); //input, visitor's name

  var numberOfQuestions = document.getElementById("noOfQuestions"); //visitor choose how many questions here
  //var quizArea = document.getElementById("quizArea");  //this block will show up when click "Start"
  var quiz_display = document.getElementById("quiz_display");

  var buttons = document.getElementById("buttons");

  var btn_start = document.getElementById("btn_start"); //"Start" button;
  var btn_next = document.getElementById("btn_next");
  var btn_previous = document.getElementById("btn_previous");
  var btn_submit = document.getElementById("btn_submit");

  var currentQuestion = 0;

  btn_start.addEventListener("click", start);

  function start() {
    welcome_message.innerHTML = name.value + ", welcom to the quiz!"
    startArea.style.display = "none";
    quiz_display.style.display = "block";
    showQuestion(0);
    buttons.style.display = "flex";
    btn_next.style.display = "inline"
    btn_submit.style.display = "none";
    btn_previous.style.display = "none";
    showQuestion(0);
  }

  function showQuestion(questionIndex) {

    // Show question headline
    document.getElementById("question_number").innerHTML = (questionIndex + 1) + " of " + numberOfQuestions.value;

    // Transfer data about the selected question to current shown in DOM
    document.getElementById("question").innerHTML = allQuestions_arr[questionIndex].question;
    document.getElementById("option_first").innerHTML = allQuestions_arr[questionIndex].options[0].alt;
    document.getElementById("option_second").innerHTML = allQuestions_arr[questionIndex].options[1].alt;
    document.getElementById("option_third").innerHTML = allQuestions_arr[questionIndex].options[2].alt;
    document.getElementById("option_fourth").innerHTML = allQuestions_arr[questionIndex].options[3].alt;

    // Set answers if earlier saved
    restoreAnswers();

    // Show different buttons depending on currently show question in sequence
    if (questionIndex == 0) {
      // On first question
      btn_previous.style.display = "none";
      btn_next.style.display = "inline";
      btn_submit.style.display = "none";
    } else if (questionIndex < numberOfQuestions.value - 1) {
      console.log(numberOfQuestions.value);
      // Not yet on last question
      btn_previous.style.display = "inline";
      btn_next.style.display = "inline";
      btn_submit.style.display = "none";
    } else {
      // On last question
      btn_previous.style.display = "inline";
      btn_next.style.display = "none";
      btn_submit.style.display = "inline";
    }
  }

  btn_previous.addEventListener("click", function() {
    saveAnswers();
    currentQuestion--;
    showQuestion(currentQuestion);
  });

  btn_next.addEventListener("click", function() {
    saveAnswers();
    currentQuestion++;
    showQuestion(currentQuestion);
  });

  function saveAnswers() {
    document.getElementById("chkOption1_" + currentQuestion).checked = document.getElementById("option_1").checked;
    document.getElementById("chkOption2_" + currentQuestion).checked = document.getElementById("option_2").checked;
    document.getElementById("chkOption3_" + currentQuestion).checked = document.getElementById("option_3").checked;
    document.getElementById("chkOption4_" + currentQuestion).checked = document.getElementById("option_4").checked;
  }

  function restoreAnswers() {
    document.getElementById("option_1").checked = document.getElementById("chkOption1_" + currentQuestion).checked;
    document.getElementById("option_2").checked = document.getElementById("chkOption2_" + currentQuestion).checked;
    document.getElementById("option_3").checked = document.getElementById("chkOption3_" + currentQuestion).checked;
    document.getElementById("option_4").checked = document.getElementById("chkOption4_" + currentQuestion).checked;
  }

  // Submit and get all quiz-questions and options and correct
  var list_quizQuestionDiv = document.getElementById("result_all");
  list_quizQuestionDiv.innerHTML = "";

  var result_1 = document.getElementById("result_1");
  var result_2 = document.getElementById("result_2");
  var result_3 = document.getElementById("result_3");
  var Q_A = document.getElementById("Q_A");

  var result_part = document.getElementById("result_part");
  btn_submit.addEventListener("click", function() {

    saveAnswers();

    //-- Transition view to result area
    quiz_display.style.display = "none";
    result_part.style.display = "inline";
    Q_A.style.color = "#66BFBF";
    quiz.correctAnswers = 0;

    // Generate result data objects and check answers
    for (var n = 0; n < noOfQuestions.value; n++) {
      generateQuestion(n, list_quizQuestionDiv, "res_");
      var isAllCorrect = true;
      var x;

      x = document.getElementById("chkOption1_" + n).checked;
      document.getElementById("res_chkOption1_" + n).checked = x;
      if (x != quiz.questions[n].options[0].correct) isAllCorrect = false;

      x = document.getElementById("chkOption2_" + n).checked;
      document.getElementById("res_chkOption2_" + n).checked = x;
      if (x != quiz.questions[n].options[1].correct) isAllCorrect = false;

      x = document.getElementById("chkOption3_" + n).checked;
      document.getElementById("res_chkOption3_" + n).checked = x;
      if (x != quiz.questions[n].options[2].correct) isAllCorrect = false;

      x = document.getElementById("chkOption4_" + n).checked;
      document.getElementById("res_chkOption4_" + n).checked = x;
      if (x != quiz.questions[n].options[3].correct) isAllCorrect = false;

      if (isAllCorrect == true) {
        document.getElementById("res_question_" + n).style.backgroundColor = "#66BFBF";
        document.getElementById("res_question_" + n).style.Color = "#fff";
        quiz.correctAnswers++;
      } else
        document.getElementById("res_question_" + n).style.backgroundColor = "#ffb3b3";
      document.getElementById("res_question_" + n).style.Color = "#fff";

    }

    result_1.innerHTML = "Name: " + name.value;
    result_2.innerHTML = "Number of Questions: " + noOfQuestions.value;
    result_3.innerHTML = "Points: " + quiz.correctAnswers + " out of " + numberOfQuestions.value;

  });

  initialAllQuestions();

});
