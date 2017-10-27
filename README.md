# Voice-Interaction

Interact with your website using your voice

## Status: development

## Example

* Link the library to your app
<script src="/libs/voice-interaction.js"></script>

* Add the tags \[data-voice=`"<what-to-say>"`\] to your links `<a>`
`<ul>
	<li>
    <a href="page-1" data-voice="page one">Page 1</a>
    <a href="page-2" data-voice="page two">Page 2</a>
    <a href="page-3" data-voice="page three">Page 3</a>
  </li>
</ul>`
`<button onclick="Voice.startListening()">Start listening</button>`


## Installation

`npm install voice-interaction`