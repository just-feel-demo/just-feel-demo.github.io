const TIME_LVL1 = 90,
    TIME_LVL2 = 60,
    TIME_LVL3 = 60,
    TIME_LVL4 = 60,
    TIME_LVL5 = 60,
    MAX_LIVES_LVL1 = 5,
    MAX_LIVES_LVL2 = 2,
    MAX_LIVES_LVL3 = 2,
    MAX_LIVES_LVL4 = 2,
    MAX_LIVES_LVL5 = 2,
    WIN_SCORE_LVL1 = 4,
    WIN_SCORE_LVL2 = 1,
    WIN_SCORE_LVL3 = 1,
    WIN_SCORE_LVL4 = 1,
    WIN_SCORE_LVL5 = 1,
    STAGE_PROMPT_LVL1 = "Stage 1",
    STAGE_PROMPT_LVL2 = "Stage 2",
    PROMPT_LVL1 = "Which emotions are pictured below? Try to match each emotion with its picture!",
    PROMPT_LVL2 = "Polly is telling you a story. Would you help her answer some questions?",
    PROMPT_LVL3 = "Which emotion should Polly be feeling?",
    PROMPT_LVL4 = "How should Polly express her feeling?",
    PROMPT_LVL5 = "What should Polly do?",
    PROMPT_LVL1_WIN = {
        3: "You have mastered all emotional vocabularies!",
        2: "You are good with most emotional vocabularies.",
        1: "You could still learn more about emotional vocabularies, keep it up!"
    },
    PROMPT_LVL5_WIN = {
        3: "You understand how to correctly express your feelings",
        2: "You understand the basics of expressing your feelings",
        1: "You could still learn more about expressing your feelings, keep it up!"
    },
    THANKS_PAGE_URL = "/thanks";
let time, score, lives, level, rating, win_score;
const time_element = document.getElementById("time"),
    lives_element = document.getElementById("lives"),
    rating_element = document.getElementById("rating"),
    prompt_element = document.getElementById("prompt"),
    stage_prompt_element = document.getElementById("stage_prompt"),
    win_prompt_element = document.getElementById("win_prompt"),
    lvl1_element = document.getElementById("lvl1"),
    lvl2_element = document.getElementById("lvl2"),
    lvl3_element = document.getElementById("lvl3"),
    lvl4_element = document.getElementById("lvl4"),
    lvl5_element = document.getElementById("lvl5"),
    result_element = document.getElementById("Result"),
    next_button = document.getElementById("next");
let star = document.getElementsByClassName("stars"),
    stars = [...star],
    card = document.getElementsByClassName("card"),
    cards = [...card];
var openedcards = [];
let matchedcard = document.getElementsByClassName("match");

function startGame() {
    startLvl1()
}

function startLvl1() {
    level = 1, openedcards = [], time = TIME_LVL1, score = 0, win_score = WIN_SCORE_LVL1, lives = MAX_LIVES_LVL1, rating = 0, displayLives(), displayRating(), prompt_element.innerHTML = PROMPT_LVL1, stage_prompt_element.innerHTML = STAGE_PROMPT_LVL1, startTimer(), lvl1_element.style.display = "block"
}

function startLvl2() {
    level = 2, stars[rating].style.display = "none", result_element.style.display = "none", next_button.removeEventListener("click", startLvl2), lvl1_element.style.display = "none", time = TIME_LVL2, score = 0, win_score = WIN_SCORE_LVL2, lives = MAX_LIVES_LVL2, rating = 0, displayLives(), displayRating(), prompt_element.innerHTML = PROMPT_LVL2, stage_prompt_element.innerHTML = STAGE_PROMPT_LVL2, enable(), startTimer(), lvl2_element.style.display = "block"
}

function startLvl3() {
    level = 3, lvl2_element.style.display = "none", time = TIME_LVL3, score = 0, win_score = WIN_SCORE_LVL3, lives = MAX_LIVES_LVL3, displayLives(), displayRating(), prompt_element.innerHTML = PROMPT_LVL3, startTimer(), lvl3_element.style.display = "block"
}

function startLvl4() {
    level = 4, lvl3_element.style.display = "none", time = TIME_LVL4, score = 0, win_score = WIN_SCORE_LVL4, lives = MAX_LIVES_LVL4, displayLives(), displayRating(), prompt_element.innerHTML = PROMPT_LVL4, startTimer(), lvl4_element.style.display = "block"
}

