//preloader

gsap.from(".clip-top, .clip-bottom", 2, {
    delay: 1,
    height: "50vh",
    ease: "power4.inOut",
});

gsap.to(".marquee", 3.5, {
    delay: 0.75,
    top: "45%",
    ease: "power4.inOut",
});

gsap.from(".clip-top .marquee, .clip-bottom .marquee", 5, {
    delay: 1,
    left: "100%",
    ease: "power4.inOut",
});

gsap.from(".clip-center .marquee", 5, {
    delay: 1,
    left: "-50%",
    ease: "power4.inOut",
});

gsap.to(".clip-top", 2, {
    delay: 5.2,
    clipPath: "inset(0 0 100% 0)",
    ease: "power4.inOut",
});

gsap.to(".clip-bottom", 2, {
    delay: 5.2,
    clipPath: "inset(100% 0 0 0)",
    ease: "power4.inOut",
});

gsap.to(".clip-top .marquee, .clip-bottom .marquee, .clip-center .marquee span", 1, {
    delay: 5.2,
    opacity: 0,
    ease: "power2.inOut",
})

//mouse trail

const trails = document.querySelectorAll(".trail");
const smoothPointer = {
    x: document.innerWidth / 2,
    y: document.innerHeight / 2,
};
const totalPointsArray = [40, 35, 30, 25, 20, 15, 10];

let xMousePos = 0;
let yMousePos = 0;
let lastX = null;
let lastY = null;
let hasMouseMoved = false;

document.addEventListener("mousemove", (event) => {
    if (!hasMouseMoved) {
        lastX = event.pageX;
        lastY = event.pageY;
        hasMouseMoved = true;
    } else {
        xMousePos = event.pageX;
        yMousePos = event.pageY;
        gsap.to(smoothPointer, {
            x: event.pageX,
            y: event.pageY,
            duration: 0.5,
            ease: "power2.out",
        });

    }

});

// window.addEventListener("scroll", function () {
//     const xScrollDelta = window.scrollX - lastScrolledLeft;
//     const yScrollDelta = window.scrollY - lastScrolledTop;
//
//     if(xScrollDelta !== 0 || yScrollDelta !== 0){
//         xMousePos += xScrollDelta;
//         yMousePos += yScrollDelta;
//     }
//
//     lastScrolledLeft = window.scrollY;
//     lastScrolledTop = window.scrollX;
// })

function updatePath() {
    trails.forEach((path, index) => {
        let points = path.points || [];
        points.unshift({ ...smoothPointer });
        while (points.length > totalPointsArray[index]) {
            points.pop();
        }
        path.points = points;

        if (points.length > 1) {
            let d = `M ${points[0].x} ${points[0].y}`;
            for (let i = 1; i < points.length; i++) {
                d += ` L ${points[i].x} ${points[i].y}`;
            }
            path.setAttribute("d", d);
        }
    });

    requestAnimationFrame(updatePath);
}

updatePath();

// navigation


document.addEventListener("DOMContentLoaded", function (){
    const menu = document.querySelector(".menu");
    const toggleButton = document.querySelector(".toggle");
    let isOpen = false;
    const navElements = document.querySelectorAll(".link");
    const themeIcon = document.querySelector(".theme");
    const langs = document.querySelector(".langs");

    const timeline = gsap.timeline({ paused: true });

    timeline.to(menu, {
        duration: 0.3,
        opacity: 1,
    });

    timeline.to(menu, {
        duration: 1,
        ease: "power3.inOut",
        clipPath: "polygon(49.75% 0%, 50.25% 0%, 50.25% 100%, 49.75% 100%)",
    },
        "-=0.3"
    );

    timeline.to(themeIcon, {
        duration: 0.1,
        ease: "power4.inOut",
        opacity: "0",
    });

    timeline.to(langs, {
        duration: 0.1,
        ease: "power3.inOut",
        display: "none",
    });

    timeline.to(menu, {
        duration: 1,
        ease: "power3.inOut",
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        pointerEvents: "all",
    });

    timeline.to(themeIcon, {
        duration: 0.1,
        ease: "power3.inOut",
        display: "none",
    });


    timeline.to(".divider", {
        duration: 1,
        ease: "power4.inOut",
        height: "100%",
    },
    "-=0.75"
    );

    toggleButton.addEventListener("click", function (){
        if(isOpen){
            timeline.reverse();
            toggleButton.classList.remove("white-bg")

        } else {
            timeline.play();
            toggleButton.classList.add("white-bg")
        }
        isOpen = !isOpen;
    });

    navElements.forEach((element) => {
        element.addEventListener("click", function () {
            if(isOpen){
                timeline.reverse();
            } else {
                timeline.play();

            }
            isOpen = !isOpen;
        })
    })
})

