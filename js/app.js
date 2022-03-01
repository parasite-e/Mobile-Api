// getting the search value through api
const searchMobile = () => {
    const searchField = document.getElementById('search-field');
    const searchName = searchField.value;

    searchField.value = '';

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchName}`;
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data.data));
}