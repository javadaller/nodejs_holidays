#!/usr/bin/env node

const { getCode } = require('country-list');
const Holidays = require('date-holidays');

const hd = new Holidays();

const args = process.argv.slice(2);
if (args.length !== 1) {
    console.error('Usage: holidates <countryName>');
    process.exit(1);
}

const countryName = args[0];

const countryCode = getCode(countryName);
if (!countryCode) {
    console.error('Invalid country name.');
    process.exit(1);
}

hd.init(countryCode);

const currentYear = new Date().getFullYear();

const result = hd.getHolidays(currentYear);

for (let i = 0; i < result.length; i++) {
    console.log(result[i].name);
    console.log('from ' + result[i].start.toLocaleDateString() + ' to ' + result[i].end.toLocaleDateString());
    console.log('-----------------------------------');
}
