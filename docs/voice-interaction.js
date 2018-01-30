const DEBUG = true
var VoiceInteraction = function (selector) {
  var self = {
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

    /*
    Gather all the links that has data-voice attr 
    */    
    let linksWithTags = Array.from(links).filter(function (link) {
      return !!link.attributes["data-voice"]
    })
    if (linksWithTags.length > 0) {
      self.links = linksWithTags
    } else {
      self.links = null
    }
    
    /*
    Gather all the links that has data-voice attr 
    */    
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
    obj["(click on)" +  recognizer] = function () {
      link.dispatchEvent(self.click)
    }
    annyang.addCommands(obj)
  }
  self.initAnnyang = function () {
    if (annyang) {
      // Add our commands to annyang
      annyang.addCallback('resultNoMatch', function (userSaid) {
        console.log("Not found : ", userSaid); // sample output: 'hello'
        SpeechKITT.setSampleCommands(["Sorry I don't understand this"])
      });
      SpeechKITT.setStylesheet('//cdnjs.cloudflare.com/ajax/libs/SpeechKITT/1.0.0/themes/flat-emerald.css');
      SpeechKITT.setInstructionsText("Try to say : 'Page One'")
      SpeechKITT.displayRecognizedSentence(true)
      SpeechKITT.annyang();
      SpeechKITT.vroom();
      annyang.start()
      self.hasVoiceDetection = true
    } else {
      self.hasVoiceDetection = false
      alert("Your browser can't use annyand, please use chrome.")
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

export default VoiceInteraction