// letters

// const letters = document.querySelector('.letters'),
//     lettersContainer = letters.querySelector('.section_container');
//     lettersCol = letters.querySelectorAll('.section_col');
//     lettersCaptions = letters.querySelectorAll('.section_col_caption');
//
// const isDesktop = window.matchMedia('(min-width: 768px)');
//
// const init = () => {
//     if(isDesktop.matches) addEventListeners();
// };
//
// const addEventListeners = () => {
//     lettersCol[0].classList.add('active');
//
//     lettersCol.forEach((col, index) => {
//         col.addEventListener('mouseenter', () => {
//             lettersCol.forEach((el) => el.classList.remove('active'));
//
//             col.classList.add('active');
//
//             if(index === col.length - 1) col.classList.add('active');
//         })
//     })
// }
//
// init();

// team
const team = [
    { name: "Andrii Huzenko", role: "Founder" },
    { name: "Kirill Nesterenko", role: "CTO" },
    { name: "Bogdan Gilevych", role: "Frontend Developer" },
    { name: "Mykola Krasovskyi", role: "Backend Developer" },
    { name: "Yaroslav Koval", role: "Designer" },
];

let currentSlide = 1;
const totalSlides = team.length;

const updateInfo = (slideNumber) => {
    const member = team[slideNumber - 1];
    document.querySelector('.info .name').textContent = member.name;
    document.querySelector('.info .role').textContent = member.role;
};

const animateSlide = (slideNumber, reveal) => {
    const marquee = document.querySelector(`.t-${slideNumber}.marquee-wrapper`);
    const img = document.getElementById(`t-${slideNumber}`);
    const clipPathValue = reveal ? 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)' :
        'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)';

    gsap.to(marquee, { clipPath: clipPathValue, duration: 1, ease: "power4.out", delay: 0.3 });

    gsap.to(img, { clipPath: clipPathValue, duration: 1, ease: "power4.out"});
}
updateInfo(currentSlide);

const handleRightClick = () => {
    if(currentSlide < totalSlides) {
        animateSlide(currentSlide + 1, true);
        currentSlide++;
        updateInfo(currentSlide);
    }
}
const handleLeftClick = () => {
    if(currentSlide > 1) {
        animateSlide(currentSlide, false);
        currentSlide--;
        updateInfo(currentSlide);
    }
}

const sectionTeam = document.querySelector(".team");

sectionTeam.addEventListener('click', (e) => {
    const halfPageWidth = window.innerWidth / 2;
    if(e.clientX > halfPageWidth) {
        handleRightClick();
    } else {
        handleLeftClick();
    }
});


// theme

const themeIcon = document.querySelector(".theme");
const footerImg = document.querySelector(".footer-image");
const footerInnerImg = document.querySelector(".footer-inner-image");
const navImg = document.querySelector(".col-image");

themeIcon.onclick = function (){
    document.body.classList.toggle("dark-theme");
    if(document.body.classList.contains("dark-theme")){
        themeIcon.classList.add("white-bg")
        footerImg.classList.add("dark")
        footerInnerImg.classList.add("dark")
        navImg.classList.add("dark")

        console.log('hui')
    } else {
        themeIcon.classList.remove("white-bg")
        footerImg.classList.remove("dark")
        footerInnerImg.classList.remove("dark")
        navImg.classList.remove("dark")

        console.log('hui')
    }
}

// toTop button

// const toTopBtn = document.querySelector(".to-top");
//
// // toTopBtn.addEventListener('click', () => {
// //     window.scrollTo({
// //         top: 0
// //     })
// // })