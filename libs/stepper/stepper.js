const stepper = document.querySelector('.stepper');
const stepperInput = stepper.querySelector('.stepper__input');
const stepperBtnUp = stepper.querySelector('.stepper__btn--up');
const stepperBtnDown = stepper.querySelector('.stepper__btn--down');

let count = stepperInput.value;

function CheckCount() {
    if (count == 1) {
	    stepperBtnDown.classList.add('stepper__btn--disabled');
	} else {
		stepperBtnDown.classList.remove('stepper__btn--disabled');
	}
}

function CheckApple() {

	const isNotApple = () => {
		if (!/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
			return false;
		}
		return true;
	}

	if (isNotApple) {
    	stepperInput.style.width = `${stepperInput.value.length + 1}ex`;
    } else {
    	stepperInput.style.width = `${stepperInput.value.length + 2}ex`;
    }
}

function allowNumbersOnly(e) {
	let code = (e.which) ? e.which : e.keyCode;
	if (code > 31 && (code < 48 || code > 57)) {
			e.preventDefault();
	}
}

stepperInput.addEventListener('keyup', (e) => {
	let self = e.currentTarget;

	if (self.value == '0') {
		self.value = 1;
	}

    CheckApple();

	count = stepperInput.value;

	CheckCount();
})

stepperInput.addEventListener('keypress', (e) => {
	allowNumbersOnly(e);	
})

stepperInput.addEventListener('change', (e) => {
	let self = e.currentTarget;

	if (!self.value) {
		self.value = 1;
	}

	count = stepperInput.value;
	CheckCount();
})

stepperBtnUp.addEventListener('click', (e) => {

    e.preventDefault();

    count++;

    CheckCount();

    stepperInput.value = count;
    CheckApple();
})

stepperBtnDown.addEventListener('click', (e) => {

    e.preventDefault();

    count--;
    CheckCount();

    stepperInput.value = count;
    CheckApple();
})

