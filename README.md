Animate Frames
==============

Frame animation for JavaScript DOM sprites.

Requires jQuery.

Adds an animateFrames method to jQuery so that elements can be animated with background image sprites with a single call.

Usage
---

1. Create a HTML element e.g. <div id="my_sprite"></div>
2. Create CSS styling e.g.:

<pre>
#my_sprite
{
	position: absolute;
	left: 50px;
	top: 50px;
	width: 100px;
	height: 100px;
}
</pre>

3. Create a spritesheet with animation frames. This can be a horizontal strip of images, a vertical strip, or a grid (e.g. 3 wide by 4 high) which may or may not be fully populated (e.g. 3 wide by 4 high, but only 11 images).

4. Add the call to animate the element:

$('#my_sprite').animateFrames({
	numFrames : 11,
	offset : 'horizontal',
	fps : 60,
	loops : 0
});

Parameters
---

animateFrames accepts an object with settings. These are as follows:

#### numFrames

The number of frames in the animation.

#### offset

Valid values:

- "horizontal" : if the image is a horizontal strip of frames
- "vertical" : if the image is a vertical strip of frames
- {x : N1, y : N2} : if the image is a grid, where N1 and N2 are the number of frames width and height

#### fps

Maximum frames-per-second. Defaults to 60.

#### randomFirstFrame

true or false. If true, the animation starts on a random first frame. This is useful if you have lots of identical objects but you don't want them all animating in the same sequence.

#### loops

How many loops of the animation to play before stopping.

Default value: 0 (or null) = continuous animation

#### callback

A callback function to evaluate once the animation is complete. (Irrelevant if the value of loops is zero.)