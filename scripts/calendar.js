export function createCalendar() {
  let currentMonth = 2;
  let currentDay = 0;
  let event;

  const events = [
    {
      id: 1,
      month: 2,
      day: 2,
      text: "This is the second month event, hope you have enough energy",
    },
    {
      id: 2,
      month: 2,
      day: 12,
      text: "Big event, bro, dont miss it that time",
    },
    {
      id: 3,
      month: 2,
      day: 19,
      text: "Another event, very interesting",
    },
    {
      id: 4,
      month: 3,
      day: 1,
      text: "The first day of spring, cheer up, from now on its going to be warmer",
    },
    {
      id: 5,
      month: 3,
      day: 5,
      text: "МАСТЕР- КЛАСС «5 ПСИХОТИПОВ ПОКУПАТЕЛЕЙ В ФЭШН– ЗНАТЬ И ВЛИЯТЬ! КАКИЕ ТРИГГЕРЫ У ЦЕЛЕВОЙ АУДИТОРИИ ВАШЕГО БРЕНДА?»",
    },
    {
      id: 6,
      month: 3,
      day: 17,
      text: "Гид для родителей: как выявить предрасположенность и подготовить будущего спортсмена",
    },
  ];

  function createCalendar(elem, year, month) {
    let mon = month - 1;
    let d = new Date(year, mon);

    let table =
      "<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>";

    // собираем все события месяца
    let currentMonthEvents = events
      .filter((item) => item.month === currentMonth)
      .map((item) => item.day);

    // пробелы для первого ряда
    // с понедельника до первого дня месяца
    // * * * 1  2  3  4
    for (let i = 0; i < getDay(d); i++) {
      table += "<td></td>";
    }

    // <td> ячейки календаря с датами
    // добавляем классы дням с событями
    while (d.getMonth() == mon) {
      table +=
        `<td><div id="${d.getDate()}" class="calendar__day ${
          currentMonthEvents.includes(d.getDate()) ? "calendar__event-day" : ""
        }">` +
        d.getDate() +
        "</div></td>";

      if (getDay(d) % 7 == 6) {
        // вс, последний день - перевод строки
        table += "</tr><tr>";
      }

      d.setDate(d.getDate() + 1);
    }

    // добить таблицу пустыми ячейками, если нужно
    // 29 30 31 * * * *
    if (getDay(d) != 0) {
      for (let i = getDay(d); i < 7; i++) {
        table += "<td></td>";
      }
    }

    // закрыть таблицу
    table += "</tr></table>";

    elem.innerHTML = table;
  }

  function getDay(date) {
    // получить номер дня недели, от 0 (пн) до 6 (вс)
    let day = date.getDay();
    if (day == 0) day = 7; // сделать воскресенье (0) последним днем
    return day - 1;
  }

  function selectDay(day, month) {
    event = events.find((item) => item.day === day && item.month === month);
    function changeDate() {
      afficheDate.innerText = `${currentDay} / ${currentMonth} / 23`;
    }

    event
      ? ((afficheText.innerText = event.text), changeDate())
      : ((afficheText.innerText = "Не найдено мероприятий в указанную дату"),
        changeDate());
  }

  function getDates() {
    const dates = document.querySelectorAll(".calendar__day");
    dates.forEach((monthDay) => {
      monthDay.addEventListener("click", function () {
        let prevChosen = document.querySelector(".calendar__picked");

        if (prevChosen) {
          prevChosen.classList.toggle("calendar__picked");
        }

        monthDay.classList.toggle("calendar__picked");
        currentDay = Number(monthDay.id);
        selectDay(currentDay, currentMonth);
      });
    });
  }

  function prevMonth() {
    if (currentMonth > 2) {
      currentMonth -= 1;
      createCalendar(calendar, 2023, 2);
      monthText.innerText = "Февраль 2023";
      getDates();
    }
  }

  function nextMonth() {
    if (currentMonth < 3) {
      currentMonth += 1;
      createCalendar(calendar, 2023, 3);
      monthText.innerText = "Март 2023";
      getDates();
    }
  }

  function setInitiateEvent() {
    let newEvent = events.filter((item) => item.month === currentMonth)[0];

    event = newEvent;
    currentDay = newEvent.day;
    let firstEvent = newEvent;
    afficheDate.innerText = `${firstEvent.day} / ${firstEvent.month} / 2023`;
    afficheText.innerText = firstEvent.text;
    let firstEventEl = document.getElementById(`${firstEvent.day}`);
    firstEventEl.classList.toggle("calendar__picked");
  }

  function changeEvent(increment) {
    let prevChosen = document.querySelector(".calendar__picked");

    if (!event) {
      // Переключение события если если выбран день без события
      let otherEvent = events.filter((item) =>
        increment
          ? item.day > currentDay && item.month === currentMonth
          : item.day < currentDay && item.month === currentMonth
      );

      if (otherEvent.length === 0) {
        otherEvent = events.filter((item) =>
          increment ? item.month > currentMonth : item.month < currentMonth
        );
      }

      event = increment ? otherEvent[0] : otherEvent[otherEvent.length - 1];

      // -- //
    } else {
      if (increment && event.id + 1 > events.length) return;
      if (!increment && event.id - 1 <= 0) return;

      event = events.find((item) =>
        increment ? item.id === event.id + 1 : item.id === event.id - 1
      );
    }

    if (currentMonth !== event.month) increment ? nextMonth() : prevMonth();
    let nextEventDay = document.getElementById(`${event.day}`);

    // Убираем класс с предыдущего события
    if (prevChosen) {
      prevChosen.classList.toggle("calendar__picked");
    }

    // Добавляем класс след дню
    nextEventDay.classList.toggle("calendar__picked");
    // Меняем событие в афише
    afficheDate.innerText = `${event.day} / ${event.month} / 2023`;
    afficheText.innerText = event.text;
  }

  createCalendar(calendar, 2023, 2);

  getDates();

  const prevMonthBtn = document.getElementById("next-month");
  const nextMonthBtn = document.getElementById("prev-month");
  const monthText = document.getElementById("month-text");
  const nextEventSlide = document.getElementById("next-event");
  const prevEventSlide = document.getElementById("prev-event");
  const nextEventSlideSmall = document.getElementById("next-event-small");
  const prevEventSlideSmall = document.getElementById("prev-event-small");
  let afficheDate = document.getElementById("affiche-date");
  let afficheText = document.getElementById("affiche-text");

  setInitiateEvent();

  // Меняем месяц
  prevMonthBtn.addEventListener("click", function () {
    prevMonth();
  });

  nextMonthBtn.addEventListener("click", function () {
    nextMonth();
  });
  // -- //

  // Меняем событие и дату через слайдер
  nextEventSlide.addEventListener("click", function () {
    changeEvent(true);
  });

  prevEventSlide.addEventListener("click", function () {
    changeEvent(false);
  });

  nextEventSlideSmall.addEventListener("click", function () {
    changeEvent(true);
  });

  prevEventSlideSmall.addEventListener("click", function () {
    changeEvent(false);
  });

  // -- //
}
