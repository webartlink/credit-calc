"use strict";
import { priceFormatter, monthPaymentFormatter } from './formatters.js';


// ИНПУТЫ.

const inputCost = document.querySelector('#input-cost'),
		inputDownPayment = document.querySelector('#input-downpayment'),
		inputTerm = document.querySelector('#input-term'),

		// Форма
		form = document.querySelector('#form'),

		// Тотал
		totalCost = document.querySelector('#total-cost'),
        totalMonthPayment = document.querySelector('#total-month-payment');


// Cleave опции форматирования

const cleavePriceSettings = {
			numeral: true,
			numeralThousandsGroupStyle: 'thousand',
			delimiter: ' '
		};


		

// Запускаем форматирование Cleave
const cleaveCost = new Cleave(inputCost, cleavePriceSettings);
const cleaveDownPayment = new Cleave(inputDownPayment, cleavePriceSettings);
const cleaveTerm = new Cleave(inputTerm,  cleavePriceSettings);



calcMortgage();

// Отображение и расчёт суммы кредита.

form.addEventListener('input', function() {
	
	calcMortgage();
})


//Функция расчёта кредита.
function calcMortgage() {
    //  Общая сумма кредита
	const totalAmount = +cleaveCost.getRawValue() -  cleaveDownPayment.getRawValue();
	totalCost.innerText = priceFormatter.format(totalAmount);

    // Ставка по кредиту
    const creditRate = +document.querySelector('input[name="program"]:checked').value;
    const monthRate = creditRate / 12;

    // Срок ипотеки
    const years = +cleaveTerm.getRawValue();
    const months = years * 12;

    // Расчёт ежемесячного платежа
    const monthPayment = (totalAmount * monthRate) / 1 - (1 + monthRate) * (1 - months);

    // Отображение ежемесячного платежа
    totalMonthPayment.innerText = monthPaymentFormatter.format(monthPayment);

}


// Ползунки

const sliderCost = document.getElementById('slider-cost');

noUiSlider.create(sliderCost, {
    start: 12000000,
    connect: 'lower',
    step: 100000,
    tooltips: true,
    range: {
        'min': 0,
        '50%': [10000000, 1000000],
        'max': 100000000
    },

    format: wNumb({
        decimals: 0,
        thousand: ' ',
        suffix: '',
    }),
});


sliderCost.noUiSlider.on('update', () => {
    const sliderValue = parseInt(sliderCost.noUiSlider.get(true));
    inputCost.value = sliderValue;
    cleaveCost.setRawValue(sliderValue);
     calcMortgage();
    }
);








































