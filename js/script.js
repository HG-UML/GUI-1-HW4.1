/*
Hannah Guillen, UMass Lowell Computer Science
  hannah_guillen@student.uml.edu, hguillen@cs.uml.edu
Date: November 29, 2022
File: script.js
GUI Assignment: Using jQuery Plugin/UI with Dynamic Table
  This JavaScript file contains all necessary functions for the table.
  Includes updated jQuery Validation plugins.

Copyright (c) 2022 by Hannah Guillen. All rights reserved. May be freely
copied or excerpted for educational purposes with credit to the author.
*/

// jQuery form validation
$().ready(function () {
  $("#signupForm").validate( {
    rules: {
      min_c: {
        required: true,
        range: [-50, 50]
      },
      max_c: {
        required: true,
        range: [-50, 50]
      },
      min_r: {
        required: true,
        range: [-50, 50]
      },
      max_r: {
        required: true,
        range: [-50, 50]
      }
    },
    messages: {
      min_c: {
        required: "Enter a minimum value for the columns.",
        range: "Only enter a number between -50 and 50!",
      },
      max_c: {
        required: "Enter a maximum value for the columns.",
        range: "Only enter a number between -50 and 50!",
      },
      min_r: {
        required: "Enter a minimum value for the rows.",
        range: "Only enter a number between -50 and 50!",
      },
      max_r: {
        required: "Enter a maximum value for the rows.",
        range: "Only enter a number between -50 and 50!",
      },
    }
  });
  $('#signupForm').submit(function (event) {
    event.preventDefault();
    if ($('#signupForm').valid()) {
      genTable();
    }
  });
})
function setArray(min, max) {
  let array = [];     // First value in array is 0
  if (min !== 0) {
    array.push(0);
  }
  for (let i = min; i <= max; i++) {
    array.push(i);
  }
  return array;
}

function genTable() {
  // Remove table if existing
  if (document.querySelector("table")) {
    document.querySelector("table").remove();
  }

  const table = document.createElement('table');

  // Store variable values; use Number to check if value is number
  const min_c = Number(document.getElementById("min_c").value);
  const max_c = Number(document.getElementById("max_c").value);
  const min_r = Number(document.getElementById("min_r").value);
  const max_r = Number(document.getElementById("max_r").value);

  // Initialize arrays
  const colArray = setArray(min_c, max_c);
  const rowArray = setArray(min_r, max_r);

  for (let i = 0; i < rowArray.length; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < colArray.length; j++) {
      const column = document.createElement('td');

      // Multiply given values
      let val = rowArray[i] * colArray[j];

      // Set initial row and column
      if (i === 0 || j === 0) {
        val = rowArray[i] || colArray[j];
        column.classList.add('initial_xy');
      }

      // Leave first cell blank
      if (i === 0 && j === 0) val = '';

      column.innerHTML = val;
      row.appendChild(column);
    }
    table.appendChild(row);
  }
  const container = document.getElementById("tableBox");
  container.appendChild(table);
  event.preventDefault();
}
