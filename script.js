const searchinput=document.getElementById("theinput");
const clearbutton=document.getElementById("clearbutton");
const cardContainer=document.getElementById("cardContainer");
function clearinput(){
    searchinput.value="";
}
clearbutton.addEventListener("click",clearinput);

async function getdata(params) {
    let data=await fetch("./travel_recommendation_api.json");
    let parseddata=await data.json();
    // return parseddata;
    let res=[];

    let countries=parseddata.countries;
    countries.forEach(element => {
        element.cities.forEach((ele)=>{
            if(ele.name.toLowerCase().search(params.toLowerCase())!=-1){res.push(ele);}
        })
    });

    let temples=parseddata.temples;
    temples.forEach(element => {
        if(element.name.toLowerCase().search(params.toLowerCase())!=-1)res.push(element); 
    });
    let beaches=parseddata.beaches;
    beaches.forEach(element => {
        if(element.name.toLowerCase().search(params.toLowerCase())!=-1)res.push(element); 
    });
    return res;
}



searchinput.addEventListener('change',async(e)=>{
    if(e.target.value!=""){
        let ob=await getdata(e.target.value);
        cardContainer.style.display="flex";

        cardContainer.innerHTML= ob.map(element => 
            `
                <div class="card" data-name="canada">
                    <img src="${element.imageUrl}" alt="Toronto">
                    <h3>${element.name}</h3>
                    <p>${element.description}</p>
                    <button>Visit</button>
                </div>
            `
        ).join("");
    }
    else{
        cardContainer.style.display="none"

    }

})




