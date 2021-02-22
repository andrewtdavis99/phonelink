// API Fetch
function search(searchTerm = "Android", top = "") {
    return fetch(`https://www.reddit.com/r/${searchTerm}/${top}.json?limit=100`)
        .then(phoneType = searchTerm)
        .then(res => res.json())
        .then(data => data.data.children.map(data => data.data))
        .catch(err => console.log(err));
};

// Select API feed by phone type  
document.querySelectorAll(".phone").forEach(item => {
    item.addEventListener("click", function (e) {
        e.preventDefault();
        console.log(e.target.id);
        let phoneType = e.target.id;
        search(phoneType)
        .then(results => {
            console.log(results)
            let output = '<div class="row">';
            // Loop through
            results.forEach(post => {
                // Check if is a reddit user question
                 if (post.domain.substring(0,5) == "self.") {
                     console.log(post.domain)
                     return;
                 } else {
                // Check for image
                const image = post.preview ? post.preview.images[0].source.url : 'https://images.pexels.com/photos/33999/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500';
                const postTitle = post.title;
                const url = post.url;
    
                output +=   cards(image, postTitle, url);
                 }
            })
            output += '</div> ';
            document.getElementById('results').innerHTML = output;

        });

        $('#navbarNav').removeClass('show');
        $('#new').removeClass("active");
        $('#hot').addClass("active");

        
    });
});

// Select API feed by trending and new

document.getElementById("tabNode").addEventListener("click", function (e) {
    e.preventDefault();
    console.log(e.target);
    let cat = e.target.id;
    search(phoneType, cat)
        .then(results => {
            console.log(results)
            let output = '<div class="row">';
            // Loop through
            results.forEach(post => {
                // Check if is a reddit user question
                 if (post.domain.substring(0,5) == "self.") {
                     console.log(post.domain)
                     return;
                 } else {
                // Check for image
                const image = post.preview ? post.preview.images[0].source.url : 'https://images.pexels.com/photos/33999/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500';
                const postTitle = post.title;
                const url = post.url;
    
                output +=   cards(image, postTitle, url);
                 }
            })
            output += '</div> ';
            document.getElementById('results').innerHTML = output;

        });

        $('#navbarNav').removeClass('show');

});


search()
    .then(results => {
        console.log(results)
        let output = '<div class="row">';
        // Loop through
        results.forEach(post => {
            // Check if is a reddit user question
             if (post.domain.substring(0,5) == "self.") {
                 console.log(post.domain)
                 return;
             } else {
                 // Check for image
            const image = post.preview ? post.preview.images[0].source.url : 'https://images.pexels.com/photos/33999/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500';
            const postTitle = post.title;
            const url = post.url;

            output +=   cards(image, postTitle, url);
             }
        })
        output += '</div class="card> ';
        document.getElementById('results').innerHTML = output;
       
    });


    // Function for displaying API data in a card format
function cards(image, postTitle, url) {
    return `
    <div class="card-pic col-3 col-md-2 mt-3">
    <img class="card-img" w-100 src="${image}" alt="">
    </div>
  
    <div class="card-text col-8 sm-mt-3">
    <div class="card-block">
      <p>${truncateText(postTitle, 150)}</p>
      <a href="${url}" class="btn btn-outline-secondary" target="_blank">Read More</a>
    </div>
  </div>
  `
  };

  // Scroll up arrow

document.querySelector('.scroll-btn').addEventListener('click', () => {
    document.querySelector('html').style.scrollBehavior = 'smooth';
    setTimeout(() => {
        document.querySelector('html').style.scrollBehavior = 'unset';
    }, 1000);
});

// Display the scroll up arrow after scrolling down the page
mybutton = document.querySelector(".scroll-btn");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    mybutton.style.display = "flex";
  } else {
    mybutton.style.display = "none";
  }
}


// Truncate text

function truncateText(text, limit) {
    const shortened = text.indexOf('', limit);
    if (shortened === -1) return text;
    return text.substring(0, shortened);
};