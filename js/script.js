const span = document.querySelector('#span')
// const row = document.querySelector('.row')


let sepet = []

let localItem = localStorage.getItem('sepet')

if (localItem) {
    sepet = JSON.parse(localItem)
    // console.log(sepet)
    span.textContent = sepet.length
}
// localStorage.clear()
// console.log(urunler)

console.log(window.location.href)
console.log(sepet.length)

if (window.location.href == 'http://127.0.0.1:5500/index.html') {
    const row = document.querySelector('.row')

    urunler.forEach((urun) => {

        // console.log(urun)

        urun.quantity = 1

        // console.log(urun)

        const col = document.createElement('div')
        col.classList.add('col-lg-3', 'col-sm-6', 'col-12')

        const parentDiv = document.createElement('div')
        parentDiv.style.width = '100%'
        parentDiv.style.height = '420px'
        parentDiv.style.border = "1px solid black"

        const imgDiv = document.createElement('div')
        imgDiv.style.width = "100%"
        imgDiv.style.height = "200px"

        const img = document.createElement('img')
        img.src = urun.fotoğraf
        img.style.width = "100%"
        img.style.height = "100%"

        const cardBody = document.createElement('div')
        cardBody.style.width = "100%"
        cardBody.style.height = "220px"

        const baslik = document.createElement('h5')
        baslik.textContent = urun.isim

        const aciklama = document.createElement('p')
        aciklama.textContent = `${urun.açıklama} - ${urun.fiyat}$`

        const btn = document.createElement('button')
        btn.classList.add('btn', 'btn-dark')
        btn.textContent = 'Sepete Ekle'

        btn.addEventListener('click', () => {

            console.log(sepet.length)

            let found = false

            if (sepet.length == 0) {
                sepet.push(urun)

                found = true
            } else {
                sepet.forEach(sepetUrunu => {
                    // console.log(sepetUrunu.isim == urun.isim)
                    if (sepetUrunu.isim == urun.isim) {
                        sepetUrunu.quantity++
                        found = true
                    }

                })
            }

            if (!found) {
                sepet.push(urun)
            }

            localStorage.setItem('sepet', JSON.stringify(sepet))
            span.textContent = sepet.length
        })

        cardBody.append(baslik)
        cardBody.append(aciklama)
        cardBody.append(btn)

        imgDiv.append(img)

        parentDiv.append(imgDiv)
        parentDiv.append(cardBody)

        col.append(parentDiv)

        row.append(col)

    })
} else if (window.location.href == 'http://127.0.0.1:5500/sepet.html') {
    const container = document.querySelector('.container')

    if (sepet.length == 0) {
        const h4 = document.createElement('h4')
        h4.textContent = 'Sepetinizde Ürün Yok...'

        container.append(h4)
    } else {
        //! Sepetimin uzunluğu 0 dan büyük olduğu sürece burdaki kodlar çalışacak
        sepet.forEach(urun => {
            const div = document.createElement('div')
            div.style.width = "100%"
            div.style.height = '200px'
            div.style.border = "1px solid black"
            div.classList.add('d-flex', 'align-items-center', 'justify-content-between', 'mt-2')

            const imgDiv = document.createElement('div')
            imgDiv.style.width = "25%"
            imgDiv.style.height = "100%"

            const img = document.createElement('img')
            img.src = urun.fotoğraf
            img.style.width = "100%"
            img.style.height = "100%"

            const baslik = document.createElement('h3')
            baslik.textContent = urun.isim

            const price = document.createElement('p')
            let urununFiyati = urun.fiyat * urun.quantity
            price.textContent = urununFiyati + '$'
            price.style.fontWeight = 'bold'

            const kacTane = document.createElement('div')
            //? bir şeye ihtiyaç olursa ekleriz
            kacTane.classList.add('d-flex', 'gap-3')

            const sayi = document.createElement('p')
            sayi.textContent = urun.quantity
            sayi.classList.add('mt-3', 'fs-4')

            const azaltBtn = document.createElement('button')
            azaltBtn.textContent = "-"
            azaltBtn.classList.add('btn', 'btn-light')

            const arttirBtn = document.createElement('button')
            arttirBtn.textContent = "+"
            arttirBtn.classList.add('btn', 'btn-light')

            azaltBtn.addEventListener('click', function () {
                if (urun.quantity >= 1) {
                    urun.quantity--
                    sayi.textContent = urun.quantity


                    if (urun.quantity == 0) {
                        // console.log(this.parentElement.parentElement)
                        this.parentElement.parentElement.remove()

                        //! LocalStorage'dan silme
                        let urunIndex = sepet.indexOf(urun)

                        sepet.splice(urunIndex, 1)

                        localStorage.setItem('sepet', JSON.stringify(sepet))
                        //! LocalStorage'dan silme

                    }
                }
            })

            arttirBtn.addEventListener('click', () => {
                urun.quantity++
                sayi.textContent = urun.quantity

                // urun.fiyat += urun.quantity
                // price.textContent = urun.fiyat

            })

            imgDiv.append(img)

            kacTane.append(azaltBtn)
            kacTane.append(sayi)
            kacTane.append(arttirBtn)

            div.append(imgDiv)
            div.append(baslik)
            div.append(price)
            div.append(kacTane)

            container.append(div)

        })

    }

}
// localStorage.clear()