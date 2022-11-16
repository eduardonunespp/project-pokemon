import openModal from "./modules/modal.js";
import showDropdown from "./modules/dropdown.js"




    const countPokemons = document.querySelector('#js-count-pokemons')
    const areaPokemons = document.querySelector('#js-list-pokemon')


    function creatCardPokemon(code, type, nome, imagePok){
        let card = document.createElement('button')
        card.classList = `card-pokemon js-open-detals-pokemon ${type}`
        areaPokemons.appendChild(card)

        let image = document.createElement('div')
        image.classList = 'image';
        card.appendChild(image)
        

        let imgSrc = document.createElement('img')
        imgSrc.classList = 'imgThumb'
        imgSrc.setAttribute('src', imagePok)
        image.appendChild(imgSrc)

        let info = document.createElement('div')
        info.classList = 'info'
        card.appendChild(info)

        let text = document.createElement('div')
        text.classList = 'text'
        info.appendChild(text)

        let id = document.createElement('span')

        id.textContent = (code < 10) ? `#00${code}` :  (code < 100) ? `#0${code}` :  `#${code}`
        text.appendChild(id)
        //if(code => 0 && code <= 9){
        //     id.innerText = '#00' + code;
        //     text.appendChild(id)
        // }else if(code => 10 && code <= 99){
        //     id.innerText = '#0' + code;
        //     text.appendChild(id)
        // }else if(code => 100 && code <= 1024){
        //     id.innerText = '#' + code;
        //     text.appendChild(id)
        // }
        console.log(code)


        let pokename = document.createElement('h3')
        const upper = nome[0].toUpperCase() + nome.substring(1)
        pokename.innerText = upper;
        text.appendChild(pokename)

        let iconArea = document.createElement('div')
        iconArea.classList = 'icon'
        info.appendChild(iconArea)

        let imgIcon = document.createElement('img')
        imgIcon.setAttribute('src', `img/icon-types/${type}.svg`)
        iconArea.appendChild(imgIcon)

    }


    function listingPokemons(urlAPI) {
        axios({
            method: 'GET',
            url: urlAPI
        })
        .then(response => {
            const {results, next, count} = response.data
            
            countPokemons.innerText = count;

            results.forEach(pokemons => {
                let pokeDetails = pokemons.url;

                axios({
                    method: 'GET',
                    url: `${pokeDetails}`
                })
                .then(response => {
                    const {name, id, sprites, types} = response.data;

                    const infoCard = {
                        nome: name, 
                        code: id,
                        imagePok: sprites.other.dream_world.front_default,
                        type: types[0].type.name
                    }

                    creatCardPokemon(infoCard.code, infoCard.type, infoCard.nome, infoCard.imagePok)
                
                        const cardPokemon = document.querySelectorAll('.js-open-detals-pokemon')


                        cardPokemon.forEach(card => {
                        card.addEventListener('click', openModal)
                 })
                    
                })
            })
        
        })
    }

    listingPokemons('https://pokeapi.co/api/v2/pokemon?limit=28&offset=0')

    


openModal()
showDropdown()