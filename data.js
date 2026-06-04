export const foodItems = [
    // Breakfast
    {
        id: 1,
        name: "Idli",
        description: "Steamed rice and lentil cakes served with chutney and sambar",
        price: 30,
        category: "breakfast",
        image: "images/idli.png",
        badge: "veg"
    },
    {
        id: 2,
        name: "Vada",
        description: "Crispy deep-fried savory doughnut made from lentils",
        price: 25,
        category: "breakfast",
        image: "images/vada.png",
        badge: "veg"
    },
    {
        id: 3,
        name: "Plain Dosa",
        description: "Thin, crispy crepe made from fermented rice and lentil batter",
        price: 40,
        category: "breakfast",
        image: "images/plain dosa.png",
        badge: "veg"
    },
    {
        id: 4,
        name: "Masala Dosa",
        description: "Crispy crepe stuffed with a spiced potato filling",
        price: 60,
        category: "breakfast",
        image: "images/masala dosa.png",
        badge: "veg",
        popular: true
    },
    {
        id: 5,
        name: "Set Dosa",
        description: "Soft and spongy dosas served in a set of three",
        price: 55,
        category: "breakfast",
        image: "images/set dosa.png",
        badge: "veg"
    },
    {
        id: 6,
        name: "Rava Dosa",
        description: "Thin and crispy dosa made with semolina and spices",
        price: 70,
        category: "breakfast",
        image: "images/rava dosa.png",
        badge: "veg"
    },
    {
        id: 7,
        name: "Poori Sagu",
        description: "Deep-fried puffed bread served with a mixed vegetable curry",
        price: 50,
        category: "breakfast",
        image: "images/poori sagu.png",
        badge: "veg"
    },
    {
        id: 8,
        name: "Upma",
        description: "Savory porridge made from dry roasted semolina",
        price: 40,
        category: "breakfast",
        image: "images/upma.png",
        badge: "veg"
    },
    {
        id: 9,
        name: "Pongal",
        description: "Comforting dish made of rice and lentils tempered with ghee",
        price: 50,
        category: "breakfast",
        image: "images/pongal.png",
        badge: "veg"
    },

    // Rice Items
    {
        id: 10,
        name: "Lemon Rice",
        description: "Tangy rice flavored with lemon, peanuts, and curry leaves",
        price: 60,
        category: "rice",
        image: "images/lemon rice.png ",
        badge: "veg"
    },
    {
        id: 11,
        name: "Puliyogare",
        description: "Traditional tamarind rice with a blend of aromatic spices",
        price: 65,
        category: "rice",
        image: "images/puliyogare.jpg",
        badge: "veg"
    },
    {
        id: 12,
        name: "Bisibele Bath",
        description: "Hot lentil rice dish with vegetables and signature spices",
        price: 80,
        category: "rice",
        image: "images/bisibele bath.jpg",
        badge: "veg"
    },
    {
        id: 13,
        name: "Veg Fried Rice",
        description: "Indo-Chinese style rice stir-fried with fresh vegetables",
        price: 100,
        category: "rice",
        image: "images/veg fried rice.jpg",
        badge: "veg",
        popular: true
    },
    {
        id: 14,
        name: "Curd Rice",
        description: "Soothing yogurt rice tempered with mustard seeds",
        price: 60,
        category: "rice",
        image: "images/curd rice.jpg",
        badge: "veg"
    },

    // Meals
    {
        id: 15,
        name: "South Indian Meals",
        description: "Full traditional meal with rice, sambar, rasam, and curries",
        price: 120,
        category: "meal",
        image: "images/south meals.jpg",
        badge: "veg",
        popular: true
    },
    {
        id: 16,
        name: "Mini Meals",
        description: "A compact, satisfying meal for a quick lunch",
        price: 90,
        category: "meal",
        image: "images/mini meals.jpg",
        badge: "veg"
    },
    {
        id: 17,
        name: "Special Meals",
        description: "Elaborate feast featuring sweets and special rice items",
        price: 160,
        category: "meal",
        image: "images/special meals.jpg",
        badge: "veg"
    },

    // Snacks
    {
        id: 18,
        name: "Gobi Manchurian",
        description: "Crispy cauliflower florets in a tangy Indo-Chinese sauce",
        price: 110,
        category: "snack",
        image: "images/gobi.jpg",
        badge: "veg",
        popular: true
    },
    {
        id: 19,
        name: "Veg Pakoda",
        description: "Deep-fried crispy fritters made with gram flour and veggies",
        price: 70,
        category: "snack",
        image: "images/pakora.jpg",
        badge: "veg"
    },
    {
        id: 20,
        name: "Samosa",
        description: "Flaky pastry filled with a spiced potato and green pea mixture",
        price: 20,
        category: "snack",
        image: "images/samosa.jpg",
        badge: "veg"
    },
    {
        id: 21,
        name: "Bajji",
        description: "Assorted vegetable slices battered and deep-fried to perfection",
        price: 40,
        category: "snack",
        image: "images/bajji.jpg",
        badge: "veg"
    },

    // Beverages
    {
        id: 22,
        name: "Filter Coffee",
        description: "Authentic South Indian degree coffee brewed with chicory",
        price: 25,
        category: "beverage",
        image: "images/coffee.jpg",
        badge: "veg",
        popular: true
    },
    {
        id: 23,
        name: "Tea",
        description: "Classic Indian masala chai brewed with aromatic spices",
        price: 20,
        category: "beverage",
        image: "images/tea.jpg",
        badge: "veg"
    },
    {
        id: 24,
        name: "Badam Milk",
        description: "Sweet, warm milk flavored with crushed almonds and saffron",
        price: 40,
        category: "beverage",
        image: "images/badam.jpg",
        badge: "veg"
    },
    {
        id: 25,
        name: "Fresh Lime Juice",
        description: "Refreshing sweet and salted lemonade",
        price: 35,
        category: "beverage",
        image: "images/lime.jpg",
        badge: "veg"
    },

    // Desserts
    {
        id: 26,
        name: "Kesari Bath",
        description: "Sweet semolina pudding infused with saffron and ghee",
        price: 40,
        category: "dessert",
        image: "images/kesari bath.jpg",
        badge: "veg"
    },
    {
        id: 27,
        name: "Gulab Jamun",
        description: "Soft milk-solid dumplings soaked in rose-flavored sugar syrup",
        price: 50,
        category: "dessert",
        image: "images/gulab jamun.jpg",
        badge: "veg"
    },
    {
        id: 28,
        name: "Ice Cream",
        description: "Rich, creamy vanilla ice cream",
        price: 60,
        category: "dessert",
        image: "images/ice cream.jpg",
        badge: "veg"
    }
];