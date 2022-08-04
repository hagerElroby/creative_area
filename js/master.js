      //check if there is local storage
      let mainColor=localStorage.getItem("color_option");
      if(mainColor!==null){
            document.documentElement.style.setProperty('--main--color',localStorage.getItem("color_option")); 
      }

      document.querySelector(".toogle .fa-gear").onclick=function(){
            this.classList.toggle("fa-spin");
            document.querySelector(".setting-box").classList.toggle("open");
      };

       //select color 
      const colorli=document.querySelectorAll(".colorList li");
      colorli.forEach(li=>{
            li.addEventListener("click",(e)=>{
                  document.documentElement.style.setProperty('--main--color',e.target.dataset.color);
                  localStorage.setItem("color_option",e.target.dataset.color);
                 handelActive(e); 
            });
      });
      
      //change packground image
      let backgroundOption=true;
      let backgroundInterval;
      let backgroundLocalItem=localStorage.getItem("background_option");
      if(backgroundLocalItem!==null){
            if(backgroundLocalItem==='true'){
                  backgroundOption=true;
                  document.querySelector(".random .yes").classList.add("active");
            }else{
                  backgroundOption=false;
                  document.querySelector(".random .no").classList.add("active");
            }
            document.querySelectorAll(".random span").forEach(element=>{
                  element.classList.remove("active");
            });
           
      }

      //random backgroung

      const randomBack=document.querySelectorAll(".random span" );
      randomBack.forEach(span =>{
            span.addEventListener("click",(e)=>{
                  
                  handelActive(e);
                  if(e.target.dataset.background==='yes'){
                        backgroundOption=true;
                        randomize();
                        localStorage.setItem("background_option", true);
                  }else{
                        backgroundOption=false;  
                        clearInterval(backgroundInterval) ; 
                        localStorage.setItem("background_option", false);
                  }
            });
      });



      // select landing page element
      let landinpage=document.querySelector(".landing-page");
      // get array of image
      let imageArray=["images (5).jfif","photo-1s559163387-e46e8dcb27f2.jpg","111-1117320_laptop-screen.jpg","83-838365_m.jpg","funny-and-cute-penguin-hd-wallpaper-3840x2160.jpg","screen-with-devil-1.jpg","Mouse_computing_Laptops_Cup_Headphones_Camera_555197_1920x1080.jpg"];
      
      function randomize(){
            if (backgroundOption===true){
                  backgroundInterval=setInterval(()=>{
                        //get random number
                        let randomNumber=Math.floor(Math.random()*imageArray.length);
                        landinpage.style.backgroundImage='url("images/'+imageArray[randomNumber] +'")';
                  },1000);
            }
      }
      randomize();

      // select skills
      let ourSkill=document.querySelector(".skills");
       window.onscroll=function(){
             let skillsOffsetTop= ourSkill.offsetTop;
             let skillsOuterHeight=ourSkill.offsetHeight;
             let windowHeight=this.innerHeight;
             let windowScrollTop=this.pageYOffset;
             if(windowScrollTop > (skillsOffsetTop +skillsOuterHeight -windowHeight)){
                   let allSkills= document.querySelectorAll(".skill-box .skill-progress span ");
                   allSkills.forEach(skill =>{
                     skill.style.width=skill.dataset.progress;
                   });
             }
       }

       //creat popup with image
       let ourGallery=document.querySelectorAll(".gallery img");
       ourGallery.forEach(img =>{
             img.addEventListener('click', (e)=>{
                   let overlay=document.createElement("div");
                   overlay.className='popup-overlay';
                   document.body.appendChild(overlay);
                   let popuBox=document.createElement("div");
                   popuBox.className='popup-box';
                   if(img.alt!==null){
                        let imageHeading=document.createElement("h3");
                        let imageText=document.createTextNode(img.alt);
                        imageHeading.appendChild(imageText);
                        popuBox.appendChild(imageHeading);
                  }
                   let popupImage=document.createElement("img");
                   popupImage.src=img.src;
                   popuBox.appendChild(popupImage);
                   document.body.appendChild(popuBox);

                   let closeButton=document.createElement("span");
                   let closeButtonText=document.createTextNode("x");
                   closeButton.appendChild(closeButtonText);
                   closeButton.className='close-button';
                   popuBox.appendChild(closeButton);
                   
             });
       });
       document.addEventListener("click" , function(e){
             if(e.target.className=='close-button'){
                   e.target.parentNode.remove();
                   document.querySelector(".popup-overlay").remove();
             }
       });

       //select all bullets
       const allBullets=document.querySelectorAll(".nav-bullets .bullet");
       const allLink=document.querySelectorAll(".links a");

       function scrollToSomeWhere(elements){
       elements.forEach( ele=>{
             ele.addEventListener("click" ,(e)=>{
                   e.preventDefault();
                   document.querySelector(e.target.dataset.section).scrollIntoView({
                         behavior: 'smooth'
                   });
             });
       });
      }
      scrollToSomeWhere(allBullets);
      scrollToSomeWhere(allLink);




      //active state
     function handelActive(ev){
        
      ev.target.parentElement.querySelectorAll(".active").forEach(element=>{
            element.classList.remove("active");
        });
        ev.target.classList.add("active");
     }

let bulletsSpan=document.querySelectorAll(".bullets-option span");
let bulletsContainer=document.querySelector(".nav-bullets");
let bulleteLocalItem=localStorage.getItem("bullets-option");
if(bulleteLocalItem!==null){
   bulletsSpan.forEach(span =>{
         span.classList.remove("active");
   });
   if (bulleteLocalItem==='block'){
      bulletsContainer.style.display='block'; 
      document.querySelector(".bullets-option .yes").classList.add("active");  
   }else{
      bulletsContainer.style.display='none';
      document.querySelector(".bullets-option .no").classList.add("active");

   }
}


bulletsSpan.forEach(span =>{
      span.addEventListener("click",(e)=>{
            
            if(span.dataset.display==='show'){
                 bulletsContainer.style.display='block';
                 localStorage.setItem("bullets_option",'block');
            }else{
                  bulletsContainer.style.display='none'; 
                  localStorage.setItem("bullets_option",'none');  
            }
            handelActive(e);
      });
});

document.querySelector(".reaset-options").onclick=function(){
      localStorage.clear();
      window.location.reload();
};
     