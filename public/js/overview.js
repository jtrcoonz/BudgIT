let options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
};


$(function() {
  getTopExpenseData();
  getExpenseData()
});


function getExpenseData() {
  const settings = {
    url: "/api/expenses/",
    headers: {
      Authorization: `Bearer ${token}`
    },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    type: "GET",
    success: renderExpenses,
    error: function(err) {
      console.log(err);
    }
  };
  $.ajax(settings);
}

function getTopExpenseData() {
  const settings = {
    url: "api/users/",
    headers: {
      Authorization: `Bearer ${token}`
    },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    type: "GET",
    success: function(data) {
      console.log(data);
      $("#remaining-budget-number").html(data.income);
      let income = data.income / 100;
      $(".food-and-toiletries").html(data.foodAndToiletries * income);
      $(".housing-and-utilities").html(data.housingAndUtilities * income);
      $(".transportation").html(data.transportation * income);
      $(".health-and-insurance").html(data.healthAndInsurance * income);
      $(".recreation-and-leisure").html(data.recreationAndLeisure * income);
      $(".miscellaneous").html(data.miscellaneous * income);
    },
    error: function(err) {
      console.log(err);
    }
  };
  $.ajax(settings);
}

function renderExpenses(data) {

  console.log(data.expenseTotals)

  $(".spent-budget").html(data.expenseTotals.total);
  $(".food-and-toiletries-expense").html(data.expenseTotals.food_toiletries);
  $(".housing-and-utilities-expense").html(data.expenseTotals.housing_utilities);
  $(".transportation-expense").html(data.expenseTotals.transportation);
  $(".health-and-insurance-expense").html(data.expenseTotals.health_insurance);
  $(".recreation-and-leisure-expense").html(data.expenseTotals.recreation_leisure);
  $(".miscellaneous-expense").html(data.expenseTotals.miscellaneous);

  let renderedExpenses = data.expenses.map(function(expense) {
    let date = new Date(expense.date);
    return `
    <div class="expense-list-item">
      <div class="list-item-left">
        <p><span>${expense.description}</span></p>
        <p>
          ${date.toLocaleDateString("en-US")}
          <span class="expense-list-item-delete" data-id="${expense.id}">
            X
          </span>
        </p>
      </div>
      <div class="list-item-right">
        <p><span>$</span><span>${expense.value}</span></p>
        <p>${expense.category}</p>
      </div>
    </div>
    `;
  });
  $("#expense-list").html(renderedExpenses);
}


$("#expense-list").on("click", ".expense-list-item-delete", function(event) {
  let id = $(event.currentTarget).attr("data-id");
  const settings = {
    url: `/api/expenses/${id}`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    type: "DELETE",
    success: function() {
      //$(event.currentTarget).parents(".expense-list-item").remove();
      getExpenseData();
    },
    error: function(err) {
      console.log(err);
    }
  };
  $.ajax(settings);
});
