'use strict';
var color = '',
attribution = false,
commenting = '',
codeAttribution = '';

function onError(error) {
  console.log(`Error: ${error}`);
}

function onGot(item) {
	console.log(item.commenting);
	if (item.color){ //is color set
		color = item.color;
	}
	else{
		color = '#0D0';
	}
	if (item.attribution){ //is attribution checked
		attribution = true;
		if (item.commenting){ //is commenting set
			commenting = item.commenting;
		}
	}
}

var getting = browser.storage.local.get();
getting.then(onGot, onError);

Array.from(document.getElementsByTagName('pre')) // get all code snippets
.forEach(function (block) {
	
	block.addEventListener('dblclick', function (event) {
		// Reference: http://stackoverflow.com/a/6462980/3485241
		console.log(commenting);
		//gets the address of the current page
		if (attribution){
			codeAttribution = '<br/><br/> ' + commenting + ' source: ' + window.location.toString();
		}
		var copyText = block.innerHTML;
		
		copyText = copyText + codeAttribution;
		//copy old HTML
		var oldHTML = block.innerHTML;
		
		//replace with new HTML
		block.innerHTML = copyText;
		
		// Add snippet to range
		var range = document.createRange();
		range.selectNode(block);
		
		
		// Copy snippet to clipboard
		try {
			window.getSelection().addRange(range);
			document.execCommand('copy');
			window.getSelection().removeAllRanges();
			
			//replace new with old HTML
			block.innerHTML = oldHTML;
			block.style.border = '2px solid '+color;
			setTimeout(function () {
			  return block.style.border = 'none';
			}, 500);
		} catch (err) {
			console.log('Failed to copy', err);
		}
	});
});