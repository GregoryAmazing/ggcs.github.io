
var questionsAmount = 0;
var curQuestionNum = 0;

const questionTypes = ["yes-no-regular", "yes-no-text", "yes-no-num", "multi-ans"];

var testQuestions = [
    {
        type: "multi-ans",
        text: "У вас бывает внезапное чувство паники?",
        answers: [{ text: "Очень часто", value: 3 }, { text: "Довольно часто", value: 2 },
        { text: "Не так уж часто", value: 1 }, { text: "Совсем не бывает", value: 0 }],
        questionnaireTitle: "Госпитальная Шкала Тревоги и Депрессии (HADS)"
    },
    {
        type: "yes-no-text",
        text: "У вас бывают судороги?",
        questionnaireTitle: "Симптомы"
    },
    {
        type: "yes-no-num",
        text: "У вас бывает повышение температуры?",
        helpText: "До скольки градусов?",
        questionnaireTitle: "Симптомы"
    },
    {
        type: "yes-no-regular",
        text: "У вас бывает чувство сдавления в груди?",
        questionnaireTitle: "Симптомы"
    },
    {
        type: "multi-ans",
        text: "Как бы вы оценили свое здоровье сейчас по сравнению с тем, что было год назад?",
        answers: [{ text: "Значительно лучше", value: 1 }, { text: "Несколько лучше", value: 2 },
        { text: "Примерно так же", value: 3 }, { text: "Несколько хуже", value: 4 }, 
        { text: "Гораздо хуже", value: 5 }],
        questionnaireTitle: "SF-36. Анкета оценки качества жизни"
    }
]

function genAnsHTML(innerText) {
    return '<div class="radio-container">' + innerText + '</div>';
}

var unanswered = []

function getUnanswered() {
    unanswered = [];
    $(".question-box").each(function (index, element) {
        let questionsIsAnswered = false;
        let hasAdditionalInput = $(element).find(".additional-input").length!=0;
        let additionalInput = $(element).find(".additional-input");
        let ansIsNo = false;
        $(element).find(".radio-container").each(function(childIndex, childElement) {
            if (childElement.classList.contains("checked")) {
                questionsIsAnswered = true;
                ansIsNo = childElement.classList.contains("ans-no")           
            }
        })
        
        if (hasAdditionalInput && additionalInput.find(".textnum-input")[0].value == "" && !ansIsNo)
        {
            questionsIsAnswered = false;
        }
        if (!questionsIsAnswered) {
            unanswered.push($(".question-box").index(element)+1);
        }
    });
}

function addQuestionsHTML(questionsArr) {
    let questionBody = $("#question-body");
    let questionHTML = '';
    for (let i = 0; i < questionsArr.length; i++) {
        let questionObj = questionsArr[i];
        let questionNum = i + 1;

        if (jQuery.inArray(questionObj.type, questionTypes) != -1) {

            switch (questionObj.type) {
                case "multi-ans":
                    questionHTML = `
                    <div id="question`+ questionNum + `" class="question-box">
                        <div id="questionHead">
                            <h3 class="mb-4"></h3>
                        </div>

                        <div class="questionAnswers">
                        </div>
                    </div>
                    `
                    questionBody.append(questionHTML);
                    break;

                case "yes-no-num":
                    questionHTML = `
                    <div id="question`+ questionNum + `" class="question-box">
                        <div id="questionHead">
                            <h3 class="mb-4"></h3>
                        </div>

                        <div class="questionAnswers">
                            <div class="radio-container ans-yes">Да</div>
                            <div class="radio-container ans-no">Нет</div>

                            <div id="numInput" class="additional-input">
                                <h4 class="input-help">Введите число:</h4>
                                <input class="form-control form-control-lg mb-4 textnum-input" type="number"
                                    placeholder="Нажмите что бы написать" id="example-number-input">
                            </div>
                        </div>
                    </div>
                    `
                    questionBody.append(questionHTML);
                    break;

                case "yes-no-text":
                    questionHTML = `
                    <div id="question`+ questionNum + `" class="question-box">
                        <div id="questionHead">
                            <h3 class="mb-4"></h3>
                        </div>

                        <div class="questionAnswers">
                            <div class="radio-container ans-yes">Да</div>
                            <div class="radio-container ans-no">Нет</div>

                            <div id="textInput"  class="additional-input">
                                <h4 class="input-help">Опишите:</h4>
                                <textarea class="form-control form-control-lg mb-4 textnum-input"
                                    id="exampleFormControlTextarea1" rows="4" placeholder="Нажмите что бы написать"></textarea>
                            </div>
                        </div>
                    </div>
                    `
                    questionBody.append(questionHTML);
                    break;

                case "yes-no-regular":
                    questionHTML = `
                    <div id="question`+ questionNum + `" class="question-box">
                        <div id="questionHead">
                            <h3 class="mb-4"></h3>
                        </div>

                        <div class="questionAnswers">
                            <div class="radio-container ans-yes">Да</div>
                            <div class="radio-container ans-no">Нет</div>
                        </div>
                    </div>
                    `
                    questionBody.append(questionHTML);
                    break;

                default:
                    alert("Такой тип вопроса не существует!")
                    break;
            }

            let questionBox = $("#question-body").children().last();
            let questionBoxAns = questionBox.find(".questionAnswers");

            questionBox.css("display", "contents");
            questionBox.find("#questionHead>h3").text(questionObj.text);

            if (questionObj.type == "multi-ans") {
                questionBoxAns.empty();
                questionObj.answers.forEach(question => {
                    questionBoxAns.append(genAnsHTML(question.text));
                    questionBoxAns.find(":last-child").value = question.value;
                });
            } else if (questionObj.type == "yes-no-num" || questionObj.type == "yes-no-text" || questionObj.type == "yes-no-regular") {
                if (questionObj.helpText) {
                    questionBox.find(".input-help").text(questionObj.helpText);
                }

            } else {
                alert("Такой тип вопроса не существует!")
            }

        }
    }
}

