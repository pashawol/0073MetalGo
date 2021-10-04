let div = document.createElement('div');

div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px';

// мы должны вставить элемент в документ, иначе размеры будут равны 0
document.body.append(div);

let scrollWidth = div.offsetWidth - div.clientWidth;
let root = document.documentElement;
root.style.setProperty('--spacing-end', scrollWidth + 'px');
div.remove();
const JSCCommon = {
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	toggleMenu() {
		const toggle = this.btnToggleMenuMobile;
		const menu = this.menuMobile;
		document.addEventListener("click", function (event) {
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed")); 
		}, { passive: true });
	},
	closeMenu() {
		let menu = this.menuMobile;
		if (!menu) return;
		if (menu.classList.contains("active")) {
			this.btnToggleMenuMobile.forEach(element => element.classList.remove("on"));
			this.menuMobile.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed")); 
		}

	},
	mobileMenu() {
		if (!this.menuMobileLink) return;
		this.toggleMenu();
		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)
			let link = event.target.closest(".menu-mobile .menu a"); // (1)
			let toggle = event.target.closest('.toggle-menu-mobile--js.on'); // (1)
			if (!container && !toggle) this.closeMenu();
		}, { passive: true });

		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 1200px)").matches) this.closeMenu();
		}, { passive: true });
	},
	// /mobileMenu
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
};
//const $ = jQuery;

function eventHandler() {
	JSCCommon.mobileMenu();
	JSCCommon.heightwindow();

	var x = window.location.host;
	let screenName;
	screenName = document.body.dataset.bg;
	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}
	// modal window
	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}

	const swiper4 = new Swiper('.sBanners__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,

	});

	//luckyoneJs
	let header = document.querySelector(".header--js");
	let headerH = 0;
	let stickyElems = document.querySelectorAll('.sticky-js');
	let stickyArr = [];
	for (let el of stickyElems){
		let Sticky = new hcSticky(el, {
			stickTo: '#sSearchContent',
			top: 20 + header.offsetHeight,
		});

		stickyArr.push(Sticky);
	}

	function calcCssVars() {
		document.documentElement.style.setProperty('--header-h', `${header.offsetHeight}px`);
		window.matchMedia("(min-width: 1200px)").matches ?
			headerH = 0:
			headerH = header.offsetHeight;

		for (let Sticky of stickyArr){
			Sticky.update({
				top: 20 + headerH,
			});
		}
	}
	if (header) {
		window.addEventListener('resize', calcCssVars, {passive: true});
		window.addEventListener('scroll', calcCssVars, {passive: true});
		calcCssVars();
	}

	//-
	let lcBtns = document.querySelectorAll('.lc--js')
	for (let lcBtn of lcBtns){
		lcBtn.addEventListener('click', function (){
			this.classList.toggle('active');
		});
	}
	document.addEventListener('click', function (){
		if (!event.target.closest('.lc--js')){
			for (let lcBtn of lcBtns){
				lcBtn.classList.remove('active');
			}
		}
	})
	//
	let params = document.querySelectorAll('.parameters-js');
	let sSearchFilters = document.querySelector('.params--js');
	for (let item of params){
		item.addEventListener('click', function (){
			sSearchFilters.classList.toggle('active');
		})
	}
	//
	let currYears = document.querySelectorAll('.set-curr-year-js');
	for (let item of currYears){
		item.innerHTML = new Date().getFullYear();
	}

	//cusrom read more
	let readMoreConts = document.querySelectorAll('.rm-cont-js');
	for (let cont of readMoreConts){
		let btn = cont.querySelector('.rm-btn-js');

		btn.addEventListener('click', function (){
			this.classList.toggle('active');
			let hidden = cont.querySelector('.rm-hidden-js');

			slideToggle(hidden);
		});
	}
	//.scroll-top--js
	let scrollBtn = document.querySelector('.scroll-top--js');
	scrollBtn.addEventListener('click', function (){

		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	});

	document.addEventListener('scroll', function () {
		let scrollTop = window.scrollY;
		let footer = document.querySelector('.footer--js');
		let footerTop = footer.getBoundingClientRect().top + scrollTop;

		if (window.scrollY > vh(50)  && footerTop > window.scrollY + vh(100)){
			scrollBtn.classList.add('active');
		}
		else{
			scrollBtn.classList.remove('active');
		}
	});

	function vh(v) {
		var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		return (v * h) / 100;
	}
	//-
	let headerBlockSlider = new Swiper('.headerBlock-slide-js', {
		slidesPerView: 'auto',
		spaceBetween: 20,

		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
	});
	//chartjs
	const labels = [];
	//put dates here
	for (var i = 0; i < 30; i++){
		labels[i] = `${i+1} ноября 2020 г.`;
	}

	//
	const data = {
		labels: labels,
		datasets: [{
			label: ' посещений',
			backgroundColor: '#EDB021',
			hoverBackgroundColor: '#848484',
			//put visitors amount here
			data: [80, 177, 117, 215, 227, 233, 180, 197, 180, 184, 203, 215, 245, 270, 258, 264, 209, 221, 161, 239, 203, 259, 270, 294, 301, 252, 264, 288, 251, 270],
			pointStyle: 'circle',
			pointRadius: 1,
		}]
	};
	const config = {
		type: 'bar',
		data: data,
		options: {
			responsive: true,
			maintainAspectRatio: false,

			//disable grid
			scales: {
				x: {
					display: false,
				},
				y: {
					display: false,
				},
			},
			//
			plugins: {
				legend: {
					display: false,
				},
				tooltip: {
					cornerRadius: 3,
					usePointStyle: true,
					boxWidth: 4,
					boxHeight: 4,

					caretSize: 8,
					caretPadding: 5,

					backgroundColor: 'rgba(0,0,0, 0.75)',
					padding:{
						x: 10,
						y: 8,
					},

					titleMarginBottom: 4,

					xAlign: 'center',
					yAlign: 'bottom',
				},
			},

		},
	};

	//-
	let visitCharts = document.querySelectorAll('.visit-chart-js');
	for (let chart of visitCharts){
		let myChart = new Chart(
			chart,
			config
		);
	}

	//-
	let sTarifSlider = new Swiper('.sTarif-slider-js', {
		slidesPerView: 'auto',
		spaceBetween: 20,
		loop: true,

		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
	});
	//end luckyoneJs

};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}
