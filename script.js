let galleryImages = document.querySelectorAll(".gallery-img");
let getLatestOpenedImg;
let windowWidth = window.innerWidth;

if(galleryImages){
    galleryImages.forEach(function(image, index){
        image.onclick = function(){
            let getElementCss = window.getComputedStyle(image);
            let getFullImage = getElementCss.getPropertyValue("background-image");
            let getImageUrl = getFullImage.split('/images/thumbs/');
            let setNewImage = getImageUrl[1].replace('")', '');

            getLatestOpenedImg = index + 1;

            let container = document.body;
            let newImageWindow = document.createElement("div");
            container.appendChild(newImageWindow);
            newImageWindow.setAttribute("class", "img-window");
            newImageWindow.setAttribute("onclick", "closeImg()");


            let newImg = document.createElement("img");
            newImageWindow.appendChild(newImg);
            newImg.setAttribute("src", "images/" + setNewImage);
            newImg.setAttribute("id", "current-img");


            newImg.onload = function(){
                let imgWidth = this.width;
                let calcImg = ((windowWidth - imgWidth) / 2) - 80;

                let newNextBtn = document.createElement("a");
                let btnNextText = document.createTextNode("Next")
                newNextBtn.appendChild(btnNextText);
                container.appendChild(newNextBtn);
                newNextBtn.setAttribute("class", "img-btn-next");
                newNextBtn.setAttribute("onclick", "changeImg(1)");
                newNextBtn.style.cssText = "right: " + calcImg + "px;";

                let newPrevBtn = document.createElement("a");
                let btnPrevText = document.createTextNode("Prev")
                newPrevBtn.appendChild(btnPrevText);
                container.appendChild(newPrevBtn);
                newPrevBtn.setAttribute("class", "img-btn-prev");
                newPrevBtn.setAttribute("onclick", "changeImg(0)");
                newPrevBtn.style.cssText = "left: " + calcImg + "px;";
            }
        }
    });
}

function closeImg(){
    document.querySelector(".img-window").remove();
    document.querySelector(".img-btn-next").remove();
    document.querySelector(".img-btn-prev").remove();
}

function changeImg(changeDir){
    document.querySelector("#current-img").remove();

    let getImgWindow = document.querySelector(".img-window");
    let newImage = document.createElement("img");
    getImgWindow.appendChild(newImage);

    let calcNewImg;
    if(changeDir === 1){
        calcNewImg = getLatestOpenedImg + 1;
        if(calcNewImg > galleryImages.length){
            calcNewImg = 1;
        }
    }
    else if(changeDir === 0){
        calcNewImg = getLatestOpenedImg - 1;
        if(calcNewImg < 1){
            calcNewImg = galleryImages.length;
        }
    }

    newImage.setAttribute("src", "images/img" + calcNewImg + ".jpeg");
    newImage.setAttribute("id", "current-img");

    getLatestOpenedImg = calcNewImg;

    newImage.onload = function(){
        let imgWidth = this.width;
        let calcImg = ((windowWidth - imgWidth) / 2) - 80;

        let nextBtn = document.querySelector('.img-btn-next');
        nextBtn.style.cssText = "right: " + calcImg + "px;";

        let prevBtn = document.querySelector('.img-btn-prev');
        prevBtn.style.cssText = "left: " + calcImg + "px;";
    }
}