// toogling the details display 
const toggleDetailsDisplay = display => {
    const displayDetails = document.getElementById('display-details');
    displayDetails.style.display = display;
}

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
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchName}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayResult(data.data));
    }

    toggleDetailsDisplay('none');
}

// displaying the result
const displayResult = phones => {
    const displayResult = document.getElementById('display-result');
    displayResult.textContent = '';

    const apiError = document.getElementById('api-error');
    if (phones.length == 0) {
        apiError.style.display = 'block';
    } else {
        apiError.style.display = 'none';
        phones.slice(0, 20).forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card display-card">
                <div class="d-flex justify-content-center p-3">
                <img src="${phone.image}" class="card-img-top" alt="..."> 
                </div>        
                     
                        <div class="d-flex flex-column align-items-center">
                          <div class="card-body text-center">
                           <h5 class="card-title">${phone.phone_name}</h5>
                           <h6>${phone.brand}</h6>
                          </div>
                          <button onclick="loadPhoneDetails('${phone.slug}')" class="w-50 mb-2 details-btn">Details</button>
                        </div>
                    </div>
            `;
            displayResult.appendChild(div);
        })
    }

}

// loading the phone deatails 
const loadPhoneDetails = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data));
}

const displayPhoneDetails = phone => {
    toggleDetailsDisplay('block');
    const displayDetails = document.getElementById('display-details');
    displayDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <div class="d-flex justify-content-center p-3">
      <img src="${phone.image}" class="card-img-top p-2" alt="...">
    </div>
    <div class="card-body details-list">
        <h4 class="card-title">${phone.brand}</h4>
        <h5 class="card-text">${phone.name}</h5>
        <p><small>${phone?.releaseDate ?? "comming soon"}</small></p >
    </div >
    <ul class="list-group list-group-flush">
        <li class="list-group-item details-list">
            <h6>Main Features</h6>
            <ul>
                <li><strong>ChipSet: </strong>${phone.mainFeatures.chipSet}</li>
                <li><strong>Display Size: </strong>${phone.mainFeatures.displaySize}</li>
                <li><strong>Memory: </strong>${phone.mainFeatures.memory}</li>
                <li><strong>Storage: </strong>${phone.mainFeatures.storage}</li>
            </ul>
        </li>
        <li class="list-group-item details-list"><strong>Sensors:</strong> ${phone.mainFeatures.sensors}</li>
        <li class="list-group-item details-list">
            <h6>Others</h6>
            ${phone.others ? `<ul>
                <li><strong>Bluetooth</strong>: ${phone?.others?.Bluetooth ?? "Not Available"}</li>
                <li><strong>GPS</strong>: ${phone?.others?.GPS ?? "Not Available"}</li>
                <li><strong>NFC</strong>: ${phone?.others?.NFC ?? "Not Available"}</li>
                <li><strong>Radio</strong>: ${phone?.others?.Radio ?? "Not Available"}</li>
                <li><strong>USB</strong>: ${phone?.others?.USB ?? "Not Available"}</li>
                <li><strong>WLAN</strong>: ${phone?.others?.WLAN ?? "Not Available"}</li>
            </ul>` : "Not Available"}
        </li>
    </ul>

`;
    displayDetails.appendChild(div);
}