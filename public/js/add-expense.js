$("#expense-form").submit(function(event) {
	event.preventDefault();

	let expense = {
		description: $("#description").val(),
		category: $("#category").val(),
		value: $("#value").val(),
		date: $("#date").val()
	};

	console.log(expense);

	const settings = {
		url: "/api/expenses/",
		data: JSON.stringify(expense),
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
})