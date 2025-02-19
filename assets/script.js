class Game {
   setFace(element, arrayImg) {
      let idx = Math.abs(attempts - 2),
         face = arrayImg[idx]

      element.querySelector(
         '.face'
      ).style.backgroundImage = `url('/3cards/assets/${face}.jpg')`
   }

   clicked() {
      if (document.body.classList.contains('unclickable')) return

      document.body.classList.add('unclickable')

      Game.prototype.setFace(this, results)
      this.classList.remove('turned')
      this.style.cursor = 'default'

      document.querySelector('.fd').classList.remove('hide')

      if (attempts > 0) {
         button.addEventListener('click', startGame)
         button.addEventListener('touchend', startGame)
         button.innerText = 'Tentar de novo'
      } else {
         document.querySelector('.df').classList.remove('hide')
         button.removeEventListener('click', startGame)
         button.removeEventListener('touchend', startGame)
         button.innerText = 'Você falhou'
      }

      let cards = document.querySelectorAll('.turned')

      setTimeout(
         function () {
            if (Math.random() > 0.5) {
               this.setFace(cards[1], results)
               this.setFace(cards[0], diffTelo)
            } else {
               this.setFace(cards[0], results)
               this.setFace(cards[1], diffTelo)
            }

            for (let card of cards) {
               card.classList.remove('turned')
               card.style.cursor = 'default'
            }
         }.bind(Game.prototype),
         888
      )
   }

   activeClick() {
      document.body.classList.remove('unclickable')

      for (let card of document.querySelectorAll('.turned')) {
         card.style.cursor = 'pointer'
         card.addEventListener('click', Game.prototype.clicked.bind(card))
         card.addEventListener('touchend', Game.prototype.clicked.bind(card))
      }
   }

   constructor() {
      button.removeEventListener('click', startGame)
      button.removeEventListener('touchend', startGame)

      let timer = 850,
         firstTimer = attempts < 3 ? timer : 0,
         cards = document.querySelectorAll('.card')

      for (let card of cards) {
         card.classList.add('turned')
      }

      button.innerText =
         attempts == 1 ? attempts + ' tentativa' : attempts + ' tentativas'

      setTimeout(
         function (e) {
            this.setFace(cards[0], sameTelo)
            cards[0].classList.remove('turned')
         }.bind(this),
         firstTimer
      )

      setTimeout(
         function (e) {
            this.setFace(cards[2], sameTelo)
            cards[2].classList.remove('turned')
         }.bind(this),
         timer
      )

      setTimeout(
         function (e) {
            this.setFace(cards[1], diffTelo)
            cards[1].classList.remove('turned')
         }.bind(this),
         timer * 2
      )

      setTimeout(function (e) {
         cards[0].classList.add('turned')
         cards[1].classList.add('turned')
         cards[2].classList.add('turned')
      }, timer * 4)

      setTimeout(function (e) {
         document.body.classList.add('shuffle')
      }, timer * 4.1)

      setTimeout(
         function (e) {
            document.body.classList.remove('shuffle')
            this.activeClick()
         }.bind(this),
         timer * 4.1 + 8000
      )

      attempts--
   }
}

// ================= GLOBAL ===================

const button = document.querySelector('#start'),
   sameTelo = [
      'micheltelo - 6Sr_ypRyB4',
      'micheltelo - BISWKAvA_EW',
      'micheltelo - v9TQ6wRyMS',
   ],
   diffTelo = [
      'micheltelo - BcVuYAwhq6Q',
      'micheltelo - nUJ0dBxyM4',
      'micheltelo - m26p8',
   ],
   results = [
      'filipedeschamps - B0KI5l8g34e',
      'filipedeschamps - thumb',
      'dieegosf - BGEpMUrHnCt',
   ]
let attempts = 3

function setCardsHeight() {
   let cards = document.querySelectorAll('.card'),
      height = cards[0].offsetWidth * 1.587659 + 'px'

   for (let card of cards) {
      card.style.height = height
   }
}

function startGame() {
   new Game()
}

function preload(image) {
   let preloadLink = document.createElement('link')
   preloadLink.href = `/3cards/assets/${image}.jpg`
   preloadLink.rel = 'preload'
   preloadLink.as = 'image'
   document.head.appendChild(preloadLink)
}

// =================== READY ===================

document.addEventListener('DOMContentLoaded', function (e) {
   let allimgs = sameTelo.concat(diffTelo, results)

   for (let image of allimgs) {
      preload(image)
   }

   let monte = document.querySelector('#monte')

   monte.innerHTML = ''

   for (let i = 1; i <= 3; i++) {
      monte.innerHTML += `<div class="card card${i} turned"><div class="flip"><div class="front"><div class="face"></div></div><div class="back"></div></div></div>`
   }

   setCardsHeight()
})

addEventListener('load', function (e) {
   button.innerText = 'Começar'
   button.addEventListener('click', startGame)
   button.addEventListener('touchend', startGame)
})

addEventListener('resize', function (e) {
   setCardsHeight()
})
