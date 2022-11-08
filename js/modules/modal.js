
export default function openModal(){

}

    const cardPokemon = document.querySelectorAll('.js-open-detals-pokemon')
    const modal = document.querySelector('.modal')
    const close = document.querySelector('.modal .close')
    const box = document.querySelector('.modal .box')

    console.log(cardPokemon)

        function showModal(event){
            event.preventDefault()
            modal.classList.add('open-modal')
            box.classList.add('animationModal')       
        }

        function closeModal(){
            modal.classList.remove('open-modal')
        }

    cardPokemon.forEach(card => {
        card.addEventListener('click', showModal)
    })

    close.addEventListener('click', closeModal)


    


