let totalIncome = $('#total-income').val();

$('#total-income').on('input', function(event) {
	totalIncome = $(this).val();
	$('.form-percentage-input').val(0);
	$('.percentage-result').html(0);
});

$('.form-percentage-input').on('input', function (event) {
	let percentage = $(this).val();
	let result = (percentage / 100) * totalIncome;
	$(this).siblings('.percentage-result').html(result.toFixed(2));
	let total = 0;
	total += Number($('#food-and-toiletries').val())
	total += Number($('#housing-and-utilities').val()) 
	total += Number($('#transportation').val()) 
	total += Number($('#health-and-insurance').val())
	total += Number($('#recreation-and-leisure').val())
	total += Number($('#miscellaneous').val());
	$('#total-allocated').val(total);
	if (total <= 100) {
		$('#total-allocated').addClass('green').removeClass('red');
	} else {
		$('#total-allocated').removeClass('green').addClass('red');
	}
});

$('#budget-form').submit(function (event) {	
	event.preventDefault();

	let budget = {
		income: $('#total-income').val(),
		foodAndToiletries: Number($('#food-and-toiletries').val()),
		housingAndUtilities: Number($('#housing-and-utilities').val()),
		transportation: Number($('#transportation').val()),
		healthAndInsurance: Number($('#health-and-insurance').val()),
		recreationAndLeisure: Number($('#recreation-and-leisure').val()),
		miscellaneous: Number($('#miscellaneous').val())
	};
	const settings = {
		url: "/api/users",
		data: JSON.stringify(budget),
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
