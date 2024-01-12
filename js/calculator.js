const dateForm = document.querySelector('.fieldset');
const yearInput = dateForm.querySelector('#year');
const monthInput = dateForm.querySelector('#month');
const dayInput = dateForm.querySelector('#day');
const inputs = document.querySelectorAll('.input');

const yearOutput = document.querySelector('.results.year');
const monthOutput = document.querySelector('.results.month');
const dayOutput = document.querySelector('.results.day');

// ======================================================= validation

const enoughDays = () => {
    const month = parseInt(monthInput.value);
    const short = [4, 6, 9, 11];
    let enough = true
    if (month == 2) {
        enough = parseInt(dayInput.value) <= 29;
    } else if (short.includes(month)) {
        enough = parseInt(dayInput.value) <= 30;
        console.log("enough", enough);
    }

    return enough;
}

const isPastYear = () => {
    const now = new Date(Date.now());
    const currentYear = now.getFullYear();
    const isPast = parseInt(yearInput.value) <= currentYear;
    return isPast
}

const isInThePast = () => {
    let past = false;
    if (monthInput.value) {
        if (dayInput.value) {
            const now = new Date(Date.now());
            const date = new Date(`${yearInput.value}-${monthInput.value}-${dayInput.value}`);
            past = Date.parse(date) <= Date.parse(now);
        }
    }
    return past;
}

const pristine = new Pristine(dateForm, {
    classTo: 'form-group',
    errorClass: 'has-danger',
    successClass: 'has-success',
    errorTextParent: 'form-group',
    errorTextTag: 'div',
    errorTextClass: 'text-help'
}, false);

pristine.addValidator(
    dayInput,
    enoughDays,
    'Must be a valid date'
)

pristine.addValidator(
    yearInput,
    isPastYear,
    'Must be in the past'
)

pristine.addValidator(
    yearInput,
    isInThePast,
    'Must be in the past'
)

monthInput.addEventListener('change', () => {
    pristine.validate(dayInput);
    pristine.validate(monthInput);
})
dayInput.addEventListener('change', () => {
    pristine.validate(dayInput);
})
yearInput.addEventListener('change', () => {
    pristine.validate(yearInput);
})

// ====================================================== animation

const animateValue = (field, max) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / 3000, 1);
        field.textContent = `${Math.floor(progress * max)}`;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// ===================================================== form control

const onFormSubmit = () => {
    const birth = new Date(`${yearInput.value}-${monthInput.value}-${dayInput.value}`);
    const now = new Date(Date.now());
    const diff = Date.parse(now) - Date.parse(birth);
    const diffDate = new Date(diff);
    const year = parseInt(diffDate.getFullYear()) - 1970;
    const month = diffDate.getMonth();
    const day = diffDate.getDate();

    animateValue(yearOutput, year);
    animateValue(monthOutput, month);
    animateValue(dayOutput, day);
}

dateForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const valid = pristine.validate();
    console.log(valid);
    if (valid) {
        onFormSubmit();
    }
})
