export default function injectBody(settings) {
	return `

<div id="prerender-spinner-container" class="temporary-preview">
	<div class="loading">
		<div class="spinner"></div>
	</div>
</div>

<script type="text/javascript" class="temporary-preview">
  // Remove static HTML when Meteor app has fully loaded
	function removePreview() {
    if (window.prerenderReady && $) {
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

  // Retrigger click for pre-defined elements by class name
  function retriggerClick () {
    if (window.prerenderReady) {
      clearInterval(window.retriggerClickWhenReady);
      const elements = document.getElementsByClassName(window.clickedClassName);
      if (elements) {
        elements[0].click();
      }
    }
  }

  const pagePreviewElement = document.getElementById('page-preview');
  if (pagePreviewElement) {
    pagePreviewElement.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      // Build array of class names for elements defined as clickable in static HTML
      const prerenderPaths = ` + JSON.stringify(settings.prerenderPaths) + `;
      const classNames = prerenderPaths['*']; // Global class names
      Object.keys(prerenderPaths).slice(1).forEach(path => {
        if (window.location.pathname.match(path)) {
          prerenderPaths[path].forEach(className => {
            classNames.push(className);
          });
        }
      });

      let wasClickRetriggered = false;
      if (classNames.length) {
        // Search event's path for any elements matching clickable class names
        e.path.forEach(pathElement => {
          if (pathElement.className && !wasClickRetriggered) {
            const elementClasses = pathElement.className.split(' ');
            window.clickedClassName = classNames.find(className => {
              return elementClasses.indexOf(className) !== -1;
            });
            if (window.clickedClassName && !wasClickRetriggered) {
              const spinnerContainer = document.getElementById('prerender-spinner-container');
              spinnerContainer.className += ' visible';
              window.retriggerClickWhenReady = setInterval(retriggerClick, 200);
              wasClickRetriggered = true;
            }
          }
        });
      }

      if (!wasClickRetriggered) {
        const linkInPath = e.path.find(element => {
          return !!element.href;
        });
        if (linkInPath) {
          window.location = linkInPath.href;
        }
      }
    });
  }
</script>
	`;
}
