const searchInput = document.getElementById('input-search')
const content = {
    title: document.getElementById('coctailName'),
    discription: document.getElementById('discription'),
    list: document.getElementById('coctailIngridients'),
}


const contentBlock = document.getElementsByClassName('content-block')[0]

const savedValue = localStorage.getItem('name');
searchInput.value = savedValue;



const onEnter = () => {
const inputText = searchInput.value

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputText}`)
        .then((otvet)=> {
            return otvet.json()
        })
        .then((otvet)=> {
            
            localStorage.setItem('name', inputText);
            //const drinks = data.drinks;

            if (otvet.drinks !== null){
                const content = document.getElementById('content');
                content.innerHTML = '';

                

            for (kol = 0; kol < otvet.drinks.length; kol++){
            const coctail = otvet.drinks[kol]
            
            const title = coctail.strDrink
            const discription = coctail.strInstructions // Получаем из объекта coctail необходимые параметры
            const imageUrl = coctail.strDrinkThumb

            //content.title.innerHTML = title
            //content.discription.innerHTML = discription
            
            

            const ingredients = []
            const measures = []

            //content.list.innerHTML =''
            for (let i = 1; i < 15; i++){
                const ingr = coctail[`strIngredient${i}`]
                const meas = coctail[`strMeasure${i}`]
                if (ingr !== null){
                    ingredients.push(ingr)
                    measures.push(meas)
                    //const li = document.createElement('li')
                    //li.innerHTML = ingr
                    //content.list.append(li)
                }

            }
            const contentBlock = document.createElement('div');
            contentBlock.classList.add('content-block');

            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imgElement.classList.add('coctail-image');
            contentBlock.appendChild(imgElement);

            const titleElement = document.createElement('h2');
            titleElement.innerHTML = title;
            titleElement.classList.add('name-coctail');
            contentBlock.appendChild(titleElement);

            const descriptionElement = document.createElement('p');
            descriptionElement.innerHTML = discription;
            descriptionElement.classList.add('coctail-desc');
            contentBlock.appendChild(descriptionElement);

            const ingredientsListElement = document.createElement('ul');
            ingredients.forEach((ingr, meas) => {
                const li = document.createElement('li');
                li.innerHTML = `${ingr} - ${measures[meas]}`;
                ingredientsListElement.appendChild(li);
            });
            ingredientsListElement.classList.add('coctail-ingr');
            contentBlock.appendChild(ingredientsListElement);

            /*measures.forEach((meas) => {
                const li = document.createElement('li');
                li.innerHTML = meas;
                ingredientsListElement.appendChild(li);
            });*/

            //contentBlock.style.background = `url(${imageUrl})`  // Выводим на экран полученные параметры

            content.appendChild(contentBlock);

        }
        }
        return otvet
        })
}

if (localStorage.getItem('name') !==null){
    onEnter();
}

searchInput.addEventListener('input', onEnter) //Слушатель Input запускает onEnter

function reset(){
    localStorage.removeItem('name');
    document.getElementById('input-search').value = '';
    const content = document.getElementById('content');
    content.innerHTML = '';
    
}

