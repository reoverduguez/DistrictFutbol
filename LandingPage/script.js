/* Hides navbar after clicking on links */
$('.navbar-nav>li>a').on('click', function() {
    $('.navbar-collapse').collapse('hide');
});

/* Dynamically changes navbar when scrolling */
const navbar = document.querySelector("nav")
const heroSection = document.querySelector("#hero")
const heroSectionOptions = {
    rootMargin: '-125px 0px 0px 0px'
}

const heroSectionObserver = new IntersectionObserver(function(entries, heroSectionObserver) {
    entries.forEach(entry => {
        if(!entry.isIntersecting) {
            navbar.classList.add('nav-scrolled')
        } else {
            navbar.classList.remove('nav-scrolled')
        }
    })
}, heroSectionOptions)

heroSectionObserver.observe(heroSection)

/* Removes labels from forms if placeholders are supported */
if (document.createElement("input").placeholder != undefined) {
    const labels = document.getElementsByClassName("form-label")
    Array.prototype.forEach.call(labels, function (label) {
        label.classList.add("hide-label")
    })
}

/* Smooth scroll effect */
function smoothScroll(selector, duration) {
    const target = document.querySelector(selector)
    const targetPosition = target.getBoundingClientRect().top
    const startPosition = window.pageYOffset
    var startTime = null

    function animation(currentTime) {
        if (startTime == null) {
            startTime = currentTime
        }
        const timeElapsed = currentTime - startTime
        const run = ease(timeElapsed, startPosition, targetPosition, duration)
        window.scrollTo(0, run)

        if (timeElapsed < duration) {
            requestAnimationFrame(animation)
        }
    }

    function ease(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    }
    
    requestAnimationFrame(animation)
}

const anchors = document.querySelectorAll('#navbar-main-links>li>a, #footer-main-links>p>a')

for (var i = 0; i < anchors.length; i++) {
    anchors[i].addEventListener('click', function(anchor) {
        const dest = anchor.target.getAttribute('href')
        smoothScroll(dest, 1000)
    })
}