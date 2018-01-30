# Voice-Interaction

Interact with your website using your voice

Status: <b>Development</b>

### Installation

```
npm install --save voice-interaction
```

### Example

Link the library to your app
```
<script src="voice-interaction.js"></script>
```

Add Annyang and SpeechKITT
( This library is using annyang in order to detect and recognize patterns in your speach )
```
<script src="https://cdnjs.cloudflare.com/ajax/libs/annyang/2.6.0/annyang.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/SpeechKITT/0.3.0/speechkitt.min.js"></script>
```
https://www.talater.com/annyang/

Add the tags \[data-voice=`"<what-to-say>"`\] to your links `<a>`
```
<ul>
	<li>
    <a href="page-1" data-voice="page one">Page 1</a>
    <a href="page-2" data-voice="page two">Page 2</a>
    <a href="page-3" data-voice="page three">Page 3</a>
  </li>
</ul>
```

Then start the library

```
import VoiceInteraction from './docs/voice-interaction.js'

document.addEventListener("DOMContentLoaded", function (event) {
  var Voice = new VoiceInteraction()
})
```
You can also specify a CSS selector to only use VoiceInteraction on a part of the DOM
```
var Voice = new VoiceInteraction( "#my-content" )
```