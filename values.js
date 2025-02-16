export function Values(classname) {
    const values = {
        Normaussentemperatur: null,
        Vorlauftemperatur: null,
        Heizgrenze: null,
        FuerAussentemperatur: null
    };

    let allValues = document.querySelectorAll(`.${classname}`);

    for (const element of allValues) {
        element.addEventListener("change", () => {
            this.getValues(element);
        })
    }

    this.getValues = (element) => {
        values.Normaussentemperatur = element[0].value;
        values.Vorlauftemperatur = element[1].value;
        values.Heizgrenze = element[2].value;
        values.FuerAussentemperatur = element[3].value;

        return values;
    }
}