$("#to-sign-up").click(function() {
  $("#log-in").hide();
  $("#sign-up").fadeIn();
});
$("#to-log-in").click(function() {
  $("#sign-up").hide();
  $("#log-in").fadeIn();
});

$("#log-in-form").submit(function(event) {
  event.preventDefault();

  let loginUser = {
    username: $("#log-in-username").val(),
    password: $("#log-in-password").val()
  };
  login(loginUser);
});

$("#sign-up-form").submit(function(event) {
  event.preventDefault();
  let signUpUser = {
    firstName: $("#first-name").val(),
    lastName: $("#last-name").val(),
    username: $("#sign-up-username").val(),
    password: $("#sign-up-password").val()
  };
  signup(signUpUser);
});

function signup(signUpUser) {
  const settings = {
    url: "/api/users",
    data: JSON.stringify(signUpUser),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    type: "POST",
    success: function(data) {
      console.log(data);
      login(signUpUser, "edit-budget.html");
    },
    error: function(err) {
      console.log(err);
      $("#err-div-signup").text(`${err.responseJSON.message.toLowerCase()}`)
      .css({"color":"red", "background-color":"white", "width":"60%", "margin":"0 auto",
      "margin-top":"40px", "margin-bottom":"20px", "border-radius":"4px", "padding":"2px"})
    }
  };
  $.ajax(settings);
}

function login(loginUser, redirect = "overview.html") {
  const settings = {
    url: "/api/auth/login",
    data: JSON.stringify(loginUser),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    type: "POST",
    success: function(data) {
      console.log(data);
      localStorage.setItem("token", data.authToken);
      window.location.href = redirect;
    },
    error: function(err) {
      console.log(err);
      $("#err-div-login").text("Incorrect username or password")
    }
  };
  $.ajax(settings);
}
