"use strict";

import { Helper } from "./helper.js";

const sessionStorageKey = "key-session-heizkostenrechner";
const classnameInputFields = ".input-field";
const allValues = document.querySelectorAll(classnameInputFields);

const helper = new Helper(sessionStorageKey, classnameInputFields, allValues);

helper.getSessionStorage(sessionStorageKey, classnameInputFields);

helper.eventHandler();

document.querySelector(".btn-success").addEventListener("click", () => {
    if (document.querySelectorAll(".focus-ring-danger").length > 0) {
        helper.clearTable();
        helper.renderErrorMessage("Ungültiger Wert wurde eingegeben!");
    } else {
        let values = new Array();
        let everythingSet = true;

        for (const element of allValues) {
            if (isNaN(element.valueAsNumber)) {
                everythingSet = false;
                renderErrorMessage("Nicht alle Werte wurden eingegeben!");
                break;
            }
        }

        if (everythingSet) {
            for (const element of allValues) {
                values.push(element.value);
            }

            let x1 = Number(values[0]);
            let y1 = Number(values[1]);

            let x2 = Number(values[2]);
            let y2 = Number(values[3]);

            // k-Wert berechnen
            let k = ((y2 - y1) / (x2 - x1));

            let x = x2;
            let y = y2;

            // y = k*x+d
            let kx = k * x;
            let d = y - (kx);

            //f(x) = k*x+d
            //f(values[5]) = k*values[5]+d

            // let f = k * values[5] + d;
            let tbody = document.querySelector("tbody");
            tbody.replaceChildren("");

            for (let x = values[0]; x <= values[2]; x++) {
                let f = k * x + d;
                let row = document.createElement("tr");

                if (x == values[5]) {
                    row.classList.add("table-success");
                }

                if (x == values[4]) {
                    row.classList.add("table-warning");
                }

                let xValue = document.createElement("td");
                let yValue = document.createElement("td");

                f = f + Number(values[6]);

                xValue.textContent = `${x} °C`;
                yValue.textContent = `${f.toFixed(2)} °C`;

                row.appendChild(xValue);
                row.appendChild(yValue);

                document.querySelector("tbody").appendChild(row);
            }
        }
    }
});