---
layout: page
title: About
permalink: /about/
---

<style>
    /* Style looks pretty compact, trace grid-container and grid-item in the code */
    .grid-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); /* Dynamic columns */
        gap: 10px;
    }
    .grid-item {
        text-align: center;
    }
    .grid-item img {
        width: 100%;
        height: 100px; /* Fixed height for uniformity */
        object-fit: contain; /* Ensure the image fits within the fixed height */
    }
    .grid-item p {
        margin: 5px 0; /* Add some margin for spacing */
    }
</style>

<!-- This grid_container class is for the CSS styling, the id is for JavaScript connection -->
<div class="grid-container" id="grid_container">
    <!-- content will be added here by JavaScript -->
</div>

<script>
    // 1. Make a connection to the HTML container defined in the HTML div
    var container = document.getElementById("grid_container"); // This container connects to the HTML div

    // 2. Define a JavaScript object for our http source and our data rows for the Living in the World grid
    var http_source = "https://upload.wikimedia.org/wikipedia/commons/";
    var around_the_world = [
        {"flag": "0/01/Flag_of_California.svg", "greeting": "Lived here most of my life", "description": "California - forever"},
        {"flag": "0/08/Flag_of_Boston.svg", "greeting": "Hi", "Lived here when I was a toddler": "Boston - 5 years"},
        {"flag": "a/af/Flag_of_San_Francisco.svg", "greeting": "Visit my aunt and uncle as much as possilbe", "description": "San Francisco - 1 week"},
        {"flag": "e/ef/Flag_of_Hawaii.svg", "greeting": "Favorite place to visit", "description": "Hawaii - 2 weeks"},
    ]; 
    
    // 3a. Consider how to update style count for size of container
    // The grid-template-columns has been defined as dynamic with auto-fill and minmax

    // 3b. Build grid items inside of our container for each row of data
    for (const location of around_the_world) {
        // Create a "div" with "class grid-item" for each row
        var gridItem = document.createElement("div");
        gridItem.className = "grid-item";  // This class name connects the gridItem to the CSS style elements
        // Add "img" HTML tag for the flag
        var img = document.createElement("img");
        img.src = http_source + location.flag; // concatenate the source and flag
        img.alt = location.flag + " Flag"; // add alt text for accessibility

        // Add "p" HTML tag for the description
        var description = document.createElement("p");
        description.textContent = location.description; // extract the description

        // Add "p" HTML tag for the greeting
        var greeting = document.createElement("p");
        greeting.textContent = location.greeting;  // extract the greeting

        // Append img and p HTML tags to the grid item DIV
        gridItem.appendChild(img);
        gridItem.appendChild(description);
        gridItem.appendChild(greeting);

        // Append the grid item DIV to the container DIV
        container.appendChild(gridItem);
    }
</script>

### Journey through Life

- I'm class of 2027(At the moment I am 15 years old)
- My favorite sports to play are baseball and football
- I have 5 members in my family; My dad, mom, sister, brother, and me
- My favorite place in the world is Hawaii
- I have traveled the world playing baseball; My favorite place I played was in Hawaii
- My favorite subject is math
- My hobbies are playing sports and playing videogames

### My Family and Culture
- My whole family is Chinese
- I have family in San Francisco and Boston and I visit them as much as possible

<!-- from https://github.com/utterance/utterances -->
<script src="https://utteranc.es/client.js"
        repo="ethanwong2008/ethan_2027"
        issue-term="title"
        label="blogpost-comment"
        theme="github-light"
        crossorigin="anonymous"
        async>
</script>
