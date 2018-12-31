let token = localStorage.getItem("token");

if (!token) {
  window.location.href = "auth.html";
};

$(function() {
	$('.log-out-button').click(function (event) {
		event.preventDefault();
		localStorage.setItem("token", "");
		window.location.href = "auth.html";
	});
});