function displayQuestion(questionObj) {
    if (jQuery.inArray(questionObj.type, questionTypes) != -1) {

    }
}

function is_touch_device() {
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }
}

function radioChecked(radioBtn) {
    let questionBox = $(radioBtn).parent().parent();

    for (let i = 0; i < questionBox.find(".radio-container").length; i++) {
        var elem = questionBox.find(".radio-container")[i];
        if (elem == radioBtn) {
            elem.style = "background: #007bff; color: white;";
            elem.classList.add("checked")
        } else {
            elem.style = "background: #ffffff; color: #212529;";
            elem.classList.remove("checked")
        }
    }

    if (radioBtn.classList.contains("ans-yes")) {
        questionBox.find("#textInput").fadeIn(100);
        questionBox.find("#numInput").fadeIn(100);
    } else if (radioBtn.classList.contains("ans-no")) {
        questionBox.find("#textInput").fadeOut(100);
        questionBox.find("#numInput").fadeOut(100);
    }
}

document.onclick = function (event) {
    if (event.target.classList.contains("radio-container")) {
        radioChecked(event.target)
    }
}

function updateProgressBar() {
    $(".progress-bar.questions-progress").css("width", 100 * (curQuestionNum / questionsAmount) + "%");
    $("#questionsAmount").text(questionsAmount);
    $("#curQuestionNum").text(curQuestionNum);
}

function updateQuestionBody() {
    $(".question-box").hide();
    $("#question-body #question" + curQuestionNum).css("display", "contents");
    $("#questionnaire-title").text(testQuestions[curQuestionNum-1].questionnaireTitle)
    
    $("#endQestions").hide();
    if (curQuestionNum<=1) {
        $("#prevQestion").hide()
        $("#nextQestion").show()
    } else if (curQuestionNum>=questionsAmount) {
        $("#nextQestion").hide()
        $("#prevQestion").show()

        $("#endQestions").show()
    } else {
        $("#prevQestion").show()
        $("#nextQestion").show()
    }
}

function setProgress(maxValue, startValue = 0) {
    questionsAmount = maxValue;
    curQuestionNum = startValue;
    updateProgressBar()
}

function progressAdd(amount = 1) {
    if (curQuestionNum < questionsAmount) {
        curQuestionNum += amount;
        updateProgressBar();
        updateQuestionBody();
    }
}

function progressSubtract(amount = 1) {
    if (curQuestionNum > 1) {
        curQuestionNum -= amount;
        updateProgressBar();
        updateQuestionBody();
    }
}

setProgress(testQuestions.length, 0);
addQuestionsHTML(testQuestions);
progressAdd();

$("#nextQestion").click(function () {
    progressAdd()
});

$("#prevQestion").click(function () {
    progressSubtract()
});

$("#endQestions").click(function () {
    getUnanswered()
    if (unanswered.length > 0) {
        let alertString = "Вы не ответили на данные вопросы: "
        unanswered.forEach(function(element, index) {
            if (index < unanswered.length-1) {
                alertString+="вопрос №"+element+", "
            } else {
                alertString+="вопрос №"+element+". Вернитесь и ответьте на них чтобы завершить опрос."
            }
            
        });
        alert(alertString)
        alertString = "";
    } else {
        console.log("Send answeres to db.");
        $("#questionnaire").hide()
        $("#questionnaire-end-card").show()
    }
});


