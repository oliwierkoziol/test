function drukuj() {
}

function createSelect(options) {
	let form = document.createElement('form');
	let select = document.createElement('select');
	for (const [key, value] of Object.entries(options)) {
		let option = document.createElement('option');
		option.setAttribute('value', key);
		option.innerText = value;

		select.appendChild(option);
	}
	select.addEventListener('change', (e) => {
		this.location = select.value;
	});

	let body = document.querySelector('body');
	form.appendChild(select);
	body.appendChild(form);
	body.prepend(form);
}

document.addEventListener('DOMContentLoaded', (event) => {
//	document.querySelectorAll('style, link[rel="stylesheet"], td.op').forEach(element => element.parentNode.removeChild(element));
	document.querySelectorAll('style, td.op').forEach(element => element.parentNode.removeChild(element));
	document.querySelectorAll('div[align="center"]').forEach(element => element.removeAttribute('align'));
	document.querySelectorAll('table').forEach(table => table.removeAttribute('cellpadding') || table.removeAttribute('cellspacing'));
	document.querySelectorAll('[style]').forEach(element => element.removeAttribute('style'));

	document.querySelectorAll('a.n').forEach(element => element.classList.add('n-'+element.innerText.trim().toLowerCase()));
	document.querySelectorAll('a.s').forEach(element => element.classList.add('s-'+element.innerText.trim().toLowerCase().replaceAll(" ", "")));
	document.querySelectorAll('span.p').forEach(element => {
		let className = element.innerText.trim().toLowerCase().replaceAll(' ', '');
		if (className.indexOf('-') > 0) {
			className = className.substring(0, className.indexOf('-'));
		}
		element.classList.add('p-'+className.replaceAll('.', '-'))
	});
	let lastLink = Array.from(document.querySelectorAll('a')).pop().parentNode;
	lastLink.parentNode.removeChild(lastLink);

	let title = document.querySelector('td.tytul');
	let newCaption = document.createElement('caption');
	newCaption.innerText = title.innerText;

	document.querySelector('table').remove();
	document.querySelector('table').appendChild(newCaption);

	fetch('../scripts/plans.json').then(j => j.json()).then(createSelect);
});

