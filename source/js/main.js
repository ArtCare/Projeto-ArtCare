function changeNav() {
    nav.classList.toggle('active', scrollY > 0)

    if (scrollY == 0) {
        logo.setAttribute('src', './src/assets/svg/logoWhite.svg')
    } else {
        logo.setAttribute('src', './src/assets/svg/logoBlue.svg')
    }
}

function reload() {
    location.reload()
}