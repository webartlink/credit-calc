"use strict";
import { priceFormatter, monthPaymentFormatter } from './formatters.js';

const maxPrice = 100000000;
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

    let cost = +cleaveCost.getRawValue();
    if(cost > maxPrice) {
        cost = maxPrice;
    }


    //  Общая сумма кредита
	const totalAmount = cost -  cleaveDownPayment.getRawValue();
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

// Cost

const sliderCost = document.getElementById('slider-cost');

noUiSlider.create(sliderCost, {
    start: 12000000,
    connect: 'lower',
    step: 100000,
    // tooltips: true,
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


sliderCost.noUiSlider.on('slide', () => {
    const sliderValue = parseInt(sliderCost.noUiSlider.get(true));
    inputCost.value = sliderValue;
    cleaveCost.setRawValue(sliderValue);
     calcMortgage();
    }
);


// downpayment

const sliderDownpayment = document.getElementById('slider-downpayment');

noUiSlider.create(sliderDownpayment, {
    start: 6000000,
    connect: 'lower',
    step: 100000,
    tooltips: true,
    range: {
        'min': 0,
        'max': 100000000
    },

    format: wNumb({
        decimals: 0,
        thousand: ' ',
        suffix: '',
    }),
});


sliderDownpayment.noUiSlider.on('slide', () => {
        const sliderValue = parseInt(sliderDownpayment.noUiSlider.get(true));
        cleaveDownPayment.setRawValue(sliderValue);
        calcMortgage();
    }
);

// Slider years

const sliderTerm = document.getElementById('slider-term');

noUiSlider.create(sliderTerm, {
    start: 1,
    connect: 'lower',
    step: 1,
    tooltips: true,
    range: {
        'min': 1,
        'max': 30
    },

    format: wNumb({
        decimals: 0,
        thousand: '',
        suffix: '',
    }),
});


sliderTerm.noUiSlider.on('slide', () => {
        const sliderValue = parseInt(sliderTerm.noUiSlider.get(true));
        cleaveTerm.setRawValue(sliderValue);
        calcMortgage();
    }
);


// Форматирование инпута

inputCost.addEventListener('input', () => {
    const value = +cleaveCost.getRawValue();

  //  Обновляем range slider
    sliderCost.noUiSlider.set(value);

  // Проверка на макс цену
    if(value > maxPrice) {
        inputCost.closest('.param__details').classList.add('param__details--error');

    } else {
        inputCost.closest('.param__details').classList.remove('param__details--error');
    }

    const percentMin = value * 0.15;
    const percentMax = value * 0.90;

sliderDownpayment.noUiSlider.updateOptions({
    range: {
        min: percentMin,
        max: percentMax
    },
});


})


inputCost.addEventListener('change', () => {
    const value = +cleaveCost.getRawValue();

    if(value > maxPrice) {
        inputCost.closest('.param__details').classList.remove('param__details--error');
        cleaveCost.setRawValue(maxPrice);

    }
})






























