"use strict";
// 1.233 %
export const percentFormatter = new Intl.NumberFormat('ru-RU', { style: 'percent', maximumFractionDigits: 3 });

// 1 000 000 ₽
export const priceFormatter = new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB', maximumFractionDigits: 0});


export const monthPaymentFormatter = new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB', maximumFractionDigits: 2});
