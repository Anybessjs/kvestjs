let start = document.getElementById('start');
let body = document.body;
let title;
let input;
let pretitle;

let image1;
let image2;


start.addEventListener('click', ()=> {
    //* удалить элемент со страницы
    start.parentNode.removeChild(start);
    title = document.createElement('h1');
    input = document.createElement('input')

    title.textContent = 'Введите ваше имя';
    body.append(title);
    body.append(input);

    input.addEventListener('keyup', (event)=> {
        if(event.code == 'Enter' && input.value != ''){
            title.textContent = 'Добро пожаловать, ' +  input.value;
            input.parentNode.removeChild(input);

            //! запустить 1 уровень через какое-то время (3 секунды)
            setTimeout(()=>{
                title.parentNode.removeChild(title);
                iLoveMath();
            }, 3000)            
        }
    })
} )
//? вопрос, ответ, следующий уровень
function createTextLevel(question, answer, nextLevel){
    title = document.createElement('h1')
    input = document.createElement('input')
    pretitle = document.createElement('p')

    title.textContent = question
    body.append(title)
    body.append(input)
    body.append(pretitle)
    input.addEventListener('keyup', (event)=> {
        if(event.code == 'Enter' && input.value != ''){
            if(input.value.toLowerCase() == answer){
                input.parentNode.removeChild(input);
                pretitle.textContent = "Верно!"
                //! через 3 секунды запускаем новый уровень
                setTimeout(()=>{
                    title.parentNode.removeChild(title);
                    pretitle.parentNode.removeChild(pretitle);
                    if(nextLevel != null){
                        nextLevel();
                    }
                }, 3000)

            } else {
                pretitle.textContent = 'Неверно! Попробуйте еще раз.'
                input.value = ''
            }
        }
    })
}

function createImgLevel(question, trueLink, falseLink, nextLevel){
    title = document.createElement('h1')
    pretitle = document.createElement('p')
    image1 = document.createElement('img')
    image2 = document.createElement('img')

    title.textContent = question

    body.append(title)
    body.append(pretitle)
    body.append(image1)
    body.append(image2)

    image1.src = trueLink
    image2.src = falseLink

    image1.addEventListener('click', ()=>{
        image1.parentNode.removeChild(image1)
        image2.parentNode.removeChild(image2)
        pretitle.textContent = 'Верно!'
        setTimeout(() => {
            title.parentNode.removeChild(title);
            pretitle.parentNode.removeChild(pretitle);
            if(nextLevel != null){
                nextLevel();
            }
        }, 3000)
    })
    image2.addEventListener('click', ()=>{
        pretitle.textContent = 'Неверно! Попробуйте еще раз.'
    })
}

function iLoveMath()
{
    createTextLevel('Сколько будет 2*19?', 38, iLoveGeography)
}

function iLoveGeography()
{
    createTextLevel("Назовите столицу Англии", "лондон", iLoveBiology)
}

function iLoveBiology()
{
    createTextLevel("Из какого дерева делают спички?", "осина", iLoveMountains);
}

function iLoveMountains(){
    createImgLevel('На какой картинке Эверест?', "./img/Everest.jpg", "./img/Elbrus.jpg", null)
}
