const button = (text='', classes='', id=undefined, onClick=undefined) => {
	const button = document.createElement('button');
	button.innerHTML = text;
	button.id = id;
	button.className = `dom-hud-btn ${classes}`;
	button.addEventListener('click', onClick);
	return button;
  // return `<button class="dom-hud-btn ${classes}" id="${id}" onClick="${onClick}">${before}${text}${after}</button>`;
}

const onClickSlideDown = () => {
  var header = document.getElementById('dom-hud-header');
  if (header.className.indexOf('slide-down') != -1) {
    header.className = header.className.substring(0, header.className.indexOf(' slide-down'));
    header.className += ' slide-up';
  } else {
    if (header.className.indexOf('slide-up') != -1) {
      header.className = header.className.substring(0, header.className.indexOf(' slide-up'));
    }
    header.className += ' slide-down';
  }

  var button = document.getElementById('dropDownButton');
  if (button.className.indexOf('slide-down') != -1) {
    button.className = button.className.substring(0, button.className.indexOf(' slide-down'));
    button.className += ' slide-up';
  } else {
    if (button.className.indexOf('slide-up') != -1) {
      button.className = button.className.substring(0, button.className.indexOf(' slide-up'));
    }
    button.className += ' slide-down';
  }
}
 
const renderHud = () => {
  const header = document.createElement('div');
  header.className = "dom-hud-header";
  header.id = "dom-hud-header";

  const start = button('Start');
  const stop = button('Stop');
  const record = button('Record');

  const dropDown = button('DOMReplay', 'dom-hud-dropDown', 'dropDownButton', onClickSlideDown);

  header.appendChild(start);
  header.appendChild(stop);
  header.appendChild(record);
  document.getElementsByTagName('body')[0].appendChild(header);
  document.getElementsByTagName('body')[0].appendChild(dropDown);
}

export default renderHud;
