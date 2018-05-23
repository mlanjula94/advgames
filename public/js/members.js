$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    console.log(data);
    $(".member-name").text(data.username);
    $("#member-photo").attr("src", data.photo);

  });


  $.get("/api/scores/Wack A Mole", function (data) {
    console.log(data);

    for (var i = 0; i < data.length; i++) {
      console.log(data[i].User.username);
      var rank = i + 1;
      var html = '<tr class="tr">' +
        '<td>' + rank + '</td>' +
        '<td>' + data[i].User.username + '</td>' +
        '<td>' + data[i].score + '</td>' +
        '</tr>';
      $("#wm_tbody").append(html);
    }
  })

  $.get("/api/scores/Snakes", function (data) {
    console.log(data);

    for (var i = 0; i < data.length; i++) {
      console.log(data[i].User.username);
      var rank = i + 1;
      var html = '<tr class="tr">' +
        '<td>' + rank + '</td>' +
        '<td>' + data[i].User.username + '</td>' +
        '<td>' + data[i].score + '</td>' +
        '</tr>';
      $("#sn_tbody").append(html);
    }
  })


  $.get("/api/scores/Flappy Bird", function (data) {
    console.log(data);

    for (var i = 0; i < data.length; i++) {
      console.log(data[i].User.username);
      var rank = i + 1;
      var html = '<tr class="tr">' +
        '<td>' + rank + '</td>' +
        '<td>' + data[i].User.username + '</td>' +
        '<td>' + data[i].score + '</td>' +
        '</tr>';
      $("#fb_tbody").append(html);
    }
  })


  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
    $(this).toggleClass('active');
  });
  var particles = Particles.init({
    selector: '.background',
    color: '#DA0463',
    maxParticles: 300,
    connectParticles:true
  });
});