// script.js

// Order 1
const order1 = document.querySelector('[data-key="order1"]');
const biscuits1 = order1.querySelector('.biscuits .count');
const donuts1 = order1.querySelector('.donuts .count');
const pancakes1 = order1.querySelector('.pancakes .count');
const status1 = order1.querySelector('.status dd');

const biscuits1Count = order1.getAttribute('data-biscuits');
const donuts1Count = order1.getAttribute('data-donuts');
const pancakes1Count = order1.getAttribute('data-pancakes');
const isDelivered1 = order1.getAttribute('data-delivered') === 'true';

biscuits1.textContent = biscuits1Count;
donuts1.textContent = donuts1Count;
pancakes1.textContent = pancakes1Count;
status1.textContent = isDelivered1 ? 'Delivered' : 'Pending';

// Order 2
const order2 = document.querySelector('[data-key="order2"]');
const biscuits2 = order2.querySelector('.biscuits .count');
const donuts2 = order2.querySelector('.donuts .count');
const pancakes2 = order2.querySelector('.pancakes .count');
const status2 = order2.querySelector('.status dd');

const biscuits2Count = order2.getAttribute('data-biscuits');
const donuts2Count = order2.getAttribute('data-donuts');
const pancakes2Count = order2.getAttribute('data-pancakes');
const isDelivered2 = order2.getAttribute('data-delivered') === 'true';

biscuits2.textContent = biscuits2Count;
donuts2.textContent = donuts2Count;
pancakes2.textContent = pancakes2Count;
status2.textContent = isDelivered2 ? 'Delivered' : 'Pending';

// Order 3
const order3 = document.querySelector('[data-key="order3"]');
const biscuits3 = order3.querySelector('.biscuits .count');
const donuts3 = order3.querySelector('.donuts .count');
const pancakes3 = order3.querySelector('.pancakes .count');
const status3 = order3.querySelector('.status dd');

const biscuits3Count = order3.getAttribute('data-biscuits');
const donuts3Count = order3.getAttribute('data-donuts');
const pancakes3Count = order3.getAttribute('data-pancakes');
const isDelivered3 = order3.getAttribute('data-delivered') === 'true';

biscuits3.textContent = biscuits3Count;
donuts3.textContent = donuts3Count;
pancakes3.textContent = pancakes3Count;
status3.textContent = isDelivered3 ? 'Delivered' : 'Pending';
