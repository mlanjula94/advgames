var id;
$('#sidebarCollapse').on('click', function () {
  $('#sidebar').toggleClass('active');
  $(this).toggleClass('active');
});

$(document).ready(function () {
  var particles = Particles.init({
    selector: '.background',
    color: '#DA0463',
    maxParticles: 1000
  });
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $(".img_form").hide();

  $.get("/api/user_data").then(function (data) {
    console.log(data);
    $(".member-name").text(data.username);
    $("#member-photo").attr("src", data.photo);
    id = data.id;
  })
  var imgForm = $("form.img_form");

  imgForm.on("submit", function (event) {
    event.preventDefault();

    var formData = new FormData();

    if ($("#file-input").prop("files")[0]) {
      // append photo information to form (photo: {objOfPhotoInfo})
      formData.append("photo", $("#file-input").prop("files")[0], $("#file-input").prop("files")[0].name);
    }
    data = {
      photo: $("#file-input").prop("files"),
      id:id
    };

    console.log(data);
    editUser(data);
  })

})

$("#dact_image").click(function () {
  $("#member-photo").css("display", "none");
  $(".img_form").show();
  var txt;
    if (confirm("Are you sure you want to deactivate?"+ id)) {
      $.ajax({
        method: "DELETE",
        url: "/api/deactivate/" + id
      })
        .then(get);
    
    } else {
        txt = "You pressed Cancel!";
    }
});



$("#edit_image").click(function () {
  $("#member-photo").css("display", "none");
  $(".img_form").show();
});

function editUser(formData) {
  console.log(formData.id);

  //.then(location.reload())
  $.ajax({
    method: "PUT",
    url: "/api/edit/image",
    data: formData,
    contentType: false, 
    processData: false, 
    cache: false
  })
}