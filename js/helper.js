export function Helper(sessionStorageKey, classnameInputFields, allValues) {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

    /**
     * 
     * @param {HTMLCollection} element - Inputfeld welches Überprüft werden soll
     */
    this.validateInput = (element) => {
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

    this.clearTable = () => {
        document.querySelector("tbody").replaceChildren("");
    }

    /**
     * 
     * @param {String} message - Fehlermeldung die Ausgegeben werden soll
     */
    this.renderErrorMessage = (message) => {
        let span = document.createElement("span");
        span.classList.add("alert", "alert-warning");
        span.setAttribute("role", "alert");
        span.textContent = message;

        document.querySelector("#warning-area").appendChild(span);
    }

    /**
     * 
     * @param {String} key - Der Schlüssel unter dem der Eintrag gespeichert werden soll
     * @param {Array} data - Die Daten die gespeichert werden sollen
     * 
     * Diese Funktion sieht nach ob bereits Daten vorhanden sind.
     * Sollten Daten vorhanden sein werden diese in einen Buffer zwischengespeichert, 
     * der Sessionstorage geleert und danach wieder mit den Daten des Buffers gefüllt.
     * So soll der Sessionstorage klein gehalten werden.
     * 
     */
    this.setSessionStorage = (key, data) => {
        const buffer = new Array();

        if (sessionStorage.getItem(key) != null) {
            buffer.push(JSON.parse(sessionStorage.getItem(key)));

            sessionStorage.removeItem(key);
            sessionStorage.setItem(key, JSON.stringify(data));
        } else {
            sessionStorage.setItem(key, JSON.stringify(data));
        }
    }

    /**
     * 
     * @param {String} classname - Der Klassenname der Inputfelder der die Daten enthält
     * @returns {Array} - Ein Array das die Daten der Inputfelder enthält.
     */
    this.getInputData = (classname) => {
        const output = new Array();
        const inputFields = document.querySelectorAll(classname)

        for (const element of inputFields) {
            output.push(element.value);
        }

        return output;
    }

    /**
     * 
     * @param {String} key - Des Schlüssel mit dem die Daten gesucht werden
     * @param {String} classname - Der Klassenname der Inputfelder, wohin die Daten geschrieben werden
     * 
     * Diese Funktion holt die Daten und schreibt sie in die ausgewählten Inputfelder.
     */
    this.getSessionStorage = (key, classname) => {
        const buffer = JSON.parse(sessionStorage.getItem(key));
        const inputFields = document.querySelectorAll(classname);

        if (buffer != null) {
            for (let x = 0; x < inputFields.length; x++) {
                inputFields[x].valueAsNumber = buffer[x];
                this.validateInput(inputFields[x]);
            }
        }
    }

    this.eventHandler = () => {
        for (const element of allValues) {
            element.addEventListener("change", () => {
                this.validateInput(element);
                this.setSessionStorage(sessionStorageKey, this.getInputData(classnameInputFields));
            });
        };
    }
}
