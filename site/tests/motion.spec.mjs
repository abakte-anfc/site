import {test,expect} from '@playwright/test';
test('fundos removidos e modalidades com LogoLoop',async({page})=>{
 const backgrounds=[];page.on('request',r=>{if(r.url().includes('fundo-'))backgrounds.push(r.url());});
 await page.goto('/');await expect(page.locator('[data-background-video]')).toHaveCount(0);
 await page.locator('.services-band').scrollIntoViewIfNeeded();
 const loop=page.locator('.services-band .logoloop');await expect(loop).toBeVisible();
 await expect(loop.locator('ul').first()).toContainText('Dança');await expect(loop.locator('ul').first()).toContainText('Teatro');await expect(loop.locator('ul').first()).toContainText('Música');
 const track=loop.locator('.logoloop__track');await expect.poll(()=>track.getAttribute('style')).toMatch(/translate3d/);
 await expect(page.locator('#modalidades .logoloop')).toHaveCount(0);
 await expect(page.locator('.services-loop button')).toHaveCount(0);
 expect(backgrounds).toEqual([]);
});
test('LogoLoop fica estático com movimento reduzido',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');await page.locator('.services-band').scrollIntoViewIfNeeded();
 await expect(page.locator('.services-band .logoloop')).toBeVisible();
 await expect(page.locator('.services-loop button')).toHaveCount(0);
 expect(await page.locator('.services-band .logoloop__track').evaluate(e=>getComputedStyle(e).transform)).toBe('matrix(1, 0, 0, 1, 0, 0)');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
});
test('carrossel HTML alternativo avança, volta, responde ao teclado e ao deslize',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.setViewportSize({width:390,height:844});await page.goto('/');
 const gallery=page.getByRole('region',{name:'Galeria de registros'});
 await gallery.scrollIntoViewIfNeeded();
 const track=page.locator('#galeria-fotos');
 await page.getByRole('button',{name:'Próxima foto',exact:true}).click();
 await expect.poll(()=>track.evaluate(e=>e.scrollLeft)).toBeGreaterThan(100);
 await expect(page.locator('[data-carousel-status]')).toContainText('2');
 await page.getByRole('button',{name:'Foto anterior',exact:true}).click();
 await expect.poll(()=>track.evaluate(e=>e.scrollLeft)).toBeLessThan(10);
 await track.focus();await page.keyboard.press('ArrowRight');
 await expect.poll(()=>track.evaluate(e=>e.scrollLeft)).toBeGreaterThan(100);
 await track.evaluate(e=>e.scrollTo({left:e.scrollWidth,behavior:'instant'}));
 await expect(page.locator('[data-carousel-status]')).toContainText('6');
 await expect(page.getByRole('button',{name:'Próxima foto',exact:true})).toBeDisabled();
});
test('entrada em cascata é aplicada uma vez aos elementos visíveis',async({page})=>{
 await page.goto('/');
 await expect(page.locator('.hero-copy h1')).toHaveClass(/cascade-visible/);
 expect(await page.locator('.hero-copy h1').evaluate(e=>getComputedStyle(e).animationName)).toBe('cascade-in');
 await page.locator('#registros').scrollIntoViewIfNeeded();
 await expect(page.locator('.gallery figure').first()).toHaveClass(/cascade-visible/);
});