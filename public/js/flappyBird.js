var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");
//image loading;
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = ("../images/bird.png");
bg.src = ("../images/bg.png");
fg.src = ("../images/fg.png");
pipeNorth.src = ("../images/pipeNorth.png");
pipeSouth.src = ("../images/pipeSouth.png");

//getting a constant gap between the pipes;
var gap = 100;
var constant = pipeNorth.height + gap;
var bx = 40;
var by = 150;
var gravity = 1.5;
var score = 0;
var gameOver = false;

//pipe coordinates
var pipe = [];
pipe[0] = {
  x: canvas.width,
  y: 0
}

bg.onload = function draw() {
  ctx.drawImage(bg, 0, 0, bg.width, bg.height, // source rectangle
    0, 0, canvas.width, canvas.height);
}

function startGame() {
  ctx.drawImage(bg, 0, 0, bg.width, bg.height, // source rectangle
    0, 0, canvas.width, canvas.height);
  for (var i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);
    pipe[i].x--;

    if (pipe[i].x === 125) {
      pipe.push({
        x: canvas.width,
        y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
      });
    }
    if (bx + bird.width >= pipe[i].x && bx <= pipe[i].x + pipeNorth.width && (by <= pipe[i].y + pipeNorth.height || by + bird.height >= pipe[i].y + constant) || by + bird.height >= canvas.height - fg.height) {
      gameOver = true;
      //alert("Hello! I am an alert box!");

    }

    if (pipe[i].x == 5) {
      score++
    }

  }
  if (gameOver) {
    saveResult();
    location.reload();
    return false;
  }

  ctx.drawImage(fg, 0, canvas.height - fg.height);
  ctx.drawImage(fg, 300, canvas.height - fg.height);
  ctx.drawImage(fg, 400, canvas.height - fg.height);
  ctx.drawImage(bird, bx, by);

  //detecting collision


  by += gravity;

  ctx.fillStyle = "#000";
  ctx.font = "20px Verdana";
  ctx.fillText("Score : " + score, 10, canvas.height - 20);
  requestAnimationFrame(startGame)
}

//Function that moves the bird when the key is pressed.
document.addEventListener("keydown", moveUp);

function moveUp() {
  by -= 25;
}

function saveResult() {
  var userId;
  $.get("/api/user_data").then(function (data) {
    userId = data.id;
    var scoreData = {
      game: "Flappy Bird",
      score: score,
      userId: userId
    }
    // Grab the URL of the website
    var currentURL = window.location.origin;

    $.post(currentURL + "/api/scores", scoreData, function () {
      //location.reload();
    })
  })
}

$.get("/api/user_data").then(function (user) {
  $.get("/api/scores/high/Flappy Bird/" + user.id, function (data) {
    console.log(data.length);

    for (var i = 0; i < data.length; i++) {
      console.log(data[i].User.username);
      var rank = i + 1;
      var html = '<tr class="tr">' +
        '<td>' + rank + '</td>' +
        '</td>' +
        '<td>' + data[i].score + '</td>' +
        '</tr>';
      $("#fb_highscore_tbody").append(html);
    }
  })
})

$.get("/api/user_data").then(function (user) {
  $.get("/api/scores/Flappy Bird/" + user.id, function (data) {
    console.log(data.length);

    for (var i = 0; i < data.length; i++) {
      console.log(data[i].User.username);
      var rank = i + 1;
      var html = '<tr>' +
        '<td>' + rank + '</td>' +
       '</td>' +
        '<td>' + data[i].score + '</td>' +
        '</tr>';
      $("#fb_tbody").append(html);
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
  var particles = Particles.init({
    selector: '.background',
    color: '#DA0463',
    maxParticles: 1000
  });
})

