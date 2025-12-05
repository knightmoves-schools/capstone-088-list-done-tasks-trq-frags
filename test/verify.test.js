const http = require("http");
const fs = require("fs");
const puppeteer = require("puppeteer");
const { assert } = require("console");

let server;
let browser;
let page;

beforeAll(async () => {
  server = http.createServer(function (req, res) {
    fs.readFile(__dirname + "/.." + req.url, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  });

  server.listen(process.env.PORT || 3000);
});

afterAll(() => {
  server.close();
});

beforeEach(async () => {
  browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  page = await browser.newPage();
  await page.goto("http://localhost:3000/index.html");
});

afterEach(async () => {
  await browser.close();
});

describe('the index.js file', () => {
  it('should list 3 tasks with a status of todo in the todo column', async function() {
    const todoCards = await page.$$eval('#todo-cards > .card', (results) => results );
      
    expect(todoCards.length).toBe(3);
  });

  it('should list 2 tasks with a status of doing in the doing column', async function() {
    const doingCards = await page.$$eval('#doing-cards > .card', (results) => results );
      
    expect(doingCards.length).toBe(2);
  });

  it('should list 3 tasks with a status of done in the done column', async function() {
    const doneCards = await page.$$eval('#done-cards > .card', (results) => results );
      
    expect(doneCards.length).toBe(3);
  });

  it('should list each card with a unique id that contains "task-" followed by the index within the tasks array', async function() {
    const firstCard = await page.$eval('#task-0', (result) => result.innerHTML );
    const secondCard = await page.$eval('#task-1', (result) => result.innerHTML ); 
    const thirdCard = await page.$eval('#task-2', (result) => result.innerHTML ); 
    const fourthCard = await page.$eval('#task-3', (result) => result.innerHTML ); 
    const fifthCard = await page.$eval('#task-4', (result) => result.innerHTML ); 
    const sixthCard = await page.$eval('#task-5', (result) => result.innerHTML ); 
    const seventhCard = await page.$eval('#task-6', (result) => result.innerHTML ); 
    const eighthCard = await page.$eval('#task-7', (result) => result.innerHTML ); 
      
    expect(firstCard).toContain('pack spikes for track meet');
    expect(secondCard).toContain('make my bed');
    expect(thirdCard).toContain('walk the dog');
    expect(fourthCard).toContain('write draft english paper');
    expect(fifthCard).toContain('sanding art project');
    expect(sixthCard).toContain('wash the dishes');
    expect(seventhCard).toContain('finish math homework');
    expect(eighthCard).toContain('practice my trumpet');
  });

  it('should contain an edit link within each card that contains the corresponding index within the tasks array', async function() {
    const firstCard = await page.$eval('#task-0', (result) => result.innerHTML );
    const secondCard = await page.$eval('#task-1', (result) => result.innerHTML ); 
    const thirdCard = await page.$eval('#task-2', (result) => result.innerHTML ); 
    const fourthCard = await page.$eval('#task-3', (result) => result.innerHTML ); 
    const fifthCard = await page.$eval('#task-4', (result) => result.innerHTML ); 
    const sixthCard = await page.$eval('#task-5', (result) => result.innerHTML ); 
    const seventhCard = await page.$eval('#task-6', (result) => result.innerHTML ); 
    const eighthCard = await page.$eval('#task-7', (result) => result.innerHTML ); 
     
    expect(firstCard).toMatch(/<a href="\/edit\/0">[\s\S]*Edit[\s\S]*<\/a>/);
    expect(secondCard).toMatch(/<a href="\/edit\/1">[\s\S]*Edit[\s\S]*<\/a>/);
    expect(thirdCard).toMatch(/<a href="\/edit\/2">[\s\S]*Edit[\s\S]*<\/a>/);
    expect(fourthCard).toMatch(/<a href="\/edit\/3">[\s\S]*Edit[\s\S]*<\/a>/);
    expect(fifthCard).toMatch(/<a href="\/edit\/4">[\s\S]*Edit[\s\S]*<\/a>/);
    expect(sixthCard).toMatch(/<a href="\/edit\/5">[\s\S]*Edit[\s\S]*<\/a>/);
    expect(seventhCard).toMatch(/<a href="\/edit\/6">[\s\S]*Edit[\s\S]*<\/a>/);
    expect(eighthCard).toMatch(/<a href="\/edit\/7">[\s\S]*Edit[\s\S]*<\/a>/);
  });

  it('should contain a delete link within each card that contains the corresponding index within the tasks array', async function() {
    const firstCard = await page.$eval('#task-0', (result) => result.innerHTML );
    const secondCard = await page.$eval('#task-1', (result) => result.innerHTML ); 
    const thirdCard = await page.$eval('#task-2', (result) => result.innerHTML ); 
    const fourthCard = await page.$eval('#task-3', (result) => result.innerHTML ); 
    const fifthCard = await page.$eval('#task-4', (result) => result.innerHTML ); 
    const sixthCard = await page.$eval('#task-5', (result) => result.innerHTML ); 
    const seventhCard = await page.$eval('#task-6', (result) => result.innerHTML ); 
    const eighthCard = await page.$eval('#task-7', (result) => result.innerHTML ); 
 
    expect(firstCard).toMatch(/<a href="\/delete\/0">[\s\S]*Delete[\s\S]*<\/a>/);
    expect(secondCard).toMatch(/<a href="\/delete\/1">[\s\S]*Delete[\s\S]*<\/a>/);
    expect(thirdCard).toMatch(/<a href="\/delete\/2">[\s\S]*Delete[\s\S]*<\/a>/);
    expect(fourthCard).toMatch(/<a href="\/delete\/3">[\s\S]*Delete[\s\S]*<\/a>/);
    expect(fifthCard).toMatch(/<a href="\/delete\/4">[\s\S]*Delete[\s\S]*<\/a>/);
    expect(sixthCard).toMatch(/<a href="\/delete\/5">[\s\S]*Delete[\s\S]*<\/a>/);
    expect(seventhCard).toMatch(/<a href="\/delete\/6">[\s\S]*Delete[\s\S]*<\/a>/);
    expect(eighthCard).toMatch(/<a href="\/delete\/7">[\s\S]*Delete[\s\S]*<\/a>/);
  });
});

