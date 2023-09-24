// // Import vendor jQuery plugin example
// import '~/app/libs/mmenu/dist/mmenu.js'

document.addEventListener('DOMContentLoaded', () => {

	// Получаем все обертки видео
	const videoWrappers = document.querySelectorAll('.block-video-wrapper');

	// Перебираем каждую обертку видео
	videoWrappers.forEach(wrapper => {
		// Получаем видео и span элементы внутри текущей обертки
		const video = wrapper.querySelector('video');
		const playIcon = wrapper.querySelector('.icon-video-play');

		// Добавляем обработчик события 'play' для видео
		video.addEventListener('play', () => {
			// Скрываем span с классом 'icon-video-play'
			playIcon.classList.add('hide');
			video.setAttribute('controls', '');
		});

		// Добавляем обработчик события 'pause' для видео
		video.addEventListener('pause', () => {
			// Отображаем span с классом 'icon-video-play'
			playIcon.classList.remove('hide');
			video.removeAttribute('controls');
		});
	});


})
