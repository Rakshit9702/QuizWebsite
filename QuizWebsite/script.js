document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.dropbtn').addEventListener('click', function() {
        document.querySelector('.dropdown-content').classList.toggle('show');
    });

    document.getElementById('searchInput').addEventListener('keyup', function() {
        var input = document.getElementById('searchInput');
        var filter = input.value.toLowerCase();
        var dropdownContent = document.querySelector('.dropdown-content');
        var links = dropdownContent.getElementsByTagName('a');

        for (var i = 0; i < links.length; i++) {
            var txtValue = links[i].textContent || links[i].innerText;
            if (txtValue.toLowerCase().indexOf(filter) > -1) {
                links[i].style.display = "";
            } else {
                links[i].style.display = "none";
            }
        }
    });

    window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName('dropdown-content');
            for (var i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    };

    document.querySelectorAll('.dropdown-content a').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            var quizType = this.getAttribute('data-quiz');
            displayDifficultyOptions(quizType);
        });
    });

    function displayDifficultyOptions(quizType) {
        const difficultyOptions = `
            <h2>Select Difficulty for ${quizType.charAt(0).toUpperCase() + quizType.slice(1)} Quiz</h2>
            <button data-quiz="${quizType}" data-difficulty="easy">Easy</button>
            <button data-quiz="${quizType}" data-difficulty="medium">Medium</button>
            <button data-quiz="${quizType}" data-difficulty="hard">Hard</button>
        `;
        document.getElementById('quizContent').innerHTML = difficultyOptions;

        document.querySelectorAll('#quizContent button').forEach(button => {
            button.addEventListener('click', function() {
                const quizType = this.getAttribute('data-quiz');
                const difficulty = this.getAttribute('data-difficulty');
                loadQuiz(quizType, difficulty);
            });
        });
    }

    function loadQuiz(quizType, difficulty) {
        const quizzes = {
            maths: {
                easy: [
                    { question: "What is 1 + 1?", answers: [1, 2, 3], correct: 1 },
                    { question: "What is 2 + 2?", answers: [3, 4, 5], correct: 1 }
                ],
                medium: [
                    { question: "What is 10 + 10?", answers: [10, 20, 30], correct: 1 },
                    { question: "What is 15 + 5?", answers: [15, 20, 25], correct: 1 }
                ],
                hard: [
                    { question: "What is 50 + 50?", answers: [50, 100, 150], correct: 1 },
                    { question: "What is 75 + 25?", answers: [75, 100, 125], correct: 1 }
                ]
            },
            english: {
                easy: [
                    { question: "What is the synonym of 'happy'?", answers: ["Sad", "Joyful", "Angry"], correct: 1 },
                    { question: "What is the antonym of 'fast'?", answers: ["Quick", "Slow", "Rapid"], correct: 1 }
                ],
                medium: [
                    { question: "Which is a correct sentence?", answers: ["He go to school.", "He goes to school.", "He gone to school."], correct: 1 },
                    { question: "What is the past tense of 'run'?", answers: ["Runned", "Ran", "Run"], correct: 1 }
                ],
                hard: [
                    { question: "What is the meaning of 'ubiquitous'?", answers: ["Rare", "Everywhere", "Invisible"], correct: 1 },
                    { question: "What is the synonym of 'obsolete'?", answers: ["Current", "Outdated", "New"], correct: 1 }
                ]
            },
            computer: {
                easy: [
                    { question: "What does CPU stand for?", answers: ["Central Process Unit", "Central Processing Unit", "Computer Personal Unit"], correct: 1 },
                    { question: "What is the main language of the web?", answers: ["Python", "HTML", "C++"], correct: 1 }
                ],
                medium: [
                    { question: "What does RAM stand for?", answers: ["Random Access Memory", "Read Access Memory", "Run Access Memory"], correct: 0 },
                    { question: "What is the main function of an Operating System?", answers: ["To manage hardware and software resources", "To compile code", "To run the web browser"], correct: 0 }
                ],
                hard: [
                    { question: "What is polymorphism in programming?", answers: ["A function can take multiple forms", "A type of variable", "A type of loop"], correct: 0 },
                    { question: "Which protocol is used to transfer web pages?", answers: ["FTP", "HTTP", "SMTP"], correct: 1 }
                ]
            }
        };

        const selectedQuiz = quizzes[quizType][difficulty];
        let currentQuestionIndex = 0;
        let score = 0;
        let timer;

        function displayQuestion() {
            const questionObj = selectedQuiz[currentQuestionIndex];
            const questionHtml = `
                <div id="quiz-timer">10</div>
                <div id="quiz-score">Score: ${score}</div>
                <h2>${questionObj.question}</h2>
                ${questionObj.answers.map((answer, index) => 
                    `<button class="answer-button" data-index="${index}">${answer}</button>`
                ).join('')}
            `;
            document.getElementById('quizContent').innerHTML = questionHtml;

            startTimer();

            document.querySelectorAll('.answer-button').forEach(button => {
                button.addEventListener('click', function() {
                    const selectedIndex = parseInt(this.getAttribute('data-index'));
                    clearInterval(timer);
                    if (selectedIndex === questionObj.correct) {
                        this.style.backgroundColor = 'green';
                        score++;
                    } else {
                        this.style.backgroundColor = 'red';
                    }
                    setTimeout(() => {
                        currentQuestionIndex++;
                        if (currentQuestionIndex < selectedQuiz.length) {
                            displayQuestion();
                        } else {
                            document.getElementById('quizContent').innerHTML = `<h2>Quiz Completed!</h2><p>Your final score is ${score}.</p>`;
                        }
                    }, 1000);
                });
            });
        }

        function startTimer() {
            let timeLeft = 10;
            timer = setInterval(() => {
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    currentQuestionIndex++;
                    if (currentQuestionIndex < selectedQuiz.length) {
                        displayQuestion();
                    } else {
                        document.getElementById('quizContent').innerHTML = `<h2>Quiz Completed!</h2><p>Your final score is ${score}.</p>`;
                    }
                } else {
                    document.getElementById('quiz-timer').textContent = timeLeft;
                    timeLeft--;
                }
            }, 1000);
        }

        displayQuestion();
    }

    const calcDisplay = document.getElementById('calcDisplay');
    const calcButtons = document.querySelectorAll('.calc-btn');
    let currentInput = '';

    calcButtons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            if (value === 'C') {
                currentInput = '';
                calcDisplay.value = '';
            } else if (value === '=') {
                try {
                    currentInput = eval(currentInput).toString();
                    calcDisplay.value = currentInput;
                } catch {
                    calcDisplay.value = 'Error';
                    currentInput = '';
                }
            } else {
                currentInput += value;
                calcDisplay.value = currentInput;
            }
        });
    });
});
