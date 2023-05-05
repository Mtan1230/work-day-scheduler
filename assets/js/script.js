$(function () {
  //global variable
  const timeBlock = $('.time-block');
  const workList = $('.description');
  const currentDay = $('#currentDay');
  const saveBtn = $('.saveBtn');
  const saveAllBtn = $('#saveAllBtn');
  const clearAllBtn = $('#clearAllBtn');

  let defaultSchedule = {
    startHour: 9,
    endHour: 17,
    list: Array(24).fill('')
  };
  let staticHour = dayjs().format('HH') * 1; //convert string to number

  //load local storage and set the values of the corresponding textarea
  function loadStorage() {
    const saveSchedule = JSON.parse(localStorage.getItem("saveSchedule"));
    if (saveSchedule) {
      defaultSchedule = saveSchedule;
      $(defaultSchedule.list).each(function (index) {
        $(workList[index]).val(this);
      })
    }
  }
  loadStorage();

  //display/hide time block
  function setTimeBlock() {
    for (let i = defaultSchedule.startHour; i <= defaultSchedule.endHour; i++) {
      $('#' + i).attr('data-state', 'display');
    }
  }
  setTimeBlock();

  //set the color of each time block
  function setColor() {
    for (let i = staticHour - 1; i >= 0; i--) {
      $(timeBlock[i]).attr('data-tense', 'past');
    }

    $(timeBlock[staticHour]).attr('data-tense', 'current');

    for (let i = staticHour + 1; i <= 23; i++) {
      $(timeBlock[i]).attr('data-tense', 'future');
    }
  }
  setColor();

  //display current date/time and update color dynamically
  function setDateTime() {
    currentDay.text(dayjs().format('MMM D, YYYY h:mm:ss a'));
    setInterval(function () {
      currentDay.text(dayjs().format('MMM D, YYYY h:mm:ss a'))
      //when hour changes, re-set color
      let dynamicHour = dayjs().format('HH') * 1;
      if (dynamicHour !== staticHour) {
        staticHour = dynamicHour;
        setColor();
      }
    }, 1000);
  }
  setDateTime();

  //add listener to each save-button on time-block and update local storage
  saveBtn.on('click', function () {
    let index = $(this).parent().attr('id') * 1;
    defaultSchedule.list[index] = $(this).parent().children().eq(1).val();
    localStorage.setItem("saveSchedule", JSON.stringify(defaultSchedule));
  })

  //add listener to save all and update local storage
  saveAllBtn.on('click', function () {
    $(defaultSchedule.list).each(function (index) {
      defaultSchedule.list[index] = $(workList[index]).val();
    })
    localStorage.setItem("saveSchedule", JSON.stringify(defaultSchedule));
  })

  //add listener to clear all works on the page (will not clear local storage)
  clearAllBtn.on('click', function () {
    workList.val('');
  })

  //function of slider
  $(function () {
    $("#slider-range").slider({
      range: true,
      min: 0,
      max: 23,
      values: [defaultSchedule.startHour, defaultSchedule.endHour],
      slide: function (event, ui) {
        //display selected time frame
        const a = dayjs('2023-05-04' + ui.values[0] + ':00:00').format('h a');
        const b = dayjs('2023-05-04' + ui.values[1] + ':00:00').format('h a');
        if (ui.values[0] == ui.values[1]) {
          $("#hours").val(a);
        } else {
          $("#hours").val(a + " - " + b);
        }
        //display or hide time block
        switch (true) {
          case ui.values[0] < defaultSchedule.startHour:
            $('#' + ui.values[0]).attr('data-state', 'display');
            defaultSchedule.startHour = ui.values[0];
            break;
          case ui.values[0] > defaultSchedule.startHour:
            $('#' + defaultSchedule.startHour).attr('data-state', 'hidden');
            defaultSchedule.startHour = ui.values[0];
            break;
          case ui.values[1] < defaultSchedule.endHour:
            $('#' + defaultSchedule.endHour).attr('data-state', 'hidden');
            defaultSchedule.endHour = ui.values[1];
            break;
          case ui.values[1] > defaultSchedule.endHour:
            $('#' + ui.values[1]).attr('data-state', 'display');
            defaultSchedule.endHour = ui.values[1];
            break;
        }
      }
    });
    $("#hours").val(dayjs('2023-05-04' + defaultSchedule.startHour + ':00:00').format('h a') + " - " + dayjs('2023-05-04' + defaultSchedule.endHour + ':00:00').format('h a'));
  });
});
