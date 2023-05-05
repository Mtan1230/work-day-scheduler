$(function () {
  let defaultSchedule = {
    startTime: 9,
    endTime: 17,
    list: ['', '', '', '', '', '', '', '', ''],
  };

  //load local storage and set the values of the corresponding textarea
  const saveSchedule = JSON.parse(localStorage.getItem("saveSchedule"));
  if (saveSchedule) {
    defaultSchedule = saveSchedule;
    $(defaultSchedule.list).each(function(index) {
      $('#' + (index + defaultSchedule.startTime)).children().eq(1).val(this)
    })
  }

  //set the color of each time block
  let staticHour = dayjs().format('HH') * 1; //convert string to number
  function setColor() {
    for (let i = staticHour - 1; i >= 0; i--) {
      $('#' + i).attr('data-tense', 'past');
    }

    $('#' + staticHour).attr('data-tense', 'current');

    for (let i = staticHour + 1; i <= 23; i++) {
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

  //add event-listener to save description in local storage
  const saveBtn = $('.saveBtn');
  saveBtn.on('click', function () {
    defaultSchedule.list[$(this).parent().attr('id') - defaultSchedule.startTime] = $(this).parent().children().eq(1).val();
    localStorage.setItem("saveSchedule", JSON.stringify(defaultSchedule));
    console.log(defaultSchedule.list)
  })

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
  // TODO: add function to display/hide time block
  
  //add listener to save all and clear all
  const clearAllBtn = $('#clearAllBtn');
  clearAllBtn.on('click', function () {
    $('.description').each(function () {
      $(this).val('');
    })
  })
  
  const saveAllBtn = $('#saveAllBtn');
  saveAllBtn.on('click', function () {
    defaultSchedule.list.foreach(function (work) {
      console.log(work) 
    })
  })
  
});
