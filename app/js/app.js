
document.addEventListener('DOMContentLoaded', () => {

	/** (Start) Правильно загружаем видео с Youtube **/
	var videoWrappers = document.querySelectorAll('.block-video-wrapper');

	videoWrappers.forEach(function (videoWrap) {
		videoWrap.addEventListener('click', function () {
			if (videoWrap.classList.contains('ready')) {
				return;
			}
			videoWrap.classList.add('ready');
			var videoSrc = videoWrap.dataset.videoSrc + '?mute=1&autoplay=1';
			var iframe = document.createElement('iframe');
			iframe.src = videoSrc;
			iframe.title = 'YouTube video player';
			iframe.frameborder = '0';
			iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
			iframe.allowfullscreen = true;
			videoWrap.appendChild(iframe);
			var icon = videoWrap.querySelector('.icon');
			var poster = videoWrap.querySelector('.block-video-poster');
			if (icon && poster) {
				icon.remove();
				poster.remove();
			}
		});
	});
	/** (End) Правильно загружаем видео с Youtube **/

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
	var quizSlick = $('.quiz-slick').slick({
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

	// Создание экземпляра MutationObserver
	var observerQuizSlick = new MutationObserver(function () {
		// Обновление высоты слайдера
		quizSlick.slick("setPosition");
	});

	// Настройка наблюдения за изменениями в DOM-структуре
	var targetNodeQuiz = document.querySelector('.quiz-slick');
	var configQuiz = { childList: true, subtree: true };
	observerQuizSlick.observe(targetNodeQuiz, configQuiz);

	$(function () {
		var totalSlides = $('.quiz-slick').slick('getSlick').slideCount - 1;

		for (var i = 0; i < totalSlides; i++) {
			var listItem = $('<li>').addClass(i === 0 ? 'active' : '');
			var currentStep = $('<span>').addClass('quiz-header-current').text('Шаг');
			var totalSteps = $('<span>').addClass('quiz-header-total').text('из ').append($('<span>'));

			listItem.append(currentStep, totalSteps);
			$('.quiz-header').append(listItem);
		}

		$('.quiz-header-total span').text(totalSlides);

		$('.btn-quiz').on('click', function () {
			var headerOffset = $('.quiz-header').offset().top - 64;
			$('html, body').animate({
				scrollTop: headerOffset
			}, 500);
		});


		// Добавляем invalid к кнопке .slick-next
		var slickNextButton = $('<button>', {
			class: 'btn btn-primary btn-quiz btn-quiz--invalid',
			text: 'Далее'
		});
		var blockInvalid = $('<div class="block-invalid">Пожалуйста, выберите хотя бы один вариант</div>');
		var blockInvalidAdded = false;
		$('.quiz .slick-next').addClass('slick-disabled')
		$('.quiz-slick-buttons').append(slickNextButton);

		// Проверяем значения input на каждом слайде
		$('.quiz-slick').on('afterChange', function (event, slick, currentSlide) {
			var totalSlides = slick.slideCount;
			var slide = $('.quiz-slick .slick-slide[data-slick-index="' + currentSlide + '"]');

			// Проверяем, есть ли класс .slide-checked на текущем слайде
			if (slide.hasClass('slide-checked')) {
				var inputs = slide.find('input');

				// Проверяем, выбран ли какой-то из input или имеет значение выше 0
				var hasValue = false;
				inputs.each(function () {
					if ($(this).is(':checked') || parseInt($(this).val()) > 0) {
						hasValue = true;
						return false; // Прерываем цикл, если найдено значение
					}
				});

				// Если условие выполняется, убираем invalid у кнопки .slick-next
				if (hasValue) {
					$('.quiz .slick-next').removeClass('slick-disabled')
					$('.quiz-slick-buttons .btn-quiz--invalid').detach();

					// Удаляем класс "invalid" с обертки input с классом "checkbox-item" или "quiz-product"
					$('.quiz-slick .slide-checked .checkbox-item, .quiz-slick .slide-checked .quiz-product').removeClass('invalid');
					$('.quiz-slick .block-invalid').detach();
					blockInvalidAdded = false;
				} else {
					$('.quiz .slick-next').addClass('slick-disabled')
					$('.quiz-slick-buttons').append(slickNextButton);
				}
			} else {
				$('.quiz .slick-next').removeClass('slick-disabled')
				$('.quiz-slick-buttons .btn-quiz--invalid').detach();
			}

			if (!(currentSlide === totalSlides - 1) === false) {
				$('.quiz .slick-next').addClass('slick-disabled')
			}
		});

		// Обработчик изменения значений input
		$('.quiz-slick .slide-checked input').on('change', function () {
			var currentSlide = $('.quiz-slick').slick('slickCurrentSlide');
			var slide = $('.quiz-slick .slick-slide[data-slick-index="' + currentSlide + '"]');

			// Проверяем, есть ли класс .slide-checked на текущем слайде
			if (slide.hasClass('slide-checked')) {
				var inputs = slide.find('input');

				// Проверяем, выбран ли какой-то из input или имеет значение выше 0
				var hasValue = false;
				inputs.each(function () {
					if ($(this).is(':checked') || parseInt($(this).val()) > 0) {
						hasValue = true;
						return false; // Прерываем цикл, если найдено значение
					}
				});

				// Если условие выполняется, убираем invalid у кнопки .slick-next
				if (hasValue) {
					$('.quiz .slick-next').removeClass('slick-disabled')
					$('.quiz-slick-buttons .btn-quiz--invalid').detach();

					// Удаляем класс "invalid" с обертки input с классом "checkbox-item" или "quiz-product"
					$('.quiz-slick .slide-checked .checkbox-item, .quiz-slick .slide-checked .quiz-product').removeClass('invalid');
					$('.quiz-slick .block-invalid').detach();
					blockInvalidAdded = false;
				} else {
					$('.quiz .slick-next').addClass('slick-disabled')
					$('.quiz-slick-buttons').append(slickNextButton);
				}
			}
		});

		$('.quiz .slick-next').on('click', function () {
			if (!$(this).hasClass('slick-disabled')) {
				$('.quiz-slick').slick('slickNext');
				$(this).addClass('slick-disabled')
				$('.quiz-slick-buttons').append(slickNextButton);

				// Удаляем класс "invalid" с обертки input с классом "checkbox-item" или "quiz-product"
				$('.quiz-slick .slide-checked .checkbox-item, .quiz-slick .slide-checked .quiz-product').removeClass('invalid');
				$('.quiz-slick .block-invalid').detach();
				blockInvalidAdded = false;
			}
		});

		$('.quiz .btn-quiz--invalid').on('click', function () {
			// Добавляем класс "invalid" к обертке input с классом "checkbox-item" или "quiz-product"
			$('.quiz-slick .slide-checked .checkbox-item, .quiz-slick .slide-checked .quiz-product').addClass('invalid');
			if (!blockInvalidAdded) {
				$('.quiz-slick').append(blockInvalid);
				blockInvalidAdded = true;
			}
		});

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
