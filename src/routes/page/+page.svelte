<script>
	import {tweened} from 'svelte/motion';
	
	let colorIndex = 0;
	//const colors = ['ff0000', 'ffff00', '0000ff']; // red, yellow, blue
	const colorsLight = ['FAFAFA', 'F43F5F']; 
  const colorsDark = ['09090B', 'F43F5F'];

	// This converts a decimal number to a two-character hex number.
	const decimalToHex = decimal => Math.round(decimal).toString(16).padStart(2, '0');
	
	// This cycles through the indexes of the colors array.
	const goToNextColor = () => colorIndex = (colorIndex + 1) % colors.length;
	
	// This extracts two hex characters from an "rrggbb" color string
	// and returns the value as a number between 0 and 255.
	const getColor = (hex, index) => parseInt(hex.substring(index, index + 2), 16);
	
	// This gets an array of red, green, and blue values in the range 0 to 255
	// from an "rrggbb" hex color string.
	const getRGBs = hex => [getColor(hex, 0), getColor(hex, 2), getColor(hex, 4)];
	
	// This computes a value that is t% of the way from
	// start to start + delta where t is a number between 0 and 1.
	const scaledValue = (start, delta, t) => start + delta * t;
	
	// This is an interpolate function used by the tweened function.
	function rgbInterpolate(fromColor, toColor) {
		const [fromRed, fromGreen, fromBlue] = getRGBs(fromColor);
		const [toRed, toGreen, toBlue] = getRGBs(toColor);
		const deltaRed = toRed - fromRed;
		const deltaGreen = toGreen - fromGreen;
		const deltaBlue = toBlue - fromBlue;
		
		return t => {
			const red = scaledValue(fromRed, deltaRed, t);
			const green = scaledValue(fromGreen, deltaGreen, t);
			const blue = scaledValue(fromBlue, deltaBlue, t);
			return decimalToHex(red) + decimalToHex(green) + decimalToHex(blue);
		};
	}
	
	// Create a tweened store that holds an "rrggbb" hex color.
	const colorLight = tweened(colorsLight[colorIndex], {duration: 300, interpolate: rgbInterpolate});
	const colorDark = tweened(colorsDark[colorIndex], {duration: 300, interpolate: rgbInterpolate});
	// Trigger tweening if colorIndex changes.
	$: colorLight.set(colorsLight[colorIndex]);
	$: colorDark.set(colorsDark[colorIndex]);
</script>

<svelte:head>
  <meta name="theme-color" content="#{$colorLight}" media="(prefers-color-scheme: light)"/>
  <meta name="theme-color" content="#{$colorDark}" media="(prefers-color-scheme: dark)"/>
</svelte:head>

<button class="mt-24" on:click={goToNextColor}>Next</button>
<span>color = {$color}</span>
<h1 style="color: #{$color}">Tweened Color</h1>