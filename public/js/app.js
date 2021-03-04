const locationForm = document.querySelector('form');
const search = document.querySelector('input');
const errorParagraph = document.querySelector('#error');
const weatherParagraph = document.querySelector('#weather');

locationForm.addEventListener('submit', (event) =>{
    event.preventDefault();

    errorParagraph.textContent = 'Loading;'
    weatherParagraph.textContent = '';

    const url = `/weather?address=${search.value}`;
    fetch(url).then(response => {
        response.json().then(data => {
            if (data.error) {
                console.error(data.error);
                errorParagraph.textContent = data.error;
            }
            else {
                errorParagraph.textContent = '';
                weatherParagraph.textContent = `Location: ${data.location}, Forecast: ${data.forecast}, Feels like: ${data.feels}
                    wind: ${data.wind}, wind direction: ${data.windDirection},
                    description: ${data.description.join(", ")}`;

            }
        })
    });
})
