#!/usr/bin/env node

const axios = require('axios');
const { getCode } = require('country-list');

const args = process.argv.slice(2);

const countryName = args[0];
const countryCode = getCode(countryName);
if (!countryCode) {
    console.error('Invalid country name.');
    process.exit(1);
}

let year = args[1]

if(!year) {
    year = new Date().getFullYear();
}

const apiUrl = `https://date.nager.at/api/v3/publicholidays/${year}/${countryCode}`;

axios.get(apiUrl)
    .then(response => {
        const holidays = response.data;

        holidays.forEach(holiday => {
            console.log(holiday.name);
            console.log(holiday.date);
            console.log('-----------------------------------');
        });
    })
    .catch(error => {
        console.error('Error fetching holidays:', error.message);
    });