function startLvl5() {
    level = 5, lvl4_element.style.display = "none", time = TIME_LVL5, score = 0, win_score = WIN_SCORE_LVL5, lives = MAX_LIVES_LVL5, displayLives(), displayRating(), prompt_element.innerHTML = PROMPT_LVL5, startTimer(), lvl5_element.style.display = "block"
}

function nextLevel() {
    clearInterval(interval), 1 === level ? (disable(), score === win_score && lives <= MAX_LIVES_LVL1 - WIN_SCORE_LVL1 && (rating = 2, displayRating()), result_element.style.display = "flex", stars[rating].style.display = "block", next_button.addEventListener("click", startLvl2, !1), win_prompt_element.innerHTML = 0 === rating ? PROMPT_LVL1_WIN[1] : PROMPT_LVL1_WIN[rating]) : 2 === level ? (disable(), setTimeout(function() {
        enable(), startLvl3()
    }, 1100)) : 3 === level ? (console.log(score + " " + win_score), score === win_score && rating++, disable(), setTimeout(function() {
        enable(), startLvl4()
    }, 1100)) : 4 === level ? (score === win_score && rating++, disable(), setTimeout(function() {
        enable(), startLvl5()
    }, 1100)) : 5 === level && (score === win_score && rating++, displayRating(), result_element.style.display = "flex", stars[rating].style.display = "block", next_button.addEventListener("click", function() {
        window.location.href = THANKS_PAGE_URL
    }, !1), win_prompt_element.innerHTML = 0 === rating ? PROMPT_LVL5_WIN[1] : PROMPT_LVL5_WIN[rating])
}
var interval;

function startTimer() {
    interval = setInterval(function() {
        time_element.innerHTML = time, time > 0 ? time-- : nextLevel()
    }, 1e3)
}
var displaycard = function() {
    "correct" != this.id && "wrong" != this.id && this.classList.toggle("selected"), this.classList.toggle("disabled")
};

function cardOpen() {
    if ("correct" === this.id) this.classList.add("match"), scoreUp();
    else if ("wrong" === this.id) this.classList.add("unmatched"), disable(), setTimeout(function() {
        enable()
    }, 1100), livesDown();
    else if (openedcards[0] === this) openedcards[0].classList.remove("selected"), openedcards = [];
    else {
        openedcards.push(this);
        var e = openedcards.length
    }
    2 === e && (openedcards[0].id === openedcards[1].id ? (console.log(openedcards[0].id + " " + openedcards[1].id), matched()) : unmatched())
}

function matched() {
    openedcards[0].classList.add("match"), openedcards[1].classList.add("match"), openedcards[0].classList.remove("selected"), openedcards[1].classList.remove("selected"), openedcards = [], scoreUp()
}

function unmatched() {
    openedcards[0].classList.add("unmatched"), openedcards[1].classList.add("unmatched"), disable(), setTimeout(function() {
        openedcards[0].classList.remove("selected", "unmatched"), openedcards[1].classList.remove("selected", "unmatched"), enable(), openedcards = []
    }, 1100), livesDown()
}

function livesDown() {
    0 == --lives && nextLevel(), displayLives()
}

function displayLives() {
    lives_element.innerHTML = "";
    for (let e = 0; e < lives; e++) addElement("lives", "span", lives_html)
}

function displayRating() {
    rating_element.innerHTML = "";
    for (let e = 0; e < rating; e++) addElement("rating", "span", rating_html)
}
const lives_html = '<img src="/images/heart.png" alt="Heart" class="heart" width="30">',
    rating_html = '<img src="/images/star.png" alt="Star" class="star" width="30">';

function addElement(e, t, l) {
    var n = document.getElementById(e),
        s = document.createElement(t);
    s.innerHTML = l, n.appendChild(s)
}

function scoreUp() {
    1 === level && changeRating(), ++score === win_score ? nextLevel() : livesDown()
}

function changeRating() {
    score > win_score - 4 && rating++, displayRating()
}

function disable() {
    Array.prototype.filter.call(cards, function(e) {
        e.classList.add("disabled")
    })
}

function enable() {
    Array.prototype.filter.call(cards, function(e) {
        e.classList.remove("disabled");
        for (var t = 0; t < matchedcard.length; t++) matchedcard[t].classList.add("disabled")
    })
}
document.body.onload = startGame();
for (var i = 0; i < cards.length; i++) cards[i].addEventListener("click", displaycard), cards[i].addEventListener("click", cardOpen);
