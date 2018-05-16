export default function injectHead() {
	return `
<style type="text/css" class="temporary-preview">
	#page-preview {
		position:absolute;
		top:0;
		left:0;
		right:0;
		z-index:0;
	}
	#react-root {
		position:absolute;
		top:-1px;
		left:-1px;
		width:1px;
    height:1px;
		z-index:2;
	}
  #prerender-spinner-container {
    display: none;
	  position:fixed;
	  left:0;
	  right:0;
	  top:0;
	  bottom:0;
	  background: #ffffff88;
	  z-index: 1;
	}
  #prerender-spinner-container.visible {
    display: block;
  }
	#prerender-spinner-container .loading {
	  width: 100%;
	  margin: 0 auto;
	  position: absolute;
	  top: 40%;
	}
	#prerender-spinner-container .spinner {
	  margin: 0 auto;
	  width: 44px;
	  height: 44px;
	  border-width: 2px 2px 2px 2px;
	  border-color: black black transparent transparent;
	  border-style: solid;
	  border-radius: 22px;
	  animation-name: spinToWin;
	  animation-duration: 600ms;
	  animation-iteration-count: infinite;
	  animation-timing-function: linear;
	}
	@keyframes spinToWin {
	  0% { transform: rotate(0deg); }
	  100% { transform: rotate(360deg); }
	}
</style>
`;
}
