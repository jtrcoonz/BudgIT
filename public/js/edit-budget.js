let totalIncome = $("#total-income").val();

$("#total-income").on("input", function(event) {
  totalIncome = $(this).val();
  $(".form-percentage-input").val(0);
  $(".percentage-result").html(0);
});

$(".form-percentage-input").on("input", function(event) {
  let percentage = $(this).val();
  let result = (percentage / 100) * totalIncome;
  $(this)
    .siblings(".percentage-result")
    .html(result.toFixed(2));
  let total = 0;
  total += Number($("#food-and-toiletries").val());
  total += Number($("#housing-and-utilities").val());
  total += Number($("#transportation").val());
  total += Number($("#health-and-insurance").val());
  total += Number($("#recreation-and-leisure").val());
  total += Number($("#miscellaneous").val());
  $("#total-allocated").val(total);
  if (total <= 100) {
    $("#total-allocated")
      .addClass("green")
      .removeClass("red");
  } else {
    $("#total-allocated")
      .removeClass("green")
      .addClass("red");
  }
});

$(document).ready(function (event) {
  const settings = {
    url: "api/users",
    headers: {
      Authorization: `Bearer ${token}`
    },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    type: "GET",
    success: function(data) {
      $("#total-income").val(data.income);
      $("#food-and-toiletries").val(data.foodAndToiletries);
      $("#housing-and-utilities").val(data.housingAndUtilities);
      $("#transportation").val(data.transportation);
      $("#health-and-insurance").val(data.healthAndInsurance);
      $("#recreation-and-leisure").val(data.recreationAndLeisure);
      $("#miscellaneous").val(data.miscellaneous);
    },
    error: function(err) {
      console.log(err);
    }
  };
  $.ajax(settings);
});

$("#budget-form").submit(function(event) {
  event.preventDefault();
  let token = localStorage.getItem("token");
  let budget = {
    income: Number($("#total-income").val()),
    foodAndToiletries: Number($("#food-and-toiletries").val()),
    housingAndUtilities: Number($("#housing-and-utilities").val()),
    transportation: Number($("#transportation").val()),
    healthAndInsurance: Number($("#health-and-insurance").val()),
    recreationAndLeisure: Number($("#recreation-and-leisure").val()),
    miscellaneous: Number($("#miscellaneous").val())
  };
  const settings = {
    url: "/api/users/",
    data: JSON.stringify(budget),
    headers: {
      Authorization: `Bearer ${token}`
    },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    type: "PUT",
    success: function(data) {
      window.location.href = "overview.html";
    },
    error: function(err) {
      console.log(err);
    }
  };
  $.ajax(settings);
});
