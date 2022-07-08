document.addEventListener('DOMContentLoaded', () => {
	const newYear = new Date('Jan 1 2023 00:00:00');

	const daysVal = document.querySelector('.time-count__days .time-count__val');
	const hoursVal = document.querySelector('.time-count__hours .time-count__val');
	const minutesVal = document.querySelector('.time-count__minutes .time-count__val');
	const secondsVal = document.querySelector('.time-count__seconds .time-count__val');

	const daysText = document.querySelector('.time-count__days .time-count__text');
	const hoursText = document.querySelector('.time-count__hours .time-count__text');
	const minutesText = document.querySelector('.time-count__minutes .time-count__text');
	const secondsText = document.querySelector('.time-count__seconds .time-count__text');

	function decOfNum(number, title) {
		let cases = [2, 0, 1, 1, 1, 2];
		return title [ (number%100>4 && number%100<20) ? 2 : cases[(number%10<5)?number%10:5] ];
	}

	const timeCount = () => {
		let now = new Date();
		let leftUntil = newYear - now;
		let days = Math.floor(leftUntil / 1000 / 60 / 60 / 24);
		let hours = Math.floor(leftUntil / 1000 / 60 / 60) % 24;
		let minutes = Math.floor(leftUntil / 1000 / 60) % 60;
		let seconds = Math.floor(leftUntil / 1000) % 60;

		daysVal.textContent = days;
		hoursVal.textContent = hours < 10 ? '0' + hours : hours;
		minutesVal.textContent = minutes < 10 ? '0' + minutes : minutes;
		secondsVal.textContent = seconds < 10 ? '0' + seconds : seconds;

		daysText.textContent = decOfNum(days, ['день', 'дня', 'дней']);
		hoursText.textContent = decOfNum(hours, ['час', 'часа', 'часов']);
		minutesText.textContent = decOfNum(minutes, ['минута', 'минуты', 'минут']);
		secondsText.textContent = decOfNum(seconds, ['секунда', 'секунды', 'секунд']);
	}

	timeCount();
	setInterval(timeCount, 1000);
})