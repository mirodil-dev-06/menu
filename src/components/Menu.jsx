import React, { useState, useEffect } from 'react';
import '../components/Menu.css';

function Menu() {
    const [meals, setMeals] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then(response => response.json())
        .then(data => {
            const filteredData = data.meals.filter(meal => meal.strMealThumb);
            const mealsWithPrices = filteredData.map(meal => ({
                ...meal, price: (Math.random() * 20 + 5).toFixed(2)
            }));
            setMeals(mealsWithPrices);
        });
    }, []);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const filteredMeals = meals.filter((meal) =>
        meal.strMeal.toLowerCase().includes('') &&
        (selectedCategory === 'All' || meal.strCategory === selectedCategory)
    );

    const categories = ['All', ...new Set(meals.map(meal => meal.strCategory))];

    const truncateText = (text, wordLimit) => {
        const words = text.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return text;
    };

    return (
        <div className="content">
            <ul className='category'>
                {categories.map((category) => (
                    <li key={category} onClick={() => handleCategoryChange(category)} className='category__list'>
                        {category}
                    </li>
                ))}
            </ul>
            <div>
                <div className='menu'>
                    {filteredMeals.map((meal) => (
                        <div key={meal.idMeal} className='menu__card'>
                            <img src={meal.strMealThumb} alt={meal.strMeal} width="100" />
                            <div>
                                <span>
                                    <h3>{meal.strMeal}</h3>
                                    <p>${meal.price}</p>
                                </span>
                                <hr />
                                <p>{truncateText(meal.strInstructions, 20)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Menu;
