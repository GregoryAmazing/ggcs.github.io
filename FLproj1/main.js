
var questionsAmount = 0;
var curQuestionNum = 0;

const questionTypes = ["yes-no-regular", "yes-no-text", "yes-no-num", "multi-ans"];

var testQuestions = [
    {
        type: "multi-ans",
        text: "У вас бывает внезапное чувство паники?",
        answers: [{ text: "Очень часто", value: 3 }, { text: "Довольно часто", value: 2 },
        { text: "Не так уж часто", value: 1 }, { text: "Совсем не бывает", value: 0 }]
    },
    {
        type: "yes-no-text",
        text: "У вас бывают судороги?"
    },
    {
        type: "yes-no-num",
        text: "У вас бывает повышение температуры?",
        helpText: "До скольки градусов?"
    },
    {
        type: "yes-no-regular",
        text: "У вас бывает чувство сдавления в груди?"
    }
]

function genAnsHTML(innerText) {
    return '<div class="radio-container">' + innerText + '</div>';
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
                            <h2 class="mb-4"></h2>
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
                            <h2 class="mb-4"></h2>
                        </div>

                        <div class="questionAnswers">
                            <div class="radio-container ans-yes">Да</div>
                            <div class="radio-container ans-no">Нет</div>

                            <div id="numInput">
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
                            <h2 class="mb-4"></h2>
                        </div>

                        <div class="questionAnswers">
                            <div class="radio-container ans-yes">Да</div>
                            <div class="radio-container ans-no">Нет</div>

                            <div id="textInput">
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
                            <h2 class="mb-4"></h2>
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
            questionBox.find("#questionHead>h2").text(questionObj.text);

            console.log(questionBox.find("#questionHead>h2"));


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

setProgress(4, 0);
addQuestionsHTML(testQuestions);
progressAdd();

$("#nextQestion").click(function () {
    progressAdd()
});

$("#prevQestion").click(function () {
    progressSubtract()
});