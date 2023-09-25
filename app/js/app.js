
document.addEventListener('DOMContentLoaded', () => {

	/** (Start) Показываем/Скрываем Кнопку Play и атрибут controls **/
	const videoWrappers = document.querySelectorAll('.block-video-wrapper');

	videoWrappers.forEach(wrapper => {
		const video = wrapper.querySelector('video');
		const playIcon = wrapper.querySelector('.icon-video-play');

		video.addEventListener('play', () => {
			playIcon.classList.add('hide');
			video.setAttribute('controls', '');
		});

		video.addEventListener('pause', () => {
			playIcon.classList.remove('hide');
			video.removeAttribute('controls');
		});
	});
	/** (End) Показываем/Скрываем Кнопку Play и атрибут controls **/

	/** (Start) Динамическая ширина Input Quantity **/
	const inputQuantities = document.querySelectorAll('.quantity-current');

	inputQuantities.forEach(inputQuantity => {
		inputQuantity.addEventListener('input', () => {
			const value = inputQuantity.value;
			let length = value.length;
			let width = length + 'ch';

			inputQuantity.style.width = width;
		});
	});
	/** (End) Динамическая ширина Input Quantity **/


	/** (Start) Quiz Slick **/
	$('.quiz-slick').slick({
		swipe: false,
		fade: true,
		dots: false,
		infinite: false,
		speed: 300,
		slidesToShow: 1,
		adaptiveHeight: true,
		appendArrows: '.quiz-slick-buttons',
		prevArrow: '<button class="btn btn-outline btn-quiz slick-prev" type="button">Назад</button>',
		nextArrow: '<button class="btn btn-primary btn-quiz slick-next" type="button">Далее</button>',
	});

	$(document).ready(function () {
		var totalSlides = $('.quiz-slick').slick('getSlick').slideCount - 1;

		for (var i = 0; i < totalSlides; i++) {
			var listItem = $('<li>').addClass(i === 0 ? 'active' : '');
			var currentStep = $('<span>').addClass('quiz-header-current').text('Шаг');
			var totalSteps = $('<span>').addClass('quiz-header-total').text('из ').append($('<span>'));

			listItem.append(currentStep, totalSteps);
			$('.quiz-header').append(listItem);
		}

		$('.quiz-header-total span').text(totalSlides);
	});

	$('.quiz-slick').on('init', function (event, slick) {
		const activeSlideIndex = slick.currentSlide;
		$('.quiz-header li').eq(activeSlideIndex).addClass('active');
	});

	$('.quiz-slick').on('afterChange', function (event, slick, currentSlide) {
		$('.quiz-header li').removeClass('active accent');
		$('.quiz-header li').eq(currentSlide).addClass('active');
		$('.quiz-header li').eq(currentSlide).prevAll().addClass('accent');

		if ($('.quiz-slick .quiz-slide-thx').hasClass('slick-current')) {
			$('.btn-quiz-thx').removeClass('hide');
			$('.quiz-header').addClass('hide');
		} else {
			$('.btn-quiz-thx').addClass('hide');
			$('.quiz-header').removeClass('hide');
		}
	});
	/** (End) Quiz Slick **/


})
