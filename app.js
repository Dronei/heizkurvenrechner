const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

let allValues = document.querySelectorAll(`.input-field`);

for (const element of allValues) {
    element.addEventListener("change", () => {
        validateInput(element);
    });
};

document.querySelector(".btn-success").addEventListener("click", () => {
    let values = new Array();

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
        console.log(x, f.toFixed(2));
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


});

function validateInput(element) {
    if(element.value > element.min && element.value < element.max){
        console.error(`Ungültiger Wert! ${element.value} °C ist kleiner als ${element.min} °C`);
    } else if (element.value > element.max){
        console.error(`Ungültiger Wert! ${element.value} °C ist größer als ${element.max} °C`);
    }
};