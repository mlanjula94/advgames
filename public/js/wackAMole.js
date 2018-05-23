const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    console.log('Ah nah thats the same one bud');
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (timeUp) saveResult(score);
    else peep();
  }, time);
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => timeUp = true, 10000);
  setTimeout(saveResult, 10000);
  leaderboard("Wack A Mole")
}

function bonk(e) {
  if (!e.isTrusted) return; // cheater!
  score++;
  this.parentNode.classList.remove('up');
  scoreBoard.textContent = score;
}

function saveResult() {
  var userId;
  $.get("/api/user_data").then(function (data) {
    userId = data.id;
    var scoreData = {
      game: "Wack A Mole",
      score: score,
      userId: userId
    }
    // Grab the URL of the website
    var currentURL = window.location.origin;

    $.post(currentURL + "/api/scores", scoreData, function () {
      location.reload();
    })
  })
}

moles.forEach(mole => mole.addEventListener('click', bonk));

$.get("/api/user_data").then(function (user) {
  $.get("/api/scores/high/Wack A Mole/" + user.id, function (data) {
    console.log(data.length);

    for (var i = 0; i < data.length; i++) {
      console.log(data[i].User.username);
      var rank = i + 1;
      var html = '<tr class="tr">' +
        '<td>' + rank + '</td>' +
        '</td>' +
        '<td>' + data[i].score + '</td>' +
        '</tr>';
      $("#wm_highscore_tbody").append(html);
    }
  })
})

$.get("/api/user_data").then(function (user) {
  $.get("/api/scores/Wack A Mole/" + user.id, function (data) {
    console.log(data.length);

    for (var i = 0; i < data.length; i++) {
      console.log(data[i].User.username);
      var rank = i + 1;
      var html = '<tr>' +
        '<td>' + rank + '</td>' +
        '</td>' +
        '<td>' + data[i].score + '</td>' +
        '</tr>';
      $("#wm_tbody").append(html);
    }
  })
})

$(document).ready(function () {
  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
    $(this).toggleClass('active');
  });
  $.get("/api/user_data").then(function (data) {
    console.log(data);
    $(".member-name").text(data.username);
    $("#member-photo").attr("src", data.photo);

  });
})

window.onload = function () {
  var particles = Particles.init({
    selector: '.background',
    color: '#DA0463',
    maxParticles: 1000
  });
}