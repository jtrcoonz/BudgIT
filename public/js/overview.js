$(function() {
	const settings = {
		url: "/api/expenses/",
		headers: {
		},
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		type: "GET",
		success: function(data) {
			console.log(data);
			let renderedExpenses = data.expenses.map(function(expense) {
				return `
				<div id="expense-list-item">
					<div id="list-item-left">
						<p><span>${expense.description}</span><br>
						${expense.date}</p>
					</div>
					<div id="list-item-right">
						<p><span>$</span><span>${expense.value}</span><br>
						${expense.category}</p>
					</div>
				</div>
				`
			});
			$('#expense-list').html(renderedExpenses);
		},
		error: function(err) {
			console.log(err);
		}
	};
	$.ajax(settings);

})