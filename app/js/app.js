// // Import vendor jQuery plugin example
// import '~/app/js/jquery-3.7.1.min.js'

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


})
