export const INITIAL_PRODUCTS = [
  // --- BURGERS ---
  {
    id: "prod-1",
    name: "Smoky BBQ Bacon Beast",
    category: "burgers",
    price: 11.99,
    originalPrice: 14.99,
    discount: 20,
    rating: 4.9,
    reviewCount: 342,
    isVeg: false,
    isSpicy: false,
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 45,
    calories: 820,
    prepTime: "12-15 min",
    description: "Double smashed Angus beef patties, aged smoked cheddar, crispy hardwood bacon, caramelized onions, and house-made bourbon BBQ glaze on a toasted brioche bun.",
    ingredients: ["Angus Beef", "Brioche Bun", "Smoked Cheddar", "Crispy Bacon", "Caramelized Onions", "Bourbon BBQ Sauce", "Pickles"],
    allergens: ["Gluten", "Dairy", "Egg"],
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&auto=format&fit=crop&q=80",
    sizes: [
      { name: "Single Patty", priceDelta: 0 },
      { name: "Double Patty", priceDelta: 3.50 },
      { name: "Triple Monster", priceDelta: 6.00 }
    ],
    addOns: [
      { name: "Extra Aged Cheddar", price: 1.50 },
      { name: "Crispy Bacon Strips (x2)", price: 2.20 },
      { name: "Fried Farm Egg", price: 1.50 },
      { name: "Pickled Jalapeños", price: 0.80 },
      { name: "Truffle Mayo Dip", price: 1.20 }
    ]
  },
  {
    id: "prod-2",
    name: "Firecracker Jalapeño Crunch",
    category: "burgers",
    price: 10.49,
    originalPrice: 12.99,
    discount: 19,
    rating: 4.8,
    reviewCount: 218,
    isVeg: false,
    isSpicy: true,
    isBestseller: true,
    isFeatured: false,
    inStock: true,
    stockCount: 30,
    calories: 760,
    prepTime: "10-14 min",
    description: "Seared beef patty drenched in ghost pepper pepperjack cheese, battered onion rings, sliced jalapeños, and fiery chipotle lava sauce.",
    ingredients: ["Beef Patty", "Pepperjack Cheese", "Crispy Onion Rings", "Fresh Jalapeños", "Chipotle Aioli", "Sesame Bun"],
    allergens: ["Gluten", "Dairy"],
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=700&auto=format&fit=crop&q=80",
    sizes: [
      { name: "Standard", priceDelta: 0 },
      { name: "Double Stack", priceDelta: 3.20 }
    ],
    addOns: [
      { name: "Extra Ghost Jack Cheese", price: 1.50 },
      { name: "Spicy Sriracha Drizzle", price: 0.75 },
      { name: "Guacamole Scoop", price: 1.95 }
    ]
  },
  {
    id: "prod-3",
    name: "Classic Crave Cheeseburger",
    category: "burgers",
    price: 8.99,
    originalPrice: 9.99,
    discount: 10,
    rating: 4.7,
    reviewCount: 512,
    isVeg: false,
    isSpicy: false,
    isBestseller: false,
    isFeatured: false,
    inStock: true,
    stockCount: 60,
    calories: 640,
    prepTime: "8-10 min",
    description: "The timeless icon. Grass-fed beef, melted American cheese, crisp butterhead lettuce, ripe vine tomatoes, crunchy pickles, and our secret Crave Sauce.",
    ingredients: ["Grass-fed Beef", "American Cheese", "Lettuce", "Tomatoes", "Pickles", "Crave Secret Sauce", "Brioche Bun"],
    allergens: ["Gluten", "Dairy"],
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=700&auto=format&fit=crop&q=80",
    sizes: [
      { name: "Single", priceDelta: 0 },
      { name: "Double Cheese", priceDelta: 2.80 }
    ],
    addOns: [
      { name: "Extra Cheese Slice", price: 1.00 },
      { name: "Grilled Mushrooms", price: 1.40 },
      { name: "Crave Secret Sauce Pot", price: 0.90 }
    ]
  },
  {
    id: "prod-4",
    name: "Truffle Mushroom Supreme Burger",
    category: "burgers",
    price: 13.49,
    originalPrice: 15.99,
    discount: 15,
    rating: 4.9,
    reviewCount: 164,
    isVeg: false,
    isSpicy: false,
    isBestseller: false,
    isFeatured: true,
    inStock: true,
    stockCount: 25,
    calories: 780,
    prepTime: "12-16 min",
    description: "Sautéed wild cremini & portobello mushrooms, creamy Swiss gruyère, black truffle infused aioli, baby arugula on a glossy brioche bun.",
    ingredients: ["Angus Beef", "Swiss Gruyère", "Portobello Mushrooms", "Black Truffle Aioli", "Baby Arugula"],
    allergens: ["Gluten", "Dairy"],
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=700&auto=format&fit=crop&q=80",
    sizes: [
      { name: "Standard", priceDelta: 0 },
      { name: "Double Angus", priceDelta: 3.80 }
    ],
    addOns: [
      { name: "Extra Truffle Aioli", price: 1.50 },
      { name: "Crispy Bacon", price: 2.00 }
    ]
  },
  {
    id: "prod-5",
    name: "Green Goddess Beyond Vegan Burger",
    category: "burgers",
    price: 11.49,
    originalPrice: 12.99,
    discount: 11,
    rating: 4.6,
    reviewCount: 189,
    isVeg: true,
    isSpicy: false,
    isBestseller: false,
    isFeatured: false,
    inStock: true,
    stockCount: 35,
    calories: 520,
    prepTime: "10-12 min",
    description: "100% plant-based Beyond meat patty, vegan smoked provolone, mashed avocado, alfalfa sprouts, and roasted garlic herb dressing on a vegan potato bun.",
    ingredients: ["Beyond Meat Patty", "Vegan Provolone", "Avocado", "Sprouts", "Garlic Herb Dressing", "Vegan Potato Bun"],
    allergens: ["Gluten"],
    image: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=700&auto=format&fit=crop&q=80",
    sizes: [
      { name: "Standard", priceDelta: 0 },
      { name: "Double Vegan Patty", priceDelta: 4.00 }
    ],
    addOns: [
      { name: "Extra Avocado", price: 1.80 },
      { name: "Grilled Pineapple", price: 1.20 }
    ]
  },

  // --- ARTISAN PIZZA ---
  {
    id: "prod-6",
    name: "Rustic Double Pepperoni Overload",
    category: "pizza",
    price: 15.99,
    originalPrice: 19.99,
    discount: 20,
    rating: 4.9,
    reviewCount: 420,
    isVeg: false,
    isSpicy: false,
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 40,
    calories: 1420,
    prepTime: "15-20 min",
    description: "Crispy artisan crust loaded with over 60 slices of cupping beef pepperoni, San Marzano tomato sauce, fresh buffalo mozzarella, and aromatic hot honey drizzle.",
    ingredients: ["Artisan Dough", "San Marzano Tomatoes", "Mozzarella", "Beef Pepperoni", "Hot Honey", "Oregano"],
    allergens: ["Gluten", "Dairy"],
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=700&auto=format&fit=crop&q=80",
    sizes: [
      { name: "Medium (10\")", priceDelta: 0 },
      { name: "Large (14\")", priceDelta: 4.50 },
      { name: "Family Giant (18\")", priceDelta: 8.00 }
    ],
    addOns: [
      { name: "Cheesy Stuffed Crust", price: 3.00 },
      { name: "Garlic Butter Dipping Cup", price: 1.00 },
      { name: "Extra Hot Honey Cup", price: 1.20 }
    ]
  },
  {
    id: "prod-7",
    name: "Smoky BBQ Chicken & Bacon Pizza",
    category: "pizza",
    price: 16.49,
    originalPrice: 18.99,
    discount: 13,
    rating: 4.8,
    reviewCount: 275,
    isVeg: false,
    isSpicy: false,
    isBestseller: true,
    isFeatured: false,
    inStock: true,
    stockCount: 30,
    calories: 1380,
    prepTime: "15-18 min",
    description: "Tender wood-fired grilled chicken, smoked applewood bacon, sweet red onion rings, fresh cilantro, rich tangy BBQ swirl, and melted gouda & mozzarella blend.",
    ingredients: ["Dough", "Grilled Chicken", "Bacon", "Red Onions", "Cilantro", "BBQ Sauce", "Gouda Cheese", "Mozzarella"],
    allergens: ["Gluten", "Dairy"],
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=700&auto=format&fit=crop&q=80",
    sizes: [
      { name: "Medium (10\")", priceDelta: 0 },
      { name: "Large (14\")", priceDelta: 4.50 }
    ],
    addOns: [
      { name: "Extra Grilled Chicken", price: 2.50 },
      { name: "Stuffed Cheese Crust", price: 3.00 }
    ]
  },
  {
    id: "prod-8",
    name: "Tuscan Margherita Supreme",
    category: "pizza",
    price: 13.99,
    originalPrice: 15.99,
    discount: 12,
    rating: 4.7,
    reviewCount: 198,
    isVeg: true,
    isSpicy: false,
    isBestseller: false,
    isFeatured: false,
    inStock: true,
    stockCount: 28,
    calories: 1080,
    prepTime: "12-16 min",
    description: "Classic Italian simplicity at its best: crushed San Marzano tomatoes, fresh torn Fior di Latte mozzarella, sweet basil leaves, and cold-pressed extra virgin olive oil.",
    ingredients: ["Crushed Tomatoes", "Fior di Latte Mozzarella", "Fresh Basil", "Extra Virgin Olive Oil", "Sea Salt"],
    allergens: ["Gluten", "Dairy"],
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=700&auto=format&fit=crop&q=80",
    sizes: [
      { name: "Medium (10\")", priceDelta: 0 },
      { name: "Large (14\")", priceDelta: 4.00 }
    ],
    addOns: [
      { name: "Extra Fresh Basil & Olive Oil", price: 1.00 },
      { name: "Creamy Burrata Ball on top", price: 3.50 }
    ]
  },

  // --- FRIED CHICKEN ---
  {
    id: "prod-9",
    name: "Nashville Hot Fried Chicken Bucket (8 Pcs)",
    category: "chicken",
    price: 18.99,
    originalPrice: 22.99,
    discount: 17,
    rating: 4.9,
    reviewCount: 560,
    isVeg: false,
    isSpicy: true,
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 50,
    calories: 1650,
    prepTime: "15-20 min",
    description: "24-hour buttermilk soaked chicken pieces, double hand-dredged in 12 southern spices, fried to crunch perfection and basted in fiery Nashville hot oil with dill pickles.",
    ingredients: ["Fresh Chicken", "Buttermilk", "Southern Flour Blend", "Cayenne & Paprika Oil", "Dill Pickles"],
    allergens: ["Gluten", "Dairy"],
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=700&auto=format&fit=crop&q=80",
    sizes: [
      { name: "8 Pieces Bucket", priceDelta: 0 },
      { name: "12 Pieces Jumbo Bucket", priceDelta: 7.50 },
      { name: "16 Pieces Feast", priceDelta: 14.00 }
    ],
    addOns: [
      { name: "Warm Honey Butter Biscuits (x2)", price: 2.50 },
      { name: "Creamy Slaw Tub", price: 1.80 },
      { name: "Ranch Dipping Sauce", price: 0.90 }
    ]
  },
  {
    id: "prod-10",
    name: "Golden Crispy Chicken Tenders (6 Pcs)",
    category: "chicken",
    price: 9.99,
    originalPrice: 11.99,
    discount: 16,
    rating: 4.8,
    reviewCount: 310,
    isVeg: false,
    isSpicy: false,
    isBestseller: true,
    isFeatured: false,
    inStock: true,
    stockCount: 40,
    calories: 680,
    prepTime: "8-12 min",
    description: "Juicy 100% whole chicken tenderloins breaded in seasoned panko crumbs, served with your choice of two signature dips.",
    ingredients: ["Chicken Tenderloins", "Panko Breadcrumbs", "Buttermilk", "House Seasoning"],
    allergens: ["Gluten", "Dairy"],
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=700&auto=format&fit=crop&q=80",
    sizes: [
      { name: "6 Pieces", priceDelta: 0 },
      { name: "10 Pieces", priceDelta: 4.50 }
    ],
    addOns: [
      { name: "Honey Mustard Dip", price: 0.80 },
      { name: "Smoky Crave Dip", price: 0.80 }
    ]
  },
  {
    id: "prod-11",
    name: "Korean Sweet & Spicy Glazed Wings (10 Pcs)",
    category: "chicken",
    price: 12.99,
    originalPrice: 14.99,
    discount: 13,
    rating: 4.9,
    reviewCount: 280,
    isVeg: false,
    isSpicy: true,
    isBestseller: false,
    isFeatured: true,
    inStock: true,
    stockCount: 35,
    calories: 890,
    prepTime: "12-15 min",
    description: "Ultra-crispy double-fried chicken wings tossed in sticky Gochujang chili sauce, toasted white sesame seeds, and chopped scallions.",
    ingredients: ["Chicken Wings", "Gochujang Paste", "Honey", "Garlic", "Sesame Seeds", "Scallions"],
    allergens: ["Sesame", "Soy"],
    image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=700&auto=format&fit=crop&q=80",
    sizes: [
      { name: "10 Wings", priceDelta: 0 },
      { name: "16 Wings", priceDelta: 5.50 }
    ],
    addOns: [
      { name: "Blue Cheese Dip", price: 1.00 },
      { name: "Pickled Radish Cubes", price: 1.50 }
    ]
  },

  // --- SANDWICHES ---
  {
    id: "prod-12",
    name: "Philly Cheesesteak Melt",
    category: "sandwiches",
    price: 11.99,
    originalPrice: 13.99,
    discount: 14,
    rating: 4.8,
    reviewCount: 230,
    isVeg: false,
    isSpicy: false,
    isBestseller: true,
    isFeatured: false,
    inStock: true,
    stockCount: 32,
    calories: 740,
    prepTime: "10-14 min",
    description: "Thinly shaved ribeye beef seared with caramelized bell peppers and sweet onions, blanketed in creamy melted provolone cheese on a toasted hoagie roll.",
    ingredients: ["Shaved Ribeye", "Bell Peppers", "Sweet Onions", "Provolone Cheese", "Hoagie Roll", "Garlic Butter"],
    allergens: ["Gluten", "Dairy"],
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=700&auto=format&fit=crop&q=80",
    sizes: [
      { name: "Regular 8-inch", priceDelta: 0 },
      { name: "Footlong 12-inch", priceDelta: 4.00 }
    ],
    addOns: [
      { name: "Extra Shaved Beef", price: 2.50 },
      { name: "Hot Giardiniera Peppers", price: 1.00 }
    ]
  },
  {
    id: "prod-13",
    name: "Crispy Sourdough Chicken Club",
    category: "sandwiches",
    price: 10.99,
    originalPrice: 12.49,
    discount: 12,
    rating: 4.7,
    reviewCount: 165,
    isVeg: false,
    isSpicy: false,
    isBestseller: false,
    isFeatured: false,
    inStock: true,
    stockCount: 28,
    calories: 690,
    prepTime: "10-12 min",
    description: "Grilled herb chicken breast, smoked turkey bacon, sharp cheddar, smashed avocado, crisp romaine, and sundried tomato mayo on buttery toasted sourdough.",
    ingredients: ["Grilled Chicken", "Turkey Bacon", "Cheddar", "Avocado", "Romaine", "Sourdough Bread"],
    allergens: ["Gluten", "Dairy"],
    image: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=700&auto=format&fit=crop&q=80",
    sizes: [
      { name: "Standard", priceDelta: 0 }
    ],
    addOns: [
      { name: "Extra Avocado", price: 1.50 },
      { name: "Extra Cheese", price: 1.00 }
    ]
  },

  // --- WRAPS & BURRITOS ---
  {
    id: "prod-14",
    name: "Spicy Buffalo Chicken Ranch Wrap",
    category: "wraps",
    price: 9.49,
    originalPrice: 10.99,
    discount: 13,
    rating: 4.8,
    reviewCount: 245,
    isVeg: false,
    isSpicy: true,
    isBestseller: true,
    isFeatured: false,
    inStock: true,
    stockCount: 38,
    calories: 620,
    prepTime: "8-10 min",
    description: "Crispy fried chicken tossed in zesty Buffalo hot sauce, chilled iceberg lettuce, diced vine tomatoes, shredded Monterey Jack, and cool buttermilk ranch wrapped in a toasted flour tortilla.",
    ingredients: ["Crispy Chicken", "Buffalo Sauce", "Ranch", "Monterey Jack", "Tomatoes", "Tortilla"],
    allergens: ["Gluten", "Dairy"],
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=700&auto=format&fit=crop&q=80",
    sizes: [
      { name: "Standard Wrap", priceDelta: 0 },
      { name: "Jumbo XL Wrap", priceDelta: 2.80 }
    ],
    addOns: [
      { name: "Extra Crispy Bacon", price: 1.80 },
      { name: "Guacamole", price: 1.50 }
    ]
  },
  {
    id: "prod-15",
    name: "Fire-Roasted Falafel Tahini Wrap",
    category: "wraps",
    price: 8.99,
    originalPrice: 9.99,
    discount: 10,
    rating: 4.7,
    reviewCount: 140,
    isVeg: true,
    isSpicy: false,
    isBestseller: false,
    isFeatured: false,
    inStock: true,
    stockCount: 25,
    calories: 510,
    prepTime: "8-10 min",
    description: "Golden herb-crusted chickpea falafel patties, pickled turnips, crisp cucumber, fresh parsley, tomatoes, and nutty lemon-garlic tahini sauce in a warm pita wrap.",
    ingredients: ["Chickpea Falafels", "Tahini Sauce", "Pickled Turnips", "Cucumber", "Tomatoes", "Pita"],
    allergens: ["Sesame", "Gluten"],
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=700&auto=format&fit=crop&q=80",
    sizes: [
      { name: "Standard", priceDelta: 0 }
    ],
    addOns: [
      { name: "Extra Tahini Dip", price: 0.80 },
      { name: "Spicy Harissa Drizzle", price: 0.60 }
    ]
  },

  // --- LOADED FRIES ---
  {
    id: "prod-16",
    name: "Monster Volcano Loaded Fries",
    category: "fries",
    price: 7.99,
    originalPrice: 9.49,
    discount: 15,
    rating: 4.9,
    reviewCount: 480,
    isVeg: false,
    isSpicy: true,
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 65,
    calories: 780,
    prepTime: "6-8 min",
    description: "Crisp seasoned skin-on fries smothered in hot liquid cheddar cheese, minced BBQ ground beef, diced jalapeños, crispy bacon bits, scallions, and chipotle crema.",
    ingredients: ["Skin-on Fries", "Liquid Cheddar", "Spiced Beef", "Jalapeños", "Bacon Bits", "Chipotle Crema"],
    allergens: ["Dairy"],
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=700&auto=format&fit=crop&q=80",
    sizes: [
      { name: "Regular Tray", priceDelta: 0 },
      { name: "Giant Share Platter", priceDelta: 3.50 }
    ],
    addOns: [
      { name: "Extra Liquid Cheese", price: 1.20 },
      { name: "Guacamole Scoop", price: 1.50 }
    ]
  },
  {
    id: "prod-17",
    name: "Parmesan Truffle Waffle Fries",
    category: "fries",
    price: 6.99,
    originalPrice: 7.99,
    discount: 12,
    rating: 4.8,
    reviewCount: 290,
    isVeg: true,
    isSpicy: false,
    isBestseller: false,
    isFeatured: false,
    inStock: true,
    stockCount: 50,
    calories: 590,
    prepTime: "6-8 min",
    description: "Extra crispy golden waffle-cut potatoes tossed in aromatic white truffle oil, freshly grated 24-month Parmigiano-Reggiano, and chopped rosemary parsley herbs.",
    ingredients: ["Waffle Cut Fries", "White Truffle Oil", "Parmigiano-Reggiano", "Rosemary", "Parsley"],
    allergens: ["Dairy"],
    image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=700&auto=format&fit=crop&q=80",
    sizes: [
      { name: "Regular", priceDelta: 0 },
      { name: "Large", priceDelta: 2.00 }
    ],
    addOns: [
      { name: "Truffle Garlic Mayo", price: 1.00 }
    ]
  },

  // --- SNACKS & SIDES ---
  {
    id: "prod-18",
    name: "Gooey Mozzarella Sticks (6 Pcs)",
    category: "snacks",
    price: 6.49,
    originalPrice: 7.49,
    discount: 13,
    rating: 4.8,
    reviewCount: 320,
    isVeg: true,
    isSpicy: false,
    isBestseller: true,
    isFeatured: false,
    inStock: true,
    stockCount: 45,
    calories: 490,
    prepTime: "5-7 min",
    description: "Whole milk mozzarella coated in Italian herb breading, fried golden with an insane cheese stretch. Served with warm marinara dipping sauce.",
    ingredients: ["Whole Milk Mozzarella", "Italian Herb Panko", "Marinara Sauce"],
    allergens: ["Dairy", "Gluten"],
    image: "https://images.unsplash.com/photo-1548340748-6d2b7d7da280?w=700&auto=format&fit=crop&q=80",
    sizes: [
      { name: "6 Pieces", priceDelta: 0 },
      { name: "10 Pieces", priceDelta: 3.20 }
    ],
    addOns: [
      { name: "Extra Marinara Dip", price: 0.75 },
      { name: "Garlic Parmesan Dust", price: 0.50 }
    ]
  },
  {
    id: "prod-19",
    name: "Beer-Battered Onion Rings Stack",
    category: "snacks",
    price: 5.49,
    originalPrice: 6.49,
    discount: 15,
    rating: 4.7,
    reviewCount: 215,
    isVeg: true,
    isSpicy: false,
    isBestseller: false,
    isFeatured: false,
    inStock: true,
    stockCount: 40,
    calories: 440,
    prepTime: "5-7 min",
    description: "Thick jumbo sweet yellow onions dipped in handcrafted craft-ale batter and fried until airy, crunchy, and golden.",
    ingredients: ["Sweet Onions", "Craft Ale Batter", "Sea Salt"],
    allergens: ["Gluten"],
    image: "https://images.unsplash.com/photo-1639024471287-032f66723a8b?w=700&auto=format&fit=crop&q=80",
    sizes: [
      { name: "Standard Stack", priceDelta: 0 }
    ],
    addOns: [
      { name: "Smoky Chipotle Dip", price: 0.80 }
    ]
  },

  // --- DESSERTS ---
  {
    id: "prod-20",
    name: "Molten Triple Chocolate Lava Cake",
    category: "desserts",
    price: 6.99,
    originalPrice: 7.99,
    discount: 12,
    rating: 4.9,
    reviewCount: 390,
    isVeg: true,
    isSpicy: false,
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 35,
    calories: 610,
    prepTime: "6-8 min",
    description: "Rich dark Belgian chocolate cake with a warm flowing chocolate ganache core, dusted with powdered sugar and served with vanilla bean ice cream.",
    ingredients: ["Belgian Dark Chocolate", "Butter", "Eggs", "Flour", "Vanilla Bean Gelato"],
    allergens: ["Dairy", "Gluten", "Egg"],
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=700&auto=format&fit=crop&q=80",
    sizes: [
      { name: "Single Cake", priceDelta: 0 },
      { name: "Double Trouble (2 Cakes)", priceDelta: 5.50 }
    ],
    addOns: [
      { name: "Extra Vanilla Gelato Scoop", price: 1.80 },
      { name: "Caramel Drizzle", price: 0.60 }
    ]
  },
  {
    id: "prod-21",
    name: "Cinnamon Sugar Churros with Nutella Dip",
    category: "desserts",
    price: 5.99,
    originalPrice: 6.99,
    discount: 14,
    rating: 4.8,
    reviewCount: 260,
    isVeg: true,
    isSpicy: false,
    isBestseller: false,
    isFeatured: false,
    inStock: true,
    stockCount: 30,
    calories: 520,
    prepTime: "5-7 min",
    description: "Five piping-hot Spanish churros rolled in fragrant cinnamon sugar crystals, paired with a warm creamy Nutella hazelnut dip.",
    ingredients: ["Churro Pastry", "Cinnamon Sugar", "Nutella Hazelnut Spread"],
    allergens: ["Gluten", "Dairy", "Nuts"],
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=700&auto=format&fit=crop&q=80",
    sizes: [
      { name: "5 Churros", priceDelta: 0 },
      { name: "10 Churros Party Pack", priceDelta: 4.50 }
    ],
    addOns: [
      { name: "Extra Warm Nutella Cup", price: 1.20 },
      { name: "Dulce de Leche Dip", price: 1.20 }
    ]
  },

  // --- BEVERAGES ---
  {
    id: "prod-22",
    name: "Signature Salted Caramel Pretzel Shake",
    category: "beverages",
    price: 5.99,
    originalPrice: 6.99,
    discount: 14,
    rating: 4.9,
    reviewCount: 410,
    isVeg: true,
    isSpicy: false,
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 50,
    calories: 680,
    prepTime: "4-6 min",
    description: "Hand-spun artisan vanilla custard milkshake swirled with sea salt caramel fudge, topped with mountain of whipped cream and crushed butter pretzels.",
    ingredients: ["Vanilla Custard", "Whole Milk", "Salted Caramel", "Whipped Cream", "Pretzels"],
    allergens: ["Dairy", "Gluten"],
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=700&auto=format&fit=crop&q=80",
    sizes: [
      { name: "Regular (16 oz)", priceDelta: 0 },
      { name: "Large (24 oz)", priceDelta: 1.80 }
    ],
    addOns: [
      { name: "Extra Whipped Cream", price: 0.50 },
      { name: "Malted Milk Boost", price: 0.75 }
    ]
  },
  {
    id: "prod-23",
    name: "Fresh Mint Berry Sparkler Lemonade",
    category: "beverages",
    price: 4.49,
    originalPrice: 4.99,
    discount: 10,
    rating: 4.7,
    reviewCount: 180,
    isVeg: true,
    isSpicy: false,
    isBestseller: false,
    isFeatured: false,
    inStock: true,
    stockCount: 60,
    calories: 180,
    prepTime: "3-4 min",
    description: "Freshly squeezed lemon juice muddled with garden mint leaves, wild raspberry compote, and chilled sparkling mineral water.",
    ingredients: ["Lemon Juice", "Raspberries", "Mint", "Cane Sugar", "Sparkling Water"],
    allergens: [],
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=700&auto=format&fit=crop&q=80",
    sizes: [
      { name: "Medium (16 oz)", priceDelta: 0 },
      { name: "Large (24 oz)", priceDelta: 1.20 }
    ],
    addOns: [
      { name: "Extra Berry Compote", price: 0.75 }
    ]
  },
  {
    id: "prod-24",
    name: "Classic Iced Cold Brew Coffee",
    category: "beverages",
    price: 4.29,
    originalPrice: 4.99,
    discount: 14,
    rating: 4.8,
    reviewCount: 150,
    isVeg: true,
    isSpicy: false,
    isBestseller: false,
    isFeatured: false,
    inStock: true,
    stockCount: 45,
    calories: 45,
    prepTime: "2-3 min",
    description: "16-hour slow steeped single-origin Arabica beans poured over ice with choice of sweet vanilla cream foam.",
    ingredients: ["Single-Origin Arabica Coffee", "Filtered Cold Water", "Vanilla Sweet Cream"],
    allergens: ["Dairy"],
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=700&auto=format&fit=crop&q=80",
    sizes: [
      { name: "Regular (16 oz)", priceDelta: 0 },
      { name: "Large (24 oz)", priceDelta: 1.20 }
    ],
    addOns: [
      { name: "Extra Sweet Vanilla Foam", price: 0.80 },
      { name: "Oat Milk Substitution", price: 0.60 }
    ]
  },

  // --- COMBOS ---
  {
    id: "prod-25",
    name: "Ultimate Crave King Meal Box",
    category: "combos",
    price: 16.99,
    originalPrice: 22.99,
    discount: 26,
    rating: 5.0,
    reviewCount: 680,
    isVeg: false,
    isSpicy: false,
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 50,
    calories: 1480,
    prepTime: "12-15 min",
    description: "The complete fast food feast: Smoky BBQ Bacon Beast Burger + 4 Hot Wings + Golden Fries + Signature Caramel Milkshake + 2 Dipping Sauces.",
    ingredients: ["Smoky Bacon Burger", "Hot Wings", "Skin-on Fries", "Caramel Shake", "Dips"],
    allergens: ["Gluten", "Dairy"],
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=700&auto=format&fit=crop&q=80",
    sizes: [
      { name: "Solo Feast", priceDelta: 0 },
      { name: "Duo Feast (2x Burgers + 2x Drinks)", priceDelta: 12.00 }
    ],
    addOns: [
      { name: "Upgrade to Loaded Fries", price: 2.50 },
      { name: "Add Molten Lava Cake", price: 4.50 }
    ]
  },
  {
    id: "prod-26",
    name: "Game Night Family Pizza & Wings Bundle",
    category: "combos",
    price: 29.99,
    originalPrice: 38.99,
    discount: 23,
    rating: 4.9,
    reviewCount: 310,
    isVeg: false,
    isSpicy: false,
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 30,
    calories: 2890,
    prepTime: "20-25 min",
    description: "Includes 1 Large Rustic Pepperoni Pizza + 10 Korean Glazed Wings + 1 Giant Platter Monster Fries + 2L Soda Bottle.",
    ingredients: ["Large Pepperoni Pizza", "10 Korean Wings", "Monster Fries", "2L Drink"],
    allergens: ["Gluten", "Dairy", "Sesame"],
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700&auto=format&fit=crop&q=80",
    sizes: [
      { name: "Family Pack (4-5 Persons)", priceDelta: 0 }
    ],
    addOns: [
      { name: "Add 6 Mozzarella Sticks", price: 4.50 },
      { name: "Add 2 Lava Cakes", price: 7.00 }
    ]
  }
];
