///Generate Pin Section
function getPin() {
	const pin = generateRandomPin();
	const pinString = pin + '';
	if (pinString.length === 4) {
		return pin;
	} else {
		return getPin();
	}
}
function generateRandomPin() {
	const randomPin = Math.floor(Math.random() * 10000);
	return randomPin;
}

function setInputValueById(inputId, value) {
	document.getElementById(inputId).value = value;
}

let generatePin = 0;
let typedPinOutput = 0;

const generateBtn = document.getElementById('generate-btn');
const timer = document.getElementById('timer');
let timeLimit = 60;
generateBtn.addEventListener('click', () => {
	timer.style.visibility = 'visible';
	let pin = getPin();
	setInputValueById('pin-display', pin);
	generateBtn.setAttribute('disabled', true);
	generateBtn.style.backgroundColor = '#2d3359';
	generateBtn.style.borderColor = '#2d3359';
	const count = setInterval(function () {
		const timeElement = document.getElementById('time');
		timeLimit = timeLimit - 1;
		if (timeLimit < 10) {
			timeElement.innerText = '0' + timeLimit;
		} else {
			timeElement.innerText = timeLimit;
		}

		if (timeLimit === 0) {
			generateBtn.removeAttribute('disabled');
			generateBtn.style.backgroundColor = '#495BC3';
			generateBtn.style.borderColor = '#39458C';
			timer.style.visibility = 'hidden';
			timeLimit = 60;
			clearInterval(count);
		}
	}, 1000);
	generatePin = pin;
});

//Verify Pin Section

const pinEnter = document.getElementById('pin-enter');
const calcBody = document.getElementById('calc-body');
calcBody.addEventListener('click', (event) => {
	const typedKey = event.target.innerText;
	const pinEnterValue = pinEnter.value;
	if (!isNaN(typedKey)) {
		const pinOutput = pinEnterValue + typedKey;
		setInputValueById('pin-enter', pinOutput);
		typedPinOutput = pinOutput;
	} else {
		if (typedKey == 'C') {
			pinEnter.value = '';
		}
		if (typedKey === '<') {
			const typedKeyArray = pinEnterValue.split('');
			typedKeyArray.pop();
			const typedKeyString = typedKeyArray.join('');
			setInputValueById('pin-enter', typedKeyString);
		}
	}
});

const submitBtn = document.getElementById('submit-btn');
const error = document.getElementById('error');
const done = document.getElementById('done');
const timeOut = document.getElementById('time-out');
const redirectTime = document.getElementById('redirect-time');

submitBtn.addEventListener('click', () => {
	const pinEnterValue = pinEnter.value;
	if (timeLimit === 60) {
		timeOut.classList.remove('hide');
		error.classList.add('hide');
		done.classList.add('hide');
	} else if (generatePin == pinEnterValue) {
		error.classList.add('hide');
		done.classList.remove('hide');
		timeOut.classList.add('hide');
		let timeOutTime = 3;
		const redirect = setInterval(() => {
            const timeOutLeft = timeOutTime - 1;
            redirectTime.innerText = timeOutLeft;
            timeOutTime = timeOutLeft
            console.log(timeOutLeft,'d');
			if (timeOutTime === 0) {
                clearInterval(redirect);
                window.location.href = 'http://stackoverflow.com';
			}
		}, 1000);
		
    } else {
		done.classList.add('hide');
		timeOut.classList.add('hide');
		error.classList.remove('hide');
	}
});
