const searchInput = document.getElementById('input-search');

const onEnter = (event) => {
    const inputText = event.target.value;

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputText}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const drinks = data.drinks;

            if (drinks !== null) {
                const content = document.getElementById('content');
                content.innerHTML = '';

                drinks.forEach((cocktail) => {
                    const title = cocktail.strDrink;
                    const description = cocktail.strInstructions;
                    const imageUrl = cocktail.strDrinkThumb;
                    const ingredients = [];

                    for (let i = 1; i <= 15; i++) {
                        const ingredient = cocktail[`strIngredient${i}`];
                        if (ingredient !== null) {
                            ingredients.push(ingredient);
                        } else {
                            break;
                        }
                    }

                    const contentBlock = document.createElement('div');
                    contentBlock.classList.add('content-block');

                    const titleElement = document.createElement('h2');
                    titleElement.innerHTML = title;
                    contentBlock.appendChild(titleElement);

                    const descriptionElement = document.createElement('p');
                    descriptionElement.innerHTML = description;
                    contentBlock.appendChild(descriptionElement);

                    const ingredientsListElement = document.createElement('ul');
                    ingredients.forEach((ingredient) => {
                        const li = document.createElement('li');
                        li.innerHTML = ingredient;
                        ingredientsListElement.appendChild(li);
                    });
                    contentBlock.appendChild(ingredientsListElement);

                    contentBlock.style.background = `url(${imageUrl})`

                    content.appendChild(contentBlock);
                });
            }
        });
};

searchInput.addEventListener('input', onEnter);
