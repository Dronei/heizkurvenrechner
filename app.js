const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

let allValues = document.querySelectorAll(`.input-field`);

for (const element of allValues) {
    element.addEventListener("change", () => {
        validateInput(element);
    });
};

document.querySelector(".btn-success").addEventListener("click", () => {
    if (document.querySelectorAll(".focus-ring-danger").length > 0) {
        clearTable();
        renderErrorMessage("Ungültiger Wert wurde eingegeben!");
    } else {
        let values = new Array();
        let everythingSet = true;

        for (const element of allValues) {
            console.log(element.valueAsNumber);
            if (isNaN(element.valueAsNumber)) {
                debugger
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
        }
    }
});

function validateInput(element) {
    if (Number(element.value) < Number(element.min) || Number(element.value) > Number(element.max)) {
        console.error(`Ungültiger Wert! ${element.value} °C ist kleiner als ${element.min} °C`);
        element.classList.replace("focus-ring-success", "focus-ring-danger");
        element.classList.replace("valid-feedback", "invalid-feedback");
        element.classList.add("invalid-feedback", "focus-ring-danger", "d-inline-flex", "focus-ring", "py-1", "px-2", "text-decoration-none", "border", "rounded-2");
    } else {
        element.classList.replace("focus-ring-danger", "focus-ring-success");
        element.classList.replace("invalid-feedback", "valid-feedback");
        element.classList.add("valid-feedback", "focus-ring-success", "d-inline-flex", "focus-ring", "py-1", "px-2", "text-decoration-none", "border", "rounded-2");
    }

    document.querySelector("#warning-area").replaceChildren("");
};

function clearTable() {
    document.querySelector("tbody").replaceChildren("");
}

function renderErrorMessage(message) {
    let span = document.createElement("span");
    span.classList.add("alert", "alert-warning");
    span.setAttribute("role", "alert");
    span.textContent = message;

    document.querySelector("#warning-area").appendChild(span);
}