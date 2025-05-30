const topText = document.getElementById("topTextField");
const convertButton = document.getElementById("convertButton");
const bottomLabel = document.getElementById("bottomLabel");
const dropOrigin = document.getElementById("tempUnitOrigin");
const dropDestination = document.getElementById("tempUnitDestination");

function convertTemp(value, fromUnit, toUnit) {
    let celsius;

    // use celsius as a global hub for conversion
    if (fromUnit === "celsius") {
        celsius = value;
    } else if (fromUnit === "fahrenheit") {
        celsius = (value - 32) * 5 / 9;
    } else if (fromUnit === "kelvin") {
        celsius = value - 273.15;
    }

    // convert from Celsius to target unit
    if (toUnit === "celsius") {
        return celsius;
    } else if (toUnit === "fahrenheit") {
        return (celsius * 9 / 5) + 32;
    } else if (toUnit === "kelvin") {
        return celsius + 273.15;
    }
}

function tryConvert(warningStatement) {
    const inputValue = parseFloat(topText.value);
    const fromUnit = dropOrigin.value;
    const toUnit = dropDestination.value;

    if (!isNaN(inputValue)) {
        const result = convertTemp(inputValue, fromUnit, toUnit);
        let resultString = String(result.toFixed(2))

        if (resultString.includes('.')) {
            // replace .0 with empty string
            resultString = resultString.replace(/\.?0+$/, '');
            
            // if last '.', then remove it. ex = 123. -> 123
            if (resultString.slice(-1) === '.') {
                resultString = resultString.slice(0, -1);
            }
        }

        bottomLabel.value = resultString;
    } else {
        if(warningStatement) bottomLabel.value = "Please enter a valid number.";
    }
}

dropOrigin.addEventListener("change", () => tryConvert(false));
dropDestination.addEventListener("change", () => tryConvert(false));
convertButton.addEventListener("click", () => tryConvert(true));

document.addEventListener("keydown", (event) => {
    const key = event.key;

    if(key === "Enter" || key === "=") {
        event.preventDefault();
        tryConvert(true);
    }
});