$(function () {
  const defaultSchedule = {
    startTime: 9,
    endTime: 17,
    list: []
  };

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  //load local storage
  const saveSchedule = JSON.parse(localStorage.getItem("saveSchedule"));
  if (saveSchedule) {
    defaultSchedule = saveSchedule;
  }

  //set the color of each time block
  let staticHour = dayjs().format('HH') * 1; //convert string to number
  function setColor() {
    for (let i = staticHour - 1; i >= 0; i-- ) {
      $('#' + i).attr('data-tense', 'past');
    }
    
    $('#' + staticHour).attr('data-tense', 'current');
    
    for (let i = staticHour + 1; i <= 23; i++ ) {
      $('#' + i).attr('data-tense', 'future');
    }
  }
  setColor();
  
  //display current date/time and update color dynamically
  const currentDay = $('#currentDay').text(dayjs().format('MMM D, YYYY h:mm:ss a'));
  setInterval(function () {
    currentDay.text(dayjs().format('MMM D, YYYY h:mm:ss a'))

    //when hour changes, re-set color
    let dynamicHour = dayjs().format('HH') * 1;
    if (dynamicHour !== staticHour) {
      staticHour = dynamicHour;
      setColor();
    }
  }, 1000);

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //

  //function of slider
  $(function () {
    $("#slider-range").slider({
      range: true,
      min: 0,
      max: 23,
      values: [defaultSchedule.startTime, defaultSchedule.endTime],
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

// TODO: add function to display/hide time block


