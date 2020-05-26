const gameContainer = document.getElementById('game');

const COLORS = [ 'red', 'blue', 'green', 'orange', 'purple', 'red', 'blue', 'green', 'orange', 'purple' ];
let count = 0;
let match = false;
let selectedCard2 = '';

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
	let counter = array.length;

	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		let index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// And swap the last element with it
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
	for (let color of colorArray) {
		// create a new div
		const newDiv = document.createElement('div');

		// give it a class attribute for the value we are looping over
		newDiv.classList.add(color);

		// call a function handleCardClick when a div is clicked on
		newDiv.addEventListener('click', handleCardClick);

		// append the div to the element with an id of game
		gameContainer.append(newDiv);
	}
}
let maxClickCounter = 0;
// TODO: Implement this function!
function handleCardClick(event) {
	// you can use event.target to see which element was clicked
	let selectedCard1 = event.target;
	//keeping a separate click counter that is not reset unless we find a match or don't find a match at all
	if (maxClickCounter <= 2) {
		//console.log('you just clicked ', event.target + 'MCC: ' + maxClickCounter);
		//This is a separate count that is affected by the first if state below
		if (count < 2) {
			selectedCard1.style.backgroundColor = event.target.classList.value;
			maxClickCounter += 1;
			if (selectedCard1.style.backgroundColor !== undefined) {
				//console.log('count: ' + count);
				//On the first guess this will set the "last card" variable to the current guess and it will not be reset until a match is found.
				if (count === 0) {
					selectedCard2 = selectedCard1;
					//console.log('You made it to the last card set loop!');
					count += 1;
					maxClickCounter += 1;
				}
				else if (
					selectedCard1.style.backgroundColor === selectedCard2.style.backgroundColor &&
					count > 0 &&
					selectedCard2 !== selectedCard1
				) {
					//if this is not the first selection, we need to compare the last card selected's class against our current selection's class.
					//console.log('Its a match!');
					match = true;
					count = 0;
					maxClickCounter = 0;
				}
				else {
					//if there is no match and this also isn't our first time through the matching process, reset things to white.
					setTimeout(function() {
						selectedCard1.style.backgroundColor = 'white';
						selectedCard2.style.backgroundColor = 'white';
						count = 0;
						maxClickCounter = 0;
					}, 1000);
				}
			}
			else {
				selectedCard1.style.backgroundColor = event.target.classList.value;
				count += 1;
				maxClickCounter += 1;
			}
		}
	}
}

// when the DOM loads
createDivsForColors(shuffledColors);
