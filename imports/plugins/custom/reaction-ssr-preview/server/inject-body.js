export default function injectBody(settings) {
	return `
<script type="text/javascript" class="temporary-preview">
	function removePreview() {
    if (window.prerenderReady) {
      clearInterval(window.clearPreviewWhenReady);
      $('.temporary-preview').remove();
    }
	}

	const observer = new MutationObserver(function (mutations) {
		for(var i = 0; i < mutations.length; i++) {
			for(var i2 = 0; i2 < mutations[i].addedNodes.length; i2++) {
				if(mutations[i].addedNodes[i2].id === 'react-root') {
					window.clearPreviewWhenReady = setInterval(removePreview, ` + 200 + `);
					observer.disconnect();
					return;
				}
			}
		}

	})

	observer.observe(document.body, { childList: true, subtree: false })

</script>
	`;
}
