---
layout: work-item
category: work
title: VR Visual Remix
class: vr-visual-remix
date: 2018-09-22
contentUrl: https://github.com/jonjhiggins/vr-remix
description: Oculus Go experience built in Unity and C# during Academy XI Virtual Reality Design course
heroVideos: [virtual-reality-remix]
archive: false
---

This project was something quite different to any web-based work I’ve previously done. I’ve included it as the web will increasingly move to extended-reality media and its an area I’m very interested in exploring. It was also my first project using [Unity](https://unity.com/) and [C#](https://en.wikipedia.org/wiki/C_Sharp_(programming_language)) &ndash; I enjoyed using both.

In July 2018 I took part in the [Academy XI](https://academyxi.com/) Virtual Reality Design course that ran for 11 weeks in Melbourne, Australia. I signed up for the course as I wanted to properly get to grips with a non-web-based medium and to do something creative. I hardly had any experience working with VR but I was intrigued as it is often touted as the [next big thing](https://medium.com/vr-first/a-summary-of-augmented-reality-and-virtual-reality-market-size-predictions-4b51ea5e2509), also it looked like it allowed for much more immersive audio-visual experiences than the web can currently offer. 

As part of the course we learnt VR/AR design principles, tried out some great VR experiences and learnt to design and build our own VR experiences using Unity and C#. The culmination of this was a final project we designed and built ourselves during the second half of the course, which we presented in a live demo on the final day.

## Design brief and ideas

The brief for our final project was totally open &ndash; it just needed to be a VR experience of some kind. I saw this as a great chance to explore the interaction between music, movement and visuals as going out and listening to electronic music &ndash; a blend of music, movement and visuals &ndash; is something I’ve loved for years. It was also great fun researching and designing a visual aesthetic that appealed to me &ndash; not something you often get a chance to do.

## Developing the idea and visual aesthetic 

While I roughly knew the areas I wanted to explore it was quite hard to know how to approach building a VR experience from it &ndash; beginning to create a design document really helped narrow things down. First-off I wrote out all the themes I was thinking of exploring, I then categorised them and reduced until I ended up with a Venn diagram consisting of headings “music”, “pattern” and “movement”, I often use this process to organise my thoughts. I used a Venn diagram as lots of the themes crossed-over and these intersections are often interesting places to explore. 

[IMAGE OF VENN DIAGRAM]

After going down various avenues I eventually settled on the idea of allowing the user to somehow visually remix a song using movement in VR. I felt this would allow exploration of the themes I started out with and also be feasible in the time we had for the project. I also settled on an audience (listeners of electronic music, design conscious aged 18-35) and hardware target (Oculus Go &ndash; the VR headset I had available at home). To appeal to the target market and to take into consideration the basic graphics capability of the Go I chose a minimal, geometric visual aesthetic. I always enjoy gathering and organising visual themes in moodboard format so that was my next task.

[IMAGE OF MOODBOARD]

I also create a motion moodboard for the first time as this is really relevant to VR and my project’s themes

[VIDEO OF MOTION MOODBOARD]

Presenting our moodboards and initial ideas back to the group really helped move things on. There’s something about talking through ideas face-to-face that makes them more real and also allows for spontaneous ideas and suggestions from others. It reminded me presenting work and ideas to your peers at an early stage is something I should do more of. It was also interesting to see and critique the broad range of ideas and visual aesthetics the other students had.

## Defining environment, mechanics and user flows

After discussing with our group I eventually settled on a designing and building “Allow a user to create a visual remix of a song using movement in VR”. It was useful to keep this simple phrase in mind throughout the project to make sure I stayed on track. 

Our tutors emphasised that our experience should have one key mechanic and we should focus on that due to the short time frame. The Oculus Go is somewhat limited in mechanics as it only has one controller and 3DOF (three degrees-of-freedom) &ndash; many of its experiences are quite static &ndash; at the same time movement was a key part of my project. I came up with the idea of the mechanic being the user drawing shapes with the Go’s controller, which would be recognised by the Go as specific shapes. These shapes would then toggle audio tracks on/off. I didn’t have a clue how I would go about this but my tutors thought it was probably doable if I could get the shape recognition to work well.

Our tutors also reinforced the importance of working through user flows before starting the build, as its very easy for users to get lost in VR. I fleshed out a basic user flow that allowed users to start, end and save an experience and also a section for on-boarding them so they would understand how to use the experience. Unfortunately due to time constraints I only built the in game experience, but I could see how planning the user flow would be useful in future projects.

## Presenting the design document and planning

As a group we all presented our design documents to each other and fielded questions from our tutors, students and some guests from the industry. Preparing and presenting the document was quite stressful but also exhilarating. Again it was great to get some feedback and following that we were all raring to start the build. 

Rather than jump straight in we divided up our project into tasks that we managed on a Trello board, breaking down the project and prioritising the tasks made the project seem more achievable. I decided I would be happy if I could get the mechanic to work and implementing the visual aesthetics would be a bonus. I added on further reach goals of implementing the in-game UI and menus in case things were going really well.

## Sketching out the mechanic

The other students and myself now had it clear in our minds how important the one game mechanic was to our projects, in my case this was the user drawing shapes and having them recognised. I had broken this down into two separate parts: show what user draws via controller and recognise users shapes. I set about sketching out the “show what user draws via controller” in Unity. I used a [trail renderer](https://docs.unity3d.com/Manual/class-TrailRenderer.html) that turned on when the user’s controller trigger was pressed and disappeared when the trigger was released (using the incredible [VRTK](https://vrtoolkit.readme.io/) asset for communication with the VR headset). 

Recognising the shapes proved to be more challenging. I had no idea where to start with this so my tutor suggested I looked at IBM Watson, this made sense as I had previously used other image recognition services for web projects and it has Unity integration. I set it up so that a screenshot was taken when the user finished drawing their shape. I didn’t hook up Watson at this point in Unity but instead tried sending the screenshots to Watson via the web as this was quicker for me to test out. There didn’t seem to be a specific shape recognition model, so the results I was getting back weren’t great. Looking into whether you could teach the model I started to think I was getting away from the original project aim. I also grew concerned that sending images to Watson would place a requirement on having a web connection, and that latency or network issues would ruin the experience. Instead I did some reading on gesture recognition and came across the [$P](http://depts.washington.edu/ilab/proj/dollar/pdollar.html) project that recognised gestures and could also be taught to recognise specific gestures. 

[IMAGE OF $P ASSET]

Luckily someone had ported $P to a [Unity asset](https://assetstore.unity.com/packages/tools/input-management/pdollar-point-cloud-gesture-recognizer-21660). After integrating the asset I had to remove its inbuilt gestures and teach it various gestures for the three shapes I had chose (triangle, square, circle). After a lot of toing and froing I finally got the shape gesture recognition to work!

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Oculus Go: drawing shapes with <a href="https://twitter.com/VR_Toolkit?ref_src=twsrc%5Etfw">@VR_Toolkit</a> and <a href="https://twitter.com/unity3d?ref_src=twsrc%5Etfw">@unity3d</a>, recognising them with <a href="https://twitter.com/DaVikingCode?ref_src=twsrc%5Etfw">@DaVikingCode</a> PDollar asset <a href="https://t.co/dNkSz4UF7q">pic.twitter.com/dNkSz4UF7q</a></p>&mdash; Jon Higgins (@jonjhiggins) <a href="https://twitter.com/jonjhiggins/status/1039359353818501120?ref_src=twsrc%5Etfw">September 11, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset=“utf-8"></script>

## Getting shape recognition to control audio tracks

The next task was to get the shape recognition to turn audio tracks on/off. For the audio I’d chosen to use the [Jacques Greene](https://jacquesgreene.com/) track "To Say" as it fitted with both the aesthetic and goal of getting user to move, also the [stems]((https://jacquesgreene.com/stems)) (separate audio tracks) were available under a “MAKE WHATEVER YOU WANT” license. As I was only going to have three shapes I had to mix down several of the stems into 3 groups of audio tracks (oherwise the audio was too sparse and sometimes silent). 

## Implementing the visual aesthetic

Having got the mechanic sorted it was time to have some fun with the visuals. I sketched out several ideas, regularly referring back to my moodboard to check I was staying on track. I decided I wanted some kind of visual to turn on when each of the shapes (and in turn, the audio track) was turned on, these would be different for each track and could be layered (just like the audio tracks). This way, when there was no audio there were no visuals, and vice versa when all audio tracks were on &ndash; a visual representation of the sound.

I ended up with using two [particle systems](https://docs.unity3d.com/ScriptReference/ParticleSystem.html) and a [trail renderer](https://docs.unity3d.com/Manual/class-TrailRenderer.html). I styled the first particle system using “Starfield” to look like bouncing ping-pong balls, I thought this mirrored the “pop” sound in the audio track. The second particle system I used a warp field &ndash; I liked the way this changed as you looked it from different angles, encouraging the user to move. Finally I used a trail renderer to draw thick lines, these are supposed to be random but I drew them between fixed points as I found them easier to control.

## Finished work

Along with the other students I presented my project on the final day to the tutors and invited industry guests. It was great to see other people having fun trying out our experiences and the range of student projects showed the possibilities of the VR medium. Again it was somewhat stressful working to the deadline and knowing it was going to be demoed live, but this helped move the project along during design and build. While I didn’t get beyond the in-game experience I was pretty pleased with the result as I think it fulfilled the design brief I set, there were no bugs when demoing and people seemed to have fun interacting with it.


Big thanks to:

- Tutors: [Sam Tate](https://twitter.com/Samueltates) and Tin Nyguen
- Students: Graham, Lokesh, [Paul](https://twitter.com/PaulArmistead), Steph and Vaughan
- [Academy XI](https://academyxi.com/) team
- Software: [Unity](https://unity.com/), [VRTK](https://vrtoolkit.readme.io/) and [Da Viking Code](https://twitter.com/davikingcode)
- Audio: "To Say" is copyright [LuckyMe](https://luckyme.net/) and [Jacques Greene](https://jacquesgreene.com/)