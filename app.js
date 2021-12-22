const questionP = $('#question p');
const choices = $('input[type=radio]');
const choicesText = $('#answer label')
const submit = $('input[type=submit]');
const questionNbSpan = $('#question_number');
const goodP = $('#goodGuesses');
const wrongP = $('#wrongGuesses');

let questionNb = 0;

const answer = [
    "question1", "choix1",
    "question2", "choix 3",
    "question3", "choix a"
];
const qAndA = [
    'question1', ["choix1", "choix2", "choix3"],
    'question2', ["choix 1", "choix 2", "choix 3"],
    'question3', ["choix a", "choix b", "choix c"]
];

/**
 * print the question and the answers
 * @param index
 */
function printQuestionChoices(index) {
    questionNbSpan.text((parseInt(questionNbSpan.text()) + 1).toString())

    questionP.text(qAndA[index]);
    choicesText.eq(0).text(qAndA[index + 1][0]);
    choices.eq(0).val(qAndA[index + 1][0]);

    choicesText.eq(1).text(qAndA[index + 1][1]);
    choices.eq(1).val(qAndA[index + 1][1]);

    choicesText.eq(2).text(qAndA[index + 1][2]);
    choices.eq(2).val(qAndA[index + 1][2]);
}

printQuestionChoices(questionNb);

// which one is selected
choices.click(function (){
    choices.attr('select', "false")
    $(this).attr("select", "true");
})

submit.click(function () {
    let userChoice = null;
    choices.each(function () {
        if ($(this).attr('select') === "true")
            userChoice = $(this).val();
    })

    if (answer.includes(userChoice))
        goodP.html(goodP.html() + questionP.text() + '<br>')
    else
        wrongP.html(wrongP.html() + '<br>' + questionP.text() + ' : ' + answer[qAndA.indexOf(questionP.text()) + 1])

    questionNb += 2;

    if (questionNb < 6) {
        printQuestionChoices(questionNb);
    } else
        end()

})

function end() {
    $('#result').css('display', 'block')
    $('#game').css('display', 'none')
}

$('#result button').click(function () {
   questionNb = 0;
   printQuestionChoices(questionNb);
   goodP.html('');
   wrongP.html('');
   questionNbSpan.text('0')
   $('#result').css('display', 'none')
   $('#game').css('display', 'block')
});