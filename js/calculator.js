const dateForm = document.querySelector('.fieldset');
const yearInput = dateForm.querySelector('#year');
const monthInput = dateForm.querySelector('#month');
const dayInput = dateForm.querySelector('#day');
const inputs = document.querySelectorAll('.input');

const yearOutput = document.querySelector('.results.year');
const monthOutput = document.querySelector('.results.month');
const dayOutput = document.querySelector('.results.day');

const pristine = new Pristine(dateForm, {
    classTo: 'form-group',
    errorClass: 'has-danger',
    successClass: 'has-success',
    errorTextParent: 'form-group',
    errorTextTag: 'div',
    errorTextClass: 'text-help' 
});

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

const onFormSubmit = () => {
    const birth = new Date(`${yearInput.value}-${monthInput.value}-${dayInput.value}`);
    const now = new Date(Date.now());
    const diff = Date.parse(now) - Date.parse(birth);
    const diffDate = new Date(diff);
    const year = parseInt(diffDate.getFullYear()) - 1970;
    const month = diffDate.getMonth();
    const day = diffDate.getDate();

    yearOutput.textContent = `${year}`;
    monthOutput.textContent = `${month}`;
    dayOutput.textContent = `${day}`;
}

month.addEventListener('change', () => {
    const short = [4, 6, 9, 11]
    if (month.value == 4) {
        dayInput.setAttribute("max", 29);
    } else if (short.includes(month.value)) {
        dayInput.setAttribute("max", 30);        
    }
})

dateForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const valid = pristine.validate();
    console.log(valid);
    if (valid) {
        onFormSubmit();
    }
})
