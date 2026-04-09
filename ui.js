document.addEventListener("DOMContentLoaded",()=>{

const cursor=document.createElement("div")
cursor.style.width="15px"
cursor.style.height="15px"
cursor.style.borderRadius="50%"
cursor.style.position="fixed"
cursor.style.background="rgba(0,255,255,0.7)"
cursor.style.pointerEvents="none"
cursor.style.zIndex="9999"
cursor.style.transition="0.1s"
document.body.appendChild(cursor)

document.addEventListener("mousemove",(e)=>{
cursor.style.left=e.clientX+"px"
cursor.style.top=e.clientY+"px"
})

const trail=[]

document.addEventListener("mousemove",(e)=>{
const dot=document.createElement("div")
dot.style.width="6px"
dot.style.height="6px"
dot.style.borderRadius="50%"
dot.style.position="fixed"
dot.style.background="rgba(255,0,150,0.5)"
dot.style.left=e.clientX+"px"
dot.style.top=e.clientY+"px"
dot.style.pointerEvents="none"
dot.style.zIndex="9998"

document.body.appendChild(dot)

trail.push(dot)

setTimeout(()=>{
dot.remove()
},400)
})

document.querySelectorAll("button").forEach(btn=>{
btn.addEventListener("mouseenter",()=>{
btn.style.boxShadow="0 0 20px rgba(0,255,255,0.7)"
})
btn.addEventListener("mouseleave",()=>{
btn.style.boxShadow="none"
})
})

})

function pageFlash(){
const f=document.createElement("div")
f.style.position="fixed"
f.style.width="100%"
f.style.height="100%"
f.style.background="rgba(255,255,255,0.05)"
f.style.zIndex="999"
document.body.appendChild(f)

setTimeout(()=>f.remove(),200)
}

const oldNav=nav
nav=function(id){
pageFlash()
oldNav(id)
}
