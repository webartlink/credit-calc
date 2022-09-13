"use strict";


import { percentFormatter } from "./formatters.js";



// Переменные.  Ставки по ипотечной программе.

const programBase = 0.12,
    programIt = 0.047,
    programGov = 0.067,
    programZero = 0.108;

// Показываем ставку на странице в радиокнопках.

document.querySelector('#base-value').value = programBase;
document.querySelector('#it-value').value = programIt;
document.querySelector('#gov-value').value = programGov;
document.querySelector('#zero-value').value = programZero;


// Указываем ставку в label

document.querySelector('#base-text').innerText = percentFormatter.format(programBase) ;
document.querySelector('#it-text').innerText =  percentFormatter.format(programIt);
document.querySelector('#gov-text').innerText = percentFormatter.format(programGov);
document.querySelector('#zero-text').innerText = percentFormatter.format(programZero);


 // Отображение выбранной процентной ставки

 const programInputs = document.querySelectorAll('input[name="program"]');
 const totalPercent = document.querySelector('#total-percent');

 programInputs.forEach((input) => {
   // Ставка на старте.
	if(input.checked) {
		totalPercent.innerText =  percentFormatter.format(input.value);
	}


	//  Ставка при переключении
	input.addEventListener('click', function(e)  {
			totalPercent.innerText =  percentFormatter.format(this.value);

	});

 });








































