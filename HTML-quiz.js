const questions = [
    { q: "Which element is used to link an external CSS file?", options: ["style", "script", "link"], a: "link" },
    { q: "Which input type is used for passwords in HTML forms?", options: ["<input type='password'>", "password", "<input type='text'>"], a: "<input type='password'>" },
    { q: "Which element defines sidebar content like a navigation menu?", options: ["aside", "nav", "footer"], a: "aside" },
    { q: "Which method is used to resize an image in HTML & CSS?", options: ["Using size attribute", "Using CSS width and height properties", "Using rs attribute"], a: "Using CSS width and height properties" },
    { q: "What is the function of the alt attribute in images?", options: ["Put alternative text to an image", "Alternative text mode for the image", "Provides alternative text for screen readers"], a: "Provides alternative text for screen readers" },
    { q: "Which element is used to define a scrollable division in a webpage?", options: ["span", "div", "section"], a: "div" },
    { q: "Which element is used to embed another webpage inside an HTML document?", options: ["iframe", "embed", "object"], a: "iframe" },
    { q: "Which element groups form entries with a label?", options: ["legend", "fieldset", "label"], a: "fieldset" },
    { q: "If I design the HTML page on Mac, will the user be able to see the same design if opened from Windows 7?", options: ["Yes, the same design.", "No"], a: "Yes, the same design." },
    { q: "Which element defines an independent section in a document?", options: ["article", "aside", "section"], a: "article" },
    { q: "Which tag is used to create a hyperlink?", options: ["<link>", "<a>", "<url>"], a: "<a>" },
    { q: "Which HTML element is used to define important text?", options: ["<strong>", "<b>", "<em>"], a: "<strong>" },
    { q: "Which HTML tag is used for inserting a line break?", options: ["<br>", "<hr>", "<lb>"], a: "<br>" },
    { q: "Which attribute is used to provide additional information about an element?", options: ["alt", "title", "info"], a: "title" },
    { q: "Which doctype declaration is correct for HTML5?", options: ["<!DOCTYPE html5>", "<!DOCTYPE HTML>", "<!DOCTYPE html>"], a: "<!DOCTYPE html>" }
];

// إعادة ترتيب الأسئلة بشكل عشوائي
questions.sort(() => Math.random() - 0.5);

let currentQuestionIndex = 0;
let completedQuestions = 0;
let incorrectAnswers = [];
let timerInterval;
const timeLimit = 10; // عدد الثواني لكل سؤال

function startTimer() {
    let timeLeft = timeLimit;
    document.getElementById("timer").textContent = `⏳ Time left: ${timeLeft}s`;

    clearInterval(timerInterval); // إيقاف أي مؤقت سابق قبل بدء الجديد

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = `⏳ Time left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            checkAnswer(null, "⏳ Time's up! No answer"); // يعتبر الإجابة خاطئة
        }
    }, 1000);
}

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
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

    startTimer(); // بدء العد التنازلي بعد تحميل السؤال
}

function checkAnswer(button, answer) {
    clearInterval(timerInterval); // إيقاف المؤقت عند الإجابة

    let correctAnswer = questions[currentQuestionIndex].a;
    let result = document.getElementById("result");

    // تعطيل جميع الأزرار بعد الإجابة
    document.querySelectorAll(".option-btn").forEach(btn => {
        btn.disabled = true; // تعطيل الأزرار بعد الإجابة
    });

    if (answer === correctAnswer) {
        if (button) button.classList.add("correct");
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
        if (button) button.classList.add("incorrect");
        result.textContent = "❌ Wrong Answer!";
        result.style.color = "red";
    }

    setTimeout(() => {
        currentQuestionIndex++;
        result.textContent = "";
        loadQuestion();
    }, 1500);
}

// تحميل السؤال الأول عند تشغيل الصفحة
document.addEventListener("DOMContentLoaded", loadQuestion);
