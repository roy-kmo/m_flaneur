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
</style>
`;
}
