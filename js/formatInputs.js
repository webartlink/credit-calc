"use strict";
import { priceFormatter } from './formatters.js';


// ИНПУТЫ.

const inputCost = document.querySelector('#input-cost'),
		inputDownPayment = document.querySelector('#input-downpayment'),
		inputTerm = document.querySelector('#input-term'),

		// Форма
		form = document.querySelector('#form'),

		// Тотал
		totalCost = document.querySelector('#total-cost');


// Cleave опции форматирования

const cleavePriceSettings = {
			numeral: true,
			numeralThousandsGroupStyle: 'thousand',
			delimiter: ' '
		};

		

// Запускаем форматирование Cleave
const cleaveCost = new Cleave(inputCost, cleavePriceSettings);
const cleaveDownPayment = new Cleave(inputDownPayment, cleavePriceSettings);



calcMortgage();

// Отображение и расчёт суммы кредита.

form.addEventListener('input', function() {
	
	calcMortgage();
})


//Функция расчёта суммы кредита.
function calcMortgage() {
	const totalAmount = +cleaveCost.getRawValue() -  cleaveDownPayment.getRawValue();
	totalCost.innerText = priceFormatter.format(totalAmount) ;
}












