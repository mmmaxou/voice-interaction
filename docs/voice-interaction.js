DEBUG = true
//const DEBUG = false

let v = function (selector) {
  let self = {
    links: {},
    hasVoiceDetection: undefined,
    commands: undefined,
    click: document.createEvent("MouseEvents"),
  }
  self.click.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);

  self.init = function () {
    self.detectLinks(selector)
    self.bindLinks()
    self.initAnnyang()
  }
  self.detectLinks = function (selector) {
    let links
    if (!selector) {
      links = document.getElementsByTagName('a')
    } else {
      links = document.querySelector(selector)
    }
    let linksWithTags = Array.from(links).filter(function (link) {
      return !!link.attributes["data-voice"]
    })
    if (linksWithTags.length > 0) {
      self.links = linksWithTags
    } else {
      self.links = null
    }
  }
  self.bindLinks = function () {
    if (!self.links) {
      self.throwWarning();
      return
    }
    self.links.forEach(function (link) {
      let href
      if (link.attributes['href']) {
        href = link.attributes['href'].value
      } else {
        href = null
      }
      self.addLink(link, href)
    })
  }
  self.addLink = function (link, href) {

    let recognizer = link.attributes['data-voice'].value
    let obj = {}
    if (!href) {
      obj[recognizer] = function () {
        link.dispatchEvent(self.click)
      }
    } else {

      obj[recognizer] = function () {
        location.replace(href)
      }
    }
    annyang.addCommands(obj)
  }
  self.initAnnyang = function () {
    if (annyang) {
      // Add our commands to annyang
      annyang.addCallback('resultNoMatch', function (userSaid) {
        console.log("Not found : ", userSaid); // sample output: 'hello'
      });

      // Tell KITT to use annyang
      SpeechKITT.annyang();

      // Define a stylesheet for KITT to use
      SpeechKITT.setStylesheet('https://cdnjs.cloudflare.com/ajax/libs/SpeechKITT/0.3.0/themes/flat-amethyst.css');

      // Render KITT's interface
      SpeechKITT.vroom();
      annyang.start()
      self.hasVoiceDetection = true
    } else {
      self.hasVoiceDetection = false
    }
  }
  self.throwWarning = function () {
    console.warn("Voice Interaction error : ")
    console.warn("There is no link with the <data-voice> tag");
  }


  self.startListening = function () {
    annyang.start()
  }
  self.init()
  return self
}
let Voice

document.addEventListener("DOMContentLoaded", function (event) {
  //do work
  Voice = new v()
});
