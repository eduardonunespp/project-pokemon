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

    listingPokemons('https://pokeapi.co/api/v2/pokemon?limit=9&offset=0')

    


openModal()
showDropdown()

//script para listar todos os tipos de pokemon

const areaTypes = document.querySelector('#js-type-area')
const selectArea = document.querySelector('.select-area')

console.log(selectArea)

    axios({
        method: 'GET',
        url: 'https://pokeapi.co/api/v2/type'
    })
    .then(response => {
        const { results } = response.data;
        

        results.forEach((type, index) => {


            if(index !== 18 && index !== 19){
                let itemType = document.createElement('li')
                areaTypes.appendChild(itemType)
    
                let buttonFilter = document.createElement('button')
                buttonFilter.classList = `type-filter ${type.name}`
                buttonFilter.setAttribute('code-type', index + 1)
                itemType.appendChild(buttonFilter)
    
                let iconFilter = document.createElement('div')
                iconFilter.classList = 'icon-button'
                buttonFilter.appendChild(iconFilter)
    
                let imgFilter = document.createElement('img')
                imgFilter.setAttribute('src', `img/icon-types/${type.name}.svg`)
                iconFilter.appendChild(imgFilter)
    
                let spanFilter = document.createElement('span')
                const name = `${type.name}`
                const upper = name[0].toUpperCase() + name.substring(1)
                spanFilter.innerText = upper
                buttonFilter.appendChild(spanFilter)

                // Aqui é o preenchimento do select mobile dos t ipos

                let itemTypeMobile = document.createElement('li')
                selectArea.appendChild(itemTypeMobile)

                let buttonFilterMobile = document.createElement('button')
                buttonFilterMobile.classList = `type-filter ${type.name}`
                buttonFilterMobile.setAttribute('code-type', index + 1)
                itemTypeMobile.appendChild(buttonFilterMobile)

                let iconFilterMobile = document.createElement('div')
                iconFilterMobile.classList = 'icon-button'
                buttonFilterMobile.appendChild(iconFilterMobile)

                let imgFilterMobile = document.createElement('img')
                imgFilterMobile.setAttribute('src', `img/icon-types/${type.name}.svg`)
                iconFilterMobile.appendChild(imgFilterMobile)


                let spanFilterMobile = document.createElement('span')
                const nameMobile = `${type.name}`
                const upperMobile = nameMobile[0].toUpperCase() + nameMobile.substring(1)
                spanFilterMobile.innerText = upperMobile
                buttonFilterMobile.appendChild(spanFilterMobile)


                const allTypes = document.querySelectorAll('.type-filter')
                

                allTypes.forEach(btn => {
                    btn.addEventListener('click', filterByTypes)
                })
            }
 
         

        })
    })

    const btnLoadMore = document.querySelector('.btn-load-more')

    
    let countPagination = 10;

    function showMorePokemon(event){
        listingPokemons(`https://pokeapi.co/api/v2/pokemon?limit=9&offset=${countPagination}`)

        countPagination = countPagination + 10;
        
    }

    btnLoadMore.addEventListener('click', showMorePokemon)

    //função para filtrar tipos de pokemon

    function filterByTypes(){
        let idPokemon = this.getAttribute('code-type')

        const allTtypes = document.querySelectorAll('.type-filter')
        const areaPokemons = document.querySelector('#js-list-pokemon')
        const btnLoadMore = document.querySelector('.btn-load-more')
        

        areaPokemons.innerHTML = ''
        btnLoadMore.style.display = 'none';

        allTtypes.forEach(type => {
            type.classList.remove('all')
        })

        this.classList.add('all')
        


         axios({
             method: 'GET',
             url: `https://pokeapi.co/api/v2/type/${idPokemon}`
         })
         .then(response => {
             const pokeCount = response.data.pokemon.length
             const numbersPokemons = document.querySelector('#js-count-pokemons')

             numbersPokemons.innerText = pokeCount

             
         })
    }