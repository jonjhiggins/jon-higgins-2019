---
date: 2015-09-01T00:00:00.000Z
title: Land Rover interactive stories
description: 'Provide immersive, magazine-style articles for global premium brand.'
heroVideos:
  - interactive-story-video-short
heroVideoAutoPlay: true
contentUrl: 'http://www.landrover.co.uk/above-and-beyond/featured-articles/index.html'
archive: false
hide: false
category: work
---

## The problem

Land Rover's design agency [OgilvyOne](https://www.ogilvyone.com/) produced a concept video demonstrating immersive, magazine-style articles on the web.

Our Agile team was tasked with developing the concept into a set of fully-functional, responsive components that were authorable via CMS. As the concept was created in After Effects we were unsure all of the concept's effects were possible on the web.

## The solution

To achieve the effects we sketched out different solutions in code and iterated with the designers to find a balance between interactivity/motion and performance.

<p data-pullquote="We iterated to find a balance between interactivity and performance" markdown="1">We worked with new / experimental technologies, such as <a href="https://developer.mozilla.org/en/docs/Web/CSS/clip-path">clip-path</a> and <a href="https://developer.mozilla.org/en-US/docs/Web/Events/devicemotion">accelerometer</a>, as such we were always considering fallbacks - using a tiered approach to support basic and advanced devices/browsers. Performance was a major concern due to the combination of effects and the number of interactive components that could be on the same page. We kept an eye on the FPS monitor, refactoring as required - in particular compositing layers and avoiding re-draws.</p>

Creative solutions were sometimes required to get the best performance. On hovering the gallery component, images were slowly scaled, their opacity was adjusted and their borders grew via clip-path. Firefox and Safari couldn't cope with this combination of effects, after much experimentation we found they could animate clipPaths of SVGs smoothly, so we re-wrote the whole component to nest the images within SVGs!
