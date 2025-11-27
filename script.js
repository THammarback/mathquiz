const form = document.getElementById("quizForm")
const btn = form?.querySelector?.("button")
let tryAgain = false
if(form){
    form.addEventListener("submit", (event)=>{
        event.preventDefault()
        if(tryAgain){
            window.location.reload(true)
            return
        }
        const svar=[]
        if(form.svar.constructor.name === "RadioNodeList"){
            svar.push(form.svar.value)
            svar.forEach(el => el.disabled = true)
        }else{
            for(const el of form.querySelectorAll("input")){
                el.disabled = true
                svar.push(el.value)
            }
        }
        tryAgain = true
        fetch(form.action, {body: svar.join('£'), method: form.method, headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'}})
        .then(res => res.json())
        .then(res => {
            if(res.correct){
                btn.innerHTML = "Rätt! Försök igen?"
                btn.style = "background-color:green;"
            }else{
                btn.style = "background-color:red;"
                btn.innerHTML = "Fel.. Försök igen?"
            }
        })
        .catch(err => {
            console.log(err)
        })
    })
}

const toggleButton = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
if(toggleButton){
    toggleButton.addEventListener('click', () => {
        htmlElement.classList.toggle('dark-theme');
        if (htmlElement.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    htmlElement.classList.add('dark-theme');
}

document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const group = btn.closest('.category-group');
        const list = group.querySelector('.category-list');
        list.classList.toggle('open');
        group.classList.toggle('active');
    });
});


document.querySelectorAll('.category-list a').forEach(link => {
    if (encodeURI(link.getAttribute('href')) === window.location.pathname) {
        const parentList = link.closest('.category-list');
        const parentGroup = link.closest('.category-group');
        if (parentList && parentGroup) {
            parentList.classList.add('open');
            parentGroup.classList.add('active');     
            link.style.textDecoration = "underline"       
        }
    }
});