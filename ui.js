document.addEventListener("DOMContentLoaded",()=>{

document.querySelectorAll("button").forEach(btn=>{
btn.addEventListener("mouseenter",()=>{
btn.style.transform="scale(1.04)"
})
btn.addEventListener("mouseleave",()=>{
btn.style.transform="scale(1)"
})
})

})

function pageFade(){
document.body.style.opacity="0.7"
setTimeout(()=>{
document.body.style.opacity="1"
},150)
}

const oldNav=nav
nav=function(id){
pageFade()
oldNav(id)
}
