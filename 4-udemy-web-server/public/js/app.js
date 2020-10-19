console.log('client side js is loaded');

// fetch API - it is a browser base API - we cant use it in a backend node script

const puzzleURL = 'http://puzzle.mead.io/puzzle';

// async function getData() {
// 	const response = await fetch(puzzleURL);
// 	return response.json();
// }

// getData()
// 	.then(data => console.log(data))
// 	.catch(error => error.message);

// *********************************************** //

// fetch the forecast information

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', e => {
	e.preventDefault();

	const location = search.value;

	messageOne.textContent = 'Loading...';
	messageTwo.textContent = '';

	fetch('/weather?address=' + location).then(response => {
		response.json().then(data => {
			if (data.error) {
				messageOne.textContent = data.error;
			} else {
				messageOne.textContent = data.location;
				messageTwo.textContent = data.forecast;
			}
		});
	});
});
