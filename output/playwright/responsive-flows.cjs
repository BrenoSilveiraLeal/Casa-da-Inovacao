async (page) => {
 const results=[];
 await page.setViewportSize({width:844,height:390});
 await page.goto('http://localhost:3000');
 await page.getByRole('button',{name:'Abrir menu',exact:true}).click();
 await page.locator('.menu a').last().scrollIntoViewIfNeeded();
 results.push({landscapeMenu:await page.locator('.menu a').last().isVisible()});
 await page.screenshot({path:'output/playwright/responsive-landscape-menu.png'});
 await page.setViewportSize({width:1366,height:768});
 results.push(await page.evaluate(()=>({desktopMenuClosed:!document.body.classList.contains('menu-open'),scrollUnlocked:!document.body.classList.contains('is-locked')})));
 await page.setViewportSize({width:390,height:844});
 await page.locator('#cursos').scrollIntoViewIfNeeded();
 await page.locator('.card').first().click();
 await page.waitForTimeout(300);
 results.push({courseModal:await page.locator('dialog').isVisible()});
 await page.screenshot({path:'output/playwright/responsive-course-mobile.png'});
 await page.getByRole('button',{name:'Fechar',exact:true}).click();
 await page.goto('http://localhost:3000/pre-matricula');
 results.push(await page.evaluate(()=>({registrationWidth:innerWidth,scroll:document.documentElement.scrollWidth,cards:document.querySelectorAll('.unit-select-card').length})));
 await page.screenshot({path:'output/playwright/responsive-registration-mobile.png',fullPage:true});
 await page.goto('http://localhost:3000');
 await page.locator('#historia').scrollIntoViewIfNeeded();
 await page.waitForTimeout(300);
 await page.screenshot({path:'output/playwright/responsive-history-mobile.png'});
 return results;
}
