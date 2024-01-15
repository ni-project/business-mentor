
export default class AppTariff {
  constructor() {
    this.bindEvents();
  }

  //-----------------------------------------------------
  // Variables
  //-----------------------------------------------------

  $body = document.querySelector('body');
  $timerDisplay = this.$body.querySelector('.js-timer-display');
  $buttonTariff = this.$body.querySelectorAll('.js-handle-button-tariff');
  $date = new Date();
  $commonDate;
  $timerInterval;

  //-----------------------------------------------------
  // Bind events
  //-----------------------------------------------------

  bindEvents = () => {
    this.timerSet('22:30:10');

    for (let index = 0; index < this.$buttonTariff.length; index++) {
      this.$buttonTariff[index].addEventListener('click', this.handleClickButtonTariff);
      this.$buttonTariff[index].addEventListener('click', this.handlePressButtonTariff);
    }
  };

  //-----------------------------------------------------
  // Methods
  //-----------------------------------------------------

  handleClickButtonTariff = (e) => {
    const tariffName = e.target.getAttribute('data-tariff');

    console.log('Tариф: ' + tariffName);
  };

  handlePressButtonTariff = (e) => {
    e.preventDefault();
  };

  timerSet = (time) => {
    if ( this.$timerInterval ) clearInterval(this.$timerInterval);

    let day = this.$date.getDate();
    let monthOriginal = this.$date.getMonth() + 1;
    let month = this.dateTimeHelper(monthOriginal);
    let year = this.$date.getFullYear();
    let currentDate = `${year}-${month}-${day}`;
    let setDate = `${currentDate}T${time ? time : '00:01:00'}`;

    this.$commonDate = new Date(setDate);

    this.updateTimer();
    this.$timerInterval = setInterval(this.updateTimer, 1000);
  };

  updateTimer = () => {
    this.$commonDate = this.$commonDate.setSeconds(this.$commonDate.getSeconds() - 1);
    this.$commonDate = new Date(this.$commonDate);

    let hours = this.dateTimeHelper(this.$commonDate.getHours());
    let minutes = this.dateTimeHelper(this.$commonDate.getMinutes());
    let seconds = this.dateTimeHelper(this.$commonDate.getSeconds());

    this.$timerDisplay.innerHTML = `${hours}:${minutes}:${seconds}`;

    if ( hours === '00' && minutes === '00' && seconds === '00' ) {
      const buttonTariff = this.$buttonTariff[2];

      clearInterval(this.$timerInterval);

      buttonTariff.removeEventListener('click', this.handleClickButtonTariff);
      buttonTariff.classList.add('button--disabled');
    }
  };

  dateTimeHelper = (data) => {
    return data < 10 ? `0${data}` : data;
  }
}
