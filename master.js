
let count = 30;
const apiKey = 'EBN6U-KrqbWcnQcmrIS9BiY5EBq3aOxyK5mezsGS0h8';
const unSplashUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
let photoArray = [];
const imagesContainer = document.querySelector(".image-container");
let imagesLoadedCount = 0;
let totalImages = 0;
let readyToLoad = false;
let loader = document.querySelector(".loader");
//alt_description --> return description to the photo
//urls.regular --> return the url to the photo
//links.html --> as anchor 
//listen to photos loading 
function imagesLoaded() {
    imagesLoadedCount++;
    if (imagesLoadedCount === totalImages) {
        loader.hidden = true;
        readyToLoad = true;
    }
}

//for disply photos for users
function displayPhotos() {
    imagesLoadedCount = 0;
    totalImages = photoArray.length;
    photoArray.forEach((photo) => {
        let a = document.createElement('a');
        a.href = photo.links.html;
        a.target = '_blank';
        let img = document.createElement('img');
        img.src = photo.urls.regular;
        img.alt = photo.alt_description;
        img.title = photo.alt_description;
        img.addEventListener("load", imagesLoaded);
        a.appendChild(img);
        imagesContainer.appendChild(a);

    })
}
// to get photo from Unsplash API
async function getPhotos() {
    try {
        const responce = await fetch(unSplashUrl);
        photoArray = await responce.json();
        displayPhotos();
    }
    catch (e) {
        console.log(e);
    }
}

//load images when scroll to spacific point 
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && readyToLoad) {
        getPhotos();
        readyToLoad = false;
    }
})

//on load
getPhotos();