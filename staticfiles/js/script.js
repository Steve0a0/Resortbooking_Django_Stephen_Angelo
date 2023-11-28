
const carousel = document.querySelector(".carousel");
firstImg = carousel.querySelectorAll("img")[0],
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart= false, prevPageX,prevScrollLeft , positionDiff, isDragging = false;
let scrollWidth = carousel.scrollWidth - carousel.clientWidth;


const showHideIcons=()=>{
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" :"block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" :"block";
}

arrowIcons.forEach(icon =>{
    icon.addEventListener("click", () =>{
        let firstImgWidth = firstImg.clientWidth + 14;
         carousel.scrollLeft +=icon.id =="left" ? -firstImgWidth : firstImgWidth;
         showHideIcons();
       
        setTimeout(() =>  showHideIcons(), 60);
    });
});


const autoSlide = () => {
    if(carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth)) return;


positionDiff = Math.abs(positionDiff);
let firstImgWidth =firstImg.clientWidth + 14;
let valDifference = firstImgWidth - positionDiff;
    if(carousel.scrollLeft > prevScrollLeft){
        return carousel.scrollLeft += positionDiff > firstImgWidth /3 ? valDifference : -positionDiff;

}
    carousel.scrollLeft += positionDiff > firstImgWidth /3 ? valDifference : -positionDiff;
}

const dragStart = (e) =>{
    isDragStart=true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}
const dragging = (e) => {
    if (!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    const currentX = e.pageX || e.touches[0].pageX;
    positionDiff = currentX - prevPageX;   
    const touchScrollSpeed = 1.5;
    carousel.scrollLeft = prevScrollLeft - (positionDiff * touchScrollSpeed);
    showHideIcons();
  }
  



const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");
    if(!isDragStart) return;
    isDragging=false;
    autoSlide();
 
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop);







