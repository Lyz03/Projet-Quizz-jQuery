const questionP = $('#question p');
const choices = $('input[type=radio]');
const choicesText = $('#answer label')
const submit = $('input[type=submit]');
const questionNbSpan = $('#question_number');
const goodP = $('#goodGuesses');
const wrongP = $('#wrongGuesses');

let questionNb = 0;

const answer = [
    "question1", "fils",
    "question2", "join()",
    "question3", "history.back()",
    "question4", "XMLHttpRequest",
    "question5", "à comparer la valeur et le type",
    "question6", "relâche, le bouton de la souris",
    "question7", "n'existe pas en JS",
    "question8", "01 Janvier 1970",
    "question9", "onBlur",
    "question10", "navigator"
];
const qAndA = [
    "L'objet 'Document', par rapport à l'objet 'Window' est :", ["père", "frère", "fils"],
    "Quel fonction fait l'inverse de split() ?", ["append()", "join()", "concat()"],
    "Comment afficher la page précédente du navigateur ?", ["rollback()", "c'est impossible", "history.back()"],
    "Avec quel objet JS peut communiquer avec un serveur web ?", ["XMLHttpRequest", "http_db_query", "XMLParseRequest"],
    "A quoi sert l'opérateur === ?", ["à comparer la valeur et le type", "à affecter après comparaison", "n'existe pas en JS"],
    "L'événement mouseUp, se produit quand l'utilisateur :", ["click sur un élément", "place le pointeur sur un élément", "relâche, le bouton de la souris"],
    "A quoi sert l'opérateur # = ?", ["à comparer deux nombre", "à comparer deux booléen", "n'existe pas en JS"],
    "la valeur d'une date représente le nombre de millisecondes depuis le :", ["01 Janvier 1850", "01 Janvier 1970", "01 Janvier 1900"],
    "Quel est l'évènement inverse de onFocus ?", ["onBlur", "onFocusOff", "onDeselect"],
    "Quel Objet indique le navigateur de l'utilisateur ?", ["navigator", "platform", "codeName"]
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

    // get the user answer
    let userChoice = null;
    choices.each(function () {
        if ($(this).attr('select') === "true")
            userChoice = $(this).val();
    })

    // check if it's correct
    if (answer.includes(userChoice))
        goodP.html(goodP.html() + questionP.text() + '<br>')
    else
        wrongP.html(wrongP.html() + '<br>' + questionP.text() + ' : ' + answer[qAndA.indexOf(questionP.text()) + 1])

    questionNb += 2;

    // print result
    if (questionNb < 20) {
        printQuestionChoices(questionNb);
    } else {
        $('#result').css('display', 'block');
        $('#game').css('display', 'none');
    }
})

// reset the game
$('#result button').click(function () {
   questionNb = 0;
   goodP.html('');
   wrongP.html('');
   questionNbSpan.text('0')
    printQuestionChoices(questionNb);
   $('#result').css('display', 'none')
   $('#game').css('display', 'block')
});