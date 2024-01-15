
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
    const day = this.$date.getDate();
    const monthOriginal = this.$date.getMonth() + 1;
    const month = this.dateTimeHelper(monthOriginal);
    const year = this.$date.getFullYear();
    const currentDate = `${year}-${month}-${day}`;
    const setDate = `${currentDate}T${time ? time : '00:01:00'}`;

    if ( this.$timerInterval ) clearInterval(this.$timerInterval);

    this.$commonDate = new Date(setDate);

    this.updateTimer();
    this.$timerInterval = setInterval(this.updateTimer, 1000);
  };

  updateTimer = () => {
    this.$commonDate = this.$commonDate.setSeconds(this.$commonDate.getSeconds() - 1);
    this.$commonDate = new Date(this.$commonDate);

    const hours = this.dateTimeHelper(this.$commonDate.getHours());
    const minutes = this.dateTimeHelper(this.$commonDate.getMinutes());
    const seconds = this.dateTimeHelper(this.$commonDate.getSeconds());

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
