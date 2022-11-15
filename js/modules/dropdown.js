export default function showDropdown(){

}

const select = document.querySelector('.item-select');
const dropdown = document.querySelector('.dropdown-select');


    function goDropdown(event){
        dropdown.classList.toggle('showDrop')
        select.classList.toggle('selectBorder')
        console.log("teste")

    }

    if(select){
        select.addEventListener('click', goDropdown)
    }

    