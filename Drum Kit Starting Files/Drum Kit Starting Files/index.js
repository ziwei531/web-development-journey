//Detecting Button Pressed
let numberOfDrumButtons = document.querySelectorAll(".drum").length;

for (let i = 0; i < numberOfDrumButtons; ++i) {

    document.querySelectorAll(".drum")[i].addEventListener("click", function () {
        
        let buttonInnerHTML = this.innerHTML;
        makeSound(buttonInnerHTML);

        buttonAnimation(buttonInnerHTML);

    });

}

//Detecting Keyboard Press
document.addEventListener("keydown", function(event) {  //event is detecting what key is being pressed
    
    makeSound(event.key); //after receiving the information, it will pass on to the makeSound() function 
    
    buttonAnimation(event.key);
    
})


function makeSound(key) {
    switch (key) {

        case "w":
            let tom1 = new Audio("./sounds/tom-1.mp3");
            tom1.play();
        break;
    
        case "a":
            let tom2 = new Audio("./sounds/tom-2.mp3");
            tom2.play();
        break;

        case "s":
            let tom3 = new Audio("./sounds/tom-3.mp3");
            tom3.play();
        break;

        case "d":
            let tom4 = new Audio("./sounds/tom-4.mp3");
            tom4.play();
        break;

        case "j":
            let snare = new Audio("./sounds/snare.mp3");
            snare.play();
        break;
        
        case "k":
            let crash = new Audio("./sounds/crash.mp3");
            crash.play();
        break;

        case "l":
            let kickBass = new Audio("./sounds/kick-bass.mp3");
            kickBass.play();
        break;

        default: //it's like else. it's good practice to include default
            console.log(buttonInnerHTML);
            
    }
}

function buttonAnimation(currentKey) {

    let activeButton = document.querySelector("." + currentKey);

    activeButton.classList.add("pressed");

    setTimeout(() => {
        activeButton.classList.remove("pressed");
    }, 100);

}