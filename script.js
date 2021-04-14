const fs = require("fs");
const puppy = require("puppeteer");
let heads = [];
let id = 'testautomationpep@gmail.com';
let pass = 'sumit@57';
let rec = 'sumitnegi05757@gmail.com';
let subject = 'Top 10 News Headlines of Today';

function wait(ms) {
    return new Promise(function(resolve,reject) {
        setTimeout(resolve,ms);
    });
}

async function main(){
    let browser = await puppy.launch({
        headless : false,
        defaultViewport : false,
        args: ['--start-maximized',"--disable-notifications"]
    });
    let tabs = await browser.pages();
    let tab = tabs[0];
    await tab.goto("https://inshorts.com/en/read");
    await tab.waitForSelector('[itemprop="headline"]');
    let headline = await tab.$$('[itemprop="headline"]');
   // let heads = [];

    for(let i=0 ; i<10 ; i++){
        heads[i] = await tab.evaluate(function(ele){
            return ele.textContent;
        }, headline[i]) +'\n';
    }
    //console.log(heads);
   
   
   
  var data = heads.join("");

   // console.log(data);
   
fs.writeFileSync('news.txt', data);
let news = fs.readFileSync("news.txt", "utf-8");
browser.close();

let browser2 = await puppy.launch({
    headless : false,
    defaultViewport : false,
    args: ['--start-maximized',"--disable-notifications"]
});

let tabs2 = await browser2.pages();
const context = browser2.defaultBrowserContext();
context.overridePermissions("https://mail.google.com/mail/u/0/#inbox", ["geolocation", "notifications"]);
let tab2 = tabs2[0];

await tab2.goto("https://accounts.google.com/signin/v2/identifier?service=mail&passive=true&rm=false&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&ss=1&scc=1&ltmpl=default&ltmplcache=2&emr=1&osid=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin");
await tab2.waitForSelector('input[type="email"]');
await tab2.type('input[type="email"]',id);
await tab2.click('div[class=VfPpkd-RLmnJb]');

await wait(2000);

await tab2.waitForSelector('input[type="password"]');
await tab2.click('input[type="password"]');
await tab2.type('input[type="password"]',pass);

await tab2.waitForSelector("#passwordNext", {visible: true});
await tab2.click("#passwordNext");
await wait(2000);

await tab2.waitForSelector(".T-I.T-I-KE.L3");
await tab2.click(".T-I.T-I-KE.L3");
await wait(2000);
await tab2.waitForSelector( `textarea[name = "to"]`);
await tab2.click( `textarea[name = "to"]`);
await tab2.type( `textarea[name = "to"]`, rec);
await tab2.click(`input[name='subjectbox']`);
await tab2.type(`input[name='subjectbox']`,subject);
await tab2.waitForSelector('div[aria-label="Message Body"]');

await tab2.click('div[aria-label="Message Body"]');
await tab2.type('div[aria-label="Message Body"]', news);
//await tab2.type('#:8g', subject);
//await tab2.type('#:9l', news);
//console.log("done till here");
//await tab2.click('button[class = .VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b');
await wait(2000);
await tab2.waitForSelector(".T-I.J-J5-Ji.aoO.v7.T-I-atl.L3");
await tab2.click(".T-I.J-J5-Ji.aoO.v7.T-I-atl.L3");
//browser2.close();
}
main();
