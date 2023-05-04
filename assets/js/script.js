$(function () {
  //display the current date and time dynamically in the header of the page.
  const currentDay = $('#currentDay').text(dayjs().format('MMM D, YYYY h:mm:ss a'));
  setInterval(function () {
    currentDay.text(dayjs().format('MMM D, YYYY h:mm:ss a'))
  }, 1000);

  console.log(dayjs().format('h a'));

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //

  //function of slider
  $(function () {
    $("#slider-range").slider({
      range: true,
      min: 0,
      max: 24,
      values: [9, 17],
      slide: function (event, ui) {
        if (ui.values[0] == ui.values[1]) {
          $("#hours").val("");
        } else {
          const a = dayjs('2023-05-04' + ui.values[0] + ':00:00').format('h a');
          const b = dayjs('2023-05-04' + ui.values[1] + ':00:00').format('h a');
          $("#hours").val(a + " - " + b);
        }
      }
    });
    $("#hours").val($("#slider-range").slider("values", 0) +
      " am - " + ($("#slider-range").slider("values", 1) - 12) + " pm");
  });
});


