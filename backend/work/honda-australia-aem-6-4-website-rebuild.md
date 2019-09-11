---
date: 2019-02-01T00:00:00.000Z
title: Honda Australia AEM 6.4 website rebuild
description: >-
  For 1.5 years I led the front-end development on the Honda Australia Cars
  website, whilst working at Leo Burnett Melbourne.
heroImages:
  - alt: Honda Cars website
    caption: ''
    image: /assets/honda-australia-aem-6-4.jpg
heroVideos:
  - ''
heroVideoAutoPlay: false
contentUrl: 'https://honda.com.au/cars'
archive: false
hide: false
category: work
---
Honda is one of the top-ten car manufacturers in Australia and its website receives millions of hits a year.

## The problem

The website performed well for Honda, helping them [increase sales more than 14% from 2016-18](https://www.honda.com.au/media-centre/2018/1/honda-australia-records-best-annual-sales-result-since-2008.html). However, the technical debt that had been accrued over this period was a major issue. 

<div data-pullquote="Building new components for the website was a slow, painful process"></div>

Updating content and building new website components was a slow and painful process. We needed to make the website easy for non-technical users to author and simplify the codebase so that code changes could be made quicker and with more confidence. I was particularly keen to address these issues with the codebase:

* Lack of code consistency - many developers had taken different approaches to the project, leading to fragmentation and making the project complex
* Lack of transparency over changes - making changes in one area would often result in unexpected changes in other areas, as components were not encapsulated
* Lack of visual consistency - we had not implemented our newly created Honda Global Experience Language (GEL)

## The solution

Honda’s website was running an older version of Adobe Experience Manager (AEM) when Adobe, Honda and agency Leo Burnett agreed to upgrade to AEM 6.4. We saw this as a great opportunity to address the issues outlined above. While the rebuild itself took around 6 months the issues it sought to address date back several years. This article only discusses front-end work on the website - a huge amount of planning, design, backend and QA work also took part.

### Reviewing the codebase, website and processes

<p data-pullquote="The website was functioning well; it was hard to get buy-in to work on issues">When starting on the project I reviewed the codebase and could see there was some great work in places, but that a lack of consistency meant there was a huge amount of code duplication and redundancy. Some files were so long and complex they were incomprehensible. Following the initial build the team had been under a large amount of time-pressure leading to some not-so-great code and temporary hacks that had become permanent.</p>

The front-end team were demotivated as they felt bogged down and embarrassed by the technical debt. Similarly the design team were frustrated by the lack of visual consistency and wanted to tackle this. While there were some very intelligent and creative people working on the project the process for delivering work was at best confusing and at worst chaotic - a million miles away from working at [Jaguar Land Rover](/work/land-rover-visual-identity-refresh/). Management above us shared these concerns but the website was functioning well from a sales perspective for Honda, so it was hard to get buy-in for time to work on these issues.

### Trying to fix things

The desire to address the issues with visual consistency and codebase came from developers and designers working on the project, rather than enforced from above, which showed they really cared about the project. I helped to address these issues in the short term by working closely with the design team while getting the front-end team to focus on "doing things right" on new components, helping them push back on unreasonable timescales and communicating issues to management. Once we had the producers on side we were able to dedicate some time towards chipping away at front-end tech debt and visual inconsistencies across the website. While this made us feel better about heading in a better direction it soon became clear we needed a large scale project to deal with this.

We did get buy-in to work on a Honda GEL to address visual inconsistencies, but implementing this would be a bigger job than we had resources for. Luckily we saw the opportunity for working on this and codebase issues within the AEM 6.4 rebuild project.

### Improving delivery processes

<p data-pullquote="I helped by breaking down silos and making sure concerns of the team were heard">At previous jobs as part of on-boarding new starters I would explain to them process for work being briefed in, worked on and delivered. I found this impossible when first working on the Honda project as processes and methods of communication changed so regularly. One significant positive change leading up to and during the AEM 6.4 rebuild was the improvement in project organisation and communication, both on the agency and client side. This helped the team focus on doing their job and issues were communicated and dealt with in a much better fashion.</p>

 I helped support this by breaking down silos between job roles, running stand-ups when scrum masters weren’t available and making sure concerns of the team members were heard by management.

From the development side I introduced pull-requests to enable team ownership of code, code consistency and learning. The front-end was often blocked by manual deployments to staging only backend devs could perform, seeing this bottleneck I hooked up [continuous integration](/words/continuous-deployment-to-s3-with-bitbucket-pipelines/) to a static site version of the front-end that built after pull-requests were merged.

### Educating and enabling the team to ensure consistency

While the dev team agreed the project suffered from a lack of consistency and was frustrating to work on, most of the current team were unsure about how to fix these problems. I helped them transition them from working in methods that suit quick campaign websites to working on a large-scale project with multiple developers working on it. In particular reinforcing the importance of:

* Consistency in code conventions and naming conventions - makes the project easier to understand
* Break things down in to smaller functions, components or files - make them easier to document, understand and re-use
* Communication - talk to other developers or designers when facing issues and we can tackle as a team
* Make sure components are encapsulated and loosely coupled - reduce side-effects from future changes
* GIT: take time to review diff before committing - avoid mistakes before they come up in pull-request review
* GIT: write informative commit messages linked to a JIRA issue - easier to understand why change was made when reviewing pull-requests and bug fixing in the future
* Write informative comments in code, [JSDoc](https://github.com/jsdoc/jsdoc) all JS functions
* Only change what there is time to do and don’t get overwhelmed - backlog issues too big to tackle now and discuss approach as a team
* If hacks or hotfixes have to be used, add backlog task to remove them and make the team aware of it so it can be prioritised

After agreeing as a team on [code conventions](https://github.com/leo-burnett-melbourne/coding-standards) I added a number of tools to the front-end project to ensure code consistency, in particular running [Prettier](https://github.com/prettier/prettier), [ESLint](https://github.com/eslint/eslint) and [Stylelint](https://github.com/stylelint/stylelint) when committing. This initially caused some friction as developers did not like the tools reporting issues with their code - I understood their frustrations so we patiently worked together on fixing issues and turning off rules we didn’t think were useful. After a while they started to see the benefits and were happy to keep them.

### Improving the tech stack

The front-end build was a complex [Gulp](https://github.com/gulpjs/gulp) setup that did everything from transpiliation to minification of images and had remained unchanged for several years. As the future of Gulp was uncertain and didn’t allow us the flexibility that I had enjoyed with [Webpack](https://github.com/webpack/webpack) in previous projects I set about switching the build over to Webpack. This was shoe-horned in between other development tasks, so I migrated each part of the build incrementally until there were no Gulp tasks left and it could be removed. We saw a small but noticable difference in bundle build times and we were able to dynamically load components that weren't used often - reducing bundle size.

### Improving visual consistency

While there was officially no time in this project for visual changes, the designers and myself knew this was a big chance to implement their new Honda GEL. Along with producers we agreed certain amounts of time that could be spent on introducing visual consistency, such as using new consistent buttons, text sizes, paddings and colours. I created a separate project of SCSS mixins so the GEL could be implemented in other projects consistently with little developer effort.

While we couldn’t do it all we did manage to implement the GEL across a significant part of the site and sparked useful dialogue in improving the GEL.

## The result

<p data-pullquote="We cut out around 20% of client side JS and CSS">The Honda Australia website was successfully relaunched in AEM 6.4 in February 2019, only a few minor bugs were found post-launch so the client was very happy. From a front-end perspective we cut out around 20% of client side JS and CSS respectively and consolidated several components to reduce the codebase complexity.</p>

 Undoubtedly there is still a lot of tech debt to work through, but we established a process for dealing with it and avoiding it in the future. It was a huge learning experience for the other front-end developers and I was impressed how much their coding and project management improved in a few months.
