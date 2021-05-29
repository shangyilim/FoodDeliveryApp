var admin = require('firebase-admin');
var uuid = require('uuid');
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: serviceAccount.project_id + ".appspot.com"
});

const images = {
    baked_fries: "assets/images/baked-fries.jpg",
    burger_restaurant_2: "assets/images/burger-restaurant-2.jpg",
    burger_restaurant: "assets/images/burger-restaurant.jpg",
    chicago_hot_dog: "assets/images/chicago-hot-dog.jpg",
    crispy_chicken_burger: "assets/images/crispy-chicken-burger.jpg",
    fries_restaurant: "assets/images/fries-restaurant.jpg",
    hawaiian_pizza: "assets/images/hawaiian-pizza.jpg",
    honey_mustard_chicken_burger: "assets/images/honey-mustard-chicken-burger.jpg",
    hot_dog_restaurant: "assets/images/hot-dog-restaurant.jpg",
    ice_kacang: "assets/images/ice-kacang.jpg",
    japanese_restaurant: "assets/images/japanese-restaurant.jpg",
    kek_lapis_shop: "assets/images/kek-lapis-shop.jpg",
    kek_lapis: "assets/images/kek-lapis.jpg",
    kolo_mee: "assets/images/kolo-mee.jpg",
    nasi_briyani_mutton: "assets/images/nasi-briyani-mutton.jpg",
    nasi_lemak: "assets/images/nasi-lemak.jpg",
    noodle_shop: "assets/images/noodle-shop.jpg",
    pizza_restaurant: "assets/images/pizza-restaurant.jpg",
    pizza: "assets/images/pizza.jpg",
    salad: "assets/images/salad.jpg",
    sarawak_laksa: "assets/images/sarawak-laksa.jpg",
    sushi: "assets/images/sushi.jpg",
    teh_c_peng: "assets/images/teh-c-peng.jpg",
    tomato_pasta: "assets/images/tomato-pasta.jpg",
}

const uploadImages = () => {

    const imagesToUpload = Object.values(images).map(img => {
        const filename = img.split('/')[2];
        return admin.storage().bucket().upload(img, {
            destination: 'restaurants/' + filename,
            metadata: {
                metadata: {
                    firebaseStorageDownloadTokens: uuid.v4(),
                }
            }
        }).then(() => {
            console.log('uploading ' + filename);
        });
    });

    var completeUpload = false;
    Promise.all(imagesToUpload).then(() => {
        completeUpload = true;
        console.log('uploaded images');
    });

    const interval = setTimeout(() => {

        if (completeUpload) {
            clearInterval(interval);
        }
    }, 1000)
}

