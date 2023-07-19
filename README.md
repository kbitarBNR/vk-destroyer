# vk-destroyer
Virtual Kitchen Remover for DoorDash and UberEats

This is a Chrome Extension that I developed for my personal development. It uses Javascript in order to monitor the page as it loads, and then check to see if the loaded element matches to the xpath of specific element that I specified in the code. If the xpath match, the element is removed, and the user cannot see it. After an element is checked, it stops watching that element, and it moves on to the next one. It checks against elements using two items: one a simple xpath that is for use on the DoorDash site (because they mark every "Virtual Kitchen", as such); the second is an array of xpaths that the site checks against for use on UberEats (this is because they don't mark whether or not something is "Virtual Kitchen" or not). I tried making the code pull from a file that had all the names of the Virtual Kitchens listed, but I couldn't for the life of me get it to work. Overall, I haven't noticed a differnce in time between using the extension and not.

Installation:

- Download the .zip of the project
- Unzip the project
- Navigate to "chrome://extensions/"
- Click the "Developer mode" slider, in the upper-right hand corner of the screen
- Click the "Load unpacked" button, in the upper-left hand corner of the screen
- Select the project folder that the "manifest.json" resides in
- Be sure to enable the extension, on the Extensions page
