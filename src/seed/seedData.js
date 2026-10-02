import mongoose from "mongoose";
import { connectDB, disconnectDB } from "../config/database.js";
import User from "../models/User.js";
import Restaurant from "../models/Restaurant.js";
import Category from "../models/Category.js";
import MenuItem from "../models/MenuItem.js";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Review from "../models/Review.js";
import Coupon from "../models/Coupon.js";

export const seedDatabase = async () => {
  try {
    console.log(" Connecting to database for seeding...");
    await connectDB();

    console.log(" Cleaning existing database collections...");
    await Promise.all([
      User.deleteMany({}),
      Restaurant.deleteMany({}),
      Category.deleteMany({}),
      MenuItem.deleteMany({}),
      Cart.deleteMany({}),
      Order.deleteMany({}),
      Review.deleteMany({}),
      Coupon.deleteMany({})
    ]);

    console.log(" Seeding Users (1 Super Admin, 2 Restaurant Admins, 3 Customers)...");
    const superAdmin = await User.create({
      name: "Super Admin Officer",
      email: "superadmin@cravebite.com",
      password: "Admin@123",
      phone: "+923001111111",
      role: "super_admin",
      address: "Headquarters Plaza, Gulberg III",
      city: "Lahore"
    });

    const admin1 = await User.create({
      name: "Chef Anthony Romano",
      email: "admin1@cravebite.com",
      password: "Admin@123",
      phone: "+923002222222",
      role: "restaurant_admin",
      address: "12 Main Boulevard, DHA Phase 5",
      city: "Karachi"
    });

    const admin2 = await User.create({
      name: "Marco Rossi",
      email: "admin2@cravebite.com",
      password: "Admin@123",
      phone: "+923003333333",
      role: "restaurant_admin",
      address: "45 Italian Avenue, F-7",
      city: "Islamabad"
    });

    const customer1 = await User.create({
      name: "John Doe",
      email: "john@example.com",
      password: "Customer@123",
      phone: "+923004444444",
      role: "customer",
      address: "House 123, Street 4, Clifton",
      city: "Karachi"
    });

    const customer2 = await User.create({
      name: "Sarah Jenkins",
      email: "sarah@example.com",
      password: "Customer@123",
      phone: "+923005555555",
      role: "customer",
      address: "Flat 402, Green Heights, Gulberg",
      city: "Lahore"
    });

    const customer3 = await User.create({
      name: "Alex Jordan",
      email: "alex@example.com",
      password: "Customer@123",
      phone: "+923006666666",
      role: "customer",
      address: "House 88, Street 12, F-10/2",
      city: "Islamabad"
    });

    console.log(" Seeding 3 Restaurants...");
    const rest1 = await Restaurant.create({
      name: "CraveBite Gourmet Burger House",
      description: "Artisan gourmet beef smash burgers, hand-spun shakes, and loaded cheese fries.",
      owner: admin1._id,
      phone: "+923002222222",
      email: "info@cravebiteburgers.com",
      address: "14-C Main Boulevard, DHA Phase 6",
      city: "Karachi",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80",
      openingTime: "11:00",
      closingTime: "01:00",
      isOpen: true,
      isActive: true,
      rating: 4.8,
      ratingCount: 120,
      deliveryFee: 150,
      minOrder: 500,
      cuisine: ["Burgers", "Fast Food", "American"]
    });

    const rest2 = await Restaurant.create({
      name: "Bella Italia Artisan Pizzeria",
      description: "Authentic Neapolitan stone-baked sourdough pizzas with imported Italian buffalo mozzarella.",
      owner: admin2._id,
      phone: "+923003333333",
      email: "order@bellaitalia.com",
      address: "22 Beverly Centre, Blue Area",
      city: "Islamabad",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80",
      openingTime: "12:00",
      closingTime: "00:00",
      isOpen: true,
      isActive: true,
      rating: 4.9,
      ratingCount: 95,
      deliveryFee: 180,
      minOrder: 800,
      cuisine: ["Pizza", "Italian", "Pasta"]
    });

    const rest3 = await Restaurant.create({
      name: "Golden Crunch Fried Chicken & Wings",
      description: "Southern fried crispy chicken, glazed hot wings, crunchy tenders, and creamy slaw.",
      owner: admin1._id,
      phone: "+923007777777",
      email: "crunch@goldenchicken.com",
      address: "Block 5, Gulshan-e-Iqbal",
      city: "Karachi",
      image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&auto=format&fit=crop&q=80",
      openingTime: "12:00",
      closingTime: "02:00",
      isOpen: true,
      isActive: true,
      rating: 4.7,
      ratingCount: 88,
      deliveryFee: 120,
      minOrder: 400,
      cuisine: ["Fried Chicken", "Wings", "Fast Food"]
    });

    console.log(" Seeding Categories (5+ per restaurant)...");
    // Categories for Restaurant 1 (Burgers)
    const cat1_1 = await Category.create({ restaurant: rest1._id, name: "Smash Burgers", description: "Crispy-edged prime Angus beef smash patties", sortOrder: 1 });
    const cat1_2 = await Category.create({ restaurant: rest1._id, name: "Chicken Burgers", description: "Buttermilk fried & grilled crispy chicken burgers", sortOrder: 2 });
    const cat1_3 = await Category.create({ restaurant: rest1._id, name: "Loaded Fries", description: "Seasoned crinkle cut fries topped with queso and beef", sortOrder: 3 });
    const cat1_4 = await Category.create({ restaurant: rest1._id, name: "Shakes & Beverages", description: "Handcrafted thick gelato milkshakes", sortOrder: 4 });
    const cat1_5 = await Category.create({ restaurant: rest1._id, name: "Combo Deals", description: "Value burgers with fries and drinks", sortOrder: 5 });

    // Categories for Restaurant 2 (Pizza)
    const cat2_1 = await Category.create({ restaurant: rest2._id, name: "Classic Pizzas", description: "Traditional Italian Margherita and Marinara pizzas", sortOrder: 1 });
    const cat2_2 = await Category.create({ restaurant: rest2._id, name: "Specialty Meat Pizzas", description: "Loaded with pepperoni, Italian sausage, and bacon", sortOrder: 2 });
    const cat2_3 = await Category.create({ restaurant: rest2._id, name: "Vegetarian Gourmet", description: "Fresh basil, burrata, mushrooms, and truffle glaze", sortOrder: 3 });
    const cat2_4 = await Category.create({ restaurant: rest2._id, name: "Garlic Breads & Appetizers", description: "Cheesy garlic breadsticks and bruschetta", sortOrder: 4 });
    const cat2_5 = await Category.create({ restaurant: rest2._id, name: "Italian Desserts", description: "Authentic homemade Tiramisu and Panna Cotta", sortOrder: 5 });

    // Categories for Restaurant 3 (Chicken)
    const cat3_1 = await Category.create({ restaurant: rest3._id, name: "Chicken Buckets", description: "Crispy original and spicy chicken pieces", sortOrder: 1 });
    const cat3_2 = await Category.create({ restaurant: rest3._id, name: "Crispy Tenders", description: "Tender boneless strips with signature dips", sortOrder: 2 });
    const cat3_3 = await Category.create({ restaurant: rest3._id, name: "Glazed Wings", description: "Buffalo, BBQ, honey mustard, and ghost pepper wings", sortOrder: 3 });
    const cat3_4 = await Category.create({ restaurant: rest3._id, name: "Chicken Sandwiches", description: "Spicy brioche fried chicken sliders & burgers", sortOrder: 4 });
    const cat3_5 = await Category.create({ restaurant: rest3._id, name: "Sides & Extras", description: "Corn on the cob, coleslaw, and mashed potatoes", sortOrder: 5 });

    console.log(" Seeding Menu Items (10+ per restaurant)...");
    // Menu items for Restaurant 1 (Burger House)
    await MenuItem.create([
      {
        restaurant: rest1._id,
        category: cat1_1._id,
        name: "Double Smash Cheesy Burger",
        description: "Two 100g Angus smashed beef patties, double aged cheddar, caramelized onions, secret house sauce.",
        price: 850,
        discountPrice: 750,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
        ingredients: ["Angus Beef", "Cheddar Cheese", "Brioche Bun", "Secret Sauce", "Pickles"],
        preparationTime: 12,
        isAvailable: true,
        isFeatured: true
      },
      {
        restaurant: rest1._id,
        category: cat1_1._id,
        name: "Triple Beast Smash",
        description: "Three smashed beef patties, smoked provolone, crispy beef bacon strips, garlic aioli.",
        price: 1100,
        discountPrice: 999,
        image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80",
        ingredients: ["Angus Beef", "Provolone", "Beef Bacon", "Garlic Aioli"],
        preparationTime: 15,
        isAvailable: true
      },
      {
        restaurant: rest1._id,
        category: cat1_2._id,
        name: "Crispy Nashville Hot Zinger",
        description: "24-hour buttermilk-marinated fried chicken thigh, Nashville hot oil dip, creamy coleslaw, pickles.",
        price: 650,
        discountPrice: 599,
        image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=600&auto=format&fit=crop&q=80",
        ingredients: ["Chicken Thigh", "Nashville Spice", "Coleslaw", "Pickles"],
        preparationTime: 12,
        isAvailable: true,
        isFeatured: true
      },
      {
        restaurant: rest1._id,
        category: cat1_2._id,
        name: "Grilled Chicken Herb Deluxe",
        description: "Rosemary & lemon flame-grilled chicken breast, melted mozzarella, fresh arugula, pesto mayo.",
        price: 690,
        image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&auto=format&fit=crop&q=80",
        ingredients: ["Chicken Breast", "Mozzarella", "Arugula", "Pesto"],
        preparationTime: 14,
        isAvailable: true
      },
      {
        restaurant: rest1._id,
        category: cat1_3._id,
        name: "Animal Style Loaded Fries",
        description: "Golden fries topped with chopped smash beef, melted American cheddar, caramelized onions, sauce.",
        price: 450,
        discountPrice: 390,
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop&q=80",
        ingredients: ["Potato Fries", "Cheddar", "Beef Bits", "Onions"],
        preparationTime: 8,
        isAvailable: true
      },
      {
        restaurant: rest1._id,
        category: cat1_3._id,
        name: "Truffle Parmesan Waffle Fries",
        description: "Crispy Belgian waffle fries tossed in white truffle oil and aged parmesan shavings.",
        price: 490,
        image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?w=600&auto=format&fit=crop&q=80",
        ingredients: ["Waffle Fries", "Truffle Oil", "Parmesan"],
        preparationTime: 8,
        isAvailable: true
      },
      {
        restaurant: rest1._id,
        category: cat1_4._id,
        name: "Nutella Hazelnut Shake",
        description: "Thick hand-spun milkshake made with rich vanilla bean gelato and authentic Italian Nutella.",
        price: 380,
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80",
        ingredients: ["Gelato", "Nutella", "Milk", "Whipped Cream"],
        preparationTime: 5,
        isAvailable: true
      },
      {
        restaurant: rest1._id,
        category: cat1_4._id,
        name: "Salted Caramel Pretzel Shake",
        description: "Creamy butterscotch gelato blended with crunchy salted pretzels and house caramel drizzle.",
        price: 380,
        image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=600&auto=format&fit=crop&q=80",
        ingredients: ["Gelato", "Caramel", "Pretzels"],
        preparationTime: 5,
        isAvailable: true
      },
      {
        restaurant: rest1._id,
        category: cat1_5._id,
        name: "Solo Crave Box",
        description: "1 Double Smash Burger + 1 Regular Fries + 1 Chilled Soft Drink.",
        price: 999,
        discountPrice: 899,
        image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=600&auto=format&fit=crop&q=80",
        ingredients: ["Burger", "Fries", "Soft Drink"],
        preparationTime: 15,
        isAvailable: true,
        isFeatured: true
      },
      {
        restaurant: rest1._id,
        category: cat1_5._id,
        name: "Duo Feast Bundle",
        description: "2 Burgers of your choice + 1 Large Loaded Fries + 2 Milkshakes.",
        price: 2199,
        discountPrice: 1899,
        image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=600&auto=format&fit=crop&q=80",
        ingredients: ["2 Burgers", "Loaded Fries", "2 Shakes"],
        preparationTime: 18,
        isAvailable: true
      }
    ]);

    // Menu items for Restaurant 2 (Bella Italia Pizza)
    await MenuItem.create([
      {
        restaurant: rest2._id,
        category: cat2_1._id,
        name: "Margherita Di Bufala",
        description: "San Marzano tomato sauce, fresh buffalo mozzarella, aromatic sweet basil, extra virgin olive oil.",
        price: 1250,
        discountPrice: 1100,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&auto=format&fit=crop&q=80",
        ingredients: ["San Marzano Tomatoes", "Buffalo Mozzarella", "Fresh Basil", "EVOO"],
        preparationTime: 15,
        isAvailable: true,
        isFeatured: true
      },
      {
        restaurant: rest2._id,
        category: cat2_1._id,
        name: "Quattro Formaggi",
        description: "Four cheese indulgence: Mozzarella, Gorgonzola, aged Parmesan, and Creamy Ricotta.",
        price: 1450,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80",
        ingredients: ["Mozzarella", "Gorgonzola", "Parmesan", "Ricotta"],
        preparationTime: 15,
        isAvailable: true
      },
      {
        restaurant: rest2._id,
        category: cat2_2._id,
        name: "Pepperoni Passion Stone-Baked",
        description: "Double layer of Italian beef pepperoni, crushed red peppers, mozzarella on artisan crust.",
        price: 1550,
        discountPrice: 1399,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&auto=format&fit=crop&q=80",
        ingredients: ["Pepperoni", "Mozzarella", "Crushed Chili", "Tomato Sauce"],
        preparationTime: 16,
        isAvailable: true,
        isFeatured: true
      },
      {
        restaurant: rest2._id,
        category: cat2_2._id,
        name: "Diavola Spicy Sausage",
        description: "Spicy cured beef sausage, roasted jalapeños, black olives, red onions, chili honey drizzle.",
        price: 1600,
        image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=600&auto=format&fit=crop&q=80",
        ingredients: ["Spicy Sausage", "Jalapenos", "Olives", "Hot Honey"],
        preparationTime: 16,
        isAvailable: true
      },
      {
        restaurant: rest2._id,
        category: cat2_3._id,
        name: "Wild Truffle & Funghi Pizza",
        description: "Portobello and button mushrooms, white truffle cream, fresh thyme, fiore di latte cheese.",
        price: 1650,
        discountPrice: 1499,
        image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=600&auto=format&fit=crop&q=80",
        ingredients: ["Wild Mushrooms", "Truffle Cream", "Fiore di Latte", "Thyme"],
        preparationTime: 15,
        isAvailable: true
      },
      {
        restaurant: rest2._id,
        category: cat2_3._id,
        name: "Ortolana Mediterranean Veg",
        description: "Grilled zucchini, sweet bell peppers, eggplant, sun-dried tomatoes, and oregano.",
        price: 1300,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=80",
        ingredients: ["Zucchini", "Bell Peppers", "Eggplant", "Sundried Tomatoes"],
        preparationTime: 14,
        isAvailable: true
      },
      {
        restaurant: rest2._id,
        category: cat2_4._id,
        name: "Cheesy Garlic Bread Sticks",
        description: "Fresh dough baked with garlic herb butter, smothered with mozzarella, served with marinara dip.",
        price: 490,
        image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=600&auto=format&fit=crop&q=80",
        ingredients: ["Dough", "Garlic Butter", "Mozzarella", "Marinara"],
        preparationTime: 10,
        isAvailable: true
      },
      {
        restaurant: rest2._id,
        category: cat2_4._id,
        name: "Bruschetta Al Pomodoro",
        description: "Toasted artisan sourdough rubbed with garlic, topped with diced heirloom tomatoes and fresh basil.",
        price: 420,
        image: "https://images.unsplash.com/photo-1506280754576-f6fa8a873550?w=600&auto=format&fit=crop&q=80",
        ingredients: ["Sourdough", "Heirloom Tomatoes", "Garlic", "Basil"],
        preparationTime: 8,
        isAvailable: true
      },
      {
        restaurant: rest2._id,
        category: cat2_5._id,
        name: "Classic Italian Tiramisu",
        description: "Layers of espresso-soaked ladyfingers and creamy mascarpone dusted with Dutch cocoa powder.",
        price: 550,
        discountPrice: 490,
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&auto=format&fit=crop&q=80",
        ingredients: ["Ladyfingers", "Espresso", "Mascarpone", "Cocoa"],
        preparationTime: 5,
        isAvailable: true,
        isFeatured: true
      },
      {
        restaurant: rest2._id,
        category: cat2_5._id,
        name: "Vanilla Bean Panna Cotta",
        description: "Silky Madagascar vanilla bean custard served with fresh raspberry coulis.",
        price: 480,
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop&q=80",
        ingredients: ["Cream", "Vanilla Bean", "Raspberry Coulis"],
        preparationTime: 5,
        isAvailable: true
      }
    ]);

    // Menu items for Restaurant 3 (Golden Crunch Fried Chicken)
    await MenuItem.create([
      {
        restaurant: rest3._id,
        category: cat3_1._id,
        name: "8-Piece Golden Fried Chicken Bucket",
        description: "8 pieces of crunchy, juicy golden fried chicken with secret 11-spice recipe, 2 dips & 2 buns.",
        price: 1650,
        discountPrice: 1450,
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&auto=format&fit=crop&q=80",
        ingredients: ["Bone-in Chicken", "Secret Spice Blend", "Dips", "Buns"],
        preparationTime: 18,
        isAvailable: true,
        isFeatured: true
      },
      {
        restaurant: rest3._id,
        category: cat3_1._id,
        name: "12-Piece Family Chicken Feast",
        description: "12 crispy pieces, 1 large fries, 1 large coleslaw, 4 dinner rolls, 1.5L soft drink.",
        price: 2450,
        discountPrice: 2199,
        image: "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?w=600&auto=format&fit=crop&q=80",
        ingredients: ["12 Chicken Pieces", "Fries", "Coleslaw", "Drink"],
        preparationTime: 20,
        isAvailable: true
      },
      {
        restaurant: rest3._id,
        category: cat3_2._id,
        name: "Crispy Golden Chicken Tenders (6 Pcs)",
        description: "100% whole breast meat chicken tenders, hand-breaded and fried golden, served with honey mustard.",
        price: 590,
        discountPrice: 520,
        image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=600&auto=format&fit=crop&q=80",
        ingredients: ["Chicken Breast", "Honey Mustard Dip", "Crispy Breading"],
        preparationTime: 10,
        isAvailable: true,
        isFeatured: true
      },
      {
        restaurant: rest3._id,
        category: cat3_2._id,
        name: "Spicy Fiery Tenders (6 Pcs)",
        description: "Spicy breaded chicken tenders dusted with chili cayenne seasoning and spicy ranch.",
        price: 620,
        image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=600&auto=format&fit=crop&q=80",
        ingredients: ["Chicken Tenders", "Cayenne Seasoning", "Spicy Ranch"],
        preparationTime: 10,
        isAvailable: true
      },
      {
        restaurant: rest3._id,
        category: cat3_3._id,
        name: "Classic Smoky BBQ Glazed Wings (8 Pcs)",
        description: "Jumbo fried wings drenched in house smoky hickory barbecue glaze, served with celery and blue cheese.",
        price: 680,
        discountPrice: 599,
        image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=600&auto=format&fit=crop&q=80",
        ingredients: ["Chicken Wings", "Smoky BBQ Sauce", "Blue Cheese"],
        preparationTime: 12,
        isAvailable: true,
        isFeatured: true
      },
      {
        restaurant: rest3._id,
        category: cat3_3._id,
        name: "Ghost Pepper Fire Wings (8 Pcs)",
        description: "Extra spicy wings tossed in ghost pepper and habanero glaze. Not for the faint of heart!",
        price: 720,
        image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=600&auto=format&fit=crop&q=80",
        ingredients: ["Chicken Wings", "Ghost Pepper Glaze", "Ranch"],
        preparationTime: 12,
        isAvailable: true
      },
      {
        restaurant: rest3._id,
        category: cat3_4._id,
        name: "Mega Crunch Chicken Slider",
        description: "Buttermilk fried chicken breast fillet on toasted brioche with spicy sriracha mayo & shredded lettuce.",
        price: 520,
        image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=600&auto=format&fit=crop&q=80",
        ingredients: ["Fried Chicken", "Brioche", "Sriracha Mayo", "Lettuce"],
        preparationTime: 10,
        isAvailable: true
      },
      {
        restaurant: rest3._id,
        category: cat3_4._id,
        name: "Honey Butter Chicken Biscuit Sandwich",
        description: "Crispy chicken breast drenched in warm honey butter, served inside a fresh flaky buttermilk biscuit.",
        price: 580,
        discountPrice: 499,
        image: "https://images.unsplash.com/photo-1521305916504-4a1121188589?w=600&auto=format&fit=crop&q=80",
        ingredients: ["Chicken Fillet", "Buttermilk Biscuit", "Honey Butter"],
        preparationTime: 10,
        isAvailable: true
      },
      {
        restaurant: rest3._id,
        category: cat3_5._id,
        name: "Creamy Homestyle Coleslaw",
        description: "Crisp shredded red & white cabbage and carrots in a tangy, sweet creamy dressing.",
        price: 180,
        image: "https://images.unsplash.com/photo-1625944525533-a5868999a747?w=600&auto=format&fit=crop&q=80",
        ingredients: ["Cabbage", "Carrot", "Creamy Dressing"],
        preparationTime: 3,
        isAvailable: true
      },
      {
        restaurant: rest3._id,
        category: cat3_5._id,
        name: "Buttery Mashed Potatoes with Gravy",
        description: "Velvety whipped Idaho potatoes smothered in rich roasted chicken gravy.",
        price: 240,
        image: "https://images.unsplash.com/photo-1618449840665-9ed506d73a34?w=600&auto=format&fit=crop&q=80",
        ingredients: ["Potatoes", "Butter", "Chicken Gravy"],
        preparationTime: 5,
        isAvailable: true
      }
    ]);

    console.log(" Seeding Coupons...");
    await Coupon.create([
      {
        code: "CRAVE50",
        discountType: "percentage",
        discountValue: 20,
        minimumOrder: 500,
        maximumDiscount: 300,
        isActive: true
      },
      {
        code: "WELCOME100",
        discountType: "fixed",
        discountValue: 100,
        minimumOrder: 400,
        isActive: true
      }
    ]);

    console.log(" Seeding Initial Orders & Reviews...");
    const sampleOrder = await Order.create({
      orderNumber: "ORD-20261001-1001",
      user: customer1._id,
      restaurant: rest1._id,
      items: [
        {
          name: "Double Smash Cheesy Burger",
          price: 750,
          quantity: 2,
          subtotal: 1500
        },
        {
          name: "Animal Style Loaded Fries",
          price: 390,
          quantity: 1,
          subtotal: 390
        }
      ],
      deliveryAddress: {
        address: "House 123, Street 4, Clifton",
        city: "Karachi",
        postalCode: "75500"
      },
      phone: "+923004444444",
      subtotal: 1890,
      deliveryFee: 150,
      discount: 0,
      total: 2040,
      paymentMethod: "cash",
      paymentStatus: "paid",
      orderStatus: "delivered",
      notes: "Please provide extra napkins",
      statusHistory: [
        { status: "pending", timestamp: new Date(Date.now() - 3600000), updatedBy: customer1._id, comment: "Order placed" },
        { status: "confirmed", timestamp: new Date(Date.now() - 3000000), updatedBy: admin1._id, comment: "Order confirmed" },
        { status: "preparing", timestamp: new Date(Date.now() - 2400000), updatedBy: admin1._id, comment: "Kitchen preparing" },
        { status: "ready", timestamp: new Date(Date.now() - 1800000), updatedBy: admin1._id, comment: "Ready for pickup" },
        { status: "out_for_delivery", timestamp: new Date(Date.now() - 1200000), updatedBy: admin1._id, comment: "Rider on way" },
        { status: "delivered", timestamp: new Date(Date.now() - 300000), updatedBy: admin1._id, comment: "Delivered to customer" }
      ]
    });

    await Review.create({
      user: customer1._id,
      restaurant: rest1._id,
      order: sampleOrder._id,
      rating: 5,
      comment: "Best smash burgers in town! Crispy edges and amazing sauce. Fast delivery too."
    });

    console.log("=================================================");
    console.log(" Database Seed Completed Successfully!");
    console.log(" Accounts created:");
    console.log("   - Super Admin:     superadmin@cravebite.com / Admin@123");
    console.log("   - Admin 1:         admin1@cravebite.com / Admin@123");
    console.log("   - Admin 2:         admin2@cravebite.com / Admin@123");
    console.log("   - Customer 1:      john@example.com / Customer@123");
    console.log("   - Customer 2:      sarah@example.com / Customer@123");
    console.log("   - Customer 3:      alex@example.com / Customer@123");
    console.log(" Restaurants: 3 | Categories: 15 | Menu Items: 30");
    console.log("=================================================");
  } catch (error) {
    console.error(" Error seeding database:", error);
    throw error;
  }
};

// If run directly via node command: node src/seed/seedData.js
if (process.argv[1] && process.argv[1].endsWith("seedData.js")) {
  seedDatabase()
    .then(() => {
      disconnectDB();
      process.exit(0);
    })
    .catch(() => {
      disconnectDB();
      process.exit(1);
    });
}
