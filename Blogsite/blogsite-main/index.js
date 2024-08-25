const toggleCheckbox=document.querySelector('.checkbox');
const searchtoggle=document.querySelector('.searchclick');
const searchicon=document.querySelector('.fa-magnifying-glass');

searchicon.addEventListener('click',function(){
    if(searchtoggle.style.display === 'none'){
        searchtoggle.style.display = 'block';
    }
    else{
        searchtoggle.style.display='none';
    }
})

toggleCheckbox.addEventListener('change',function(){
    if(this.checked){
        document.body.classList.add('body');
    }
    else{
        document.body.classList.remove('body');
    }
})

//header scroll
const header = document.getElementById('header');
function handlescroll() {
    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    }
    else {
        header.classList.remove('scrolled');
    }
}

//attach the scroll event listner
window.addEventListener('scroll',handlescroll);

//auto type words
document.addEventListener('DOMContentLoaded',function(){
    const options={
        strings:['A Student',' A Coder',' A Blogger',' A Youtuber','A Vlogger','An Artist'],        
        typeSpeed:150,
        backSpeed:50,
        backDelay:3000,
        loop: true
    };

    const multiTextElement =document.querySelector('.multitext');
    let currentTextIndex=0;
    let currentText='';
    let isDeleting=false;
    function type(){
        const fullText=options.strings[currentTextIndex];
        if(isDeleting){
            currentText = fullText.substring(0,currentText.length-1);
                }
        else{
            currentText =fullText.substring(0,currentText.length +1);
        }

        multiTextElement.textContent=currentText;
        let typeSpeed=options.typeSpeed;
        if(isDeleting){
            typeSpeed /=2;//fast when delete
        }

        if(!isDeleting && currentText === fullText){
            typeSpeed =options.backDelay;
            isDeleting =true;
        }
        else if(isDeleting &&currentText===''){
            isDeleting =false;
            currentTextIndex =(currentTextIndex + 1)% options.strings.length;
        }

        setTimeout(type,typeSpeed);
        }
    type();
});

//HOTCARDS
const cardWrapper=document.querySelector('.hotcards');
const cardWrapperChildren = Array.from(cardWrapper.children);
const widthToScroll = cardWrapper.children[0].offsetWidth;
const arrowPrev = document.querySelector('.leftbtn');
const arrowNext = document.querySelector('.rightbtn');
const cardBoundig=cardWrapper.getBoundingClientRect();
const column =Math.floor(cardWrapper.offsetWidth/(widthToScroll+24));
let currScroll=0;
let initPos=0;
let clicked=false;

cardWrapperChildren.slice(-column).reverse().forEach(item => {
    cardWrapper.insertAdjacentHTML('afterbegin', item.outerHTML);
});

cardWrapperChildren.slice(0,column).forEach(item => {
    cardWrapper.insertAdjacentHTML('beforeend', item.outerHTML);
});

const cardImageAndLink =cardWrapper.querySelectorAll('.hcard a,hcard img');
cardImageAndLink.forEach(item => { 
    item.setAttribute('draggable',false);
});

cardWrapper.classList.add('no-smooth');
cardWrapper.scrollLeft = cardWrapper.offsetWidth
cardWrapper.classList.remove('no-smooth')

arrowPrev.onclick =function(){
    cardWrapper.scrollLeft -=widthToScroll
}
    arrowNext.onclick =function(){
        cardWrapper.scrollLeft +=widthToScroll  
}

//auto scroll every 2 sec

let autoScroll;
cardWrapper.onscroll = function() {
    if (cardWrapper.scrollLeft === 0) {
        cardWrapper.classList.add('no-smooth');
        cardWrapper.scrollLeft = cardWrapper.scrollWidth - (2 * cardWrapper.offsetWidth);
        cardWrapper.classList.remove('no-smooth');

    } else if (cardWrapper.scrollLeft === cardWrapper.scrollWidth - cardWrapper.offsetWidth) {
        cardWrapper.classList.add('no-smooth');
        cardWrapper.scrollLeft = cardWrapper.offsetWidth;
        cardWrapper.classList.remove('no-smooth');
    }
    if (autoScroll) {
        clearTimeout(autoScroll);
    }

    autoScroll = setTimeout(() => {
        cardWrapper.classList.remove('no-smooth');
        cardWrapper.scrollLeft += widthToScroll;
    }, 2000);
}

