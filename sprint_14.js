let arr = [1, 2, 3, 4, 5, 6, 7, 8];
arr = arr.sort((a, b) => 0.5 - Math.random());

const keys = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Enter', ' ', 'R']
const gamefield = document.querySelector('.gamefield');
let blocks;
let error = 0;


console.log(arr);

let x = 0;
let y = 0;
let step = 1;

function fieldInit() {
	for (let i = 0; i < 2; i++) {
		for (let k = 0; k < 4; k++) {
			let div = document.createElement('div');
			div.textContent = arr[i * 4 + k];
			if (i === 0 && k === 0) div.classList.add('active');
			gamefield.append(div);
		}
	}

	setTimeout(function () {
		blocks = document.querySelectorAll('.gamefield div');
		blocks.forEach(item => item.textContent = '');
		document.addEventListener('keydown', pressKey);
	}, 3000);

}

function pressKey(event) {
	console.log(event.key);
	if (!keys.includes(event.key)) return;

	blocks[y * 4 + x].classList.remove('active');

	switch (event.key) {
		case 'ArrowUp':
			y - 1 >= 0 ? y-- : y = 1;
			break;

		case 'ArrowDown':
			y + 1 === 2 ? y = 0 : y++;
			break;

		case 'ArrowLeft':
			x - 1 >= 0 ? x-- : x = 3;
			break;

		case 'ArrowRight':
			x + 1 === 4 ? x = 0 : x++;
			break;

		case 'Enter':
			if (arr[y * 4 + x] === step) {
				blocks[y * 4 + x].textContent = arr[y * 4 + x];
				step++;
			} else {
				error++;
			}
			break;
		case ' ':
			if (arr[y * 4 + x] === step) {
				blocks[y * 4 + x].textContent = arr[y * 4 + x];
				step++;
			} else {
				error++;
			}
			break;
		case 'R':
			gamefield.textContent = '';
			fieldInit();
	}

	blocks[y * 4 + x].classList.add('active');

	if (error === 2) {
		document.querySelector('.h3').textContent = 'You lost!';
		setTimeout(function () {
			location.reload();
		}, 2000);

	}

	if (step === 9) {
		document.querySelector('.h3').textContent = 'You win!!';
		setTimeout(function () {
			location.reload();
		}, 2000);
	}
}

fieldInit();