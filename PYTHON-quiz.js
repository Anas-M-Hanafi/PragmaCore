const questions = [
    { q: "What is the correct way to create a function in Python?", options: ["def myFunction():", "function myFunction():", "create myFunction()"], a: "def myFunction():" },
    { q: "Which of the following is used to define a block of code in Python?", options: ["Curly braces {}", "Indentation", "Parentheses ()"], a: "Indentation" },
    { q: "How do you write a comment in Python?", options: ["// This is a comment", "# This is a comment", "/* This is a comment */"], a: "# This is a comment" },
    { q: "Which data type is immutable in Python?", options: ["List", "Dictionary", "Tuple"], a: "Tuple" },
    { q: "Which function is used to get the length of a list in Python?", options: ["length()", "size()", "len()"], a: "len()" },
    { q: "Which keyword is used to create a loop in Python?", options: ["loop","for", "repeat"], a: "for" },
    { q: "What will `print(2 ** 3)` output?", options: ["6", "8", "9"], a: "8" },
    { q: "Which method is used to add an item to the end of a list?", options: ["append()", "add()", "push()"], a: "append()" },
    { q: "What is the output of `bool([])` in Python?", options: ["True", "False"], a: "False" },
    { q: "Which of the following is used to handle exceptions in Python?", options: ["try-except", "catch-throw", "error-handling"], a: "try-except" }
];

// إعادة ترتيب الأسئلة بشكل عشوائي
questions.sort(() => Math.random() - 0.5);

let currentQuestionIndex = 0;
let completedQuestions = 0;
let incorrectAnswers = [];

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        document.getElementById("question").textContent = "🎉 You have completed all questions!";
        document.getElementById("options").style.display = "none";
        document.getElementById("incorrect-answers").innerHTML = incorrectAnswers.join(" ");
        return;
    }

    let questionData = questions[currentQuestionIndex];
    document.getElementById("question").textContent = questionData.q;
    let optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";

    questionData.options.forEach(option => {
        let button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");
        button.onclick = () => checkAnswer(button, option);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(button, answer) {
    let correctAnswer = questions[currentQuestionIndex].a;
    let result = document.getElementById("result");

    if (answer === correctAnswer) {
        button.classList.add("correct");
        completedQuestions++;
        document.getElementById("completed-questions").textContent = completedQuestions;
        result.textContent = "✔️ Correct Answer!";
        result.style.color = "green";
    } else {
        incorrectAnswers.push(`
            <p><strong>${incorrectAnswers.length + 1}.</strong> ❌ <b>Question:</b> ${questions[currentQuestionIndex].q} <br>
            🔹 <b>Your Answer:</b> <span style="color:red;">${answer}</span> <br>
            ✅ <b>Correct Answer:</b> <span style="color:green;">${correctAnswer}</span></p>
        `);
        button.classList.add("incorrect");
    }
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            result.textContent = "";
            loadQuestion();
        } else {
            document.getElementById("question").textContent = "🎉 You have completed all questions!";
            document.getElementById("options").style.display = "none";

            if (incorrectAnswers.length > 0) {
                document.getElementById("incorrect-answers").innerHTML = `
                    <h3>❌ Incorrect Answers:</h3>
                    <div style="border: 1px solid red; padding: 10px; border-radius: 5px; background-color: #ffe6e6;">
                        ${incorrectAnswers.join("")}
                    </div>
                `;
            }
        }
    }, 1000);
}

// تحميل السؤال الأول عند تشغيل الصفحة
document.addEventListener("DOMContentLoaded", loadQuestion);
