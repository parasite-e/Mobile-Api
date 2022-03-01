// getting the search value through api
const searchMobile = () => {
    const searchField = document.getElementById('search-field');
    const searchName = searchField.value;

    searchField.value = '';
    const inputError = document.getElementById('input-error');
    if (searchName == '') {
        inputError.style.display = 'block';

    } else {
        inputError.style.display = 'none';
    }
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchName}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayResult(data.data));


}

// displaying the result
const displayResult = phones => {
    const displayResult = document.getElementById('display-result');
    displayResult.textContent = '';
    phones.forEach(phone => {
        // console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">        
                <img src="${phone.image}" class="card-img-top" alt="...">  
                    <div class="d-flex flex-column align-items-center">
                      <div class="card-body text-center">
                       <h5 class="card-title">${phone.phone_name}</h5>
                       <h6>${phone.brand}</h6>
                      </div>
                      <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary w-50 mb-2">Details</button>
                    </div>
                </div>
        
        `;
        displayResult.appendChild(div);
    })
}

// loading the phone deatails 
const loadPhoneDetails = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data));
}

const displayPhoneDetails = phone => {
    console.log(phone);
    const displayDetails = document.getElementById('display-details');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${phone.image}" class="card-img-top p-3" alt="...">
    <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
            card's content.</p>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">An item</li>
        <li class="list-group-item">A second item</li>
        <li class="list-group-item">A third item</li>
    </ul>
    
    `;
    displayDetails.appendChild(div);
}