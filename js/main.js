
        // globals
        var count = 10;
        // credential for Unsplash API
        const accessKey = "CtVhbPi2OBaptJkSyIaLKt8ZhBTWfjYdYtfRpqoLhyI";
        var searchTerm = "";
        var searchInput = document.querySelector("#search-input");

        function firstLoad() {
            // count = 10;
            loadListCats();
        }
        searchInput.addEventListener("keyup", function(event){

            // used key because keyCode and which are being deprecated
             if (event.key === "Enter") {
                 searchClick();
             }
         }); 

        // a function that clear the existed images and load new list of images with the search keyword
        function searchClick() {

            var myContainer = document.querySelector("#my-container");

            // Remove and clear all the image containers(div) within the main container
            myContainer.querySelectorAll("div").forEach(n => n.remove());  

            // read the search term
            searchTerm = document.querySelector("#search-input").value;

            // Load the list of images matching the search 
            loadSearchList();

            //show loadmore button
            document.querySelector("#loadMoreBtn").style.display = "block";
        }        

        // a function that load more images
        function loadmore() {

            if(searchTerm !== ""){
                loadSearchList();
            } else{
                loadListCats();
            }
        }

        function loadSearchList() {
            // show spinner
            document.querySelector('#spinner').classList.add('pics-loading');
    
            fetch('https://api.unsplash.com/photos/random?count='+count+'&client_id=' +accessKey+'&query='+searchTerm+'+cat')
                .then(
                    // read the response to completion
                    response => response.json()
                )
                .then((data) => {
                    
                    // we can now manage the response data
                    addToContainer(data);
    
                    // if the length is equal to the pageSize there might be more records
                    if (data.length === count) {
    
                        // show the more button
                        document.querySelector('#loadMoreBtn').style.display = 'block';
                    }
                    else {
                        // otherwise the length must be less than a full page size, meaning no more records
                        // so hide the more button
                        document.querySelector('#loadMoreBtn').style.display = 'none';
                    }
    
                })
                .catch((error) => {
                    // this is for an error in the promise (not a return with a code which might)
                    console.error('Error:', error);
                })
                .finally(() =>
                    // hide the spinner
                    document.querySelector('#spinner').classList.remove('brew-loading')
                );
    
            }

        function loadListCats() {
        // show spinner
        document.querySelector('#spinner').classList.add('pics-loading');

        fetch('https://api.unsplash.com/photos/random?count='+count+'&client_id=' +accessKey+'&query='+'cat')
            .then(
                // read the response to completion
                response => response.json()
            )
            .then((data) => {

                // we can now manage the response data
                addToContainer(data);

                // if the length is equal to the pageSize there might be more records
                if (data.length === count) {

                    // show the more button
                    document.querySelector('#loadMoreBtn').style.display = 'block';
                }
                else {
                    // otherwise the length must be less than a full page size, meaning no more records
                    // so hide the more button
                    document.querySelector('#loadMoreBtn').style.display = 'none';
                }

            })
            .catch((error) => {
                // this is for an error in the promise (not a return with a code which might)
                console.error('Error:', error);
            })
            .finally(() =>
                // hide the spinner
                document.querySelector('#spinner').classList.remove('brew-loading')
            );

        }

        function addToContainer(result) {
            // the container for all photos
            var myContainer = document.querySelector('#my-container');

            // loop through the resulting dataset
            for (let i = 0; i < result.length; i++) {

                // the box for a given picture
                var box = document.createElement('div');
                box.classList.add('photo-container');

                // Make the image to be linked to the original photo URL on Unsplash 
                var imageLink = document.createElement("a");
                imageLink.href = result[i].links.html;
                imageLink.target = "_blank";

                // the user division and class
                var username = document.createElement('a');
                username.href = result[i].user.links.html;
                username.innerText = " @ "+result[i].user.username;
                username.target = "_blank";
                username.classList.add('features');

                
                // the download division and class
                var download = document.createElement('a');
                download.href = result[i].links.download;
                download.innerText = 'Downloads: '+result[i].downloads;
                download.target = "_blank";
                download.classList.add('features');
                
                // the likes division and class
                var likes = document.createElement('div');
                likes.innerHTML = '<i class="fa fa-heart" style="color: #fb3232;"></i>'+' '+result[i].likes;
                likes.classList.add('features');

                // the image tag
                var image = document.createElement('img');

                
                // add the image source url
                image.src = result[i].urls.regular;
                image.alt = result[i].alt_description;
                image.classList.add('photo-size');

                imageLink.appendChild(image);

                // add the parts to the box

                box.appendChild(imageLink);
                box.appendChild(username);
                box.appendChild(likes);
                box.appendChild(download);
            

                // add the box to the container
                myContainer.appendChild(box);
            }
        }