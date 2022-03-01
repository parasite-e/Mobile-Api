// getting the search value through api
const searchMobile = () => {
    const searchField = document.getElementById('search-field');
    const searchName = searchField.value;

    searchField.value = '';

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchName}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayResult(data.data));
}

// displaying the result
const displayResult = phones => {
    const displayResult = document.getElementById('display-result');
    phones.forEach(phone => {
        console.log(phone);
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
                      <button class="btn btn-primary w-50 mb-2">Details</button>
                    </div>
                    
                </div>
        
        `;
        displayResult.appendChild(div);
    })
}