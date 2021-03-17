//dom
const tickName =document.querySelector('#tickName');//套票名稱
const imgUrl =document.querySelector('#imgUrl');//圖片網址
const ticketRegion =document.querySelector('#ticketRegion');//景點地區
const tickPrice =document.querySelector('#tickPrice');//套票金額
const ticketNum =document.querySelector('#ticketNum');//套票組數
const tickRate =document.querySelector('#tickRate');//套票星級
const ticketDescription =document.querySelector('#ticketDescription');//套票描述
const addCardBtn = document.querySelector('.addTicket-btn');//新增票價
const regionSearch = document.querySelector('.regionSearch')//篩選地區
const list =document.querySelector('.list');
const form =document.querySelector('form');//表單
const searchResult =document.querySelector('.searchResult')//剩餘資料比
//data
let data = [];
// 地區用 onchange 監聽
// 上方新增的地區跟下方篩選的地區都寫死選項（依照目前提供的 JSON data area 欄位）
// 地區的篩選下拉需要加上『全部地區』option
// 不需要有「清除資料」的按鈕
// 預設資料為 3 筆（內容需依照目前提供的 JSON data）
// 篩選後會顯示『搜尋資料為 ? 筆』
// 描述欄位使用 textarea
// 星級區間是 1-10 分
// 金額、組數、星級的 type 為 Number
//event
addCardBtn.addEventListener('click',addCard);//監聽新增按鈕
regionSearch.addEventListener('change',filterCard);//監聽地區
//method
function filterCard(e){
    let area = e.target.value   
    render(area);
}
function addCard(){ //新增套票
    if(!tickName.value||!imgUrl.value||!ticketRegion.value||!tickPrice.value||!ticketNum.value||!tickRate.value||!ticketDescription .value){
        form.reset();//從置表單
        return
    }
    const obj={
        "id": Date.now(),//亂數
        "name":tickName.value,
        "imgUrl": imgUrl.value,
        "area": ticketRegion.value,
        "description": ticketDescription.value,
        "group": Number(ticketNum.value),
        "price": Number(tickPrice.value),
        "rate": Number(tickRate.value),
    };
    data.push(obj);
    form.reset();//從置表單
    regionSearch.value='全部';//新加入資料後讓篩選視窗跳回全部
    render();
}
function render(area='全部'){//渲染畫面
    let listStr ='';
    let searchResultStr=''
    if(area==='全部'){
        data.forEach(item=>{
            searchResultStr++
            listStr+=` 
            <li class="card mr-md-7 mb-8">
                <div class="position-relative">
                    <a href="#" class="card-img--hidden">
                        <img src="${item.imgUrl}" class="card-img-top" alt="...">
                    </a>
                    <div class="ticketCard-region position-absolute">${item.area}</div>
                    <div class="ticketCard-rank position-absolute">${item.rate}</div>
                </div>
                <div class="card-body">
                <h4 class="card-title text-primary text-bold border--Bottom pb-1 mb-5">
                    ${item.name}
                </h4>
                <p class="card-text text-secondary">${item.description}</p>
                <div class='d-flex justify-content-between align-items-center text-primary '>
                    <div class="d-flex align-items-center">
                        <i class="fas fa-exclamation-circle"></i>
                        <p class='mb-0'>剩下最後${item.group}組</p>
                    </div>
                    <div class="d-flex align-items-center">
                        <p class='mb-0'>TWD</p>
                        <p class='h2 mb-0'>$${item.price}</p>
                    </div>
                </div>
           </li>`
    })}else{
        data.forEach(item=>{
            if(item.area===area){
                searchResultStr++
                listStr+=` 
                <li class="card mr-md-7 mb-8">
                    <div class="position-relative">
                        <a href="#" class="card-img--hidden">
                            <img src="${item.imgUrl}" class="card-img-top" alt="...">
                        </a>
                        <div class="ticketCard-region position-absolute">${item.area}</div>
                        <div class="ticketCard-rank position-absolute">${item.rate}</div>
                    </div>
                    <div class="card-body">
                    <h4 class="card-title text-primary text-bold border--Bottom pb-1 mb-5">
                        ${item.name}
                    </h4>
                    <p class="card-text text-secondary">${item.description}</p>
                    <div class='d-flex justify-content-between align-items-center text-primary '>
                        <div class="d-flex align-items-center">
                            <i class="fas fa-exclamation-circle"></i>
                            <p class='mb-0'>剩下最後${item.group}組</p>
                        </div>
                        <div class="d-flex align-items-center">
                            <p class='mb-0'>TWD</p>
                            <p class='h2 mb-0'>$${item.price}</p>
                        </div>
                    </div>
               </li>`
            }
        });       
    }
    searchResult.innerHTML=`本次搜尋共${searchResultStr}筆資料`;
    list.innerHTML=listStr;
}
function init(){//初始化
    const url ='https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json';
    axios.get(url)
    .then(res=>{
        data=res.data.data;
        render();
    }).catch(err=>{
        console.log(err);
    })
}
init();