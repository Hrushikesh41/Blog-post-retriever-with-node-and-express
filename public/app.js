let btn = document.querySelector('#submit');

btn.addEventListener('click', ()=>{
    let input = document.querySelector('#input').value;
    let content = document.querySelector('.blogs');
    let error = document.querySelector('.error');

    if(input !=""){
        fetch('/', {
            method : "POST",
            headers: {
                'Content-Type': 'text/plain'
            },

            body : `${input}`
        }).then((response)=>{
            return response.json();
        }).then((data)=>{
            console.log(data);
            let post = data.content;
            
            if(post.length > 0){
                
                content.style.display = "flex";
                error.style.display = 'none';
                content.innerHTML = "";
                

                post.forEach((post) => {

                    console.log(post.user.username);
                    
                    let post_content = document.createElement('div');
                    post_content.setAttribute('class', 'post_content');
                    content.appendChild(post_content);

                    display_blogs = () =>{

                        loadImage = ()=>{
                            if(post.cover_image != null){
                                return post.cover_image;
                            }else{
                                let cover = "https://upload.wikimedia.org/wikipedia/commons/9/9b/No_cover.JPG";
                                return cover;
                            }
                        }


                        // creating elements for cover image
                        let image = document.createElement('div');
                        image.setAttribute('class', 'image');

                        let img = document.createElement('img');
                        img.src = loadImage();
                        image.appendChild(img);

                        post_content.appendChild(image);

                        // creating elements for post details
                        let post_detail = document.createElement('div');
                        post_detail.setAttribute('class', 'post_detail');
                        post_content.appendChild(post_detail);

                        // creating elements for post title
                        let title = document.createElement('div');
                        title.setAttribute('class', 'title');
                        title.innerText = post.title;

                        post_detail.appendChild(title);

                        // creating element for post description
                        let desc = document.createElement('div');
                        desc.setAttribute('class', 'desc');
                        desc.innerText = post.description;

                        post_detail.appendChild(desc);

                        //creating a hr to divide section

                        let hr = document.createElement('hr');
                        post_detail.appendChild(hr);

                        //creating elements for author details

                        let authorDetail = document.createElement('div');
                        authorDetail.setAttribute('class', 'authoreDetail');
                        post_detail.appendChild(authorDetail);

                        let author = document.createElement('div');
                        author.setAttribute('class', 'author');
                        author.innerText = post.user.username;

                        authorDetail.appendChild(author);

                        let reaction = document.createElement('div');
                        reaction.setAttribute('class', 'reaction');
                        reaction.innerHTML = `<i class="fa fa-heart-o"></i> ${post.public_reactions_count}`

                        authorDetail.appendChild(reaction);

                        let link = document.createElement('div');
                        link.setAttribute('class', 'link');

                        let post_link = document.createElement('a')
                        post_link.setAttribute('href', `${post.canonical_url}`)
                        post_link.setAttribute('target', '_blank')
                        post_link.innerText = "Read Full Article";

                        link.appendChild(post_link);
                        authorDetail.appendChild(link);

                        content.appendChild(post_content);
                    }

                    display_blogs();

                });

                

            }else{
                error.innerHTML= "";
                let errorMsg = document.createElement('div');
                errorMsg.setAttribute('class', 'errorMsg');
                errorMsg.innerText = "No Blogs From This User or Username is Invalid";

                error.appendChild(errorMsg);

                content.style.display = "none";
                error.style.display = 'flex';
            }
        }).catch((err)=>{
            console.log(err);
        })
    }else{
        error.innerHTML = "";        
        let emptyMsg = document.createElement('div');
        emptyMsg.setAttribute('class', 'emptyMsg');
        emptyMsg.innerText = "Please Enter Username";

        error.appendChild(emptyMsg);

        content.style.display = "none";
        error.style.display = 'flex';
    }
})