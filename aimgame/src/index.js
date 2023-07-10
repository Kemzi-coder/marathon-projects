import './scss/index.scss'
import 'core-js/stable'
import 'regenerator-runtime/runtime'

// Variables

const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#FFF5FD', '#FF96AD', '#005A8D', '#022E57', '#FB9300', '#FF449F', '#00EAD3', '#FFF5B7']
let time = 0
let score = 0
let colorIndex = 0

// Start button click listener

startBtn.addEventListener('click', event => {
	event.preventDefault()
	screens[0].classList.add('up')
})

// Game time choosing

timeList.addEventListener('click', event => {
	if (event.target.classList.contains('time-btn')) {
		time = parseInt(event.target.getAttribute('data-time'))
		screens[1].classList.add('up')
		startGame()
	}
})

// Board click listener

board.addEventListener('click', event => {
	if (event.target.classList.contains('circle')) {
		score++
		event.target.remove()
		if (colorIndex === colors.length - 1) {
			colorIndex = 0
		} else {
			colorIndex++
		}
		createRandomCircle()
	}
})

// Game start function

function startGame() {
	setInterval(decreaseTime, 1000)
	createRandomCircle()
	setTime(time)
}

// Time deacreasing function  

function decreaseTime() {
	if (time === 0) {
		finishGame()
	} else {
		let current = --time
		if (current < 10) {
			current = `0${current}`
		}
		setTime(current)
	}
}

function setTime(value) {
	timeEl.innerHTML = `00:${value}`
}

// Finish game

function finishGame() {
	timeEl.parentNode.classList.add('hide')
	board.innerHTML = `<h1>Score: <span class="primary">${score}</span></h1>`
}

// Random circle creating

function createRandomCircle() {
	const circle = document.createElement('div')
	const size = getRandomNumber(10, 60)
	const {width, height} = board.getBoundingClientRect()
	const x = getRandomNumber(0, width - size)
	const y = getRandomNumber(0, height - size)

	circle.classList.add('circle')
	circle.style.width = `${size}px`
	circle.style.height = `${size}px`
	circle.style.top = `${y}px`
	circle.style.left = `${x}px`
	circle.style.background = `${colors[colorIndex]}`


	board.append(circle)
}

// Random number function

function getRandomNumber(min, max) {
	return Math.round(Math.random() * (max - min) + min)
}