const importRestaurants = () => {

    // price rating
    const affordable = 1
    const fairPrice = 2
    const expensive = 3

    const getStoragePath = (path) => 'restaurants/' + path.split('/')[2];
    const restaurantData = [
        {

            name: "Chancelot Burger",
            rating: 4.8,
            categories: ['burger', 'snacks'],
            priceRating: affordable,
            photo: images.burger_restaurant,
            duration: "30 - 45 min",
            location: {
                latitude: -1.219648,
                longitude: 36.888314,
            },
            menu: [
                {
                    menuId: 1,
                    name: "Crispy Chicken Burger",
                    photo: images.crispy_chicken_burger,
                    description: "Burger with crispy chicken, cheese and lettuce",
                    calories: 200,
                    price: 10
                },
                {
                    menuId: 2,
                    name: "Crispy Chicken Burger with Honey Mustard",
                    photo: images.honey_mustard_chicken_burger,
                    description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
                    calories: 250,
                    price: 15
                },
                {
                    menuId: 3,
                    name: "Crispy Baked French Fries",
                    photo: images.baked_fries,
                    description: "Crispy Baked French Fries",
                    calories: 194,
                    price: 8
                }
            ]
        },
        {
            id: 2,
            name: "Chancelot Pizza",
            rating: 4.8,
            categories: ['noodles', 'salads', 'pizza'],
            priceRating: expensive,
            photo: images.pizza_restaurant,
            duration: "15 - 20 min",
            location: {
                latitude: -1.213126,
                longitude: 36.839998,
            },
            menu: [
                {
                    menuId: 4,
                    name: "Hawaiian Pizza",
                    photo: images.hawaiian_pizza,
                    description: "Canadian bacon, homemade pizza crust, pizza sauce",
                    calories: 250,
                    price: 15
                },
                {
                    menuId: 5,
                    name: "Tomato & Basil Pizza",
                    photo: images.pizza,
                    description: "Fresh tomatoes, aromatic basil pesto and melted bocconcini",
                    calories: 250,
                    price: 20
                },
                {
                    menuId: 6,
                    name: "Tomato Pasta",
                    photo: images.tomato_pasta,
                    description: "Pasta with fresh tomatoes",
                    calories: 100,
                    price: 10
                },
                {
                    menuId: 7,
                    name: "Mediterranean Chopped Salad ",
                    photo: images.salad,
                    description: "Finely chopped lettuce, tomatoes, cucumbers",
                    calories: 100,
                    price: 10
                }
            ]
        },
        {
            id: 3,
            name: "Chancelot Hotdogs",
            rating: 4.8,
            categories: ['hotdogs'],
            priceRating: expensive,
            photo: images.hot_dog_restaurant,
            duration: "20 - 25 min",
            location: {
                latitude: -1.301789,
                longitude: 36.825724,
            },
            menu: [
                {
                    menuId: 8,
                    name: "Chicago Style Hot Dog",
                    photo: images.chicago_hot_dog,
                    description: "Fresh tomatoes, all beef hot dogs",
                    calories: 100,
                    price: 20
                }
            ]
        },
        {
            id: 4,
            name: "Chancelot Sushi",
            rating: 4.8,
            categories: ['sushi'],
            priceRating: expensive,
            photo: images.japanese_restaurant,
            duration: "10 - 15 min",
            location: {
                latitude: -1.316393,
                longitude: 36.834484,
            },
            menu: [
                {
                    menuId: 9,
                    name: "Sushi sets",
                    photo: images.sushi,
                    description: "Fresh salmon, sushi rice, fresh juicy avocado",
                    calories: 100,
                    price: 50
                }
            ]
        },
        {
            id: 5,
            name: "Chancelot Cuisine",
            rating: 4.8,
            categories: ['rice', 'noodles'],
            priceRating: affordable,
            photo: images.noodle_shop,
            duration: "15 - 20 min",
            location: {
                latitude: -1.312301,
                longitude: 36.816861,
            },
            menu: [
                {
                    menuId: 10,
                    name: "Kolo Mee",
                    photo: images.kolo_mee,
                    description: "Noodles with char siu",
                    calories: 200,
                    price: 5
                },
                {
                    menuId: 11,
                    name: "Sarawak Laksa",
                    photo: images.sarawak_laksa,
                    description: "Vermicelli noodles, cooked prawns",
                    calories: 300,
                    price: 8
                },
                {
                    menuId: 12,
                    name: "Nasi Lemak",
                    photo: images.nasi_lemak,
                    description: "A traditional Malay rice dish",
                    calories: 300,
                    price: 8
                },
                {
                    menuId: 13,
                    name: "Nasi Briyani with Mutton",
                    photo: images.nasi_briyani_mutton,
                    description: "A traditional Indian rice dish with mutton",
                    calories: 300,
                    price: 8
                },

            ]
        },
        {

            id: 6,
            name: "Chancelot Dessets",
            rating: 4.9,
            categories: ['desserts', 'drinks'],
            priceRating: affordable,
            photo: images.kek_lapis_shop,
            duration: "35 - 40 min",
            location: {
                latitude: -1.343406,
                longitude: 36.764942,
            },
            menu: [
                {
                    menuId: 12,
                    name: "Teh C Peng",
                    photo: images.teh_c_peng,
                    description: "Three Layer Teh C Peng",
                    calories: 100,
                    price: 2
                },
                {
                    menuId: 13,
                    name: "ABC Ice Kacang",
                    photo: images.ice_kacang,
                    description: "Shaved Ice with red beans",
                    calories: 100,
                    price: 3
                },
                {
                    menuId: 14,
                    name: "Kek Lapis",
                    photo: images.kek_lapis,
                    description: "Layer cakes",
                    calories: 300,
                    price: 20
                }
            ]

        }

    ]


    const db = admin.firestore();
    var batch = db.batch();

    restaurantData.forEach(restaurant => {

        batch.set(db.collection("Restaurants").doc(), {
            ...restaurant,
            photo: getStoragePath(restaurant.photo),
            menu: restaurant.menu.map(m => ({
                ...m,
                photo: getStoragePath(m.photo),
            }))
        });
    })

    var completeWrite = false;
    batch.commit().then(() => {
        completeWrite = true;
    })

    const writeInterval = setTimeout(() => {

        if (completeWrite) {
            clearInterval(writeInterval);
            console.log('completed firestore upload');
        }
    }, 1000)

}

//uploadImages();
importRestaurants();