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
	console.log(loginUser);
	const settings = {
		url: "/api/auth/login",
		data: JSON.stringify(loginUser),
		headers: {
		},
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		type: "POST",
		success: function(data) {
			console.log(data);
		},
		error: function(err) {
			console.log(err);
		}
	};
	$.ajax(settings);
});

$("#sign-up-form").submit(function(event) {
	event.preventDefault();

	let signUpUser = {
		firstName: $('#first-name').val(),
		lastName: $('#last-name').val(),
		username: $("#sign-up-username").val(),
		password: $("#sign-up-password").val()
	};

	const settings = {
		url: "/api/users",
		data: JSON.stringify(signUpUser),
		headers: {
		},
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		type: "POST",
		success: function(data) {
			console.log(data);
		},
		error: function(err) {
			console.log(err);
		}
	};
	$.ajax(settings);
});

