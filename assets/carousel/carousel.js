
//============================ANIMATIONS============================//

/**The pressCheck() function sets buttonPress=false,
 * then sets a timeout for buttonPress=true
 * Inside the clickLeft() abd clickRight() functions, this is a cushion so the user
 * cannot spam-click the left or right button and create animation glitches.
 */
let buttonPress;
function pressCheck() {
    buttonPress = false;
    setTimeout(() => buttonPress = true, 1200);
}
pressCheck()



/**This distance variable tells each animation how far to move each image.
 * Screens can all have different sizes, right? 
 * When each image slides away on the carousel,
 * we need it to fully move off camera before we make it disappear.
 * by using .offsetWidth, we can find the width of our carousel at any time.
 * distance is the variable that holds this width number for each function.
 * And of course,
 * If we need a negative number, then
 * distance = distance - (distance * 2)
 */
let distance;

/**When each image leaves:
 * - It slides away with no easing (Power0.easeNone)
 * - It slides just a little bit PAST the carousel width to keep a smoother animation
 * We also setTimeout, so after 0.5 seconds, or 500 milliseconds, 
 * The image will disappear.
 */
function slideLeftOut(img) {
    distance = carousel.offsetWidth * 1.1;
    distance = distance - (distance * 2);
    TweenMax.to(img, 0.5, {x: distance, ease: Power0.easeNone})
    setTimeout(() => {
        img.style.display = "none";
        TweenMax.set(img, {x:0});
    }, 500);
}
function slideRightOut(img) {
    distance = carousel.offsetWidth * 1.1;
    TweenMax.to(img, 0.5, {x: distance, ease: Power0.easeNone})
    setTimeout(() => {
        img.style.display = "none";
        TweenMax.set(img, {x:0});
    }, 500);
}


/**Here, there's a delay on both the animation and the image appearance.
 * This gives the leaving image enough time to fully disappear so that 
 * our new image doesn't glitch as it slides in.
 */
function slideLeftIn(img) {
    distance = carousel.offsetWidth;
    TweenMax.from(img, 1, {x: distance, delay: 0.5})
    setTimeout(() => img.style.display = "flex", 500);
}
function slideRightIn(img) {
    distance = carousel.offsetWidth;
    distance = distance - (distance * 2);
    TweenMax.from(img, 1, {x: distance, delay: 0.5})
    setTimeout(() => img.style.display = "flex", 500);
}



class Carousel {
    constructor(carousel) {

        // Defining what is what
        this.carousel = carousel;
        this.leftBtn = carousel.querySelector(".left-btn");
        this.rightBtn = carousel.querySelector(".right-btn");
        this.slides = carousel.querySelectorAll(".slide");

        // Set initial display image and slide in
        this.displayIndex = Math.round(Math.random() * this.slides.length);
        this.displaySlide = this.slides[this.displayIndex];
        console.log(this.displaySlide);
        slideRightIn(this.displaySlide);

        // Each event listener
        this.leftBtn.addEventListener("click", () => this.clickLeft())
        this.rightBtn.addEventListener("click", () => this.clickRight())
    }
    clickLeft() {

        //AS LONG AS buttonPress==true
        if(buttonPress) {
            // Set current Slide and new display image&index.
            let currentSlide = this.displaySlide;
            this.displayIndex--;
            if(this.displayIndex < 0) {
                this.displayIndex = this.slides.length - 1;
            }
            this.displaySlide = this.slides[this.displayIndex];

            // Slide out and slide in, moving Left.
            slideLeftOut(currentSlide);
            slideLeftIn(this.displaySlide);

            pressCheck()
        }
    }
    clickRight() {

        //AS LONG AS buttonPress==true
        if(buttonPress) {
            // Set current Slide and new display image&index.
            let currentSlide = this.displaySlide;
            this.displayIndex++;
            if(this.displayIndex >= this.slides.length) {
                this.displayIndex = 0;
            }
            this.displaySlide = this.slides[this.displayIndex];

            // Slide out and slide in, moving Right.
            slideRightOut(currentSlide);
            slideRightIn(this.displaySlide);
            
            pressCheck()
        }
    }

}

let carousel = document.querySelector(".carousel");
if(carousel){
    new Carousel(carousel);
}
