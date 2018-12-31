// let token = localStorage.getItem("token");

$("#expense-form").submit(function(event) {
  event.preventDefault();

  let expense = {
    description: $("#description").val(),
    category: $("#category").val(),
    value: $("#value").val(),
    date: $("#date").val()
  };

  const settings = {
    url: "/api/expenses/",
    data: JSON.stringify(expense),
    headers: { Authorization: `Bearer ${token}` },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    type: "POST",
    success: function(data) {
      window.location.href = "overview.html";
    },
    error: function(err) {
      console.log(err);
    }
  };
  $.ajax(settings);
});
