const createCountryContainer = (country) => {
    const container = document.createElement('div');
    container.className = 'country-container';

    const img = document.createElement('img');
    img.setAttribute('src', country.flags.png);
    img.setAttribute('alt', country.flags.alt);
    container.appendChild(img);

    const name = document.createElement('h2');
    name.textContent = 'Name: ' + country.name.common;
    container.appendChild(name);

    const population = document.createElement('h5');
    population.textContent = 'Population: '+ country.population;
    container.appendChild(population);
    
    const continent = document.createElement('p');
    continent.textContent = 'Continent: ' + country.region; // Modificarea este aici
    container.appendChild(continent);

    if (country.capital) {
        const capital = document.createElement('p');
        capital.textContent = 'Capital: ' + country.capital;
        container.appendChild(capital);
    }
    if (country.currencies) {
        const currencyInfo = document.createElement('p');
        const currencyData = country.currencies[Object.keys(country.currencies)[0]];
        const currencyCode = Object.keys(country.currencies)[0];
        const currencyName = currencyData.name;
        const currencySymbol = currencyData.symbol;
        currencyInfo.textContent = `Currency: ${currencyName} (${currencyCode}) - ${currencySymbol}`;
        container.appendChild(currencyInfo);
    }
    return container;
}

let countriesList = [];

const fetchData = () => {
    fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(countries => {
        countriesList = countries;
        const countriesContainer = document.getElementById('countries');

        countries.forEach((country)=> {
            const countryContainer = createCountryContainer(country);
            countriesContainer.appendChild(countryContainer);
        })
    })
    .catch(error => console.log(error));
}

fetchData();

const showAll =() => {
    const countriesContainer = document.getElementById('countries');
    countriesContainer.innerHTML = "";

    const searchInput = document.getElementById('search-input');
    searchInput.value = '';

    fetchData();
    handleInput();
}

const searchCountry = () => {
    const searchInput = document.getElementById('search-input');
    const countryName = searchInput.value.trim();
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then(response => response.json())
    .then(countries => {
        const countriesContainer = document.getElementById('countries');
        countriesContainer.innerHTML = "";

        countries.forEach((country)=> {
            const countryContainer = createCountryContainer(country);
            countriesContainer.appendChild(countryContainer);
        })
    })
    .catch(error => {
        const countriesContainer = document.getElementById('countries');
        countriesContainer.innerHTML = '<div class="error">No results found.</div>'
    });
}

const handleInput = () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    searchButton.disabled = !searchInput.value.trim();
}

const searchInput = document.getElementById('search-input');
searchInput.addEventListener('keydown', (event)=> {
    if (event.key === 'Enter') {
        searchCountry();
    }
})
// searchButton.addEventListener('mouseover', () => {
//     console.log('Mouse is over the button');
// })

handleInput()

const array =  ['Ana', "Maria", "Albert"];
array.sort((a, b) => a-b)
// setTimeout(()=> console.log(countriesList), 1000);

const sortCountries = (sortParam) => {
    switch(sortParam) {
        case 'sort':
            return countriesList;
        case 'population':
            return countriesList.sort((a, b)=> a.population - b.population);
        case 'area':
            return countriesList.sort((a, b)=> a.area - b.area);
        case 'name':
        default:
            return countriesList.sort((a, b)=> a.name.common.localeCompare(b.name.common));
            
    }
}

const sortSelect = document.getElementById('sort-select');
sortSelect.addEventListener('change', ()=> {
    const countriesContainer = document.getElementById('countries');
    countriesContainer.innerHTML = '';

    const sortedCountries = sortCountries(sortSelect.value);

    sortedCountries.forEach((country)=> {
        const countryContainer = createCountryContainer(country);
        countriesContainer.appendChild(countryContainer);
    })
})
