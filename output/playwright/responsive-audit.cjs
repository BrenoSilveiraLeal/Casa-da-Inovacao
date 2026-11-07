async (page) => {
 const results=[];
 for(const width of [320,390,640,768,860,1024,1366,1920,2560]) {
  await page.setViewportSize({width,height:900});
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(1200);
  results.push(await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,titleClip:document.querySelector('.hero-title .line:last-child span').getBoundingClientRect().width>document.querySelector('.hero-title').clientWidth,history:{width:document.querySelector('.historia-track').getBoundingClientRect().width,direction:getComputedStyle(document.querySelector('.historia-track')).flexDirection},cards:getComputedStyle(document.querySelector('.cards')).gridTemplateColumns})));
 }
 return results;
}

