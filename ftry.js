const readlineSync = require('readline-sync');
const puppeteer = require('puppeteer-extra');
var random_name = require('node-random-name');
const fs = require('fs');
const delay = require('delay');
const S = require('string'  );
const { error, Console } = require('console');
const { type } = require('os');
var no = 1;
var urutan = 2;
var pwd2 ='';
var adduser = 2;
var moment = require("moment");
var figlet = require('figlet');
var chalk = require('chalk');
var fetch = require('node-fetch');
var request = require('request');
const { text } = require('figlet');
var txt = '.txt';
var val = Math.floor(1000 + Math.random() * 9000);


(async () => {
	while(true){
    console.log(
        chalk.red(
        figlet.textSync('> Tools', { horizontalLayout: 'fitted' })
     )
    );
    console.log('      ',chalk.green('            By Tuys Store'))
	console.log('\n')
    console.log('[+] Choose Type Input\n(1) TXT FILE \n(2) Manual Input \n(3) Cek Harga Netflix Itemku')
	//console.log('[+] Tools Pekerja 1.) Check Plan kapan abis\n2.) Change Password\n3.) Delete History > Logout All\n4.) Stress Login\n5.) Just Logout All Device\n6.) Under Maintenance\n');
	var pilihan = readlineSync.question('Pilih Apa : ');
    console.log('\n');

    if (pilihan == 1){
        console.clear()
        console.log('',chalk.red('Menu Input File From TXT'))
        console.log('[+] Tools Pekerja \n(1) SOP Akun\n(2) Auto Delete Pin (pilih Profile)\n(3) Auto Add Pin    (Pilih Profile)\n(4) Auto Send Forgot Password Link\n(5) Change Password\n\n[+] Checker \n(6) All Cek Akun\n(7) Akun Finder\n(8) Auto Check Akun Renew atau Tidak\n(9) Check Plan kapan abis\n\n[+] Attack\n(10) Delete History > Logout All\n(11) Stress Login\n(12) Just Logout All Device\n\n[+] Future Fiture\n[-] Auto Rename default + delete pin\n[-] Auto Rename Profile ( Input Name )');    
        var menup = readlineSync.question('[+] Pilih Apa : ');
        
        if (menup == 1){
            var aww         = readlineSync.question('Input File Akun   : ')+txt;
            var ganti       = readlineSync.question('[+] ganti pwd     ? ');
            if ( ganti =='y'){
                var newpwd 	= readlineSync.question('[+] Password Baru : ');
            }
            console.log('\n');
            const read = fs.readFileSync(aww, 'UTF-8');
            const list = read.split(/\r?\n/);
            for (var i = 0; i < list.length; i++) {
            var email = list[i].split('|')[0];
            var password = list[i].split('|')[1];
            const $options = { waitUntil: 'networkidle2' };
            const browser = await puppeteer.launch({headless: false,
                args: ['--window-size=499,632',],
                defaultViewport: null,
                });
            const page = await browser.newPage();

            await page.goto('https://www.netflix.com/id-en/login', $options);
            await delay(3000)
            try {
                const emailField = await page.$('input[type=text]')
                await emailField.type(email)
                await emailField.dispose()
    
                const passwordField = await page.$('input[type=password]')
                await passwordField.type(password)
                await passwordField.dispose()
    
                await delay(2000)
                const buttonField = await page.$('button[type=submit]')
                await buttonField.click()
                await buttonField.dispose()
                
            }catch {
                const ipip = await page.evaluate(() => {
                    return document.querySelector('body > div.error-page.nfse > div.content > h1').innerText;
                })
                console.log('[+] Notice : ',ipip )
                console.log('[+] Input "y" untuk melanjutkan')
                var resetip  = readlineSync.question('[+] Sudah Reset IP ? ');
                if (resetip == 'y' || resetip == 'Y'){
    
                await page.goto('https://www.netflix.com/id-en/login', $options);
                
                const emailField = await page.$('input[type=text]')
                await emailField.type(email)
                await emailField.dispose()
    
                const passwordField = await page.$('input[type=password]')
                await passwordField.type(password)
                await passwordField.dispose()
    
                await delay(2000)
                const buttonField = await page.$('button[type=submit]')
                await buttonField.click()
                await buttonField.dispose()
                } 
            }  
        console.log('[+] Waiting For Login')
            try {
            await page.waitForSelector('#appMountPoint > div > div.login-body > div > div > div.hybrid-login-form-main > div > div.ui-message-contents', {visible:true, timeout:5000})
                await delay(2000)
            const noticeLogin = await page.evaluate(() => {
                return document.querySelector('#appMountPoint > div > div.login-body > div > div > div.hybrid-login-form-main > div > div.ui-message-contents').innerText;
            })
                await delay(2000)
            console.log('[' + no + ']', email + '|' + password, 'Information : ', noticeLogin)
            no++
            } catch (err) {
            console.log('[' + no + ']', email + '|' + password, 'Information : Sukses Login')
            no++
            await delay(2000)
            if (page.url().includes('browse')) {
                if( ganti=='y'){
					try {
                        await page.goto('https://www.netflix.com/password', $options)
                        await delay(2000)
                    
                        const passwordField = await page.$('input[type=password]')
                            await passwordField.type(password)
                            await passwordField.dispose()
                        
                        const passwordBaru = await page.$('input[name=newPassword]')
                            await passwordBaru.type(newpwd)
                            await passwordBaru.dispose()
                        
                        const confirmnewpassword = await page.$('input[name=confirmNewPassword]')
                            await confirmnewpassword.type(newpwd)
                            await confirmnewpassword.dispose()
                        
                        await delay(1000)
                        const buttonField = await page.$('button[type=submit]')
                            await buttonField.click()
                            await buttonField.dispose()
                            
                        console.log(' Successfuly Change Password')
                        fs.appendFileSync('hasil ganti password.txt', email + '|' + newpwd + "\n");
                        console.log(' Successfuly Save Information\n')
                        
                        await delay(2000)
                    } catch (err) {
                        console.log('Tidak Berhasil Ganti Password\n')
                        await delay(2000)
                        }
                    }
                    await page.goto('https://www.netflix.com/profiles/manage', $options)
                    //rename profile 1
                    await page.waitForSelector('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > div > ul > li:nth-child(1) > div > a > div > div.svg-edit-overlay')
                    const rename1 = await page.$('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > div > ul > li:nth-child(1) > div > a > div > div.svg-edit-overlay')
                    await rename1.click()
                    
                    await delay(1000)
                    const input = await page.$('#profile-name-entry');
                    await input.click({ clickCount: 3 })
                    await input.type("1");
                    await delay(1000)
                    await page.keyboard.press('Enter');
                    console.log('    Successfully Rename Profile 1')


                    //delete history nonton
                    await delay(1000)
                    await page.goto('https://www.netflix.com/account', $options)
                    await delay(2000)
                    
                    await page.waitForSelector('#profile_0')
                    panah = await page.$('#profile_0')
                    await panah.click()
                    await delay(2000)

                    await page.waitForSelector('#profile_0 > ul > li:nth-child(4) > a > div.profile-change')
                    const profile1 = await page.$('#profile_0 > ul > li:nth-child(4) > a > div.profile-change')
                    await profile1.click()
                    await delay(2000)

                    try 
                    {
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > ul > li > p', {visible:true, timeout:3000})
                        const noticeInfo = await page.evaluate(() => {
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > ul > li > p').innerText;
                        })
                        
                        await page.waitForSelector('h1[data-uia="viewing-activity-header"]', {visible:true, timeout:3000})
                        await delay(2000)
                        const activity = await page.evaluate(() => {
                            return document.querySelector('h1[data-uia="viewing-activity-header"]').innerText;
                        })
                        await delay(2000)
                        console.log('   ',activity,noticeInfo)
                        //console.log('')
                        //await page.goto('https://www.netflix.com/clearcookies', $options)
                        //await delay(2000)
                        //await browser.close();
                        //no history movies
                    } 
                    
                    catch (err) 
                    {
                        await page.waitForSelector('h1[data-uia="viewing-activity-header"]', {visible:true, timeout:3000})
                        await delay(2000)
                        const activity = await page.evaluate(() => {
                            return document.querySelector('h1[data-uia="viewing-activity-header"]').innerText;
                        })
                        await delay(2000)

                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > ul > li:nth-child(1) > div.col.title', {visible:true, timeout:1000})
                        const ada = await page.$('#appMountPoint > div > div > div.bd > div > div > ul > li:nth-child(1) > div.col.title')
                        if (ada) 
                        {
                            console.log('    Have Activity Account',activity)
                        }
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div:nth-child(2) > a.viewing-activity-footer-hide', {visible:true, timeout:4000})
                        await delay(2000)
                        const deleteActivity = await page.$('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div:nth-child(2) > a.viewing-activity-footer-hide')
                        await deleteActivity.click()
                        await delay(2000)

                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div.nfmodal.large > div > footer > div > button.btn.modal-action-button.btn-blue.btn-small', {visible:true, timeout:4000})
                        await delay(2000)
                        const confirmDelete = await page.$('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div.nfmodal.large > div > footer > div > button.btn.modal-action-button.btn-blue.btn-small')
                        await confirmDelete.click()
                        await delay(2000)

                        console.log('    Successfully Deleted Activity',activity)
                        console.log('')
                    }
                    //delete history nonton sampe sini


                    
                    //ini untuk menghapus pin profile 1
                    await delay(1000)
                    await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)

                    await page.waitForSelector('#profile_0')
                    var panah = await page.$('#profile_0')
                    await panah.click()

                    await page.waitForSelector('#profile_0 > ul > li:nth-child(3) > a > div.profile-change')
                    var profile = await page.$('#profile_0 > ul > li:nth-child(3) > a > div.profile-change')
                    await profile.click()

                    await page.waitForSelector('#input-account-content-restrictions')
                    var loginPassword = await page.$('#input-account-content-restrictions')
                    if( ganti=='y'){
                        await loginPassword.type(newpwd)
                    }
                    else{
                        await loginPassword.type(password)
                    }
                    await delay(2000)

                    await page.keyboard.press('Enter');

                    try {
                    await page.waitForSelector('#input-account-content-restrictions')
                    var loginPassword = await page.$('#input-account-content-restrictions')
                    if( ganti=='y'){
                        await loginPassword.type(newpwd)
                    }
                    else{
                        await loginPassword.type(password)
                    }

                    await delay(2000)

                    await page.keyboard.press('Enter');
                    } catch (err) {

                    }
                    await delay(2000)
                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    var user = await page.evaluate(() => {
                        return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label').innerText;
                    })
                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    var confirmPin = await page.$('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    await confirmPin.click()
                    
                    await delay(1000)
                    await page.keyboard.press('Tab');
                    await page.keyboard.press('Enter');
                    
                    
                    await page.waitForSelector('button[class="btn btn-gray btn-small"]')
                    var confirm = await page.$('button[class="btn btn-gray btn-small"]')
                    await confirm.click()
                    console.log('    Successfully Delete Pin Profile 1')
                    //batas menghapus pin profile 1
                    
                    //await page.goto('https://www.netflix.com/profiles/manage', $options)
                    while(true) {
                    try {
                    await page.goto('https://www.netflix.com/profiles/manage', $options)

                    await page.waitForSelector('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > div > ul > li:nth-child(2) > div > a > div > div.svg-edit-overlay', {visible:true, timeout:1000});
                    const deleteProfile = await page.$('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > div > ul > li:nth-child(2) > div > a > div > div.svg-edit-overlay')
                    await deleteProfile.click()

                    await page.waitForSelector('button[data-uia="profile-delete-button"]', {visible:true, timeout:1000})
                    const deleteProfile1 = await page.$('button[data-uia="profile-delete-button"]')
                    await deleteProfile1.click()

                    await delay(3000)
                    const noticeUser = await page.evaluate(() => {
                        return document.querySelector('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > div > div > div.main-profile-avatar > div').innerText;
                    })
                    await page.waitForSelector('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > div > span:nth-child(4)', {visible:true, timeout:1000});
                    const confirmDelete = await page.$('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > div > span:nth-child(4)')
                    await confirmDelete.click()

                    try {
                        await page.waitForSelector('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > span > a', {visible:true, timeout:1000});
                        const deleteProfile3 = await page.$('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > span > a')
                        await deleteProfile3.click()

                    console.log('    Successfully Delete User',noticeUser);
                    } catch (err) {
                    console.log('    Failed Delete User')
                    break;
                    }
                    } catch (err) {
                        console.log('    Not User Found')
                        break;
                    }
                    urutan++
                    }
				//await page.goto('https://www.netflix.com/clearcookies', $options)
				//await delay(2000)
				//await browser.close();
				//break;
				//await page.goto('https://www.netflix.com/profiles/manage', $options)
					while(true) {
					try {
					await page.waitForSelector('div[class="addProfileIcon icon-tvuiAdd"]', {visible:true, timeout:1000});
					const addProfile = await page.$('div[class="addProfileIcon icon-tvuiAdd"]')
					await addProfile.click()

					await page.waitForSelector('#add-profile-name', {visible:true, timeout:1000})
					const nameProfile1 = await page.$('#add-profile-name')
					await nameProfile1.type(''+adduser)
					await delay(2000)
					await page.waitForSelector('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > div > span.profile-button.preferred-action', {visible:true, timeout:1000});
					const submitProfile = await page.$('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > div > span.profile-button.preferred-action')
					await submitProfile.click()

					try {
						await page.waitForSelector('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > div > div > div.profile-add-parent > p', {visible:true, timeout:1000})
						const noticFail = await page.evaluate(() => {
							return document.querySelector('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > div > div > div.profile-add-parent > p').innerText;
						})
						console.log('    '+noticFail)
					} catch (err) {
					console.log('    Successfully Add '+adduser);
					}
					} catch (err) {
						console.log('    Failed Add User\n')
						adduser = 2;
                        await delay(1000)
						await page.goto('https://www.netflix.com/clearcookies', $options)
						await delay(2000)
						await browser.close();
						break;
						}
					adduser++
					}
				}
		    }
        }
                    
                    //setelah delete profile 12345 lalu hapus history profile 1 doang
                    if (adduser = 2)
                    {
                        await delay(1000)
                        await page.goto('https://www.netflix.com/account', $options)
                        await delay(2000)
                        
                        await page.waitForSelector('#profile_0')
                        panah = await page.$('#profile_0')
                        await panah.click()
                        await delay(2000)

                        await page.waitForSelector('#profile_0 > ul > li:nth-child(4) > a > div.profile-change')
                        const profile1 = await page.$('#profile_0 > ul > li:nth-child(4) > a > div.profile-change')
                        await profile1.click()

                        await delay(2000)
                        try {
                            await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > ul > li > p', {visible:true, timeout:3000})
                            const noticeInfo = await page.evaluate(() => {
                                return document.querySelector('#appMountPoint > div > div > div.bd > div > div > ul > li > p').innerText;
                            })
                            
                            await page.waitForSelector('h1[data-uia="viewing-activity-header"]', {visible:true, timeout:3000})
                            await delay(2000)
                            const activity = await page.evaluate(() => {
                                return document.querySelector('h1[data-uia="viewing-activity-header"]').innerText;
                            })
                            await delay(2000)
                            console.log('   ',activity,noticeInfo)
                            await page.goto('https://www.netflix.com/clearcookies', $options)
                            await delay(2000)
                            await browser.close();
                            //no history movies

                        } catch (err) {
                            await page.waitForSelector('h1[data-uia="viewing-activity-header"]', {visible:true, timeout:3000})
                            await delay(2000)
                            const activity = await page.evaluate(() => {
                                return document.querySelector('h1[data-uia="viewing-activity-header"]').innerText;
                            })
                            await delay(2000)

                            await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > ul > li:nth-child(1) > div.col.title', {visible:true, timeout:1000})
                            const ada = await page.$('#appMountPoint > div > div > div.bd > div > div > ul > li:nth-child(1) > div.col.title')
                            if (ada) {
                                console.log('    Have Activity Account',activity)
                            }
                            await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div:nth-child(2) > a.viewing-activity-footer-hide', {visible:true, timeout:4000})
                            await delay(2000)
                            const deleteActivity = await page.$('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div:nth-child(2) > a.viewing-activity-footer-hide')
                            await deleteActivity.click()
                            await delay(2000)

                            await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div.nfmodal.large > div > footer > div > button.btn.modal-action-button.btn-blue.btn-small', {visible:true, timeout:4000})
                            await delay(2000)
                            const confirmDelete = await page.$('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div.nfmodal.large > div > footer > div > button.btn.modal-action-button.btn-blue.btn-small')
                            await confirmDelete.click()
                            await delay(2000)

                            console.log('    Successfully Deleted Activity',activity)
                            await page.goto('https://www.netflix.com/clearcookies', $options)
                            await delay(2000)
                            await browser.close();
                            //with history movies
			    	    }				
			        }
	            

    
        }else if (menup == 2){
            var aww     = readlineSync.question('Input File Akun        : ')+txt;
            var pilihp  = readlineSync.question('profile [1-5 or all]   : ');
            var fuck    = readlineSync.question('Default Profile [Y/N]  : ');

            console.log('\n');
            const read = fs.readFileSync(aww, 'UTF-8');
            const list = read.split(/\r?\n/);
            for (var i = 0; i < list.length; i++) {
            var email = list[i].split('|')[0];
            var password = list[i].split('|')[1];
            const $options = { waitUntil: 'networkidle2' };
            const browser = await puppeteer.launch({headless: false,
                args: ['--window-size=499,632',],
                defaultViewport: null,
                });
            const page = await browser.newPage();

            await page.goto('https://www.netflix.com/id-en/login', $options);
        await delay(3000)
        try {

            const emailField = await page.$('input[type=text]')
            await emailField.type(email)
            await emailField.dispose()

            const passwordField = await page.$('input[type=password]')
            await passwordField.type(password)
            await passwordField.dispose()

            await delay(2000)
            const buttonField = await page.$('button[type=submit]')
            await buttonField.click()
            await buttonField.dispose()
            
        }catch {
            const ipip = await page.evaluate(() => {
                return document.querySelector('body > div.error-page.nfse > div.content > h1').innerText;
            })
            console.log('[+] Notice : ',ipip )
            console.log('[+] Input "y" untuk melanjutkan')
            var resetip  = readlineSync.question('[+] Sudah Reset IP ? ');
            if (resetip == 'y' || resetip == 'Y'){

            await page.goto('https://www.netflix.com/id-en/login', $options);
            
            const emailField = await page.$('input[type=text]')
            await emailField.type(email)
            await emailField.dispose()

            const passwordField = await page.$('input[type=password]')
            await passwordField.type(password)
            await passwordField.dispose()

            await delay(2000)
            const buttonField = await page.$('button[type=submit]')
            await buttonField.click()
            await buttonField.dispose()
            } 
        }  
        console.log('[+] Waiting For Login')
        try {
            await page.waitForSelector('#appMountPoint > div > div.login-body > div > div > div.hybrid-login-form-main > div > div.ui-message-contents', {visible:true, timeout:5000})
                await delay(2000)
            const noticeLogin = await page.evaluate(() => {
                return document.querySelector('#appMountPoint > div > div.login-body > div > div > div.hybrid-login-form-main > div > div.ui-message-contents').innerText;
            })
                await delay(2000)
            console.log('[' + no + ']', email + '|' + password, 'Information : ', noticeLogin)
            no++
        } catch (err) {
            console.log('[' + no + ']', email + '|' + password, 'Information : Sukses Login')
            no++
            await delay(2000)
            if (page.url().includes('browse')) {
                if(fuck == 'y' || fuck == 'Y'){
                    //rename profile 1
                    await page.goto('https://www.netflix.com/profiles/manage', $options)
                    await page.waitForSelector('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > div > ul > li:nth-child(1) > div > a > div > div.svg-edit-overlay')
                    const rename1 = await page.$('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > div > ul > li:nth-child(1) > div > a > div > div.svg-edit-overlay')
                    await rename1.click()
                    
                    await delay(1000)
                    const input = await page.$('#profile-name-entry');
                    await input.click({ clickCount: 3 })
                    await input.type("1");
                    await delay(1000)
                    await page.keyboard.press('Enter');
                    console.log('    Successfully Rename Profile 1')

                    //rename profile 2
                    //await page.goto('https://www.netflix.com/profiles/manage', $options)
                    await page.waitForSelector('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > div > ul > li:nth-child(2) > div > a > div > div.svg-edit-overlay')
                    const rename2 = await page.$('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > div > ul > li:nth-child(2) > div > a > div > div.svg-edit-overlay')
                    await rename2.click()
                    
                    await delay(1000)
                    const input2 = await page.$('#profile-name-entry');
                    await input2.click({ clickCount: 3 })
                    await input2.type("2");
                    await delay(1000)
                    await page.keyboard.press('Enter');
                    console.log('    Successfully Rename Profile 2')

                    //rename profile 3
                    await page.goto('https://www.netflix.com/profiles/manage', $options)
                    await page.waitForSelector('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > div > ul > li:nth-child(3) > div > a > div > div.svg-edit-overlay')
                    const rename3 = await page.$('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > div > ul > li:nth-child(3) > div > a > div > div.svg-edit-overlay')
                    await rename3.click()
                    
                    await delay(1000)
                    const input3 = await page.$('#profile-name-entry');
                    await input3.click({ clickCount: 3 })
                    await input3.type("3");
                    await delay(1000)
                    await page.keyboard.press('Enter');
                    console.log('    Successfully Rename Profile 3')

                    //rename profile 4
                    await page.goto('https://www.netflix.com/profiles/manage', $options)
                    await page.waitForSelector('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > div > ul > li:nth-child(4) > div > a > div > div.svg-edit-overlay')
                    const rename4 = await page.$('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > div > ul > li:nth-child(4) > div > a > div > div.svg-edit-overlay')
                    await rename4.click()
                    
                    await delay(1000)
                    const input4 = await page.$('#profile-name-entry');
                    await input4.click({ clickCount: 3 })
                    await input4.type("4");
                    await delay(1000)
                    await page.keyboard.press('Enter');
                    console.log('    Successfully Rename Profile 4')

                    //rename profile 5
                    await page.goto('https://www.netflix.com/profiles/manage', $options)
                    await page.waitForSelector('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > div > ul > li:nth-child(5) > div > a > div > div.svg-edit-overlay')
                    const rename5 = await page.$('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > div > ul > li:nth-child(5) > div > a > div > div.svg-edit-overlay')
                    await rename5.click()
                    
                    await delay(1000)
                    const input5 = await page.$('#profile-name-entry');
                    await input5.click({ clickCount: 3 })
                    await input5.type("5");
                    await delay(1000)
                    await page.keyboard.press('Enter');
                    console.log('    Successfully Rename Profile 5')
                        }
                    
                    if(pilihp ==  1){
                        await delay(500)
                        await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)

                        await page.waitForSelector('#profile_0')
                        var panah = await page.$('#profile_0')
                        await panah.click()

                        await page.waitForSelector('#profile_0 > ul > li:nth-child(3) > a > div.profile-change')
                        var profile = await page.$('#profile_0 > ul > li:nth-child(3) > a > div.profile-change')
                        await profile.click()

                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');

                        try {
                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');
                        } catch (err) {

                        }
                        await delay(2000)
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var user = await page.evaluate(() => {
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label').innerText;
                        })
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var confirmPin = await page.$('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        await confirmPin.click()
                        
                        await delay(1000)
                        await page.keyboard.press('Tab');
                        await page.keyboard.press('Enter');
                        
                        
                        await page.waitForSelector('button[class="btn btn-gray btn-small"]')
                        var confirm = await page.$('button[class="btn btn-gray btn-small"]')
                        await confirm.click()
                        console.log('    Successfully Delete Pin Profile 1')
                        await page.goto('https://www.netflix.com/clearcookies', $options)
                            await delay(2000)
                            await browser.close();
                        //batas menghapus pin profile 1
                        
                    }else if (pilihp == 2){
                        await delay(500)
                        await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)

                        await page.waitForSelector('#profile_1')
                        var panah = await page.$('#profile_1')
                        await panah.click()

                        await page.waitForSelector('#profile_1 > ul > li:nth-child(3) > a > div.profile-change')
                        var profile = await page.$('#profile_1 > ul > li:nth-child(3) > a > div.profile-change')
                        await profile.click()

                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');

                        try {
                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');
                        } catch (err) {

                        }
                        await delay(2000)
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var user = await page.evaluate(() => {
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label').innerText;
                        })
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var confirmPin = await page.$('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        await confirmPin.click()
                        
                        await delay(1000)
                        await page.keyboard.press('Tab');
                        await page.keyboard.press('Enter');
                        
                        
                        await page.waitForSelector('button[class="btn btn-gray btn-small"]')
                        var confirm = await page.$('button[class="btn btn-gray btn-small"]')
                        await confirm.click()
                        console.log('    Successfully Delete Pin Profile 2')
                        await page.goto('https://www.netflix.com/clearcookies', $options)
                            await delay(2000)
                            await browser.close();
                        //batas menghapus pin profile 2
                        
                    }else if (pilihp == 3){
                    await delay(500)
                    await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)

                    await page.waitForSelector('#profile_2')
                    var panah = await page.$('#profile_2')
                    await panah.click()

                    await page.waitForSelector('#profile_2 > ul > li:nth-child(3) > a > div.profile-change')
                    var profile = await page.$('#profile_2 > ul > li:nth-child(3) > a > div.profile-change')
                    await profile.click()

                    await page.waitForSelector('#input-account-content-restrictions')
                    var loginPassword = await page.$('#input-account-content-restrictions')
                    await loginPassword.type(password)

                    await delay(2000)

                    await page.keyboard.press('Enter');

                    try {
                    await page.waitForSelector('#input-account-content-restrictions')
                    var loginPassword = await page.$('#input-account-content-restrictions')
                    await loginPassword.type(password)

                    await delay(2000)

                    await page.keyboard.press('Enter');
                    } catch (err) {

                    }
                    await delay(2000)
                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    var user = await page.evaluate(() => {
                        return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label').innerText;
                    })
                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    var confirmPin = await page.$('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    await confirmPin.click()
                    
                    await delay(1000)
                    await page.keyboard.press('Tab');
                    await page.keyboard.press('Enter');
                    
                    
                    await page.waitForSelector('button[class="btn btn-gray btn-small"]')
                    var confirm = await page.$('button[class="btn btn-gray btn-small"]')
                    await confirm.click()
                    console.log('    Successfully Delete Pin Profile 3')
                    await page.goto('https://www.netflix.com/clearcookies', $options)
                        await delay(2000)
                        await browser.close();
                    //batas menghapus pin profile 3
                    
                    }else if (pilihp == 4){
                    await delay(500)
                    await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)

                    await page.waitForSelector('#profile_3')
                    var panah = await page.$('#profile_3')
                    await panah.click()

                    await page.waitForSelector('#profile_3 > ul > li:nth-child(3) > a > div.profile-change')
                    var profile = await page.$('#profile_3 > ul > li:nth-child(3) > a > div.profile-change')
                    await profile.click()

                    await page.waitForSelector('#input-account-content-restrictions')
                    var loginPassword = await page.$('#input-account-content-restrictions')
                    await loginPassword.type(password)

                    await delay(2000)

                    await page.keyboard.press('Enter');

                    try {
                    await page.waitForSelector('#input-account-content-restrictions')
                    var loginPassword = await page.$('#input-account-content-restrictions')
                    await loginPassword.type(password)

                    await delay(2000)

                    await page.keyboard.press('Enter');
                    } catch (err) {

                    }
                    await delay(2000)
                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    var user = await page.evaluate(() => {
                        return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label').innerText;
                    })
                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    var confirmPin = await page.$('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    await confirmPin.click()
                    
                    await delay(1000)
                    await page.keyboard.press('Tab');
                    await page.keyboard.press('Enter');
                    
                    
                    await page.waitForSelector('button[class="btn btn-gray btn-small"]')
                    var confirm = await page.$('button[class="btn btn-gray btn-small"]')
                    await confirm.click()
                    console.log('    Successfully Delete Pin Profile 4')
                    await page.goto('https://www.netflix.com/clearcookies', $options)
                        await delay(2000)
                        await browser.close();
                    //batas menghapus pin profile 4
                    
                    }else if (pilihp == 5){
                    await delay(500)
                    await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)

                    await page.waitForSelector('#profile_4')
                    var panah = await page.$('#profile_4')
                    await panah.click()

                    await page.waitForSelector('#profile_4 > ul > li:nth-child(3) > a > div.profile-change')
                    var profile = await page.$('#profile_4 > ul > li:nth-child(3) > a > div.profile-change')
                    await profile.click()

                    await page.waitForSelector('#input-account-content-restrictions')
                    var loginPassword = await page.$('#input-account-content-restrictions')
                    await loginPassword.type(password)

                    await delay(2000)

                    await page.keyboard.press('Enter');

                    try {
                    await page.waitForSelector('#input-account-content-restrictions')
                    var loginPassword = await page.$('#input-account-content-restrictions')
                    await loginPassword.type(password)

                    await delay(2000)

                    await page.keyboard.press('Enter');
                    } catch (err) {

                    }
                    await delay(2000)
                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    var user = await page.evaluate(() => {
                        return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label').innerText;
                    })
                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    var confirmPin = await page.$('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    await confirmPin.click()
                    
                    await delay(1000)
                    await page.keyboard.press('Tab');
                    await page.keyboard.press('Enter');
                    
                    
                    await page.waitForSelector('button[class="btn btn-gray btn-small"]')
                    var confirm = await page.$('button[class="btn btn-gray btn-small"]')
                    await confirm.click()
                    console.log('    Successfully Delete Pin Profile 5')
                    await page.goto('https://www.netflix.com/clearcookies', $options)
                        await delay(2000)
                        await browser.close();
                    //batas menghapus pin profile 5
                    
                    }else if (pilihp == 'all'){
                        await delay(500)
                        await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)

                        await page.waitForSelector('#profile_0')
                        var panah = await page.$('#profile_0')
                        await panah.click()

                        await page.waitForSelector('#profile_0 > ul > li:nth-child(3) > a > div.profile-change')
                        var profile = await page.$('#profile_0 > ul > li:nth-child(3) > a > div.profile-change')
                        await profile.click()

                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');

                        try {
                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');
                        } catch (err) {

                        }
                        await delay(2000)
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var user = await page.evaluate(() => {
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label').innerText;
                        })
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var confirmPin = await page.$('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        await confirmPin.click()
                        
                        await delay(1000)
                        await page.keyboard.press('Tab');
                        await page.keyboard.press('Enter');
                        
                        
                        await page.waitForSelector('button[class="btn btn-gray btn-small"]')
                        var confirm = await page.$('button[class="btn btn-gray btn-small"]')
                        await confirm.click()
                        console.log('    Successfully Delete Pin Profile 1')
                        //batas menghapus pin profile 1
                        
                        await delay(500)
                        await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)

                        await page.waitForSelector('#profile_1')
                        var panah = await page.$('#profile_1')
                        await panah.click()

                        await page.waitForSelector('#profile_1 > ul > li:nth-child(3) > a > div.profile-change')
                        var profile = await page.$('#profile_1 > ul > li:nth-child(3) > a > div.profile-change')
                        await profile.click()

                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');

                        try {
                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');
                        } catch (err) {

                        }
                        await delay(2000)
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var user = await page.evaluate(() => {
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label').innerText;
                        })
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var confirmPin = await page.$('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        await confirmPin.click()
                        
                        await delay(1000)
                        await page.keyboard.press('Tab');
                        await page.keyboard.press('Enter');
                        
                        
                        await page.waitForSelector('button[class="btn btn-gray btn-small"]')
                        var confirm = await page.$('button[class="btn btn-gray btn-small"]')
                        await confirm.click()
                        console.log('    Successfully Delete Pin Profile 2')
                        //batas menghapus pin profile 2
                        
                        await delay(500)
                        await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)

                        await page.waitForSelector('#profile_2')
                        var panah = await page.$('#profile_2')
                        await panah.click()

                        await page.waitForSelector('#profile_2 > ul > li:nth-child(3) > a > div.profile-change')
                        var profile = await page.$('#profile_2 > ul > li:nth-child(3) > a > div.profile-change')
                        await profile.click()

                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');

                        try {
                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');
                        } catch (err) {

                        }
                        await delay(2000)
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var user = await page.evaluate(() => {
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label').innerText;
                        })
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var confirmPin = await page.$('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        await confirmPin.click()
                        
                        await delay(1000)
                        await page.keyboard.press('Tab');
                        await page.keyboard.press('Enter');
                        
                        
                        await page.waitForSelector('button[class="btn btn-gray btn-small"]')
                        var confirm = await page.$('button[class="btn btn-gray btn-small"]')
                        await confirm.click()
                        console.log('    Successfully Delete Pin Profile 3')
                        //batas menghapus pin profile 3
                        
                        await delay(500)
                        await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)

                        await page.waitForSelector('#profile_3')
                        var panah = await page.$('#profile_3')
                        await panah.click()

                        await page.waitForSelector('#profile_3 > ul > li:nth-child(3) > a > div.profile-change')
                        var profile = await page.$('#profile_3 > ul > li:nth-child(3) > a > div.profile-change')
                        await profile.click()

                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');

                        try {
                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');
                        } catch (err) {

                        }
                        await delay(2000)
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var user = await page.evaluate(() => {
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label').innerText;
                        })
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var confirmPin = await page.$('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        await confirmPin.click()
                        
                        await delay(1000)
                        await page.keyboard.press('Tab');
                        await page.keyboard.press('Enter');
                        
                        
                        await page.waitForSelector('button[class="btn btn-gray btn-small"]')
                        var confirm = await page.$('button[class="btn btn-gray btn-small"]')
                        await confirm.click()
                        console.log('    Successfully Delete Pin Profile 4')
                        //batas menghapus pin profile 4
                        
                        await delay(500)
                        await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)

                        await page.waitForSelector('#profile_4')
                        var panah = await page.$('#profile_4')
                        await panah.click()

                        await page.waitForSelector('#profile_4 > ul > li:nth-child(3) > a > div.profile-change')
                        var profile = await page.$('#profile_4 > ul > li:nth-child(3) > a > div.profile-change')
                        await profile.click()

                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');

                        try {
                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');
                        } catch (err) {

                        }
                        await delay(2000)
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var user = await page.evaluate(() => {
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label').innerText;
                        })
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var confirmPin = await page.$('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        await confirmPin.click()
                        
                        await delay(1000)
                        await page.keyboard.press('Tab');
                        await page.keyboard.press('Enter');
                        
                        
                        await page.waitForSelector('button[class="btn btn-gray btn-small"]')
                        var confirm = await page.$('button[class="btn btn-gray btn-small"]')
                        await confirm.click()
                        console.log('    Successfully Delete Pin Profile 5')
                        //batas menghapus pin profile 5
                        await page.goto('https://www.netflix.com/clearcookies', $options)
                        await delay(2000)
                        await browser.close();
                    }
                }
            }
        }
        }else if (menup == 3){
            var aww = readlineSync.question('Input File Akun : ')+txt;
            console.log('\n!!!! Isi all jika ingin menambahkan pin ke semua profile !!!!');
            var pilihp     = readlineSync.question('[+] Profile berapa? : ');
                if (pilihp == 'all'){
                    var pin1        = readlineSync.question('[+] Pin 1         : ');
                    var pin2        = readlineSync.question('[+] Pin 2         : ');
                    var pin3        = readlineSync.question('[+] Pin 3         : ');
                    var pin4        = readlineSync.question('[+] Pin 4         : ');
                    var pin5        = readlineSync.question('[+] Pin 5         : ');
                }else{
                    var pin         = readlineSync.question('[+] Pin           : ');
                }
            console.log('\n');
            const read = fs.readFileSync(aww, 'UTF-8');
            const list = read.split(/\r?\n/);
            for (var i = 0; i < list.length; i++) {
                var email = list[i].split('|')[0];
                var password = list[i].split('|')[1];
                var nama1 = random_name({
                    first: true
                });
                var nama2 = random_name({
                    last: true
                });
            var rand = Math.floor(Math.random() * 100000);
            const $options = { waitUntil: 'networkidle2' };
            //const browser = await puppeteer.launch({ headless: false });
            const browser = await puppeteer.launch({headless: false,
            args: ['--window-size=499,632',],
            defaultViewport: null,
            });
            const page = await browser.newPage();
            await page.goto('https://www.netflix.com/id-en/login', $options);
            await delay(3000)
            try {

                const emailField = await page.$('input[type=text]')
                await emailField.type(email)
                await emailField.dispose()
    
                const passwordField = await page.$('input[type=password]')
                await passwordField.type(password)
                await passwordField.dispose()
    
                await delay(2000)
                const buttonField = await page.$('button[type=submit]')
                await buttonField.click()
                await buttonField.dispose()
                
            }catch {
                const ipip = await page.evaluate(() => {
                    return document.querySelector('body > div.error-page.nfse > div.content > h1').innerText;
                })
                console.log('[+] Notice : ',ipip )
                console.log('[+] Input "y" untuk melanjutkan')
                var resetip  = readlineSync.question('[+] Sudah Reset IP ? ');
                if (resetip == 'y' || resetip == 'Y'){
    
                await page.goto('https://www.netflix.com/id-en/login', $options);
                
                const emailField = await page.$('input[type=text]')
                await emailField.type(email)
                await emailField.dispose()
    
                const passwordField = await page.$('input[type=password]')
                await passwordField.type(password)
                await passwordField.dispose()
    
                await delay(2000)
                const buttonField = await page.$('button[type=submit]')
                await buttonField.click()
                await buttonField.dispose()
                } 
            }  
        console.log('[+] Waiting For Login')
            try {
            await page.waitForSelector('#appMountPoint > div > div.login-body > div > div > div.hybrid-login-form-main > div > div.ui-message-contents', {visible:true, timeout:5000})
                await delay(2000)
            const noticeLogin = await page.evaluate(() => {
                return document.querySelector('#appMountPoint > div > div.login-body > div > div > div.hybrid-login-form-main > div > div.ui-message-contents').innerText;
            })
                await delay(2000)
            console.log('[' + no + ']', email + '|' + password, 'Information : ', noticeLogin)
            no++
            
            } catch (err) {
            console.log('[' + no + ']', email + '|' + password, 'Information : Sukses Login')
            no++
            await browser.close();
            await delay(2000)
            if (page.url().includes('browse')) {
                    if (pilihp == 1){
                        await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)

                        await page.waitForSelector('#profile_0')
                        var panah = await page.$('#profile_0')
                        await panah.click()

                        await page.waitForSelector('#profile_0 > ul > li:nth-child(3) > a > div.profile-change')
                        var profile = await page.$('#profile_0 > ul > li:nth-child(3) > a > div.profile-change')
                        await profile.click()

                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');

                        try {
                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');
                        } catch (err) {

                        }
                        
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var user = await page.evaluate(() => {
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label').innerText;
                        })

                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var confirmPin = await page.$('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        await confirmPin.click()
                        
                        const newpin = await page.$('input[data-uia="pin-number-0"]')
                        await newpin.type(pin)
                        await newpin.dispose()
                        
                        await page.waitForSelector('button[class="btn btn-blue btn-small"]')
                        var confirm = await page.$('button[class="btn btn-blue btn-small"]')
                        await confirm.click()

                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.account-messages-container > div > div.ui-message-contents')
                        var info = await page.evaluate(() => {
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div.account-messages-container > div > div.ui-message-contents').innerText;
                        })
                        
                        console.log('   ',info,user,pin)
                    
                    }else if (pilihp == 2){
                        await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)

                        await page.waitForSelector('#profile_1')
                        var panah = await page.$('#profile_1')
                        await panah.click()

                        await page.waitForSelector('#profile_1 > ul > li:nth-child(3) > a > div.profile-change')
                        var profile = await page.$('#profile_1 > ul > li:nth-child(3) > a > div.profile-change')
                        await profile.click()

                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');

                        try {
                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');
                        } catch (err) {

                        }
                        
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var user = await page.evaluate(() => {
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label').innerText;
                        })

                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var confirmPin = await page.$('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        await confirmPin.click()
                        
                        const newpin = await page.$('input[data-uia="pin-number-0"]')
                        await newpin.type(pin)
                        await newpin.dispose()
                        
                        await page.waitForSelector('button[class="btn btn-blue btn-small"]')
                        var confirm = await page.$('button[class="btn btn-blue btn-small"]')
                        await confirm.click()

                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.account-messages-container > div > div.ui-message-contents')
                        var info = await page.evaluate(() => {
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div.account-messages-container > div > div.ui-message-contents').innerText;
                        })
                        
                        console.log('   ',info,user,pin)
                        
                    }else if (pilihp == 3){
                        await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)

                        await page.waitForSelector('#profile_2')
                        var panah = await page.$('#profile_2')
                        await panah.click()

                        await page.waitForSelector('#profile_2 > ul > li:nth-child(3) > a > div.profile-change')
                        var profile = await page.$('#profile_2 > ul > li:nth-child(3) > a > div.profile-change')
                        await profile.click()

                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');

                        try {
                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');
                        } catch (err) {

                        }
                        
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var user = await page.evaluate(() => {
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label').innerText;
                        })

                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var confirmPin = await page.$('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        await confirmPin.click()
                        
                        const newpin = await page.$('input[data-uia="pin-number-0"]')
                        await newpin.type(pin)
                        await newpin.dispose()
                        
                        await page.waitForSelector('button[class="btn btn-blue btn-small"]')
                        var confirm = await page.$('button[class="btn btn-blue btn-small"]')
                        await confirm.click()

                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.account-messages-container > div > div.ui-message-contents')
                        var info = await page.evaluate(() => {
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div.account-messages-container > div > div.ui-message-contents').innerText;
                        })
                        
                        console.log('   ',info,user,pin)
                    
                    }else if (pilihp == 4){
                        await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)

                        await page.waitForSelector('#profile_3')
                        var panah = await page.$('#profile_3')
                        await panah.click()

                        await page.waitForSelector('#profile_3 > ul > li:nth-child(3) > a > div.profile-change')
                        var profile = await page.$('#profile_3 > ul > li:nth-child(3) > a > div.profile-change')
                        await profile.click()

                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');

                        try {
                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');
                        } catch (err) {

                        }
                        
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var user = await page.evaluate(() => {
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label').innerText;
                        })

                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var confirmPin = await page.$('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        await confirmPin.click()
                        
                        const newpin = await page.$('input[data-uia="pin-number-0"]')
                        await newpin.type(pin)
                        await newpin.dispose()
                        
                        await page.waitForSelector('button[class="btn btn-blue btn-small"]')
                        var confirm = await page.$('button[class="btn btn-blue btn-small"]')
                        await confirm.click()

                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.account-messages-container > div > div.ui-message-contents')
                        var info = await page.evaluate(() => {
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div.account-messages-container > div > div.ui-message-contents').innerText;
                        })
                        
                        console.log('   ',info,user,pin)
                    
                    }else if (pilihp == 5){
                        await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)

                        await page.waitForSelector('#profile_4')
                        var panah = await page.$('#profile_4')
                        await panah.click()

                        await page.waitForSelector('#profile_4 > ul > li:nth-child(3) > a > div.profile-change')
                        var profile = await page.$('#profile_4 > ul > li:nth-child(3) > a > div.profile-change')
                        await profile.click()

                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');

                        try {
                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');
                        } catch (err) {

                        }
                        
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var user = await page.evaluate(() => {
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label').innerText;
                        })

                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var confirmPin = await page.$('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        await confirmPin.click()
                        
                        const newpin = await page.$('input[data-uia="pin-number-0"]')
                        await newpin.type(pin)
                        await newpin.dispose()
                        
                        await page.waitForSelector('button[class="btn btn-blue btn-small"]')
                        var confirm = await page.$('button[class="btn btn-blue btn-small"]')
                        await confirm.click()

                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.account-messages-container > div > div.ui-message-contents')
                        var info = await page.evaluate(() => {
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div.account-messages-container > div > div.ui-message-contents').innerText;
                        })
                        
                        console.log('   ',info,user,pin)
                    
                    }else if (pilihp == 'all'){
                        await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)

                        await page.waitForSelector('#profile_0')
                        var panah = await page.$('#profile_0')
                        await panah.click()

                        await page.waitForSelector('#profile_0 > ul > li:nth-child(3) > a > div.profile-change')
                        var profile = await page.$('#profile_0 > ul > li:nth-child(3) > a > div.profile-change')
                        await profile.click()

                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');

                        try {
                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');
                        } catch (err) {

                        }
                        
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var user = await page.evaluate(() => {
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label').innerText;
                        })

                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var confirmPin = await page.$('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        await confirmPin.click()
                        
                        const newpin1 = await page.$('input[data-uia="pin-number-0"]')
                        await newpin1.type(pin1)
                        await newpin1.dispose()
                        
                        await page.waitForSelector('button[class="btn btn-blue btn-small"]')
                        var confirm = await page.$('button[class="btn btn-blue btn-small"]')
                        await confirm.click()

                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.account-messages-container > div > div.ui-message-contents')
                        var info = await page.evaluate(() => {
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div.account-messages-container > div > div.ui-message-contents').innerText;
                        })
                        
                        console.log('   ',info,user,pin1)
                    
                    
                        await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)

                        await page.waitForSelector('#profile_1')
                        var panah = await page.$('#profile_1')
                        await panah.click()

                        await page.waitForSelector('#profile_1 > ul > li:nth-child(3) > a > div.profile-change')
                        var profile = await page.$('#profile_1 > ul > li:nth-child(3) > a > div.profile-change')
                        await profile.click()

                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');

                        try {
                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');
                        } catch (err) {

                        }
                        
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var user = await page.evaluate(() => {
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label').innerText;
                        })

                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var confirmPin = await page.$('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        await confirmPin.click()
                        
                        const newpin2 = await page.$('input[data-uia="pin-number-0"]')
                        await newpin2.type(pin2)
                        await newpin2.dispose()
                        
                        await page.waitForSelector('button[class="btn btn-blue btn-small"]')
                        var confirm = await page.$('button[class="btn btn-blue btn-small"]')
                        await confirm.click()

                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.account-messages-container > div > div.ui-message-contents')
                        var info = await page.evaluate(() => {
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div.account-messages-container > div > div.ui-message-contents').innerText;
                        })
                        
                        console.log('   ',info,user,pin2)
                        
                    
                        await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)

                        await page.waitForSelector('#profile_2')
                        var panah = await page.$('#profile_2')
                        await panah.click()

                        await page.waitForSelector('#profile_2 > ul > li:nth-child(3) > a > div.profile-change')
                        var profile = await page.$('#profile_2 > ul > li:nth-child(3) > a > div.profile-change')
                        await profile.click()

                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');

                        try {
                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');
                        } catch (err) {

                        }
                        
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var user = await page.evaluate(() => {
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label').innerText;
                        })

                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var confirmPin = await page.$('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        await confirmPin.click()
                        
                        const newpin3 = await page.$('input[data-uia="pin-number-0"]')
                        await newpin3.type(pin3)
                        await newpin3.dispose()
                        
                        await page.waitForSelector('button[class="btn btn-blue btn-small"]')
                        var confirm = await page.$('button[class="btn btn-blue btn-small"]')
                        await confirm.click()

                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.account-messages-container > div > div.ui-message-contents')
                        var info = await page.evaluate(() => {
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div.account-messages-container > div > div.ui-message-contents').innerText;
                        })
                        
                        console.log('   ',info,user,pin3)
                    
                    
                        await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)

                        await page.waitForSelector('#profile_3')
                        var panah = await page.$('#profile_3')
                        await panah.click()

                        await page.waitForSelector('#profile_3 > ul > li:nth-child(3) > a > div.profile-change')
                        var profile = await page.$('#profile_3 > ul > li:nth-child(3) > a > div.profile-change')
                        await profile.click()

                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');

                        try {
                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');
                        } catch (err) {

                        }
                        
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var user = await page.evaluate(() => {
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label').innerText;
                        })

                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var confirmPin = await page.$('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        await confirmPin.click()
                        
                        const newpin4 = await page.$('input[data-uia="pin-number-0"]')
                        await newpin4.type(pin4)
                        await newpin4.dispose()
                        
                        await page.waitForSelector('button[class="btn btn-blue btn-small"]')
                        var confirm = await page.$('button[class="btn btn-blue btn-small"]')
                        await confirm.click()

                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.account-messages-container > div > div.ui-message-contents')
                        var info = await page.evaluate(() => {
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div.account-messages-container > div > div.ui-message-contents').innerText;
                        })
                        
                        console.log('   ',info,user,pin4)
                    
                    
                        await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)

                        await page.waitForSelector('#profile_4')
                        var panah = await page.$('#profile_4')
                        await panah.click()

                        await page.waitForSelector('#profile_4 > ul > li:nth-child(3) > a > div.profile-change')
                        var profile = await page.$('#profile_4 > ul > li:nth-child(3) > a > div.profile-change')
                        await profile.click()

                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');

                        try {
                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');
                        } catch (err) {

                        }
                        
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var user = await page.evaluate(() => {
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label').innerText;
                        })

                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var confirmPin = await page.$('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        await confirmPin.click()
                        
                        const newpin5 = await page.$('input[data-uia="pin-number-0"]')
                        await newpin5.type(pin5)
                        await newpin5.dispose()
                        
                        await page.waitForSelector('button[class="btn btn-blue btn-small"]')
                        var confirm = await page.$('button[class="btn btn-blue btn-small"]')
                        await confirm.click()

                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.account-messages-container > div > div.ui-message-contents')
                        var info = await page.evaluate(() => {
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div.account-messages-container > div > div.ui-message-contents').innerText;
                        })
                        
                        console.log('   ',info,user,pin5)
                    }
                    }
                }
            }
        }else if (menup == 4){
            var aww = readlineSync.question('Input File Akun : ')+txt;
            while(lagi = 'y'){
                console.log('\n');
                const read = fs.readFileSync(aww, 'UTF-8');
                const list = read.split(/\r?\n/);
                for (var i = 0; i < list.length; i++) {
                var email = list[i].split('|')[0];
                var password = list[i].split('|')[1];
                var nama1 = random_name({
                    first: true
                });
                var nama2 = random_name({
                    last: true
                });
                var rand = Math.floor(Math.random() * 100000);
                const $options = { waitUntil: 'networkidle2' };
                //const browser = await puppeteer.launch({ headless: false });
                const browser = await puppeteer.launch({headless: false,
                args: ['--window-size=499,632',],
                defaultViewport: null,
                }); 
                const page = await browser.newPage();
                const width=1024, height=1600;
                await page.setViewport( { 'width' : width, 'height' : height } );
                await page.goto('https://www.netflix.com/id-en/LoginHelp', $options);
                await page.waitForSelector('input[name="forgot_password_input"]')

                const inputemail = await page.$('input[name="forgot_password_input"]')
                await inputemail.type(email)
                await inputemail.dispose()
                        
                const buttonNumber = await page.$('button[class="btn forgot-password-action-button btn-blue btn-large"]')
                await buttonNumber.click()
                await buttonNumber.dispose()
                        
                var link = readlineSync.question('    Input Link    : ');
                await page.goto(link, $options);
                
                const inputnewppwd = await page.$('input[name="newPassword"]')
                await inputnewppwd.type(newpwd)
                await inputnewppwd.dispose()
                        
                const confirmnewppwd = await page.$('input[name="confirmNewPassword"]')
                await confirmnewppwd.type(newpwd)
                await confirmnewppwd.dispose()
                
                const save = await page.$('button[class="nf-btn nf-btn-primary nf-btn-retro nf-btn-small"]')
                await save.click()
                await save.dispose()
                
                await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div > div > div.ui-message-contents', {visible:true, timeout:10000})
                const notice_udah_berubah = await page.evaluate(() => {
                    return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div > div > div.ui-message-contents').innerText;
                })
                console.log('    Information : ', notice_udah_berubah)
                await page.goto('https://www.netflix.com/clearcookies', $options)
                await delay(1000)
                await browser.close();
                
                var lagi = readlineSync.question('    Lagi [y/n]  : ');
                console.log('\n')
                if (lagi == 'n'){
                    await browser.close();
                    break;
                }
            }
        }
        }else if (menup == 5){
            var aww = readlineSync.question('Input File Akun : ')+txt;
            var newpwd 	   = readlineSync.question('[+] Password Baru :');
            console.log('\n');
            const read = fs.readFileSync(aww, 'UTF-8');
            const list = read.split(/\r?\n/);
            for (var i = 0; i < list.length; i++) {
                var email = list[i].split('|')[0];
                var password = list[i].split('|')[1];
            const $options = { waitUntil: 'networkidle2' };

            //const browser = await puppeteer.launch({ headless: false });
            const browser = await puppeteer.launch({headless: false,
            args: ['--window-size=499,632',],
            defaultViewport: null,
            });
            const page = await browser.newPage();
            await page.goto('https://www.netflix.com/id-en/login', $options);
            try {

                const emailField = await page.$('input[type=text]')
                await emailField.type(email)
                await emailField.dispose()
    
                const passwordField = await page.$('input[type=password]')
                await passwordField.type(password)
                await passwordField.dispose()
    
                await delay(2000)
                const buttonField = await page.$('button[type=submit]')
                await buttonField.click()
                await buttonField.dispose()
                
            }catch {
                const ipip = await page.evaluate(() => {
                    return document.querySelector('body > div.error-page.nfse > div.content > h1').innerText;
                })
                console.log('[+] Notice : ',ipip )
                console.log('[+] Input "y" untuk melanjutkan')
                var resetip  = readlineSync.question('[+] Sudah Reset IP ? ');
                if (resetip == 'y' || resetip == 'Y'){
    
                await page.goto('https://www.netflix.com/id-en/login', $options);
                
                const emailField = await page.$('input[type=text]')
                await emailField.type(email)
                await emailField.dispose()
    
                const passwordField = await page.$('input[type=password]')
                await passwordField.type(password)
                await passwordField.dispose()
    
                await delay(2000)
                const buttonField = await page.$('button[type=submit]')
                await buttonField.click()
                await buttonField.dispose()
                } 
            }  
        console.log('[+] Waiting For Login')
            try {
                await page.waitForSelector('#appMountPoint > div > div.login-body > div > div > div.hybrid-login-form-main > div > div.ui-message-contents', {visible:true, timeout:5000})
                const noticeLogin = await page.evaluate(() => {
                    return document.querySelector('#appMountPoint > div > div.login-body > div > div > div.hybrid-login-form-main > div > div.ui-message-contents').innerText;
                })
                console.log('[' + no + ']', email + '|' + password, 'Information : ', noticeLogin)
                no++
            } catch (err) {
                console.log('[' + no + ']', email + '|' + password, 'Information : Sukses Login')
                no++
                await delay(2000)
                
                if (page.url().includes('browse')) {
                        try {
                        await page.goto('https://www.netflix.com/password', $options)
                        await delay(2000)
                    
                        const passwordField = await page.$('input[type=password]')
                            await passwordField.type(password)
                            await passwordField.dispose()
                        
                        const passwordBaru = await page.$('input[name=newPassword]')
                            await passwordBaru.type(newpwd)
                            await passwordBaru.dispose()
                        
                        const confirmnewpassword = await page.$('input[name=confirmNewPassword]')
                            await confirmnewpassword.type(newpwd)
                            await confirmnewpassword.dispose()
                        
                        await delay(1000)
                        const buttonField = await page.$('button[type=submit]')
                            await buttonField.click()
                            await buttonField.dispose()
                            
                        console.log(' Successfuly Change Password')
                        fs.appendFileSync('hasil ganti password.txt', email + '|' + newpwd + "\n");
                        console.log(' Successfuly Save Information\n')
                        
                        await delay(2000)
                        await page.goto('https://www.netflix.com/clearcookies', $options)
                        await delay(2000)
                        await browser.close();
                    
                    } catch (err) {
                        console.log('Tidak Berhasil Ganti Password\n')
                        await page.goto('https://www.netflix.com/clearcookies', $options)
                        await delay(2000)
                        await browser.close();
                        }
                    }
                }
            }
        }else if (menup == 6){
            var aww = readlineSync.question('Input File Akun : ')+txt;

        console.log('\n');
        const read = fs.readFileSync(aww, 'UTF-8');
        const list = read.split(/\r?\n/);
        for (var i = 0; i < list.length; i++) {
        var email = list[i].split('|')[0];
        var password = list[i].split('|')[1];
            const $options = { waitUntil: 'networkidle2' };
            const browser = await puppeteer.launch({headless: false,
                args: ['--window-size=499,632',],
                defaultViewport: null,
                });
            const page = await browser.newPage();

            await page.goto('https://www.netflix.com/id-en/login', $options);
            await delay(3000)
            try {

                const emailField = await page.$('input[type=text]')
                await emailField.type(email)
                await emailField.dispose()
    
                const passwordField = await page.$('input[type=password]')
                await passwordField.type(password)
                await passwordField.dispose()
    
                await delay(2000)
                const buttonField = await page.$('button[type=submit]')
                await buttonField.click()
                await buttonField.dispose()
                
            }catch {
                const ipip = await page.evaluate(() => {
                    return document.querySelector('body > div.error-page.nfse > div.content > h1').innerText;
                })
                console.log('[+] Notice : ',ipip )
                console.log('[+] Input "y" untuk melanjutkan')
                var resetip  = readlineSync.question('[+] Sudah Reset IP ? ');
                if (resetip == 'y' || resetip == 'Y'){
    
                await page.goto('https://www.netflix.com/id-en/login', $options);
                
                const emailField = await page.$('input[type=text]')
                await emailField.type(email)
                await emailField.dispose()
    
                const passwordField = await page.$('input[type=password]')
                await passwordField.type(password)
                await passwordField.dispose()
    
                await delay(2000)
                const buttonField = await page.$('button[type=submit]')
                await buttonField.click()
                await buttonField.dispose()
                } 
            }  
        console.log('[+] Waiting For Login')
        try {
                await page.waitForSelector('#appMountPoint > div > div.login-body > div > div > div.hybrid-login-form-main > div > div.ui-message-contents', {visible:true, timeout:5000})
                await delay(2000)
                const noticeLogin = await page.evaluate(() => {
                    return document.querySelector('#appMountPoint > div > div.login-body > div > div > div.hybrid-login-form-main > div > div.ui-message-contents').innerText;
                })
                await delay(2000)
                console.log('[' + no + ']', email + '|' + password, 'Information : ', noticeLogin)
                no++
                await page.goto('https://www.netflix.com/clearcookies', $options)
                await delay(2000)
                await browser.close();
        } catch (err) {
            console.log('[' + no + ']', email + '|' + password, 'Information : Sukses Login')
            no++
            await delay(2000)
            if (page.url().includes('browse')) {
                try {
                    await page.goto('https://www.netflix.com/account', $options)
                    await delay(2000)
                
                    const on_hold = await page.evaluate(() =>{
                        return document.querySelector('article > section > h2').innerText;
                        })
                        
                    console.log('	[+]Status Akun	: ', on_hold+'\n')
                    fs.appendFileSync('hasilcheck.txt', no + ') ' +  email + '\n');
                    fs.appendFileSync('hasilcheck.txt','    [+]Status Akun   : ' + on_hold +'\n\n');
                    //await page.goto('https://www.netflix.com/clearcookies', $options)
                    //await delay(2000)
                    //await browser.close();
                    //cek status akun
                    
                } catch (err) {
                    try {
                        //await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div:nth-child(2) > div.account-section.collapsable-panel.clearfix > section > div > div.account-subsection.clearfix > div > p > span[id="automation-NextPlanItem"]' , {visible:true, timeout:5000})
                        const results = await page.evaluate(() =>{
                            return document.querySelector('span#automation-NextPlanItem').innerText;
                            })
                        const gc_check = await page.evaluate(() =>{
                            return document.querySelector('div.gift-credit-content-headline.wallet--mop').innerText;
                            })
                        const gc_credit = await page.evaluate(() =>{
                            return document.querySelector('div[data-uia=gift-credit-content-subhead]').innerText;
                            })
                        const habis = await page.evaluate(() =>{
                            return document.querySelector('div.account-section-item').innerText;
                            })
                        const jenis = await page.evaluate(() =>{
                            return document.querySelector('div.account-section-item > b').innerText;
                            })
                        const a = await page.evaluate(() =>{
                            return document.querySelector('#profile_0 > div > div > h3').innerText;
                            })
                        const b = await page.evaluate(() =>{
                            return document.querySelector('#profile_1 > div > div > h3').innerText;
                            })
                        const c = await page.evaluate(() =>{
                            return document.querySelector('#profile_2 > div > div > h3').innerText;
                            })
                        const d = await page.evaluate(() =>{
                            return document.querySelector('#profile_3 > div > div > h3').innerText;
                            })
                        const e = await page.evaluate(() =>{
                            return document.querySelector('#profile_4 > div > div > h3').innerText;
                            })
                            
                        await page.goto('https://www.netflix.com/BillingActivity', $options)
                        await delay(3000)
                        const billing_check = await page.evaluate(() =>{
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div.billingSectionSpace > ul > li:nth-child(2) > div.col.billTotal').innerText;
                            })
                        const periode_layanan = await page.evaluate(() =>{
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div.billingSectionSpace > ul > li:nth-child(2) > div.col.billPeriod').innerText;
                            })
                            
                        console.log('	[+]Pembayaran   	: ', gc_check)
                        console.log('	[+]Credit sampai	: ', gc_credit)
                        console.log('	[+]Profile	 	: ', a,b,c,d,e)
                        console.log('	[+]Paket	   	: ', jenis)
                        console.log('	[+]Information  	: ', results)
                        console.log('	[+]Periode Layanan: ', periode_layanan)
                        console.log('	[+]Pembayaran   	: ', billing_check)
                        console.log('	[+]Abis Tanggal 	: ', habis + '\n')
                        fs.appendFileSync('hasilcheck.txt', no + ') ' +  email + '\n');
                        fs.appendFileSync('hasilcheck.txt','    [+]Pembayaran   : ' + gc_check + '\n    [+]Credit sampai: ' + gc_credit + '\n    [+]Profile	 : '+ a + b + c + d + e +'\n    [+]Paket	   : '+ jenis + '\n    [+]Berubah	 : '+ results + '\n    [+]Habis	   : '+ habis + '\n\n');
                        //cek pembayaran gc status premium
                    
                    } catch (err) {
                        try{
                            const gc_check = await page.evaluate(() =>{
                                return document.querySelector('div.gift-credit-content-headline.wallet--mop').innerText;
                                })
                            const gc_credit = await page.evaluate(() =>{
                                return document.querySelector('div[data-uia=gift-credit-content-subhead]').innerText;
                                })
                            const habis = await page.evaluate(() =>{
                                return document.querySelector('div.account-section-item').innerText;
                                })
                            const jenis = await page.evaluate(() =>{
                                return document.querySelector('div.account-section-item > b').innerText;
                                })
                            const a = await page.evaluate(() =>{
                                return document.querySelector('#profile_0 > div > div > h3').innerText;
                                })
                            const b = await page.evaluate(() =>{
                                return document.querySelector('#profile_1 > div > div > h3').innerText;
                                })
                            const c = await page.evaluate(() =>{
                                return document.querySelector('#profile_2 > div > div > h3').innerText;
                                })
                            const d = await page.evaluate(() =>{
                                return document.querySelector('#profile_3 > div > div > h3').innerText;
                                })
                            const e = await page.evaluate(() =>{
                                return document.querySelector('#profile_4 > div > div > h3').innerText;
                                })
                                
                            await page.goto('https://www.netflix.com/BillingActivity', $options)
                            await delay(3000)
                            const billing_check = await page.evaluate(() =>{
                                return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div.billingSectionSpace > ul > li:nth-child(2) > div.col.billTotal').innerText;
                                })
                            const periode_layanan = await page.evaluate(() =>{
                                return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div.billingSectionSpace > ul > li:nth-child(2) > div.col.billPeriod').innerText;
                                })		
                                
                            console.log('	[+]Pembayaran 		: ', gc_check	)
                            console.log('	[+]Credit sampai	: ', gc_credit)
                            console.log('	[+]Profile   		: ',a,b,c,d,e)
                            console.log('	[+]Paket			: ', jenis)
                            console.log('	[+]Periode Layanan: ', periode_layanan)
                            console.log('	[+]Pembayaran		: ', billing_check)
                            console.log('	[+]Change Plan This Account\n')
                            
                            fs.appendFileSync('hasilcheck.txt', no + ') ' +  email + '|' + ' Change Plan This Account\n');
                            //cek pembayaran gc status non premium + notif changeplan

                        } catch (err) {
                            try {
                                const cek_cc = await page.evaluate(() =>{
                                    return document.querySelector('span.mopType[data-uia=mopType]').innerText;
                                    })
                                const jenis = await page.evaluate(() =>{
                                    return document.querySelector('div.account-section-item > b').innerText;
                                    })
                                const a = await page.evaluate(() =>{
                                    return document.querySelector('#profile_0 > div > div > h3').innerText;
                                    })
                                const b = await page.evaluate(() =>{
                                    return document.querySelector('#profile_1 > div > div > h3').innerText;
                                    })
                                const c = await page.evaluate(() =>{
                                    return document.querySelector('#profile_2 > div > div > h3').innerText;
                                    })
                                const d = await page.evaluate(() =>{
                                    return document.querySelector('#profile_3 > div > div > h3').innerText;
                                    })
                                const e = await page.evaluate(() =>{
                                    return document.querySelector('#profile_4 > div > div > h3').innerText;
                                    })
                                    
                                await page.goto('https://www.netflix.com/BillingActivity', $options)
                                await delay(3000)
                                const billing_check = await page.evaluate(() =>{
                                    return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div.billingSectionSpace > ul > li:nth-child(2) > div.col.billTotal').innerText;
                                    })
                                const periode_layanan = await page.evaluate(() =>{
                                    return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div.billingSectionSpace > ul > li:nth-child(2) > div.col.billPeriod').innerText;
                                    })	
                                
                                console.log('	[+]CC   			: ', cek_cc)
                                console.log('	[+]Profile   		: ',a,b,c,d,e)
                                console.log('	[+]Paket			: ', jenis)
                                console.log('	[+]Periode Layanan: ', periode_layanan)
                                console.log('	[+]Pembayaran   	: ', billing_check+'\n')
                                
                                fs.appendFileSync('hasilcheck.txt', no + ') ' +  email + '\n');
                                fs.appendFileSync('hasilcheck.txt','	[+]Pembayaran   : ' + billing_check + '\n	[+]Profile	 : '+ a + b + c + d + e +'\n	[+]Paket	   : '+ jenis + '\n\n');
                                //cek pembayaran cc status premium
                                
                            } catch (err) {
                                try {
                                    const xfinity = await page.evaluate(() =>{
                                        return document.querySelector('div#CHANGEABLE.bobo-provider[data-uia=payment-subsection-bobo-content]').innerText;
                                        })
                                    await delay(2000)
                                    console.log('	[+]Status Bayar		: ', xfinity+'\n')
                                }
                                
                                catch (err){
                                    const no_pay = await page.evaluate(() =>{
                                        return document.querySelector('div.account-section-item[data-uia=no-payment-info]').innerText;
                                        })
                                    await page.goto('https://www.netflix.com/BillingActivity', $options)
                                    await delay(3000)
                                    const billing_check = await page.evaluate(() =>{
                                        return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div.billingSectionSpace > ul > li:nth-child(2) > div.col.billTotal').innerText;
                                        })
                                    const periode_layanan = await page.evaluate(() =>{
                                        return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div.billingSectionSpace > ul > li:nth-child(2) > div.col.billPeriod').innerText;
                                        })	
                                        
                                    console.log('	[+]Status Bayar		: ', no_pay)
                                    console.log('	[+]Periode Layanan	: ', periode_layanan)
                                    console.log('	[+]Pembayaran   		: ', billing_check+'\n')
                                    await page.goto('https://www.netflix.com/clearcookies', $options)
                                    await delay(2000)
                                    await browser.close();
                                    //cek no payment
                                }
                            }
                        }
                    }
                }
                
                    console.log('	Cek Lock/Unlocked Profile')
                    await page.goto('https://www.netflix.com/account', $options)
                    await delay(2000)
                    
                    //cek p1
                    const a = await page.evaluate(() =>{
                        return document.querySelector('#profile_0 > div > div > h3').innerText;
                        })
                    const menu_a = await page.$('#profile_0 > div > button')
                    await menu_a.click()
                    await delay(2000)
                    const lock_a = await page.evaluate(() =>{
                        return document.querySelector('#profile_0 > ul > li:nth-child(3) > a > div').innerText;
                        })
                    console.log('	Profile	',a+'	: ',lock_a)
                    
                    //cek p2
                    const b = await page.evaluate(() =>{
                        return document.querySelector('#profile_1 > div > div > h3').innerText;
                        })
                    const menu_b = await page.$('#profile_1 > div > button')
                    await menu_b.click()
                    await delay(2000)
                    const lock_b = await page.evaluate(() =>{
                        return document.querySelector('#profile_1 > ul > li:nth-child(3) > a > div').innerText;
                        })
                    console.log('	Profile	',b+'	: ',lock_b)
                    
                    //cek p3
                    const c = await page.evaluate(() =>{
                        return document.querySelector('#profile_2 > div > div > h3').innerText;
                        })
                    const menu_c = await page.$('#profile_2 > div > button')
                    await menu_c.click()
                    await delay(2000)
                    const lock_c = await page.evaluate(() =>{
                        return document.querySelector('#profile_2 > ul > li:nth-child(3) > a > div').innerText;
                        })
                    console.log('	Profile	',c+'	: ',lock_c)
                    
                    //cek p4
                    const d = await page.evaluate(() =>{
                        return document.querySelector('#profile_3 > div > div > h3').innerText;
                        })
                    const menu_d = await page.$('#profile_3 > div > button')
                    await menu_d.click()
                    await delay(2000)
                    const lock_d = await page.evaluate(() =>{
                        return document.querySelector('#profile_3 > ul > li:nth-child(3) > a > div').innerText;
                        })
                    console.log('	Profile	',d+'	: ',lock_d)
                    
                    //cek p5
                    const e = await page.evaluate(() =>{
                        return document.querySelector('#profile_4 > div > div > h3').innerText;
                        })
                    const menu_e = await page.$('#profile_4 > div > button')
                    await menu_e.click()
                    await delay(2000)
                    const lock_e = await page.evaluate(() =>{
                        return document.querySelector('#profile_4 > ul > li:nth-child(3) > a > div').innerText;
                        })
                    console.log('	Profile	',e+'	: ',lock_e+'\n')
                    
                    await page.goto('https://www.netflix.com/clearcookies', $options)
                    await delay(2000)
                    await browser.close();
                }
                
                if (page.url().includes('signup')){
                    await delay(2000)
                    console.log('	[+]Status Akun	: Restart Membership')
                    
                    fs.appendFileSync('hasilcheck.txt', no + ') ' +  email + '\n');
                    fs.appendFileSync('hasilcheck.txt','	[+]Status Akun   : Restart Membership\n\n');
                    await page.goto('https://www.netflix.com/clearcookies', $options)
                    await delay(2000)
                    await browser.close();
                    
                    //cek akun restart
                    } 
                }				
            }  
        }else if (menup == 7){
            var aww = readlineSync.question('Input File Akun : ')+txt;
        console.log('\n');
        const read = fs.readFileSync(aww, 'UTF-8');
        const list = read.split(/\r?\n/);
        for (var i = 0; i < list.length; i++) 
        {
        var email = list[i].split('|')[0];
        var password = list[i].split('|')[1];
        var nama1 = random_name({
            first: true
        });
        var nama2 = random_name({
            last: true
        });
        var rand = Math.floor(Math.random() * 100000);
            const $options = { waitUntil: 'networkidle2' };
            const browser = await puppeteer.launch({headless: false,
                args: ['--window-size=499,632',],
                defaultViewport: null,
                });
            const page = await browser.newPage();

            await page.goto('https://www.netflix.com/id-en/', $options);
            await delay(3000)
            try
            {
                const emailField = await page.$('input[type=email]')
                await emailField.type(email)
                await emailField.dispose()

                await delay(5000)
                const buttonField = await page.$('button[type=submit]')
                await buttonField.click()
                await buttonField.dispose()
            }
            
            catch(err)
            {
                console.log('Change IP Maximum Login\n')
                await browser.close();
                break;
            }

            console.log('[+] Waiting For Checking')
            
                await delay(2000)
                if (page.url().includes('id-en/login')) 
                {
                    console.log('['+no+']',chalk.green(email+' Information : Found'))
                    fs.appendFileSync('log-Found.txt', no + ') ' +  email + '\n');
                    no++
                    await browser.close();
                    
                }
                else if (page.url().includes('/signup/password?locale=en-ID'))
                {
                    console.log('['+no+']',chalk.yellow(email+' Information : Restart'))
                    fs.appendFileSync('log-restart.txt', no + ') ' +  email + '\n');
                    no++
                    await browser.close();

                }
                else {
                    console.log('['+no+']',chalk.red(email+' Information : Not Found'))
                    fs.appendFileSync('log-NOTfound.txt', no + ') ' +  email + '\n');
                    no++
                    await browser.close();
                }
            }
        }else if (menup == 8){
            var aww = readlineSync.question('Input File Akun : ')+txt;
            console.log('\n');
            const read = fs.readFileSync(aww, 'UTF-8');
            const list = read.split(/\r?\n/);
            for (var i = 0; i < list.length; i++) {
                var email = list[i].split('|')[0];
                var password = list[i].split('|')[1];
                var nama1 = random_name({
                    first: true
                });
                var nama2 = random_name({
                    last: true
                });
                var rand = Math.floor(Math.random() * 100000);
            const $options = { waitUntil: 'networkidle2' };
            const browser = await puppeteer.launch({headless: false,
                args: ['--window-size=499,632',],
                defaultViewport: null,
                });
            const page = await browser.newPage();

            await page.goto('https://www.netflix.com/id-en/login', $options);
            try {

                const emailField = await page.$('input[type=text]')
                await emailField.type(email)
                await emailField.dispose()
    
                const passwordField = await page.$('input[type=password]')
                await passwordField.type(password)
                await passwordField.dispose()
    
                await delay(2000)
                const buttonField = await page.$('button[type=submit]')
                await buttonField.click()
                await buttonField.dispose()
                
            }catch {
                const ipip = await page.evaluate(() => {
                    return document.querySelector('body > div.error-page.nfse > div.content > h1').innerText;
                })
                console.log('[+] Notice : ',ipip )
                console.log('[+] Input "y" untuk melanjutkan')
                var resetip  = readlineSync.question('[+] Sudah Reset IP ? ');
                if (resetip == 'y' || resetip == 'Y'){
    
                await page.goto('https://www.netflix.com/id-en/login', $options);
                
                const emailField = await page.$('input[type=text]')
                await emailField.type(email)
                await emailField.dispose()
    
                const passwordField = await page.$('input[type=password]')
                await passwordField.type(password)
                await passwordField.dispose()
    
                await delay(2000)
                const buttonField = await page.$('button[type=submit]')
                await buttonField.click()
                await buttonField.dispose()
                } 
            }  
        console.log('[+] Waiting For Login')
            try {
                await page.waitForSelector('#appMountPoint > div > div.login-body > div > div > div.hybrid-login-form-main > div > div.ui-message-contents', {visible:true, timeout:5000})
                const noticeLogin = await page.evaluate(() => {
                    return document.querySelector('#appMountPoint > div > div.login-body > div > div > div.hybrid-login-form-main > div > div.ui-message-contents').innerText;
                })
                console.log('[' + no + ']', email + '|' + password, 'Information : ', noticeLogin)
                no++
            } catch (err) {
                console.log('[' + no + ']', email + '|' + password, 'Information : Sukses Login')
                no++
                await delay(2000)
                
            if (page.url().includes('browse')) {
                await page.goto('https://www.netflix.com/BillingActivity', $options)
                await delay(3000)
                    try {
                    const billing_check1 = await page.evaluate(() =>{
                        return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div.billingSectionSpace > ul > li:nth-child(2) > div.col.billTotal').innerText;
                        })
                        
                    const billing_check2 = await page.evaluate(() =>{
                        return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div.billingSectionSpace > ul > li:nth-child(3) > div.col.billTotal').innerText;
                        })
                    console.log('[+] Akun Sudah Renew')
                    console.log('[+] Jenis Payment : ',billing_check1)
                    }catch(err){
                        const billing_check1 = await page.evaluate(() =>{
                        return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div.billingSectionSpace > ul > li:nth-child(2) > div.col.billTotal').innerText;
                        })
                        console.log('[+] Akun Belum Renew')
                        console.log('[+] Jenis Payment : ',billing_check1)
                    }
                }
            }
        }
        }else if (menup == 9){
            var aww = readlineSync.question('Input File Akun : ')+txt;

            console.log('\n');
            const read = fs.readFileSync(aww, 'UTF-8');
            const list = read.split(/\r?\n/);
            for (var i = 0; i < list.length; i++) {
                var email = list[i].split('|')[0];
                var password = list[i].split('|')[1];
                var nama1 = random_name({
                    first: true
                });
                var nama2 = random_name({
                    last: true
                });
                var rand = Math.floor(Math.random() * 100000);
            const $options = { waitUntil: 'networkidle2' };
            const browser = await puppeteer.launch({
                    headless: false,
                    args: [
                        '--window-size=100,100',
                    ],
                    defaultViewport: null,
                }); 
            const page = await browser.newPage();
            //await page.setViewport({
            //width: 1920,
            //height: 1080,})
        
            await page.goto('https://www.netflix.com/id-en/login', $options);
            try {

                const emailField = await page.$('input[type=text]')
                await emailField.type(email)
                await emailField.dispose()
    
                const passwordField = await page.$('input[type=password]')
                await passwordField.type(password)
                await passwordField.dispose()
    
                await delay(2000)
                const buttonField = await page.$('button[type=submit]')
                await buttonField.click()
                await buttonField.dispose()
                
            }catch {
                const ipip = await page.evaluate(() => {
                    return document.querySelector('body > div.error-page.nfse > div.content > h1').innerText;
                })
                console.log('[+] Notice : ',ipip )
                console.log('[+] Input "y" untuk melanjutkan')
                var resetip  = readlineSync.question('[+] Sudah Reset IP ? ');
                if (resetip == 'y' || resetip == 'Y'){
    
                await page.goto('https://www.netflix.com/id-en/login', $options);
                
                const emailField = await page.$('input[type=text]')
                await emailField.type(email)
                await emailField.dispose()
    
                const passwordField = await page.$('input[type=password]')
                await passwordField.type(password)
                await passwordField.dispose()
    
                await delay(2000)
                const buttonField = await page.$('button[type=submit]')
                await buttonField.click()
                await buttonField.dispose()
                } 
            }  
        console.log('[+] Waiting For Login')
            try {
                await page.waitForSelector('#appMountPoint > div > div.login-body > div > div > div.hybrid-login-form-main > div > div.ui-message-contents', {visible:true, timeout:5000})
                const noticeLogin = await page.evaluate(() => {
                    return document.querySelector('#appMountPoint > div > div.login-body > div > div > div.hybrid-login-form-main > div > div.ui-message-contents').innerText;
                })
                console.log('[' + no + ']', email + '|' + password, 'Information : ', noticeLogin + "\n")
                fs.appendFileSync('hasilcheck.txt', no + ') ' + email + '|' + noticeLogin + "\n");
                no++
                await browser.close();
            } catch (err) {
                console.log('[' + no + ']', email + '|' + password, 'Information : Sukses Login')
                //no++
                await delay(2000)
                if (page.url().includes('browse')) {
                    try {
                        await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)
                        await delay(2000)
                    
                        //await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div:nth-child(2) > div.account-section.collapsable-panel.clearfix > section > div > div.account-subsection.clearfix > div > p > span[id="automation-NextPlanItem"]' , {visible:true, timeout:5000})
                        const results = await page.evaluate(() =>{
                            return document.querySelector('span#automation-NextPlanItem').innerText;
                            })
                        console.log('' + email + ' Information : ', results + "\n\n")
                        fs.appendFileSync('hasilcheck.txt', no + ') ' + email + '|' + results + "\n");
                        no++
                        await page.goto('https://www.netflix.com/clearcookies', $options)
                        await delay(2000)
                        await browser.close();
                    
                    } catch (err) {
                        console.log(' Change Plan This Account\n')
                        fs.appendFileSync('hasilcheck.txt', no + ') ' +  email + '|' + ' Change Plan This Account\n');
                        no++
                        await page.goto('https://www.netflix.com/clearcookies', $options)
                        await delay(2000)
                        await browser.close();
                        }
                    }
                }
            }
        }else if (menup == 10){
            var aww = readlineSync.question('Input File Akun : ')+txt;	
            console.log('\n');
            const read = fs.readFileSync(aww, 'UTF-8');
            const list = read.split(/\r?\n/);
            for (var i = 0; i < list.length; i++) {
                var email = list[i].split('|')[0];
                var password = list[i].split('|')[1];
                var nama1 = random_name({
                    first: true
                });
                var nama2 = random_name({
                    last: true
                });
                var rand = Math.floor(Math.random() * 100000);
            const $options = { waitUntil: 'networkidle2' };
            const browser = await puppeteer.launch({headless: false,
                args: ['--window-size=499,632',],
                defaultViewport: null,
                });
            const page = await browser.newPage();

            await page.goto('https://www.netflix.com/id-en/login', $options);
            try {

                const emailField = await page.$('input[type=text]')
                await emailField.type(email)
                await emailField.dispose()
    
                const passwordField = await page.$('input[type=password]')
                await passwordField.type(password)
                await passwordField.dispose()
    
                await delay(2000)
                const buttonField = await page.$('button[type=submit]')
                await buttonField.click()
                await buttonField.dispose()
                
            }catch {
                const ipip = await page.evaluate(() => {
                    return document.querySelector('body > div.error-page.nfse > div.content > h1').innerText;
                })
                console.log('[+] Notice : ',ipip )
                console.log('[+] Input "y" untuk melanjutkan')
                var resetip  = readlineSync.question('[+] Sudah Reset IP ? ');
                if (resetip == 'y' || resetip == 'Y'){
    
                await page.goto('https://www.netflix.com/id-en/login', $options);
                
                const emailField = await page.$('input[type=text]')
                await emailField.type(email)
                await emailField.dispose()
    
                const passwordField = await page.$('input[type=password]')
                await passwordField.type(password)
                await passwordField.dispose()
    
                await delay(2000)
                const buttonField = await page.$('button[type=submit]')
                await buttonField.click()
                await buttonField.dispose()
                } 
            }  
        console.log('[+] Waiting For Login')
            try {
                await page.waitForSelector('#appMountPoint > div > div.login-body > div > div > div.hybrid-login-form-main > div > div.ui-message-contents', {visible:true, timeout:5000})
                const noticeLogin = await page.evaluate(() => {
                    return document.querySelector('#appMountPoint > div > div.login-body > div > div > div.hybrid-login-form-main > div > div.ui-message-contents').innerText;
                })
                console.log('[' + no + ']', email + '|' + password, 'Information : ', noticeLogin + "\n")
                no++
                await browser.close();
            } catch (err) {
                console.log('[' + no + ']', email + '|' + password, 'Information : Sukses Login')
                no++
                await delay(2000)
                if (page.url().includes('browse')) {
                    try {
                        await page.goto('https://www.netflix.com/ManageDevices', $options)
                        await delay(2000)
                        
                        /*try {
                                await delay(10000)
                                await page.goto('https://www.netflix.com/account', $options)
                                await delay(2000)
                            
                                const on_hold = await page.evaluate(() =>{
                                    return document.querySelector('article > section > h2').innerText;
                                    })
                                    
                                console.log('	[+]Status Akun	: ', on_hold+'\n')
                                await delay(2000)
                                await browser.close();
                                //cek status akun
                            } 
                            catch (err) {
                                console.log("")
                            }*/
                    
                        //await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div:nth-child(2) > div.account-section.collapsable-panel.clearfix > section > div > div > div > div:nth-child(5) > a.account-section-link')
                        //const signout = await page.$('#appMountPoint > div > div > div.bd > div > div:nth-child(2) > div.account-section.collapsable-panel.clearfix > section > div > div > div > div:nth-child(5) > a.account-section-link')
                        //await signout.click()
                        
                        await delay(1000)
                        const buttonField = await page.$('button[data-uia=btn-sign-out]')
                            await buttonField.click()
                            await buttonField.dispose()
                            
                        console.log(' Successfuly Sign Out All Device')
                        
                    } catch (err) {
                        console.log('Tidak Berhasil Signout All Device\n')
                        await page.goto('https://www.netflix.com/clearcookies', $options)
                        await delay(2000)
                        await browser.close();
                        }
                    await delay(3000)
                    //await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)

                    await page.waitForSelector('#profile_0')
                    const panah = await page.$('#profile_0')
                    await panah.click()

                    await page.waitForSelector('#profile_0 > ul > li:nth-child(4) > a > div.profile-change')
                    const profile1 = await page.$('#profile_0 > ul > li:nth-child(4) > a > div.profile-change')
                    await profile1.click()

                    await delay(2000)
                    try {
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > ul > li > p', {visible:true, timeout:1000})
                        const noticeInfo = await page.evaluate(() => {
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > ul > li > p').innerText;
                        })
                        
                        await page.waitForSelector('h1[data-uia="viewing-activity-header"]', {visible:true, timeout:1000})
                        const activity = await page.evaluate(() => {
                            return document.querySelector('h1[data-uia="viewing-activity-header"]').innerText;
                        })
                        console.log('   ',activity,noticeInfo)

                    } catch (err) {
                        await page.waitForSelector('h1[data-uia="viewing-activity-header"]', {visible:true, timeout:1000})
                        const activity = await page.evaluate(() => {
                            return document.querySelector('h1[data-uia="viewing-activity-header"]').innerText;
                        })

                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > ul > li:nth-child(1) > div.col.title', {visible:true, timeout:1000})
                        const ada = await page.$('#appMountPoint > div > div > div.bd > div > div > ul > li:nth-child(1) > div.col.title')
                        if (ada) {
                            console.log('    Have Activity Account',activity)
                        }
                        
                        await delay(2000)
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div:nth-child(2) > a.viewing-activity-footer-hide', {visible:true, timeout:1000})
                        const deleteActivity = await page.$('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div:nth-child(2) > a.viewing-activity-footer-hide')
                        await deleteActivity.click()
                        
                        await delay(2000)
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div.nfmodal.large > div > footer > div > button.btn.modal-action-button.btn-blue.btn-small', {visible:true, timeout:1000})
                        const confirmDelete = await page.$('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div.nfmodal.large > div > footer > div > button.btn.modal-action-button.btn-blue.btn-small')
                        await confirmDelete.click()

                        console.log('    Successfully Deleted Activity',activity)
                    }
                    await delay(3000)
                    await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)
                    
                    await page.waitForSelector('#profile_1')
                    const panah1 = await page.$('#profile_1')
                    await panah1.click()

                    await page.waitForSelector('#profile_1 > ul > li:nth-child(4) > a > div.profile-change')
                    const profile2 = await page.$('#profile_1 > ul > li:nth-child(4) > a > div.profile-change')
                    await profile2.click()

                    await delay(2000)

                    try {
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > ul > li > p', {visible:true, timeout:1000})
                        const noticeInfo = await page.evaluate(() => {
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > ul > li > p').innerText;
                        })

                        await page.waitForSelector('h1[data-uia="viewing-activity-header"]', {visible:true, timeout:1000})
                        const activity = await page.evaluate(() => {
                            return document.querySelector('h1[data-uia="viewing-activity-header"]').innerText;
                        })
                        console.log('   ',activity,noticeInfo)

                    } catch (err) {
                        await page.waitForSelector('h1[data-uia="viewing-activity-header"]', {visible:true, timeout:1000})
                        const activity = await page.evaluate(() => {
                            return document.querySelector('h1[data-uia="viewing-activity-header"]').innerText;
                        })

                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > ul > li:nth-child(1) > div.col.title', {visible:true, timeout:1000})
                        const ada = await page.$('#appMountPoint > div > div > div.bd > div > div > ul > li:nth-child(1) > div.col.title')
                        if (ada) {
                            console.log('    Have Activity Account',activity)
                        }
                        
                        await delay(2000)
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div:nth-child(2) > a.viewing-activity-footer-hide', {visible:true, timeout:1000})
                        const deleteActivity = await page.$('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div:nth-child(2) > a.viewing-activity-footer-hide')
                        await deleteActivity.click()

                        await delay(2000)
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div.nfmodal.large > div > footer > div > button.btn.modal-action-button.btn-blue.btn-small', {visible:true, timeout:1000})
                        const confirmDelete = await page.$('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div.nfmodal.large > div > footer > div > button.btn.modal-action-button.btn-blue.btn-small')
                        await confirmDelete.click()

                        console.log('    Successfully Deleted Activity',activity)
                    }
                    
                    await delay(3000)
                    await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)
                    

                    await page.waitForSelector('#profile_2')
                    const panah2 = await page.$('#profile_2')
                    await panah2.click()
                    
                    await page.waitForSelector('#profile_2 > ul > li:nth-child(4) > a > div.profile-change')
                    const profile3 = await page.$('#profile_2 > ul > li:nth-child(4) > a > div.profile-change')
                    await profile3.click()

                    await delay(2000)

                    try {
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > ul > li > p', {visible:true, timeout:1000})
                        const noticeInfo = await page.evaluate(() => {
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > ul > li > p').innerText;
                        })
                        
                        await page.waitForSelector('h1[data-uia="viewing-activity-header"]', {visible:true, timeout:1000})
                        const activity = await page.evaluate(() => {
                            return document.querySelector('h1[data-uia="viewing-activity-header"]').innerText;
                        })
                        console.log('   ',activity,noticeInfo)

                    } catch (err) {
                        await page.waitForSelector('h1[data-uia="viewing-activity-header"]', {visible:true, timeout:1000})
                        const activity = await page.evaluate(() => {
                            return document.querySelector('h1[data-uia="viewing-activity-header"]').innerText;
                        })

                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > ul > li:nth-child(1) > div.col.title', {visible:true, timeout:1000})
                        const ada = await page.$('#appMountPoint > div > div > div.bd > div > div > ul > li:nth-child(1) > div.col.title')
                        if (ada) {
                            console.log('    Have Activity Account',activity)
                        }
                        
                        await delay(2000)
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div:nth-child(2) > a.viewing-activity-footer-hide', {visible:true, timeout:1000})
                        const deleteActivity = await page.$('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div:nth-child(2) > a.viewing-activity-footer-hide')
                        await deleteActivity.click()
                        
                        await delay(2000)
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div.nfmodal.large > div > footer > div > button.btn.modal-action-button.btn-blue.btn-small', {visible:true, timeout:1000})
                        const confirmDelete = await page.$('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div.nfmodal.large > div > footer > div > button.btn.modal-action-button.btn-blue.btn-small')
                        await confirmDelete.click()

                        console.log('    Successfully Deleted Activity',activity)
                    }
                    
                    await delay(3000)
                    await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)
                    
                    await page.waitForSelector('#profile_3')
                    const panah3 = await page.$('#profile_3')
                    await panah3.click()

                    await page.waitForSelector('#profile_3 > ul > li:nth-child(4) > a > div.profile-change')
                    const profile4 = await page.$('#profile_3 > ul > li:nth-child(4) > a > div.profile-change')
                    await profile4.click()

                    await delay(2000)

                    try {
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > ul > li > p', {visible:true, timeout:1000})
                        const noticeInfo = await page.evaluate(() => {
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > ul > li > p').innerText;
                        })
                        
                        await page.waitForSelector('h1[data-uia="viewing-activity-header"]', {visible:true, timeout:1000})
                        const activity = await page.evaluate(() => {
                            return document.querySelector('h1[data-uia="viewing-activity-header"]').innerText;
                        })
                        console.log('   ',activity,noticeInfo)

                    } catch (err) {
                        await page.waitForSelector('h1[data-uia="viewing-activity-header"]', {visible:true, timeout:1000})
                        const activity = await page.evaluate(() => {
                            return document.querySelector('h1[data-uia="viewing-activity-header"]').innerText;
                        })

                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > ul > li:nth-child(1) > div.col.title', {visible:true, timeout:1000})
                        const ada = await page.$('#appMountPoint > div > div > div.bd > div > div > ul > li:nth-child(1) > div.col.title')
                        if (ada) {
                            console.log('    Have Activity Account',activity)
                        }
                        
                        await delay(2000)
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div:nth-child(2) > a.viewing-activity-footer-hide', {visible:true, timeout:1000})
                        const deleteActivity = await page.$('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div:nth-child(2) > a.viewing-activity-footer-hide')
                        await deleteActivity.click()
                        
                        await delay(2000)
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div.nfmodal.large > div > footer > div > button.btn.modal-action-button.btn-blue.btn-small', {visible:true, timeout:1000})
                        const confirmDelete = await page.$('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div.nfmodal.large > div > footer > div > button.btn.modal-action-button.btn-blue.btn-small')
                        await confirmDelete.click()

                        console.log('    Successfully Deleted Activity',activity)
                    }
                    
                    await delay(3000)
                    await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)
                    
                    await page.waitForSelector('#profile_4')
                    const panah4 = await page.$('#profile_4')
                    await panah4.click()

                    await page.waitForSelector('#profile_4 > ul > li:nth-child(4) > a > div.profile-change')
                    const profile5 = await page.$('#profile_4 > ul > li:nth-child(4) > a > div.profile-change')
                    await profile5.click()

                    await delay(3000)
                    
                    try {
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > ul > li > p', {visible:true, timeout:1000})
                        const noticeInfo = await page.evaluate(() => {
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > ul > li > p').innerText;
                        })
                        
                        await page.waitForSelector('h1[data-uia="viewing-activity-header"]', {visible:true, timeout:1000})
                        const activity = await page.evaluate(() => {
                            return document.querySelector('h1[data-uia="viewing-activity-header"]').innerText;
                        })
                        console.log('   ',activity,noticeInfo)
                        await browser.close();
                        
                    } catch (err) {
                        await page.waitForSelector('h1[data-uia="viewing-activity-header"]', {visible:true, timeout:1000})
                        const activity = await page.evaluate(() => {
                            return document.querySelector('h1[data-uia="viewing-activity-header"]').innerText;
                        })

                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > ul > li:nth-child(1) > div.col.title', {visible:true, timeout:1000})
                        const ada = await page.$('#appMountPoint > div > div > div.bd > div > div > ul > li:nth-child(1) > div.col.title')
                        if (ada) {
                            console.log('    Have Activity Account',activity)
                        }
                        
                        await delay(2000)
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div:nth-child(2) > a.viewing-activity-footer-hide', {visible:true, timeout:1000})
                        const deleteActivity = await page.$('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div:nth-child(2) > a.viewing-activity-footer-hide')
                        await deleteActivity.click()
                        
                        await delay(2000)
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div.nfmodal.large > div > footer > div > button.btn.modal-action-button.btn-blue.btn-small', {visible:true, timeout:1000})
                        const confirmDelete = await page.$('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div.nfmodal.large > div > footer > div > button.btn.modal-action-button.btn-blue.btn-small')
                        await confirmDelete.click()

                        console.log('    Successfully Deleted Activity',activity)
                        await browser.close();
                        }
                    }
                }
            }
        }else if (menup == 11){
            var aww = readlineSync.question('Input File Akun : ')+txt;
            while(true){
                console.log('\n');
                const read = fs.readFileSync(aww, 'UTF-8');
                const list = read.split(/\r?\n/);
                for (var i = 0; i < list.length; i++) {
                    var email = list[i].split('|')[0];
                    var password = list[i].split('|')[1];
                    var nama1 = random_name({
                        first: true
                    });
                    var nama2 = random_name({
                        last: true
                    });
                    var rand = Math.floor(Math.random() * 100000);
                const $options = { waitUntil: 'networkidle2' };
                const browser = await puppeteer.launch({headless: false,
                    args: ['--window-size=499,632',],
                    defaultViewport: null,
                    });
                const page = await browser.newPage();

                await page.goto('https://www.netflix.com/id-en/login', $options);
                try {

                    const emailField = await page.$('input[type=text]')
                    await emailField.type(email)
                    await emailField.dispose()
        
                    const passwordField = await page.$('input[type=password]')
                    await passwordField.type(password)
                    await passwordField.dispose()
        
                    await delay(2000)
                    const buttonField = await page.$('button[type=submit]')
                    await buttonField.click()
                    await buttonField.dispose()
                    
                }catch {
                    const ipip = await page.evaluate(() => {
                        return document.querySelector('body > div.error-page.nfse > div.content > h1').innerText;
                    })
                    console.log('[+] Notice : ',ipip )
                    console.log('[+] Input "y" untuk melanjutkan')
                    var resetip  = readlineSync.question('[+] Sudah Reset IP ? ');
                    if (resetip == 'y' || resetip == 'Y'){
        
                    await page.goto('https://www.netflix.com/id-en/login', $options);
                    
                    const emailField = await page.$('input[type=text]')
                    await emailField.type(email)
                    await emailField.dispose()
        
                    const passwordField = await page.$('input[type=password]')
                    await passwordField.type(password)
                    await passwordField.dispose()
        
                    await delay(2000)
                    const buttonField = await page.$('button[type=submit]')
                    await buttonField.click()
                    await buttonField.dispose()
                    } 
                }  
            console.log('[+] Waiting For Login')
                try {
                    await page.waitForSelector('#appMountPoint > div > div.login-body > div > div > div.hybrid-login-form-main > div > div.ui-message-contents', {visible:true, timeout:5000})
                    const noticeLogin = await page.evaluate(() => {
                        return document.querySelector('#appMountPoint > div > div.login-body > div > div > div.hybrid-login-form-main > div > div.ui-message-contents').innerText;
                    })
                    console.log('[' + no + ']', email + '|' + password, 'Information : ', noticeLogin + "\n")
                    fs.appendFileSync('hasil ganti password.txt', no + ') ' + email + '|' + noticeLogin + "\n");
                    no++
                    await browser.close();
                } catch (err) {
                    console.log('[' + no + ']', email + '|' + password, 'Information : Sukses Login')
                    no++
                    await delay(2000)
                    if (page.url().includes('browse')){
                    await delay(2000)
                    await browser.close();
                }
                    if (i == list.length){
                        var i = 0;
                        }
                    } 
                }
            }
        }else if (menup == 12){
            var aww = readlineSync.question('Input File Akun : ')+txt;
	        while(lagi = 'y'){
                console.log('\n');
                const read = fs.readFileSync(aww, 'UTF-8');
                const list = read.split(/\r?\n/);
                for (var i = 0; i < list.length; i++) {
                    var email = list[i].split('|')[0];
                    var password = list[i].split('|')[1];
                    var nama1 = random_name({
                        first: true
                    });
                    var nama2 = random_name({
                        last: true
                    });
                    var rand = Math.floor(Math.random() * 100000);
                const $options = { waitUntil: 'networkidle2' };
                const browser = await puppeteer.launch({headless: false,
                    args: ['--window-size=499,632',],
                    defaultViewport: null,
                    });
                const page = await browser.newPage();

                await page.goto('https://www.netflix.com/id-en/login', $options);
                try {

                    const emailField = await page.$('input[type=text]')
                    await emailField.type(email)
                    await emailField.dispose()
        
                    const passwordField = await page.$('input[type=password]')
                    await passwordField.type(password)
                    await passwordField.dispose()
        
                    await delay(2000)
                    const buttonField = await page.$('button[type=submit]')
                    await buttonField.click()
                    await buttonField.dispose()
                    
                }catch {
                    const ipip = await page.evaluate(() => {
                        return document.querySelector('body > div.error-page.nfse > div.content > h1').innerText;
                    })
                    console.log('[+] Notice : ',ipip )
                    console.log('[+] Input "y" untuk melanjutkan')
                    var resetip  = readlineSync.question('[+] Sudah Reset IP ? ');
                    if (resetip == 'y' || resetip == 'Y'){
        
                    await page.goto('https://www.netflix.com/id-en/login', $options);
                    
                    const emailField = await page.$('input[type=text]')
                    await emailField.type(email)
                    await emailField.dispose()
        
                    const passwordField = await page.$('input[type=password]')
                    await passwordField.type(password)
                    await passwordField.dispose()
        
                    await delay(2000)
                    const buttonField = await page.$('button[type=submit]')
                    await buttonField.click()
                    await buttonField.dispose()
                    } 
                }  
            console.log('[+] Waiting For Login')
                try {
                    await page.waitForSelector('#appMountPoint > div > div.login-body > div > div > div.hybrid-login-form-main > div > div.ui-message-contents', {visible:true, timeout:5000})
                    const noticeLogin = await page.evaluate(() => {
                        return document.querySelector('#appMountPoint > div > div.login-body > div > div > div.hybrid-login-form-main > div > div.ui-message-contents').innerText;
                    })
                    console.log('[' + no + ']', email + '|' + password, 'Information : ', noticeLogin + "\n")
                    no++
                    await browser.close();
                } catch (err) {
                    console.log('[' + no + ']', email + '|' + password, 'Information : Sukses Login')
                    no++
                    await delay(2000)
                    if (page.url().includes('browse')) {
                        try {
                            await page.goto('https://www.netflix.com/ManageDevices', $options)
                            await delay(2000)
                        
                            //await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div:nth-child(2) > div.account-section.collapsable-panel.clearfix > section > div > div > div > div:nth-child(5) > a.account-section-link')
                            //const signout = await page.$('#appMountPoint > div > div > div.bd > div > div:nth-child(2) > div.account-section.collapsable-panel.clearfix > section > div > div > div > div:nth-child(5) > a.account-section-link')
                            //await signout.click()
                            
                            await delay(1000)
                            const buttonField = await page.$('button[type=button]')
                                await buttonField.click()
                                await buttonField.dispose()
                                
                            console.log(' Successfuly Sign Out All Device')
                            await browser.close();
                            
                        } catch (err) {
                            console.log('Tidak Berhasil Signout All Device\n')
                            //await page.goto('https://www.netflix.com/clearcookies', $options)
                            await delay(2000)
                            await browser.close();
                            }
                        }
                    }
                }
            var lagi = readlineSync.question('    Lagi [y/n]  : ');
			console.log('\n')
			var i = 0;
		    if (lagi == 'n'){
			await browser.close();
			break;
			}
		}
	}

}else if (pilihan == 2){

    console.log('',chalk.red('Menu Input File Manual'))
    console.log('[+] Tools Pekerja \n(1) SOP Akun\n(2) Auto Delete Pin (pilih Profile)\n(3) Auto Add Pin    (Pilih Profile)\n(4) Auto Send Forgot Password Link\n(5) Change Password\n\n[+] Checker \n(6) All Cek Akun\n(7) Akun Finder\n(8) Auto Check Akun Renew atau Tidak\n(9) Check Plan kapan abis\n\n[+] Attack\n(10) Delete History > Logout All\n(11) Stress Login\n(12) Just Logout All Device\n\n[+] Future Fiture\n[-] Auto Rename default + delete pin\n[-] Auto Rename Profile ( Input Name )');    
    var menu = readlineSync.question('[+] Pilih Apa : ');
    
    if (menu == 1){
        var email      = readlineSync.question('[+] Email    :');
		var password   = readlineSync.question('[+] password :');
        console.log('\n');
		const $options = { waitUntil: 'networkidle2' };
		//const browser = await puppeteer.launch({ headless: false });
		const browser = await puppeteer.launch({headless: false,
            args: ['--window-size=499,632',],
            defaultViewport: null,
            });
        const page = await browser.newPage();

        await page.goto('https://www.netflix.com/id-en/login', $options);
        await delay(3000)

        const emailField = await page.$('input[type=text]')
        await emailField.type(email)
        await emailField.dispose()

        const passwordField = await page.$('input[type=password]')
        await passwordField.type(password)
        await passwordField.dispose()

        await delay(2000)
        const buttonField = await page.$('button[type=submit]')
        await buttonField.click()
        await buttonField.dispose()

        console.log('[+] Waiting For Login')
        try {
        await page.waitForSelector('#appMountPoint > div > div.login-body > div > div > div.hybrid-login-form-main > div > div.ui-message-contents', {visible:true, timeout:5000})
            await delay(2000)
        const noticeLogin = await page.evaluate(() => {
            return document.querySelector('#appMountPoint > div > div.login-body > div > div > div.hybrid-login-form-main > div > div.ui-message-contents').innerText;
        })
            await delay(2000)
        console.log('[' + no + ']', email + '|' + password, 'Information : ', noticeLogin)
        no++
        } catch (err) {
        console.log('[' + no + ']', email + '|' + password, 'Information : Sukses Login')
        no++
        await delay(2000)
        if (page.url().includes('browse')) {
            if( ganti=='y'){
                try {
                    await page.goto('https://www.netflix.com/password', $options)
                    await delay(2000)
                
                    const passwordField = await page.$('input[type=password]')
                        await passwordField.type(password)
                        await passwordField.dispose()
                    
                    const passwordBaru = await page.$('input[name=newPassword]')
                        await passwordBaru.type(newpwd)
                        await passwordBaru.dispose()
                    
                    const confirmnewpassword = await page.$('input[name=confirmNewPassword]')
                        await confirmnewpassword.type(newpwd)
                        await confirmnewpassword.dispose()
                    
                    await delay(1000)
                    const buttonField = await page.$('button[type=submit]')
                        await buttonField.click()
                        await buttonField.dispose()
                        
                    console.log(' Successfuly Change Password')
                    fs.appendFileSync('hasil ganti password.txt', email + '|' + newpwd + "\n");
                    console.log(' Successfuly Save Information\n')
                    
                    await delay(2000)
                } catch (err) {
                    console.log('Tidak Berhasil Ganti Password\n')
                    await delay(2000)
                    }
                }
                await page.goto('https://www.netflix.com/profiles/manage', $options)
                //rename profile 1
                await page.waitForSelector('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > div > ul > li:nth-child(1) > div > a > div > div.svg-edit-overlay')
                const rename1 = await page.$('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > div > ul > li:nth-child(1) > div > a > div > div.svg-edit-overlay')
                await rename1.click()
                
                await delay(1000)
                const input = await page.$('#profile-name-entry');
                await input.click({ clickCount: 3 })
                await input.type("1");
                await delay(1000)
                await page.keyboard.press('Enter');
                console.log('    Successfully Rename Profile 1')
                //ini untuk menghapus pin profile 1
                
                await delay(1000)
                await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)

                await page.waitForSelector('#profile_0')
                var panah = await page.$('#profile_0')
                await panah.click()

                await page.waitForSelector('#profile_0 > ul > li:nth-child(3) > a > div.profile-change')
                var profile = await page.$('#profile_0 > ul > li:nth-child(3) > a > div.profile-change')
                await profile.click()

                await page.waitForSelector('#input-account-content-restrictions')
                var loginPassword = await page.$('#input-account-content-restrictions')
                if( ganti=='y'){
                    await delay(2000)
                    await loginPassword.type(newpwd)
                }
                else{
                    await delay(2000)
                    await loginPassword.type(password)
                }
                await delay(2000)

                await page.keyboard.press('Enter');

                try {
                await page.waitForSelector('#input-account-content-restrictions')
                var loginPassword = await page.$('#input-account-content-restrictions')
                if( ganti=='y'){
                    await delay(2000)
                    await loginPassword.type(newpwd)
                }
                else{
                    await delay(2000)
                    await loginPassword.type(password)
                }

                await delay(2000)

                await page.keyboard.press('Enter');
                } catch (err) {

                }
                await delay(2000)
                await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                var user = await page.evaluate(() => {
                    return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label').innerText;
                })
                await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                var confirmPin = await page.$('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                await confirmPin.click()
                
                await delay(1000)
                await page.keyboard.press('Tab');
                await page.keyboard.press('Enter');
                
                
                await page.waitForSelector('button[class="btn btn-gray btn-small"]')
                var confirm = await page.$('button[class="btn btn-gray btn-small"]')
                await confirm.click()
                console.log('    Successfully Delete Pin Profile 1')
                //batas menghapus pin profile 1
                
                //await page.goto('https://www.netflix.com/profiles/manage', $options)
                while(true) {
                try {
                await page.goto('https://www.netflix.com/profiles/manage', $options)

                await page.waitForSelector('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > div > ul > li:nth-child(2) > div > a > div > div.svg-edit-overlay', {visible:true, timeout:1000});
                const deleteProfile = await page.$('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > div > ul > li:nth-child(2) > div > a > div > div.svg-edit-overlay')
                await deleteProfile.click()

                await page.waitForSelector('button[data-uia="profile-delete-button"]', {visible:true, timeout:1000})
                const deleteProfile1 = await page.$('button[data-uia="profile-delete-button"]')
                await deleteProfile1.click()

                await delay(3000)
                const noticeUser = await page.evaluate(() => {
                    return document.querySelector('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > div > div > div.main-profile-avatar > div').innerText;
                })
                await page.waitForSelector('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > div > span:nth-child(4)', {visible:true, timeout:1000});
                const confirmDelete = await page.$('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > div > span:nth-child(4)')
                await confirmDelete.click()

                try {
                    await page.waitForSelector('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > span > a', {visible:true, timeout:1000});
                    const deleteProfile3 = await page.$('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > span > a')
                    await deleteProfile3.click()

                console.log('    Successfully Delete User',noticeUser);
                } catch (err) {
                console.log('    Failed Delete User')
                break;
                }
                } catch (err) {
                    console.log('    Not User Found')
                    break;
                }
                urutan++
                }
                //await page.goto('https://www.netflix.com/clearcookies', $options)
                //await delay(2000)
                //await browser.close();
                //break;
                //await page.goto('https://www.netflix.com/profiles/manage', $options)
                    while(true) {
                    try {
                    await page.goto('https://www.netflix.com/profiles/manage', $options)
                    await page.waitForSelector('div[class="addProfileIcon icon-tvuiAdd"]', {visible:true, timeout:10000});
                    const addProfile = await page.$('div[class="addProfileIcon icon-tvuiAdd"]')
                    await addProfile.click()

                    await delay(2000)
                    await page.waitForSelector('#add-profile-name', {visible:true, timeout:10000})
                    await delay(2000)
                    const nameProfile1 = await page.$('#add-profile-name')
                    await nameProfile1.type(''+adduser)
                    await delay(2000)
                    await page.waitForSelector('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > div > span.profile-button.preferred-action', {visible:true, timeout:1000});
                    const submitProfile = await page.$('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > div > span.profile-button.preferred-action')
                    await submitProfile.click()

                    try {
                        await page.waitForSelector('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > div > div > div.profile-add-parent > p', {visible:true, timeout:1000})
                        const noticFail = await page.evaluate(() => {
                            return document.querySelector('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > div > div > div.profile-add-parent > p').innerText;
                        })
                        console.log('    '+noticFail)
                    } catch (err) {
                    console.log('    Successfully Add '+adduser);
                    //adduser++
                    }
                    } catch (err) {
                        console.log('    Failed Add User\n')
                        adduser = 2;
                        await page.goto('https://www.netflix.com/clearcookies', $options)
                        await delay(1000)
                        await browser.close();
                        break;
                        }
                    adduser++
                    }
                }
            }
                
                //setelah delete profile 12345 lalu hapus history profile 1 doang
                if (adduser = 2)
                {
                    await delay(1000)
                    await page.goto('https://www.netflix.com/account', $options)
                    await delay(2000)
                    
                    await page.waitForSelector('#profile_0')
                    panah = await page.$('#profile_0')
                    await panah.click()
                    await delay(2000)

                    await page.waitForSelector('#profile_0 > ul > li:nth-child(4) > a > div.profile-change')
                    const profile1 = await page.$('#profile_0 > ul > li:nth-child(4) > a > div.profile-change')
                    await profile1.click()

                    await delay(2000)
                    try {
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > ul > li > p', {visible:true, timeout:3000})
                        const noticeInfo = await page.evaluate(() => {
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > ul > li > p').innerText;
                        })
                        
                        await page.waitForSelector('h1[data-uia="viewing-activity-header"]', {visible:true, timeout:3000})
                        await delay(2000)
                        const activity = await page.evaluate(() => {
                            return document.querySelector('h1[data-uia="viewing-activity-header"]').innerText;
                        })
                        await delay(2000)
                        console.log('   ',activity,noticeInfo)
                        await page.goto('https://www.netflix.com/clearcookies', $options)
                        await delay(2000)
                        await browser.close();
                        //no history movies

                    } catch (err) {
                        await page.waitForSelector('h1[data-uia="viewing-activity-header"]', {visible:true, timeout:3000})
                        await delay(2000)
                        const activity = await page.evaluate(() => {
                            return document.querySelector('h1[data-uia="viewing-activity-header"]').innerText;
                        })
                        await delay(2000)

                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > ul > li:nth-child(1) > div.col.title', {visible:true, timeout:1000})
                        const ada = await page.$('#appMountPoint > div > div > div.bd > div > div > ul > li:nth-child(1) > div.col.title')
                        if (ada) {
                            console.log('    Have Activity Account',activity)
                        }
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div:nth-child(2) > a.viewing-activity-footer-hide', {visible:true, timeout:4000})
                        await delay(2000)
                        const deleteActivity = await page.$('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div:nth-child(2) > a.viewing-activity-footer-hide')
                        await deleteActivity.click()
                        await delay(2000)

                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div.nfmodal.large > div > footer > div > button.btn.modal-action-button.btn-blue.btn-small', {visible:true, timeout:4000})
                        await delay(2000)
                        const confirmDelete = await page.$('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div.nfmodal.large > div > footer > div > button.btn.modal-action-button.btn-blue.btn-small')
                        await confirmDelete.click()
                        await delay(2000)

                        console.log('    Successfully Deleted Activity',activity)
                        await page.goto('https://www.netflix.com/clearcookies', $options)
                        await delay(2000)
                        await browser.close();
                        //with history movies
                    }				
                }
   
    
    }else if (menu == 2){
        var email      = readlineSync.question('[+] Email             :');
		var password   = readlineSync.question('[+] password          :');
		console.log('\n!!!! Isi all jika ingin menghapus pin semua profile !!!!');
		var pilihp     = readlineSync.question('[+] Profile berapa?   : ');
        var fuck       = readlineSync.question('Default Profile [Y/N] : ');
		console.log('\n');
		const $options = { waitUntil: 'networkidle2' };
		//const browser = await puppeteer.launch({ headless: false });
		const browser = await puppeteer.launch({headless: false,
		args: ['--window-size=499,632',],
		defaultViewport: null,
		});
        const page = await browser.newPage();

        await page.goto('https://www.netflix.com/id-en/login', $options);
        await delay(3000)

        const emailField = await page.$('input[type=text]')
        await emailField.type(email)
        await emailField.dispose()

        const passwordField = await page.$('input[type=password]')
        await passwordField.type(password)
        await passwordField.dispose()

        await delay(2000)
        const buttonField = await page.$('button[type=submit]')
        await buttonField.click()
        await buttonField.dispose()

        console.log('[+] Waiting For Login')
        try {
            await page.waitForSelector('#appMountPoint > div > div.login-body > div > div > div.hybrid-login-form-main > div > div.ui-message-contents', {visible:true, timeout:5000})
                await delay(2000)
            const noticeLogin = await page.evaluate(() => {
                return document.querySelector('#appMountPoint > div > div.login-body > div > div > div.hybrid-login-form-main > div > div.ui-message-contents').innerText;
            })
                await delay(2000)
            console.log('[' + no + ']', email + '|' + password, 'Information : ', noticeLogin)
            no++
        } catch (err) {
            console.log('[' + no + ']', email + '|' + password, 'Information : Sukses Login')
            no++
            await delay(2000)
            if (page.url().includes('browse')) {
                if(fuck == 'y' || fuck == 'Y'){
                    //rename profile 1
                    await page.goto('https://www.netflix.com/profiles/manage', $options)
                    await page.waitForSelector('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > div > ul > li:nth-child(1) > div > a > div > div.svg-edit-overlay')
                    const rename1 = await page.$('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > div > ul > li:nth-child(1) > div > a > div > div.svg-edit-overlay')
                    await rename1.click()
                    
                    await delay(1000)
                    const input = await page.$('#profile-name-entry');
                    await input.click({ clickCount: 3 })
                    await input.type("1");
                    await delay(1000)
                    await page.keyboard.press('Enter');
                    console.log('    Successfully Rename Profile 1')

                    //rename profile 2
                    //await page.goto('https://www.netflix.com/profiles/manage', $options)
                    await page.waitForSelector('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > div > ul > li:nth-child(2) > div > a > div > div.svg-edit-overlay')
                    const rename2 = await page.$('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > div > ul > li:nth-child(2) > div > a > div > div.svg-edit-overlay')
                    await rename2.click()
                    
                    await delay(1000)
                    const input2 = await page.$('#profile-name-entry');
                    await input2.click({ clickCount: 3 })
                    await input2.type("2");
                    await delay(1000)
                    await page.keyboard.press('Enter');
                    console.log('    Successfully Rename Profile 2')

                    //rename profile 3
                    await page.goto('https://www.netflix.com/profiles/manage', $options)
                    await page.waitForSelector('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > div > ul > li:nth-child(3) > div > a > div > div.svg-edit-overlay')
                    const rename3 = await page.$('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > div > ul > li:nth-child(3) > div > a > div > div.svg-edit-overlay')
                    await rename3.click()
                    
                    await delay(1000)
                    const input3 = await page.$('#profile-name-entry');
                    await input3.click({ clickCount: 3 })
                    await input3.type("3");
                    await delay(1000)
                    await page.keyboard.press('Enter');
                    console.log('    Successfully Rename Profile 3')

                    //rename profile 4
                    await page.goto('https://www.netflix.com/profiles/manage', $options)
                    await page.waitForSelector('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > div > ul > li:nth-child(4) > div > a > div > div.svg-edit-overlay')
                    const rename4 = await page.$('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > div > ul > li:nth-child(4) > div > a > div > div.svg-edit-overlay')
                    await rename4.click()
                    
                    await delay(1000)
                    const input4 = await page.$('#profile-name-entry');
                    await input4.click({ clickCount: 3 })
                    await input4.type("4");
                    await delay(1000)
                    await page.keyboard.press('Enter');
                    console.log('    Successfully Rename Profile 4')

                    //rename profile 5
                    await page.goto('https://www.netflix.com/profiles/manage', $options)
                    await page.waitForSelector('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > div > ul > li:nth-child(5) > div > a > div > div.svg-edit-overlay')
                    const rename5 = await page.$('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > div > ul > li:nth-child(5) > div > a > div > div.svg-edit-overlay')
                    await rename5.click()
                    
                    await delay(1000)
                    const input5 = await page.$('#profile-name-entry');
                    await input5.click({ clickCount: 3 })
                    await input5.type("5");
                    await delay(1000)
                    await page.keyboard.press('Enter');
                    console.log('    Successfully Rename Profile 5')
                        }

                    if(pilihp ==  1){
                        await delay(500)
                        await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)

                        await page.waitForSelector('#profile_0')
                        var panah = await page.$('#profile_0')
                        await panah.click()

                        await page.waitForSelector('#profile_0 > ul > li:nth-child(3) > a > div.profile-change')
                        var profile = await page.$('#profile_0 > ul > li:nth-child(3) > a > div.profile-change')
                        await profile.click()

                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');

                        try {
                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');
                        } catch (err) {

                        }
                        await delay(2000)
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var user = await page.evaluate(() => {
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label').innerText;
                        })
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var confirmPin = await page.$('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        await confirmPin.click()
                        
                        await delay(1000)
                        await page.keyboard.press('Tab');
                        await page.keyboard.press('Enter');
                        
                        
                        await page.waitForSelector('button[class="btn btn-gray btn-small"]')
                        var confirm = await page.$('button[class="btn btn-gray btn-small"]')
                        await confirm.click()
                        console.log('    Successfully Delete Pin Profile 1')
                        await page.goto('https://www.netflix.com/clearcookies', $options)
                            await delay(2000)
                            await browser.close();
                        //batas menghapus pin profile 1
                        
                    }else if (pilihp == 2){
                        await delay(500)
                        await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)

                        await page.waitForSelector('#profile_1')
                        var panah = await page.$('#profile_1')
                        await panah.click()

                        await page.waitForSelector('#profile_1 > ul > li:nth-child(3) > a > div.profile-change')
                        var profile = await page.$('#profile_1 > ul > li:nth-child(3) > a > div.profile-change')
                        await profile.click()

                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');

                        try {
                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');
                        } catch (err) {

                        }
                        await delay(2000)
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var user = await page.evaluate(() => {
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label').innerText;
                        })
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var confirmPin = await page.$('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        await confirmPin.click()
                        
                        await delay(1000)
                        await page.keyboard.press('Tab');
                        await page.keyboard.press('Enter');
                        
                        
                        await page.waitForSelector('button[class="btn btn-gray btn-small"]')
                        var confirm = await page.$('button[class="btn btn-gray btn-small"]')
                        await confirm.click()
                        console.log('    Successfully Delete Pin Profile 2')
                        await page.goto('https://www.netflix.com/clearcookies', $options)
                            await delay(2000)
                            await browser.close();
                        //batas menghapus pin profile 2
                        
                    }else if (pilihp == 3){
                    await delay(500)
                    await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)

                    await page.waitForSelector('#profile_2')
                    var panah = await page.$('#profile_2')
                    await panah.click()

                    await page.waitForSelector('#profile_2 > ul > li:nth-child(3) > a > div.profile-change')
                    var profile = await page.$('#profile_2 > ul > li:nth-child(3) > a > div.profile-change')
                    await profile.click()

                    await page.waitForSelector('#input-account-content-restrictions')
                    var loginPassword = await page.$('#input-account-content-restrictions')
                    await loginPassword.type(password)

                    await delay(2000)

                    await page.keyboard.press('Enter');

                    try {
                    await page.waitForSelector('#input-account-content-restrictions')
                    var loginPassword = await page.$('#input-account-content-restrictions')
                    await loginPassword.type(password)

                    await delay(2000)

                    await page.keyboard.press('Enter');
                    } catch (err) {

                    }
                    await delay(2000)
                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    var user = await page.evaluate(() => {
                        return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label').innerText;
                    })
                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    var confirmPin = await page.$('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    await confirmPin.click()
                    
                    await delay(1000)
                    await page.keyboard.press('Tab');
                    await page.keyboard.press('Enter');
                    
                    
                    await page.waitForSelector('button[class="btn btn-gray btn-small"]')
                    var confirm = await page.$('button[class="btn btn-gray btn-small"]')
                    await confirm.click()
                    console.log('    Successfully Delete Pin Profile 3')
                    await page.goto('https://www.netflix.com/clearcookies', $options)
                        await delay(2000)
                        await browser.close();
                    //batas menghapus pin profile 3
                    
                    }else if (pilihp == 4){
                    await delay(500)
                    await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)

                    await page.waitForSelector('#profile_3')
                    var panah = await page.$('#profile_3')
                    await panah.click()

                    await page.waitForSelector('#profile_3 > ul > li:nth-child(3) > a > div.profile-change')
                    var profile = await page.$('#profile_3 > ul > li:nth-child(3) > a > div.profile-change')
                    await profile.click()

                    await page.waitForSelector('#input-account-content-restrictions')
                    var loginPassword = await page.$('#input-account-content-restrictions')
                    await loginPassword.type(password)

                    await delay(2000)

                    await page.keyboard.press('Enter');

                    try {
                    await page.waitForSelector('#input-account-content-restrictions')
                    var loginPassword = await page.$('#input-account-content-restrictions')
                    await loginPassword.type(password)

                    await delay(2000)

                    await page.keyboard.press('Enter');
                    } catch (err) {

                    }
                    await delay(2000)
                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    var user = await page.evaluate(() => {
                        return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label').innerText;
                    })
                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    var confirmPin = await page.$('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    await confirmPin.click()
                    
                    await delay(1000)
                    await page.keyboard.press('Tab');
                    await page.keyboard.press('Enter');
                    
                    
                    await page.waitForSelector('button[class="btn btn-gray btn-small"]')
                    var confirm = await page.$('button[class="btn btn-gray btn-small"]')
                    await confirm.click()
                    console.log('    Successfully Delete Pin Profile 4')
                    await page.goto('https://www.netflix.com/clearcookies', $options)
                        await delay(2000)
                        await browser.close();
                    //batas menghapus pin profile 4
                    
                    }else if (pilihp == 5){
                    await delay(500)
                    await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)

                    await page.waitForSelector('#profile_4')
                    var panah = await page.$('#profile_4')
                    await panah.click()

                    await page.waitForSelector('#profile_4 > ul > li:nth-child(3) > a > div.profile-change')
                    var profile = await page.$('#profile_4 > ul > li:nth-child(3) > a > div.profile-change')
                    await profile.click()

                    await page.waitForSelector('#input-account-content-restrictions')
                    var loginPassword = await page.$('#input-account-content-restrictions')
                    await loginPassword.type(password)

                    await delay(2000)

                    await page.keyboard.press('Enter');

                    try {
                    await page.waitForSelector('#input-account-content-restrictions')
                    var loginPassword = await page.$('#input-account-content-restrictions')
                    await loginPassword.type(password)

                    await delay(2000)

                    await page.keyboard.press('Enter');
                    } catch (err) {

                    }
                    await delay(2000)
                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    var user = await page.evaluate(() => {
                        return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label').innerText;
                    })
                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    var confirmPin = await page.$('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    await confirmPin.click()
                    
                    await delay(1000)
                    await page.keyboard.press('Tab');
                    await page.keyboard.press('Enter');
                    
                    
                    await page.waitForSelector('button[class="btn btn-gray btn-small"]')
                    var confirm = await page.$('button[class="btn btn-gray btn-small"]')
                    await confirm.click()
                    console.log('    Successfully Delete Pin Profile 5')
                    await page.goto('https://www.netflix.com/clearcookies', $options)
                        await delay(2000)
                        await browser.close();
                    //batas menghapus pin profile 5
                    
                    }else if (pilihp == 'all'){
                        await delay(500)
                        await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)

                        await page.waitForSelector('#profile_0')
                        var panah = await page.$('#profile_0')
                        await panah.click()

                        await page.waitForSelector('#profile_0 > ul > li:nth-child(3) > a > div.profile-change')
                        var profile = await page.$('#profile_0 > ul > li:nth-child(3) > a > div.profile-change')
                        await profile.click()

                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');

                        try {
                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');
                        } catch (err) {

                        }
                        await delay(2000)
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var user = await page.evaluate(() => {
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label').innerText;
                        })
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var confirmPin = await page.$('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        await confirmPin.click()
                        
                        await delay(1000)
                        await page.keyboard.press('Tab');
                        await page.keyboard.press('Enter');
                        
                        
                        await page.waitForSelector('button[class="btn btn-gray btn-small"]')
                        var confirm = await page.$('button[class="btn btn-gray btn-small"]')
                        await confirm.click()
                        console.log('    Successfully Delete Pin Profile 1')
                        //batas menghapus pin profile 1
                        
                        await delay(500)
                        await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)

                        await page.waitForSelector('#profile_1')
                        var panah = await page.$('#profile_1')
                        await panah.click()

                        await page.waitForSelector('#profile_1 > ul > li:nth-child(3) > a > div.profile-change')
                        var profile = await page.$('#profile_1 > ul > li:nth-child(3) > a > div.profile-change')
                        await profile.click()

                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');

                        try {
                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');
                        } catch (err) {

                        }
                        await delay(2000)
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var user = await page.evaluate(() => {
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label').innerText;
                        })
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var confirmPin = await page.$('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        await confirmPin.click()
                        
                        await delay(1000)
                        await page.keyboard.press('Tab');
                        await page.keyboard.press('Enter');
                        
                        
                        await page.waitForSelector('button[class="btn btn-gray btn-small"]')
                        var confirm = await page.$('button[class="btn btn-gray btn-small"]')
                        await confirm.click()
                        console.log('    Successfully Delete Pin Profile 2')
                        //batas menghapus pin profile 2
                        
                        await delay(500)
                        await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)

                        await page.waitForSelector('#profile_2')
                        var panah = await page.$('#profile_2')
                        await panah.click()

                        await page.waitForSelector('#profile_2 > ul > li:nth-child(3) > a > div.profile-change')
                        var profile = await page.$('#profile_2 > ul > li:nth-child(3) > a > div.profile-change')
                        await profile.click()

                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');

                        try {
                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');
                        } catch (err) {

                        }
                        await delay(2000)
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var user = await page.evaluate(() => {
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label').innerText;
                        })
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var confirmPin = await page.$('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        await confirmPin.click()
                        
                        await delay(1000)
                        await page.keyboard.press('Tab');
                        await page.keyboard.press('Enter');
                        
                        
                        await page.waitForSelector('button[class="btn btn-gray btn-small"]')
                        var confirm = await page.$('button[class="btn btn-gray btn-small"]')
                        await confirm.click()
                        console.log('    Successfully Delete Pin Profile 3')
                        //batas menghapus pin profile 3
                        
                        await delay(500)
                        await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)

                        await page.waitForSelector('#profile_3')
                        var panah = await page.$('#profile_3')
                        await panah.click()

                        await page.waitForSelector('#profile_3 > ul > li:nth-child(3) > a > div.profile-change')
                        var profile = await page.$('#profile_3 > ul > li:nth-child(3) > a > div.profile-change')
                        await profile.click()

                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');

                        try {
                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');
                        } catch (err) {

                        }
                        await delay(2000)
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var user = await page.evaluate(() => {
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label').innerText;
                        })
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var confirmPin = await page.$('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        await confirmPin.click()
                        
                        await delay(1000)
                        await page.keyboard.press('Tab');
                        await page.keyboard.press('Enter');
                        
                        
                        await page.waitForSelector('button[class="btn btn-gray btn-small"]')
                        var confirm = await page.$('button[class="btn btn-gray btn-small"]')
                        await confirm.click()
                        console.log('    Successfully Delete Pin Profile 4')
                        //batas menghapus pin profile 4
                        
                        await delay(500)
                        await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)

                        await page.waitForSelector('#profile_4')
                        var panah = await page.$('#profile_4')
                        await panah.click()

                        await page.waitForSelector('#profile_4 > ul > li:nth-child(3) > a > div.profile-change')
                        var profile = await page.$('#profile_4 > ul > li:nth-child(3) > a > div.profile-change')
                        await profile.click()

                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');

                        try {
                        await page.waitForSelector('#input-account-content-restrictions')
                        var loginPassword = await page.$('#input-account-content-restrictions')
                        await loginPassword.type(password)

                        await delay(2000)

                        await page.keyboard.press('Enter');
                        } catch (err) {

                        }
                        await delay(2000)
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var user = await page.evaluate(() => {
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label').innerText;
                        })
                        await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        var confirmPin = await page.$('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                        await confirmPin.click()
                        
                        await delay(1000)
                        await page.keyboard.press('Tab');
                        await page.keyboard.press('Enter');
                        
                        
                        await page.waitForSelector('button[class="btn btn-gray btn-small"]')
                        var confirm = await page.$('button[class="btn btn-gray btn-small"]')
                        await confirm.click()
                        console.log('    Successfully Delete Pin Profile 5')
                        //batas menghapus pin profile 5
                        await page.goto('https://www.netflix.com/clearcookies', $options)
                        await delay(2000)
                        await browser.close();
                    }
                }
            }
    }else if (menu == 3){
        var email      = readlineSync.question('[+] Email    :');
		var password   = readlineSync.question('[+] password :');
		console.log('\n!!!! Isi all jika ingin menambahkan pin ke semua profile !!!!');
		var pilihp     = readlineSync.question('[+] Profile berapa? : ');
			if (pilihp == 'all'){
				var pin1        = readlineSync.question('[+] Pin 1         : ');
				var pin2        = readlineSync.question('[+] Pin 2         : ');
				var pin3        = readlineSync.question('[+] Pin 3         : ');
				var pin4        = readlineSync.question('[+] Pin 4         : ');
				var pin5        = readlineSync.question('[+] Pin 5         : ');
			}else{
				var pin         = readlineSync.question('[+] Pin           : ');
			}
		console.log('\n');
		var rand = Math.floor(Math.random() * 100000);
		const $options = { waitUntil: 'networkidle2' };
		//const browser = await puppeteer.launch({ headless: false });
		const browser = await puppeteer.launch({headless: false,
		args: ['--window-size=499,632',],
		defaultViewport: null,
		});
        const page = await browser.newPage();
        await page.goto('https://www.netflix.com/id-en/login', $options);
        await delay(3000)

        const emailField = await page.$('input[type=text]')
        await emailField.type(email)
        await emailField.dispose()

        const passwordField = await page.$('input[type=password]')
        await passwordField.type(password)
        await passwordField.dispose()

        await delay(2000)
        const buttonField = await page.$('button[type=submit]')
        await buttonField.click()
        await buttonField.dispose()

        console.log('[+] Waiting For Login')
        try {
        await page.waitForSelector('#appMountPoint > div > div.login-body > div > div > div.hybrid-login-form-main > div > div.ui-message-contents', {visible:true, timeout:5000})
            await delay(2000)
        const noticeLogin = await page.evaluate(() => {
            return document.querySelector('#appMountPoint > div > div.login-body > div > div > div.hybrid-login-form-main > div > div.ui-message-contents').innerText;
        })
            await delay(2000)
        console.log('[' + no + ']', email + '|' + password, 'Information : ', noticeLogin)
        no++
        } catch (err) {
        console.log('[' + no + ']', email + '|' + password, 'Information : Sukses Login')
        no++
        await delay(2000)
        if (page.url().includes('browse')) {
                if (pilihp == 1){
                    await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)

                    await page.waitForSelector('#profile_0')
                    var panah = await page.$('#profile_0')
                    await panah.click()

                    await page.waitForSelector('#profile_0 > ul > li:nth-child(3) > a > div.profile-change')
                    var profile = await page.$('#profile_0 > ul > li:nth-child(3) > a > div.profile-change')
                    await profile.click()

                    await page.waitForSelector('#input-account-content-restrictions')
                    var loginPassword = await page.$('#input-account-content-restrictions')
                    await loginPassword.type(password)

                    await delay(2000)

                    await page.keyboard.press('Enter');

                    try {
                    await page.waitForSelector('#input-account-content-restrictions')
                    var loginPassword = await page.$('#input-account-content-restrictions')
                    await loginPassword.type(password)

                    await delay(2000)

                    await page.keyboard.press('Enter');
                    } catch (err) {

                    }
                    
                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    var user = await page.evaluate(() => {
                        return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label').innerText;
                    })

                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    var confirmPin = await page.$('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    await confirmPin.click()
                    
                    const newpin = await page.$('input[data-uia="pin-number-0"]')
                    await newpin.type(pin)
                    await newpin.dispose()
                    
                    await page.waitForSelector('button[class="btn btn-blue btn-small"]')
                    var confirm = await page.$('button[class="btn btn-blue btn-small"]')
                    await confirm.click()

                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.account-messages-container > div > div.ui-message-contents')
                    var info = await page.evaluate(() => {
                        return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div.account-messages-container > div > div.ui-message-contents').innerText;
                    })
                    
                    console.log('   ',info,user,pin)
                
                }else if (pilihp == 2){
                    await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)

                    await page.waitForSelector('#profile_1')
                    var panah = await page.$('#profile_1')
                    await panah.click()

                    await page.waitForSelector('#profile_1 > ul > li:nth-child(3) > a > div.profile-change')
                    var profile = await page.$('#profile_1 > ul > li:nth-child(3) > a > div.profile-change')
                    await profile.click()

                    await page.waitForSelector('#input-account-content-restrictions')
                    var loginPassword = await page.$('#input-account-content-restrictions')
                    await loginPassword.type(password)

                    await delay(2000)

                    await page.keyboard.press('Enter');

                    try {
                    await page.waitForSelector('#input-account-content-restrictions')
                    var loginPassword = await page.$('#input-account-content-restrictions')
                    await loginPassword.type(password)

                    await delay(2000)

                    await page.keyboard.press('Enter');
                    } catch (err) {

                    }
                    
                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    var user = await page.evaluate(() => {
                        return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label').innerText;
                    })

                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    var confirmPin = await page.$('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    await confirmPin.click()
                    
                    const newpin = await page.$('input[data-uia="pin-number-0"]')
                    await newpin.type(pin)
                    await newpin.dispose()
                    
                    await page.waitForSelector('button[class="btn btn-blue btn-small"]')
                    var confirm = await page.$('button[class="btn btn-blue btn-small"]')
                    await confirm.click()

                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.account-messages-container > div > div.ui-message-contents')
                    var info = await page.evaluate(() => {
                        return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div.account-messages-container > div > div.ui-message-contents').innerText;
                    })
                    
                    console.log('   ',info,user,pin)
                    
                }else if (pilihp == 3){
                    await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)

                    await page.waitForSelector('#profile_2')
                    var panah = await page.$('#profile_2')
                    await panah.click()

                    await page.waitForSelector('#profile_2 > ul > li:nth-child(3) > a > div.profile-change')
                    var profile = await page.$('#profile_2 > ul > li:nth-child(3) > a > div.profile-change')
                    await profile.click()

                    await page.waitForSelector('#input-account-content-restrictions')
                    var loginPassword = await page.$('#input-account-content-restrictions')
                    await loginPassword.type(password)

                    await delay(2000)

                    await page.keyboard.press('Enter');

                    try {
                    await page.waitForSelector('#input-account-content-restrictions')
                    var loginPassword = await page.$('#input-account-content-restrictions')
                    await loginPassword.type(password)

                    await delay(2000)

                    await page.keyboard.press('Enter');
                    } catch (err) {

                    }
                    
                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    var user = await page.evaluate(() => {
                        return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label').innerText;
                    })

                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    var confirmPin = await page.$('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    await confirmPin.click()
                    
                    const newpin = await page.$('input[data-uia="pin-number-0"]')
                    await newpin.type(pin)
                    await newpin.dispose()
                    
                    await page.waitForSelector('button[class="btn btn-blue btn-small"]')
                    var confirm = await page.$('button[class="btn btn-blue btn-small"]')
                    await confirm.click()

                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.account-messages-container > div > div.ui-message-contents')
                    var info = await page.evaluate(() => {
                        return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div.account-messages-container > div > div.ui-message-contents').innerText;
                    })
                    
                    console.log('   ',info,user,pin)
                
                }else if (pilihp == 4){
                    await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)

                    await page.waitForSelector('#profile_3')
                    var panah = await page.$('#profile_3')
                    await panah.click()

                    await page.waitForSelector('#profile_3 > ul > li:nth-child(3) > a > div.profile-change')
                    var profile = await page.$('#profile_3 > ul > li:nth-child(3) > a > div.profile-change')
                    await profile.click()

                    await page.waitForSelector('#input-account-content-restrictions')
                    var loginPassword = await page.$('#input-account-content-restrictions')
                    await loginPassword.type(password)

                    await delay(2000)

                    await page.keyboard.press('Enter');

                    try {
                    await page.waitForSelector('#input-account-content-restrictions')
                    var loginPassword = await page.$('#input-account-content-restrictions')
                    await loginPassword.type(password)

                    await delay(2000)

                    await page.keyboard.press('Enter');
                    } catch (err) {

                    }
                    
                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    var user = await page.evaluate(() => {
                        return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label').innerText;
                    })

                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    var confirmPin = await page.$('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    await confirmPin.click()
                    
                    const newpin = await page.$('input[data-uia="pin-number-0"]')
                    await newpin.type(pin)
                    await newpin.dispose()
                    
                    await page.waitForSelector('button[class="btn btn-blue btn-small"]')
                    var confirm = await page.$('button[class="btn btn-blue btn-small"]')
                    await confirm.click()

                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.account-messages-container > div > div.ui-message-contents')
                    var info = await page.evaluate(() => {
                        return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div.account-messages-container > div > div.ui-message-contents').innerText;
                    })
                    
                    console.log('   ',info,user,pin)
                
                }else if (pilihp == 5){
                    await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)

                    await page.waitForSelector('#profile_4')
                    var panah = await page.$('#profile_4')
                    await panah.click()

                    await page.waitForSelector('#profile_4 > ul > li:nth-child(3) > a > div.profile-change')
                    var profile = await page.$('#profile_4 > ul > li:nth-child(3) > a > div.profile-change')
                    await profile.click()

                    await page.waitForSelector('#input-account-content-restrictions')
                    var loginPassword = await page.$('#input-account-content-restrictions')
                    await loginPassword.type(password)

                    await delay(2000)

                    await page.keyboard.press('Enter');

                    try {
                    await page.waitForSelector('#input-account-content-restrictions')
                    var loginPassword = await page.$('#input-account-content-restrictions')
                    await loginPassword.type(password)

                    await delay(2000)

                    await page.keyboard.press('Enter');
                    } catch (err) {

                    }
                    
                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    var user = await page.evaluate(() => {
                        return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label').innerText;
                    })

                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    var confirmPin = await page.$('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    await confirmPin.click()
                    
                    const newpin = await page.$('input[data-uia="pin-number-0"]')
                    await newpin.type(pin)
                    await newpin.dispose()
                    
                    await page.waitForSelector('button[class="btn btn-blue btn-small"]')
                    var confirm = await page.$('button[class="btn btn-blue btn-small"]')
                    await confirm.click()

                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.account-messages-container > div > div.ui-message-contents')
                    var info = await page.evaluate(() => {
                        return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div.account-messages-container > div > div.ui-message-contents').innerText;
                    })
                    
                    console.log('   ',info,user,pin)
                
                }else if (pilihp == 'all'){
                    await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)

                    await page.waitForSelector('#profile_0')
                    var panah = await page.$('#profile_0')
                    await panah.click()

                    await page.waitForSelector('#profile_0 > ul > li:nth-child(3) > a > div.profile-change')
                    var profile = await page.$('#profile_0 > ul > li:nth-child(3) > a > div.profile-change')
                    await profile.click()

                    await page.waitForSelector('#input-account-content-restrictions')
                    var loginPassword = await page.$('#input-account-content-restrictions')
                    await loginPassword.type(password)

                    await delay(2000)

                    await page.keyboard.press('Enter');

                    try {
                    await page.waitForSelector('#input-account-content-restrictions')
                    var loginPassword = await page.$('#input-account-content-restrictions')
                    await loginPassword.type(password)

                    await delay(2000)

                    await page.keyboard.press('Enter');
                    } catch (err) {

                    }
                    
                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    var user = await page.evaluate(() => {
                        return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label').innerText;
                    })

                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    var confirmPin = await page.$('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    await confirmPin.click()
                    
                    const newpin1 = await page.$('input[data-uia="pin-number-0"]')
                    await newpin1.type(pin1)
                    await newpin1.dispose()
                    
                    await page.waitForSelector('button[class="btn btn-blue btn-small"]')
                    var confirm = await page.$('button[class="btn btn-blue btn-small"]')
                    await confirm.click()

                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.account-messages-container > div > div.ui-message-contents')
                    var info = await page.evaluate(() => {
                        return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div.account-messages-container > div > div.ui-message-contents').innerText;
                    })
                    
                    console.log('   ',info,user,pin1)
                
                
                    await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)

                    await page.waitForSelector('#profile_1')
                    var panah = await page.$('#profile_1')
                    await panah.click()

                    await page.waitForSelector('#profile_1 > ul > li:nth-child(3) > a > div.profile-change')
                    var profile = await page.$('#profile_1 > ul > li:nth-child(3) > a > div.profile-change')
                    await profile.click()

                    await page.waitForSelector('#input-account-content-restrictions')
                    var loginPassword = await page.$('#input-account-content-restrictions')
                    await loginPassword.type(password)

                    await delay(2000)

                    await page.keyboard.press('Enter');

                    try {
                    await page.waitForSelector('#input-account-content-restrictions')
                    var loginPassword = await page.$('#input-account-content-restrictions')
                    await loginPassword.type(password)

                    await delay(2000)

                    await page.keyboard.press('Enter');
                    } catch (err) {

                    }
                    
                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    var user = await page.evaluate(() => {
                        return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label').innerText;
                    })

                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    var confirmPin = await page.$('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    await confirmPin.click()
                    
                    const newpin2 = await page.$('input[data-uia="pin-number-0"]')
                    await newpin2.type(pin2)
                    await newpin2.dispose()
                    
                    await page.waitForSelector('button[class="btn btn-blue btn-small"]')
                    var confirm = await page.$('button[class="btn btn-blue btn-small"]')
                    await confirm.click()

                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.account-messages-container > div > div.ui-message-contents')
                    var info = await page.evaluate(() => {
                        return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div.account-messages-container > div > div.ui-message-contents').innerText;
                    })
                    
                    console.log('   ',info,user,pin2)
                    
                
                    await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)

                    await page.waitForSelector('#profile_2')
                    var panah = await page.$('#profile_2')
                    await panah.click()

                    await page.waitForSelector('#profile_2 > ul > li:nth-child(3) > a > div.profile-change')
                    var profile = await page.$('#profile_2 > ul > li:nth-child(3) > a > div.profile-change')
                    await profile.click()

                    await page.waitForSelector('#input-account-content-restrictions')
                    var loginPassword = await page.$('#input-account-content-restrictions')
                    await loginPassword.type(password)

                    await delay(2000)

                    await page.keyboard.press('Enter');

                    try {
                    await page.waitForSelector('#input-account-content-restrictions')
                    var loginPassword = await page.$('#input-account-content-restrictions')
                    await loginPassword.type(password)

                    await delay(2000)

                    await page.keyboard.press('Enter');
                    } catch (err) {

                    }
                    
                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    var user = await page.evaluate(() => {
                        return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label').innerText;
                    })

                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    var confirmPin = await page.$('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    await confirmPin.click()
                    
                    const newpin3 = await page.$('input[data-uia="pin-number-0"]')
                    await newpin3.type(pin3)
                    await newpin3.dispose()
                    
                    await page.waitForSelector('button[class="btn btn-blue btn-small"]')
                    var confirm = await page.$('button[class="btn btn-blue btn-small"]')
                    await confirm.click()

                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.account-messages-container > div > div.ui-message-contents')
                    var info = await page.evaluate(() => {
                        return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div.account-messages-container > div > div.ui-message-contents').innerText;
                    })
                    
                    console.log('   ',info,user,pin3)
                
                
                    await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)

                    await page.waitForSelector('#profile_3')
                    var panah = await page.$('#profile_3')
                    await panah.click()

                    await page.waitForSelector('#profile_3 > ul > li:nth-child(3) > a > div.profile-change')
                    var profile = await page.$('#profile_3 > ul > li:nth-child(3) > a > div.profile-change')
                    await profile.click()

                    await page.waitForSelector('#input-account-content-restrictions')
                    var loginPassword = await page.$('#input-account-content-restrictions')
                    await loginPassword.type(password)

                    await delay(2000)

                    await page.keyboard.press('Enter');

                    try {
                    await page.waitForSelector('#input-account-content-restrictions')
                    var loginPassword = await page.$('#input-account-content-restrictions')
                    await loginPassword.type(password)

                    await delay(2000)

                    await page.keyboard.press('Enter');
                    } catch (err) {

                    }
                    
                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    var user = await page.evaluate(() => {
                        return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label').innerText;
                    })

                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    var confirmPin = await page.$('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    await confirmPin.click()
                    
                    const newpin4 = await page.$('input[data-uia="pin-number-0"]')
                    await newpin4.type(pin4)
                    await newpin4.dispose()
                    
                    await page.waitForSelector('button[class="btn btn-blue btn-small"]')
                    var confirm = await page.$('button[class="btn btn-blue btn-small"]')
                    await confirm.click()

                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.account-messages-container > div > div.ui-message-contents')
                    var info = await page.evaluate(() => {
                        return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div.account-messages-container > div > div.ui-message-contents').innerText;
                    })
                    
                    console.log('   ',info,user,pin4)
                
                
                    await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)

                    await page.waitForSelector('#profile_4')
                    var panah = await page.$('#profile_4')
                    await panah.click()

                    await page.waitForSelector('#profile_4 > ul > li:nth-child(3) > a > div.profile-change')
                    var profile = await page.$('#profile_4 > ul > li:nth-child(3) > a > div.profile-change')
                    await profile.click()

                    await page.waitForSelector('#input-account-content-restrictions')
                    var loginPassword = await page.$('#input-account-content-restrictions')
                    await loginPassword.type(password)

                    await delay(2000)

                    await page.keyboard.press('Enter');

                    try {
                    await page.waitForSelector('#input-account-content-restrictions')
                    var loginPassword = await page.$('#input-account-content-restrictions')
                    await loginPassword.type(password)

                    await delay(2000)

                    await page.keyboard.press('Enter');
                    } catch (err) {

                    }
                    
                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    var user = await page.evaluate(() => {
                        return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label').innerText;
                    })

                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    var confirmPin = await page.$('#appMountPoint > div > div > div.bd > div > div > div:nth-child(2) > div.ui-binary-input > label')
                    await confirmPin.click()
                    
                    const newpin5 = await page.$('input[data-uia="pin-number-0"]')
                    await newpin5.type(pin5)
                    await newpin5.dispose()
                    
                    await page.waitForSelector('button[class="btn btn-blue btn-small"]')
                    var confirm = await page.$('button[class="btn btn-blue btn-small"]')
                    await confirm.click()

                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.account-messages-container > div > div.ui-message-contents')
                    var info = await page.evaluate(() => {
                        return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div.account-messages-container > div > div.ui-message-contents').innerText;
                    })
                    
                    console.log('   ',info,user,pin5)
                }
            }
        }
    }else if (menu == 4){
        var email  = readlineSync.question('[+] Email         : ');
			var newpwd = readlineSync.question('[+] Password Baru : ');
			while(lagi = 'y'){
				const $options = { waitUntil: 'networkidle2' };
				//const browser = await puppeteer.launch({ headless: false });
				const browser = await puppeteer.launch({headless: false,
				args: ['--window-size=499,632',],
				defaultViewport: null,
				}); 
            const page = await browser.newPage();
            const width=1024, height=1600;
            await page.setViewport( { 'width' : width, 'height' : height } );
            await page.goto('https://www.netflix.com/id-en/LoginHelp', $options);
            await page.waitForSelector('input[name="forgot_password_input"]')

            const inputemail = await page.$('input[name="forgot_password_input"]')
            await inputemail.type(email)
            await inputemail.dispose()
                    
            const buttonNumber = await page.$('button[class="btn forgot-password-action-button btn-blue btn-large"]')
            await buttonNumber.click()
            await buttonNumber.dispose()
                    
            var link = readlineSync.question('    Input Link    : ');
            await page.goto(link, $options);
            
            const inputnewppwd = await page.$('input[name="newPassword"]')
            await inputnewppwd.type(newpwd)
            await inputnewppwd.dispose()
                    
            const confirmnewppwd = await page.$('input[name="confirmNewPassword"]')
            await confirmnewppwd.type(newpwd)
            await confirmnewppwd.dispose()
            
            const save = await page.$('button[class="nf-btn nf-btn-primary nf-btn-retro nf-btn-small"]')
            await save.click()
            await save.dispose()
            
            await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div > div > div.ui-message-contents', {visible:true, timeout:10000})
            const notice_udah_berubah = await page.evaluate(() => {
                return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div > div > div.ui-message-contents').innerText;
            })
            console.log('    Information : ', notice_udah_berubah)
            await page.goto('https://www.netflix.com/clearcookies', $options)
            await delay(1000)
            await browser.close();
            
            var lagi = readlineSync.question('    Lagi [y/n]  : ');
            console.log('\n')
            if (lagi == 'n'){
                await browser.close();
                break;
            }
        }
    }else if (menu == 5){
        var email      = readlineSync.question('[+] Email    :');
		var password   = readlineSync.question('[+] password :');
		var newpwd 	   = readlineSync.question('[+] Password Baru : ');
		console.log('\n');
		const $options = { waitUntil: 'networkidle2' };
		//const browser = await puppeteer.launch({ headless: false });
		const browser = await puppeteer.launch({headless: false,
		args: ['--window-size=499,632',],
		defaultViewport: null,
		});
        const page = await browser.newPage();
        await page.goto('https://www.netflix.com/id-en/login', $options);

        const emailField = await page.$('input[type=text]')
            await emailField.type(email)
            await emailField.dispose()

        const passwordField = await page.$('input[type=password]')
            await passwordField.type(password)
            await passwordField.dispose()

        await delay(2000)
        const buttonField = await page.$('button[type=submit]')
            await buttonField.click()
            await buttonField.dispose()

            console.log('[+] Waiting For Login')
        try {
            await page.waitForSelector('#appMountPoint > div > div.login-body > div > div > div.hybrid-login-form-main > div > div.ui-message-contents', {visible:true, timeout:5000})
            const noticeLogin = await page.evaluate(() => {
                return document.querySelector('#appMountPoint > div > div.login-body > div > div > div.hybrid-login-form-main > div > div.ui-message-contents').innerText;
            })
            console.log('[' + no + ']', email + '|' + password, 'Information : ', noticeLogin)
            no++
        } catch (err) {
            console.log('[' + no + ']', email + '|' + password, 'Information : Sukses Login')
            no++
            await delay(2000)
            
            if (page.url().includes('browse')) {
                    try {
                    await page.goto('https://www.netflix.com/password', $options)
                    await delay(2000)
                
                    const passwordField = await page.$('input[type=password]')
                        await passwordField.type(password)
                        await passwordField.dispose()
                    
                    const passwordBaru = await page.$('input[name=newPassword]')
                        await passwordBaru.type(newpwd)
                        await passwordBaru.dispose()
                    
                    const confirmnewpassword = await page.$('input[name=confirmNewPassword]')
                        await confirmnewpassword.type(newpwd)
                        await confirmnewpassword.dispose()
                    
                    await delay(1000)
                    const buttonField = await page.$('button[type=submit]')
                        await buttonField.click()
                        await buttonField.dispose()
                        
                    console.log(' Successfuly Change Password')
                    fs.appendFileSync('hasil ganti password.txt', email + '|' + newpwd + "\n");
                    console.log(' Successfuly Save Information\n')
                    
                    await delay(2000)
                    await page.goto('https://www.netflix.com/clearcookies', $options)
                    await delay(2000)
                    await browser.close();
                
                } catch (err) {
                    console.log('Tidak Berhasil Ganti Password\n')
                    await page.goto('https://www.netflix.com/clearcookies', $options)
                    await delay(2000)
                    await browser.close();
                    }
                }
            }
        
    }else if (menu == 6){
        var email      = readlineSync.question('[+] Email    :');
		var password   = readlineSync.question('[+] password :');
		console.log('\n');
		const $options = { waitUntil: 'networkidle2' };
		//const browser = await puppeteer.launch({ headless: false });
		const browser = await puppeteer.launch({headless: false,
		args: ['--window-size=499,632',],
		defaultViewport: null,
		});
        const page = await browser.newPage();

        await page.goto('https://www.netflix.com/id-en/login', $options);
        await delay(3000)

        const emailField = await page.$('input[type=text]')
        await emailField.type(email)
        await emailField.dispose()

        const passwordField = await page.$('input[type=password]')
        await passwordField.type(password)
        await passwordField.dispose()

        await delay(5000)
        const buttonField = await page.$('button[type=submit]')
        await buttonField.click()
        await buttonField.dispose()
        
    try {
            await page.waitForSelector('#appMountPoint > div > div.login-body > div > div > div.hybrid-login-form-main > div > div.ui-message-contents', {visible:true, timeout:5000})
            await delay(2000)
            const noticeLogin = await page.evaluate(() => {
                return document.querySelector('#appMountPoint > div > div.login-body > div > div > div.hybrid-login-form-main > div > div.ui-message-contents').innerText;
            })
            await delay(2000)
            console.log('[' + no + ']', email + '|' + password, 'Information : ', noticeLogin)
            no++
            await page.goto('https://www.netflix.com/clearcookies', $options)
            await delay(2000)
            await browser.close();
    } catch (err) {
        console.log('[' + no + ']', email + '|' + password, 'Information : Sukses Login')
        no++
        await delay(2000)
        if (page.url().includes('browse')) {
            try {
                await page.goto('https://www.netflix.com/account', $options)
                await delay(2000)
            
                const on_hold = await page.evaluate(() =>{
                    return document.querySelector('article > section > h2').innerText;
                    })
                    
                console.log('	[+]Status Akun	: ', on_hold+'\n')
                fs.appendFileSync('hasilcheck.txt', no + ') ' +  email + '\n');
                fs.appendFileSync('hasilcheck.txt','    [+]Status Akun   : ' + on_hold +'\n\n');
                //await page.goto('https://www.netflix.com/clearcookies', $options)
                //await delay(2000)
                //await browser.close();
                //cek status akun
                
            } catch (err) {
                try {
                    //await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div:nth-child(2) > div.account-section.collapsable-panel.clearfix > section > div > div.account-subsection.clearfix > div > p > span[id="automation-NextPlanItem"]' , {visible:true, timeout:5000})
                    const results = await page.evaluate(() =>{
                        return document.querySelector('span#automation-NextPlanItem').innerText;
                        })
                    const gc_check = await page.evaluate(() =>{
                        return document.querySelector('div.gift-credit-content-headline.wallet--mop').innerText;
                        })
                    const gc_credit = await page.evaluate(() =>{
                        return document.querySelector('div[data-uia=gift-credit-content-subhead]').innerText;
                        })
                    const habis = await page.evaluate(() =>{
                        return document.querySelector('div.account-section-item').innerText;
                        })
                    const jenis = await page.evaluate(() =>{
                        return document.querySelector('div.account-section-item > b').innerText;
                        })
                    const a = await page.evaluate(() =>{
                        return document.querySelector('#profile_0 > div > div > h3').innerText;
                        })
                    const b = await page.evaluate(() =>{
                        return document.querySelector('#profile_1 > div > div > h3').innerText;
                        })
                    const c = await page.evaluate(() =>{
                        return document.querySelector('#profile_2 > div > div > h3').innerText;
                        })
                    const d = await page.evaluate(() =>{
                        return document.querySelector('#profile_3 > div > div > h3').innerText;
                        })
                    const e = await page.evaluate(() =>{
                        return document.querySelector('#profile_4 > div > div > h3').innerText;
                        })
                        
                    await page.goto('https://www.netflix.com/BillingActivity', $options)
                    await delay(3000)
                    const billing_check = await page.evaluate(() =>{
                        return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div.billingSectionSpace > ul > li:nth-child(2) > div.col.billTotal').innerText;
                        })
                    const periode_layanan = await page.evaluate(() =>{
                        return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div.billingSectionSpace > ul > li:nth-child(2) > div.col.billPeriod').innerText;
                        })
                        
                    console.log('	[+]Pembayaran   	: ', gc_check)
                    console.log('	[+]Credit sampai	: ', gc_credit)
                    console.log('	[+]Profile	 	: ', a,b,c,d,e)
                    console.log('	[+]Paket	   	: ', jenis)
                    console.log('	[+]Information  	: ', results)
                    console.log('	[+]Periode Layanan: ', periode_layanan)
                    console.log('	[+]Pembayaran   	: ', billing_check)
                    console.log('	[+]Abis Tanggal 	: ', habis + '\n')
                    fs.appendFileSync('hasilcheck.txt', no + ') ' +  email + '\n');
                    fs.appendFileSync('hasilcheck.txt','    [+]Pembayaran   : ' + gc_check + '\n    [+]Credit sampai: ' + gc_credit + '\n    [+]Profile	 : '+ a + b + c + d + e +'\n    [+]Paket	   : '+ jenis + '\n    [+]Berubah	 : '+ results + '\n    [+]Habis	   : '+ habis + '\n\n');
                    //cek pembayaran gc status premium
                
                } catch (err) {
                    try{
                        const gc_check = await page.evaluate(() =>{
                            return document.querySelector('div.gift-credit-content-headline.wallet--mop').innerText;
                            })
                        const gc_credit = await page.evaluate(() =>{
                            return document.querySelector('div[data-uia=gift-credit-content-subhead]').innerText;
                            })
                        const habis = await page.evaluate(() =>{
                            return document.querySelector('div.account-section-item').innerText;
                            })
                        const jenis = await page.evaluate(() =>{
                            return document.querySelector('div.account-section-item > b').innerText;
                            })
                        const a = await page.evaluate(() =>{
                            return document.querySelector('#profile_0 > div > div > h3').innerText;
                            })
                        const b = await page.evaluate(() =>{
                            return document.querySelector('#profile_1 > div > div > h3').innerText;
                            })
                        const c = await page.evaluate(() =>{
                            return document.querySelector('#profile_2 > div > div > h3').innerText;
                            })
                        const d = await page.evaluate(() =>{
                            return document.querySelector('#profile_3 > div > div > h3').innerText;
                            })
                        const e = await page.evaluate(() =>{
                            return document.querySelector('#profile_4 > div > div > h3').innerText;
                            })
                            
                        await page.goto('https://www.netflix.com/BillingActivity', $options)
                        await delay(3000)
                        const billing_check = await page.evaluate(() =>{
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div.billingSectionSpace > ul > li:nth-child(2) > div.col.billTotal').innerText;
                            })
                        const periode_layanan = await page.evaluate(() =>{
                            return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div.billingSectionSpace > ul > li:nth-child(2) > div.col.billPeriod').innerText;
                            })		
                            
                        console.log('	[+]Pembayaran 		: ', gc_check	)
                        console.log('	[+]Credit sampai	: ', gc_credit)
                        console.log('	[+]Profile   		: ',a,b,c,d,e)
                        console.log('	[+]Paket			: ', jenis)
                        console.log('	[+]Periode Layanan: ', periode_layanan)
                        console.log('	[+]Pembayaran		: ', billing_check)
                        console.log('	[+]Change Plan This Account\n')
                        
                        fs.appendFileSync('hasilcheck.txt', no + ') ' +  email + '|' + ' Change Plan This Account\n');
                        //cek pembayaran gc status non premium + notif changeplan

                    } catch (err) {
                        try {
                            const cek_cc = await page.evaluate(() =>{
                                return document.querySelector('span.mopType[data-uia=mopType]').innerText;
                                })
                            const jenis = await page.evaluate(() =>{
                                return document.querySelector('div.account-section-item > b').innerText;
                                })
                            const a = await page.evaluate(() =>{
                                return document.querySelector('#profile_0 > div > div > h3').innerText;
                                })
                            const b = await page.evaluate(() =>{
                                return document.querySelector('#profile_1 > div > div > h3').innerText;
                                })
                            const c = await page.evaluate(() =>{
                                return document.querySelector('#profile_2 > div > div > h3').innerText;
                                })
                            const d = await page.evaluate(() =>{
                                return document.querySelector('#profile_3 > div > div > h3').innerText;
                                })
                            const e = await page.evaluate(() =>{
                                return document.querySelector('#profile_4 > div > div > h3').innerText;
                                })
                                
                            await page.goto('https://www.netflix.com/BillingActivity', $options)
                            await delay(3000)
                            const billing_check = await page.evaluate(() =>{
                                return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div.billingSectionSpace > ul > li:nth-child(2) > div.col.billTotal').innerText;
                                })
                            const periode_layanan = await page.evaluate(() =>{
                                return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div.billingSectionSpace > ul > li:nth-child(2) > div.col.billPeriod').innerText;
                                })	
                            
                            console.log('	[+]CC   			: ', cek_cc)
                            console.log('	[+]Profile   		: ',a,b,c,d,e)
                            console.log('	[+]Paket			: ', jenis)
                            console.log('	[+]Periode Layanan: ', periode_layanan)
                            console.log('	[+]Pembayaran   	: ', billing_check+'\n')
                            
                            fs.appendFileSync('hasilcheck.txt', no + ') ' +  email + '\n');
                            fs.appendFileSync('hasilcheck.txt','	[+]Pembayaran   : ' + billing_check + '\n	[+]Profile	 : '+ a + b + c + d + e +'\n	[+]Paket	   : '+ jenis + '\n\n');
                            //cek pembayaran cc status premium
                            
                        } catch (err) {
                            try {
                                const xfinity = await page.evaluate(() =>{
                                    return document.querySelector('div#CHANGEABLE.bobo-provider[data-uia=payment-subsection-bobo-content]').innerText;
                                    })
                                await delay(2000)
                                console.log('	[+]Status Bayar		: ', xfinity+'\n')
                            }
                            
                            catch (err){
                                const no_pay = await page.evaluate(() =>{
                                    return document.querySelector('div.account-section-item[data-uia=no-payment-info]').innerText;
                                    })
                                await page.goto('https://www.netflix.com/BillingActivity', $options)
                                await delay(3000)
                                const billing_check = await page.evaluate(() =>{
                                    return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div.billingSectionSpace > ul > li:nth-child(2) > div.col.billTotal').innerText;
                                    })
                                const periode_layanan = await page.evaluate(() =>{
                                    return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div.billingSectionSpace > ul > li:nth-child(2) > div.col.billPeriod').innerText;
                                    })	
                                    
                                console.log('	[+]Status Bayar		: ', no_pay)
                                console.log('	[+]Periode Layanan	: ', periode_layanan)
                                console.log('	[+]Pembayaran   		: ', billing_check+'\n')
                                await page.goto('https://www.netflix.com/clearcookies', $options)
                                await delay(2000)
                                await browser.close();
                                //cek no payment
                            }
                        }
                    }
                }
            }
            
                console.log('	Cek Lock/Unlocked Profile')
                await page.goto('https://www.netflix.com/account', $options)
                await delay(2000)
                
                //cek p1
                const a = await page.evaluate(() =>{
                    return document.querySelector('#profile_0 > div > div > h3').innerText;
                    })
                const menu_a = await page.$('#profile_0 > div > button')
                await menu_a.click()
                await delay(2000)
                const lock_a = await page.evaluate(() =>{
                    return document.querySelector('#profile_0 > ul > li:nth-child(3) > a > div').innerText;
                    })
                console.log('	Profile	',a+'	: ',lock_a)
                
                //cek p2
                const b = await page.evaluate(() =>{
                    return document.querySelector('#profile_1 > div > div > h3').innerText;
                    })
                const menu_b = await page.$('#profile_1 > div > button')
                await menu_b.click()
                await delay(2000)
                const lock_b = await page.evaluate(() =>{
                    return document.querySelector('#profile_1 > ul > li:nth-child(3) > a > div').innerText;
                    })
                console.log('	Profile	',b+'	: ',lock_b)
                
                //cek p3
                const c = await page.evaluate(() =>{
                    return document.querySelector('#profile_2 > div > div > h3').innerText;
                    })
                const menu_c = await page.$('#profile_2 > div > button')
                await menu_c.click()
                await delay(2000)
                const lock_c = await page.evaluate(() =>{
                    return document.querySelector('#profile_2 > ul > li:nth-child(3) > a > div').innerText;
                    })
                console.log('	Profile	',c+'	: ',lock_c)
                
                //cek p4
                const d = await page.evaluate(() =>{
                    return document.querySelector('#profile_3 > div > div > h3').innerText;
                    })
                const menu_d = await page.$('#profile_3 > div > button')
                await menu_d.click()
                await delay(2000)
                const lock_d = await page.evaluate(() =>{
                    return document.querySelector('#profile_3 > ul > li:nth-child(3) > a > div').innerText;
                    })
                console.log('	Profile	',d+'	: ',lock_d)
                
                //cek p5
                const e = await page.evaluate(() =>{
                    return document.querySelector('#profile_4 > div > div > h3').innerText;
                    })
                const menu_e = await page.$('#profile_4 > div > button')
                await menu_e.click()
                await delay(2000)
                const lock_e = await page.evaluate(() =>{
                    return document.querySelector('#profile_4 > ul > li:nth-child(3) > a > div').innerText;
                    })
                console.log('	Profile	',e+'	: ',lock_e+'\n')
                
                await page.goto('https://www.netflix.com/clearcookies', $options)
                await delay(2000)
                await browser.close();
            }
            
            if (page.url().includes('signup')){
                await delay(2000)
                console.log('	[+]Status Akun	: Restart Membership')
                
                fs.appendFileSync('hasilcheck.txt', no + ') ' +  email + '\n');
                fs.appendFileSync('hasilcheck.txt','	[+]Status Akun   : Restart Membership\n\n');
                await page.goto('https://www.netflix.com/clearcookies', $options)
                await delay(2000)
                await browser.close();
                
                //cek akun restart
                } 
            }				
      
    }else if (menu == 7){
        var email      = readlineSync.question('[+] Email    :');
		console.log('\n');
		const $options = { waitUntil: 'networkidle2' };
		//const browser = await puppeteer.launch({ headless: false });
		const browser = await puppeteer.launch({headless: false,
		args: ['--window-size=499,632',],
		defaultViewport: null,
		});
        const page = await browser.newPage();

        await page.goto('https://www.netflix.com/id-en/', $options);
        await delay(3000)
        try
        {
            const emailField = await page.$('input[type=email]')
            await emailField.type(email)
            await emailField.dispose()

            await delay(5000)
            const buttonField = await page.$('button[type=submit]')
            await buttonField.click()
            await buttonField.dispose()
        }
        
        catch(err)
        {
            console.log('Change IP Maximum Login\n')
            await browser.close();
            break;
        }

        console.log('[+] Waiting For Checking')
        
            await delay(2000)
            if (page.url().includes('id-en/login')) 
            {
                console.log('[+] Found')
                fs.appendFileSync('Brute Check.txt', no + ') ' +  email + '\n');
                no++
                await browser.close();
                
            }
            else {
                console.log('[+] Not Found')
                no++
                await browser.close();
            }
    
    }else if (menu == 8){
        var email      = readlineSync.question('[+] Email    :');
        var password   = readlineSync.question('[+] password :');
        console.log('\n');
        const $options = { waitUntil: 'networkidle2' };
        //const browser = await puppeteer.launch({ headless: false });
        const browser = await puppeteer.launch({headless: false,
        args: ['--window-size=499,632',],
        defaultViewport: null,
        });
        const page = await browser.newPage();
        await page.goto('https://www.netflix.com/id-en/login', $options);

        const emailField = await page.$('input[type=text]')
            await emailField.type(email)
            await emailField.dispose()

        const passwordField = await page.$('input[type=password]')
            await passwordField.type(password)
            await passwordField.dispose()

        await delay(2000)
        const buttonField = await page.$('button[type=submit]')
            await buttonField.click()
            await buttonField.dispose()

            console.log('[+] Waiting For Login')
        try {
            await page.waitForSelector('#appMountPoint > div > div.login-body > div > div > div.hybrid-login-form-main > div > div.ui-message-contents', {visible:true, timeout:5000})
            const noticeLogin = await page.evaluate(() => {
                return document.querySelector('#appMountPoint > div > div.login-body > div > div > div.hybrid-login-form-main > div > div.ui-message-contents').innerText;
            })
            console.log('[' + no + ']', email + '|' + password, 'Information : ', noticeLogin)
            no++
        } catch (err) {
            console.log('[' + no + ']', email + '|' + password, 'Information : Sukses Login')
            no++
            await delay(2000)
            
        if (page.url().includes('browse')) {
            await page.goto('https://www.netflix.com/BillingActivity', $options)
            await delay(3000)
                try {
                const billing_check1 = await page.evaluate(() =>{
                    return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div.billingSectionSpace > ul > li:nth-child(2) > div.col.billTotal').innerText;
                    })
                    
                const billing_check2 = await page.evaluate(() =>{
                    return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div.billingSectionSpace > ul > li:nth-child(3) > div.col.billTotal').innerText;
                    })
                console.log('[+] Akun Sudah Renew')
                console.log('[+] Jenis Payment : ',billing_check1)
                }catch(err){
                    const billing_check1 = await page.evaluate(() =>{
                    return document.querySelector('#appMountPoint > div > div > div.bd > div > div > div.billingSectionSpace > ul > li:nth-child(2) > div.col.billTotal').innerText;
                    })
                    console.log('[+] Akun Belum Renew')
                    console.log('[+] Jenis Payment : ',billing_check1)
                }
            }
        }
    }else if (menu == 9){
        var email      = readlineSync.question('[+] Email    :');
		var password   = readlineSync.question('[+] password :');
		console.log('\n');
		const $options = { waitUntil: 'networkidle2' };
		//const browser = await puppeteer.launch({ headless: false });
		const browser = await puppeteer.launch({headless: false,
		args: ['--window-size=499,632',],
		defaultViewport: null,
		});
        const page = await browser.newPage();
        //await page.setViewport({
        //width: 1920,
        //height: 1080,})
    
        await page.goto('https://www.netflix.com/id-en/login', $options);
        try{
            const emailField = await page.$('input[type=text]')
                await emailField.type(email)
                await emailField.dispose()
    
            const passwordField = await page.$('input[type=password]')
                await passwordField.type(password)
                await passwordField.dispose()
    
            await delay(5000)
            const buttonField = await page.$('button[type=submit]')
                await buttonField.click()
                await buttonField.dispose()
        }catch(err){
            console.log('Change IP Maximum Login\n')
            await browser.close();
            break;
        }
    
        console.log('[+] Waiting For Login')
        try {
            await page.waitForSelector('#appMountPoint > div > div.login-body > div > div > div.hybrid-login-form-main > div > div.ui-message-contents', {visible:true, timeout:5000})
            const noticeLogin = await page.evaluate(() => {
                return document.querySelector('#appMountPoint > div > div.login-body > div > div > div.hybrid-login-form-main > div > div.ui-message-contents').innerText;
            })
            console.log('[' + no + ']', email + '|' + password, 'Information : ', noticeLogin + "\n")
            fs.appendFileSync('hasilcheck.txt', no + ') ' + email + '|' + noticeLogin + "\n");
            no++
            await browser.close();
        } catch (err) {
            console.log('[' + no + ']', email + '|' + password, 'Information : Sukses Login')
            //no++
            await delay(2000)
            if (page.url().includes('browse')) {
                try {
                    await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)
                    await delay(2000)
                
                    //await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div:nth-child(2) > div.account-section.collapsable-panel.clearfix > section > div > div.account-subsection.clearfix > div > p > span[id="automation-NextPlanItem"]' , {visible:true, timeout:5000})
                    const results = await page.evaluate(() =>{
                        return document.querySelector('span#automation-NextPlanItem').innerText;
                        })
                    console.log('' + email + ' Information : ', results + "\n\n")
                    fs.appendFileSync('hasilcheck.txt', no + ') ' + email + '|' + results + "\n");
                    no++
                    await page.goto('https://www.netflix.com/clearcookies', $options)
                    await delay(2000)
                    await browser.close();
                
                } catch (err) {
                    console.log(' Change Plan This Account\n')
                    fs.appendFileSync('hasilcheck.txt', no + ') ' +  email + '|' + ' Change Plan This Account\n');
                    no++
                    await page.goto('https://www.netflix.com/clearcookies', $options)
                    await delay(2000)
                    await browser.close();
                    }
                }
            }
        
    }else if (menu == 10){
        var email      = readlineSync.question('[+] Email    :');
		var password   = readlineSync.question('[+] password :');
		console.log('\n');
		const $options = { waitUntil: 'networkidle2' };
		//const browser = await puppeteer.launch({ headless: false });
		const browser = await puppeteer.launch({headless: false,
		args: ['--window-size=499,632',],
		defaultViewport: null,
		});
        const page = await browser.newPage();

        await page.goto('https://www.netflix.com/id-en/login', $options);
        try{
            const emailField = await page.$('input[type=text]')
                await emailField.type(email)
                await emailField.dispose()

            const passwordField = await page.$('input[type=password]')
                await passwordField.type(password)
                await passwordField.dispose()

            await delay(5000)
            const buttonField = await page.$('button[type=submit]')
                await buttonField.click()
                await buttonField.dispose()
                
        }catch(err){
            console.log('Change IP Maximum Login\n')
            await browser.close();
            break;
        }

        console.log('\n[+] Waiting For Login')
        try {
            await page.waitForSelector('#appMountPoint > div > div.login-body > div > div > div.hybrid-login-form-main > div > div.ui-message-contents', {visible:true, timeout:5000})
            const noticeLogin = await page.evaluate(() => {
                return document.querySelector('#appMountPoint > div > div.login-body > div > div > div.hybrid-login-form-main > div > div.ui-message-contents').innerText;
            })
            console.log('[' + no + ']', email + '|' + password, 'Information : ', noticeLogin + "\n")
            no++
            await browser.close();
        } catch (err) {
            console.log('[' + no + ']', email + '|' + password, 'Information : Sukses Login')
            no++
            await delay(2000)
            if (page.url().includes('browse')) {
                try {
                    await page.goto('https://www.netflix.com/ManageDevices', $options)
                    await delay(2000)
                    
                    /*try {
                            await delay(10000)
                            await page.goto('https://www.netflix.com/account', $options)
                            await delay(2000)
                        
                            const on_hold = await page.evaluate(() =>{
                                return document.querySelector('article > section > h2').innerText;
                                })
                                
                            console.log('	[+]Status Akun	: ', on_hold+'\n')
                            await delay(2000)
                            await browser.close();
                            //cek status akun
                        } 
                        catch (err) {
                            console.log("")
                        }*/
                
                    //await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div:nth-child(2) > div.account-section.collapsable-panel.clearfix > section > div > div > div > div:nth-child(5) > a.account-section-link')
                    //const signout = await page.$('#appMountPoint > div > div > div.bd > div > div:nth-child(2) > div.account-section.collapsable-panel.clearfix > section > div > div > div > div:nth-child(5) > a.account-section-link')
                    //await signout.click()
                    
                    await delay(1000)
                    const buttonField = await page.$('button[data-uia=btn-sign-out]')
                        await buttonField.click()
                        await buttonField.dispose()
                        
                    console.log(' Successfuly Sign Out All Device')
                    
                } catch (err) {
                    console.log('Tidak Berhasil Signout All Device\n')
                    await page.goto('https://www.netflix.com/clearcookies', $options)
                    await delay(2000)
                    await browser.close();
                    }
                await delay(3000)
                //await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)

                await page.waitForSelector('#profile_0')
                const panah = await page.$('#profile_0')
                await panah.click()

                await page.waitForSelector('#profile_0 > ul > li:nth-child(4) > a > div.profile-change')
                const profile1 = await page.$('#profile_0 > ul > li:nth-child(4) > a > div.profile-change')
                await profile1.click()

                await delay(2000)
                try {
                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > ul > li > p', {visible:true, timeout:1000})
                    const noticeInfo = await page.evaluate(() => {
                        return document.querySelector('#appMountPoint > div > div > div.bd > div > div > ul > li > p').innerText;
                    })
                    
                    await page.waitForSelector('h1[data-uia="viewing-activity-header"]', {visible:true, timeout:1000})
                    const activity = await page.evaluate(() => {
                        return document.querySelector('h1[data-uia="viewing-activity-header"]').innerText;
                    })
                    console.log('   ',activity,noticeInfo)

                } catch (err) {
                    await page.waitForSelector('h1[data-uia="viewing-activity-header"]', {visible:true, timeout:1000})
                    const activity = await page.evaluate(() => {
                        return document.querySelector('h1[data-uia="viewing-activity-header"]').innerText;
                    })

                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > ul > li:nth-child(1) > div.col.title', {visible:true, timeout:1000})
                    const ada = await page.$('#appMountPoint > div > div > div.bd > div > div > ul > li:nth-child(1) > div.col.title')
                    if (ada) {
                        console.log('    Have Activity Account',activity)
                    }
                    
                    await delay(2000)
                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div:nth-child(2) > a.viewing-activity-footer-hide', {visible:true, timeout:1000})
                    const deleteActivity = await page.$('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div:nth-child(2) > a.viewing-activity-footer-hide')
                    await deleteActivity.click()
                    
                    await delay(2000)
                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div.nfmodal.large > div > footer > div > button.btn.modal-action-button.btn-blue.btn-small', {visible:true, timeout:1000})
                    const confirmDelete = await page.$('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div.nfmodal.large > div > footer > div > button.btn.modal-action-button.btn-blue.btn-small')
                    await confirmDelete.click()

                    console.log('    Successfully Deleted Activity',activity)
                }
                await delay(3000)
                await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)
                
                await page.waitForSelector('#profile_1')
                const panah1 = await page.$('#profile_1')
                await panah1.click()

                await page.waitForSelector('#profile_1 > ul > li:nth-child(4) > a > div.profile-change')
                const profile2 = await page.$('#profile_1 > ul > li:nth-child(4) > a > div.profile-change')
                await profile2.click()

                await delay(2000)

                try {
                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > ul > li > p', {visible:true, timeout:1000})
                    const noticeInfo = await page.evaluate(() => {
                        return document.querySelector('#appMountPoint > div > div > div.bd > div > div > ul > li > p').innerText;
                    })

                    await page.waitForSelector('h1[data-uia="viewing-activity-header"]', {visible:true, timeout:1000})
                    const activity = await page.evaluate(() => {
                        return document.querySelector('h1[data-uia="viewing-activity-header"]').innerText;
                    })
                    console.log('   ',activity,noticeInfo)

                } catch (err) {
                    await page.waitForSelector('h1[data-uia="viewing-activity-header"]', {visible:true, timeout:1000})
                    const activity = await page.evaluate(() => {
                        return document.querySelector('h1[data-uia="viewing-activity-header"]').innerText;
                    })

                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > ul > li:nth-child(1) > div.col.title', {visible:true, timeout:1000})
                    const ada = await page.$('#appMountPoint > div > div > div.bd > div > div > ul > li:nth-child(1) > div.col.title')
                    if (ada) {
                        console.log('    Have Activity Account',activity)
                    }
                    
                    await delay(2000)
                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div:nth-child(2) > a.viewing-activity-footer-hide', {visible:true, timeout:1000})
                    const deleteActivity = await page.$('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div:nth-child(2) > a.viewing-activity-footer-hide')
                    await deleteActivity.click()

                    await delay(2000)
                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div.nfmodal.large > div > footer > div > button.btn.modal-action-button.btn-blue.btn-small', {visible:true, timeout:1000})
                    const confirmDelete = await page.$('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div.nfmodal.large > div > footer > div > button.btn.modal-action-button.btn-blue.btn-small')
                    await confirmDelete.click()

                    console.log('    Successfully Deleted Activity',activity)
                }
                
                await delay(3000)
                await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)
                

                await page.waitForSelector('#profile_2')
                const panah2 = await page.$('#profile_2')
                await panah2.click()
                
                await page.waitForSelector('#profile_2 > ul > li:nth-child(4) > a > div.profile-change')
                const profile3 = await page.$('#profile_2 > ul > li:nth-child(4) > a > div.profile-change')
                await profile3.click()

                await delay(2000)

                try {
                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > ul > li > p', {visible:true, timeout:1000})
                    const noticeInfo = await page.evaluate(() => {
                        return document.querySelector('#appMountPoint > div > div > div.bd > div > div > ul > li > p').innerText;
                    })
                    
                    await page.waitForSelector('h1[data-uia="viewing-activity-header"]', {visible:true, timeout:1000})
                    const activity = await page.evaluate(() => {
                        return document.querySelector('h1[data-uia="viewing-activity-header"]').innerText;
                    })
                    console.log('   ',activity,noticeInfo)

                } catch (err) {
                    await page.waitForSelector('h1[data-uia="viewing-activity-header"]', {visible:true, timeout:1000})
                    const activity = await page.evaluate(() => {
                        return document.querySelector('h1[data-uia="viewing-activity-header"]').innerText;
                    })

                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > ul > li:nth-child(1) > div.col.title', {visible:true, timeout:1000})
                    const ada = await page.$('#appMountPoint > div > div > div.bd > div > div > ul > li:nth-child(1) > div.col.title')
                    if (ada) {
                        console.log('    Have Activity Account',activity)
                    }
                    
                    await delay(2000)
                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div:nth-child(2) > a.viewing-activity-footer-hide', {visible:true, timeout:1000})
                    const deleteActivity = await page.$('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div:nth-child(2) > a.viewing-activity-footer-hide')
                    await deleteActivity.click()
                    
                    await delay(2000)
                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div.nfmodal.large > div > footer > div > button.btn.modal-action-button.btn-blue.btn-small', {visible:true, timeout:1000})
                    const confirmDelete = await page.$('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div.nfmodal.large > div > footer > div > button.btn.modal-action-button.btn-blue.btn-small')
                    await confirmDelete.click()

                    console.log('    Successfully Deleted Activity',activity)
                }
                
                await delay(3000)
                await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)
                
                await page.waitForSelector('#profile_3')
                const panah3 = await page.$('#profile_3')
                await panah3.click()

                await page.waitForSelector('#profile_3 > ul > li:nth-child(4) > a > div.profile-change')
                const profile4 = await page.$('#profile_3 > ul > li:nth-child(4) > a > div.profile-change')
                await profile4.click()

                await delay(2000)

                try {
                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > ul > li > p', {visible:true, timeout:1000})
                    const noticeInfo = await page.evaluate(() => {
                        return document.querySelector('#appMountPoint > div > div > div.bd > div > div > ul > li > p').innerText;
                    })
                    
                    await page.waitForSelector('h1[data-uia="viewing-activity-header"]', {visible:true, timeout:1000})
                    const activity = await page.evaluate(() => {
                        return document.querySelector('h1[data-uia="viewing-activity-header"]').innerText;
                    })
                    console.log('   ',activity,noticeInfo)

                } catch (err) {
                    await page.waitForSelector('h1[data-uia="viewing-activity-header"]', {visible:true, timeout:1000})
                    const activity = await page.evaluate(() => {
                        return document.querySelector('h1[data-uia="viewing-activity-header"]').innerText;
                    })

                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > ul > li:nth-child(1) > div.col.title', {visible:true, timeout:1000})
                    const ada = await page.$('#appMountPoint > div > div > div.bd > div > div > ul > li:nth-child(1) > div.col.title')
                    if (ada) {
                        console.log('    Have Activity Account',activity)
                    }
                    
                    await delay(2000)
                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div:nth-child(2) > a.viewing-activity-footer-hide', {visible:true, timeout:1000})
                    const deleteActivity = await page.$('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div:nth-child(2) > a.viewing-activity-footer-hide')
                    await deleteActivity.click()
                    
                    await delay(2000)
                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div.nfmodal.large > div > footer > div > button.btn.modal-action-button.btn-blue.btn-small', {visible:true, timeout:1000})
                    const confirmDelete = await page.$('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div.nfmodal.large > div > footer > div > button.btn.modal-action-button.btn-blue.btn-small')
                    await confirmDelete.click()

                    console.log('    Successfully Deleted Activity',activity)
                }
                
                await delay(3000)
                await page.goto('https://www.netflix.com/youraccount?locale=id-ID', $options)
                
                await page.waitForSelector('#profile_4')
                const panah4 = await page.$('#profile_4')
                await panah4.click()

                await page.waitForSelector('#profile_4 > ul > li:nth-child(4) > a > div.profile-change')
                const profile5 = await page.$('#profile_4 > ul > li:nth-child(4) > a > div.profile-change')
                await profile5.click()

                await delay(3000)
                
                try {
                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > ul > li > p', {visible:true, timeout:1000})
                    const noticeInfo = await page.evaluate(() => {
                        return document.querySelector('#appMountPoint > div > div > div.bd > div > div > ul > li > p').innerText;
                    })
                    
                    await page.waitForSelector('h1[data-uia="viewing-activity-header"]', {visible:true, timeout:1000})
                    const activity = await page.evaluate(() => {
                        return document.querySelector('h1[data-uia="viewing-activity-header"]').innerText;
                    })
                    console.log('   ',activity,noticeInfo)
                    await browser.close();
                    
                } catch (err) {
                    await page.waitForSelector('h1[data-uia="viewing-activity-header"]', {visible:true, timeout:1000})
                    const activity = await page.evaluate(() => {
                        return document.querySelector('h1[data-uia="viewing-activity-header"]').innerText;
                    })

                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > ul > li:nth-child(1) > div.col.title', {visible:true, timeout:1000})
                    const ada = await page.$('#appMountPoint > div > div > div.bd > div > div > ul > li:nth-child(1) > div.col.title')
                    if (ada) {
                        console.log('    Have Activity Account',activity)
                    }
                    
                    await delay(2000)
                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div:nth-child(2) > a.viewing-activity-footer-hide', {visible:true, timeout:1000})
                    const deleteActivity = await page.$('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div:nth-child(2) > a.viewing-activity-footer-hide')
                    await deleteActivity.click()
                    
                    await delay(2000)
                    await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div.nfmodal.large > div > footer > div > button.btn.modal-action-button.btn-blue.btn-small', {visible:true, timeout:1000})
                    const confirmDelete = await page.$('#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div.nfmodal.large > div > footer > div > button.btn.modal-action-button.btn-blue.btn-small')
                    await confirmDelete.click()

                    console.log('    Successfully Deleted Activity',activity)
                    await browser.close();
                    }
                }
            }
        
    }else if (menu == 11){
        var email      = readlineSync.question('[+] Email    :');
		var password   = readlineSync.question('[+] password :');
        while(true){
            console.log('\n');
		const $options = { waitUntil: 'networkidle2' };
		//const browser = await puppeteer.launch({ headless: false });
		const browser = await puppeteer.launch({headless: false,
		args: ['--window-size=499,632',],
		defaultViewport: null,
		});
            const page = await browser.newPage();

            await page.goto('https://www.netflix.com/id-en/login', $options);
            try{
                const emailField = await page.$('input[type=text]')
                    await emailField.type(email)
                    await emailField.dispose()

                const passwordField = await page.$('input[type=password]')
                    await passwordField.type(password)
                    await passwordField.dispose()

                await delay(5000)
                const buttonField = await page.$('button[type=submit]')
                    await buttonField.click()
                    await buttonField.dispose()
                    
            }catch(err){
                console.log('Change IP Maximum Login\n')
                await browser.close();
                break;
            }

            console.log('[+] Waiting For Login')
            try {
                await page.waitForSelector('#appMountPoint > div > div.login-body > div > div > div.hybrid-login-form-main > div > div.ui-message-contents', {visible:true, timeout:5000})
                const noticeLogin = await page.evaluate(() => {
                    return document.querySelector('#appMountPoint > div > div.login-body > div > div > div.hybrid-login-form-main > div > div.ui-message-contents').innerText;
                })
                console.log('[' + no + ']', email + '|' + password, 'Information : ', noticeLogin + "\n")
                fs.appendFileSync('hasil ganti password.txt', no + ') ' + email + '|' + noticeLogin + "\n");
                no++
                await browser.close();
            } catch (err) {
                console.log('[' + no + ']', email + '|' + password, 'Information : Sukses Login')
                no++
                await delay(2000)
                if (page.url().includes('browse')){
                await delay(2000)
                await browser.close();
            }
                if (i == list.length){
                    var i = 0;
                    }
                } 
            }

    }else if (menu == 12){
        var email      = readlineSync.question('[+] Email    :');
		var password   = readlineSync.question('[+] password :');
        while(lagi = 'y'){
            console.log('\n');
		const $options = { waitUntil: 'networkidle2' };
		//const browser = await puppeteer.launch({ headless: false });
		const browser = await puppeteer.launch({headless: false,
		args: ['--window-size=499,632',],
		defaultViewport: null,
		});
            const page = await browser.newPage();

            await page.goto('https://www.netflix.com/id-en/login', $options);
            try{
                const emailField = await page.$('input[type=text]')
                    await emailField.type(email)
                    await emailField.dispose()

                const passwordField = await page.$('input[type=password]')
                    await passwordField.type(password)
                    await passwordField.dispose()

                await delay(5000)
                const buttonField = await page.$('button[type=submit]')
                    await buttonField.click()
                    await buttonField.dispose()
                    
            }catch(err){
                console.log('Change IP Maximum Login\n')
                await browser.close();
                break;
            }

            console.log('\n[+] Waiting For Login')
            try {
                await page.waitForSelector('#appMountPoint > div > div.login-body > div > div > div.hybrid-login-form-main > div > div.ui-message-contents', {visible:true, timeout:5000})
                const noticeLogin = await page.evaluate(() => {
                    return document.querySelector('#appMountPoint > div > div.login-body > div > div > div.hybrid-login-form-main > div > div.ui-message-contents').innerText;
                })
                console.log('[' + no + ']', email + '|' + password, 'Information : ', noticeLogin + "\n")
                no++
                await browser.close();
            } catch (err) {
                console.log('[' + no + ']', email + '|' + password, 'Information : Sukses Login')
                no++
                await delay(2000)
                if (page.url().includes('browse')) {
                    try {
                        await page.goto('https://www.netflix.com/ManageDevices', $options)
                        await delay(2000)
                    
                        //await page.waitForSelector('#appMountPoint > div > div > div.bd > div > div:nth-child(2) > div.account-section.collapsable-panel.clearfix > section > div > div > div > div:nth-child(5) > a.account-section-link')
                        //const signout = await page.$('#appMountPoint > div > div > div.bd > div > div:nth-child(2) > div.account-section.collapsable-panel.clearfix > section > div > div > div > div:nth-child(5) > a.account-section-link')
                        //await signout.click()
                        
                        await delay(1000)
                        const buttonField = await page.$('button[type=button]')
                            await buttonField.click()
                            await buttonField.dispose()
                            
                        console.log(' Successfuly Sign Out All Device')
                        await browser.close();
                        
                    } catch (err) {
                        console.log('Tidak Berhasil Signout All Device\n')
                        //await page.goto('https://www.netflix.com/clearcookies', $options)
                        await delay(2000)
                        await browser.close();
                        }
                    }
                }
            }
        var lagi = readlineSync.question('    Lagi [y/n]  : ');
        console.log('\n')
        var i = 0;
        if (lagi == 'n'){
        await browser.close();
        break;
        }
            }

}else if (pilihan ==3 ){
        while(lagi = 'y'){
            const P = ['\\', '|', '/', '-'];
            let x = 0;
            const loader = setInterval(() => {
            process.stdout.write(chalk.red('Loading' + `\r${P[x++]}`));
            x %= P.length;
            }, 250);

            setTimeout(() => {
            clearInterval(loader);
            }, 5000);
            
            const $options = { waitUntil: 'networkidle2' };
                const browser = await puppeteer.launch({headless: true,
                    args: ['--window-size=499,632',],
                    defaultViewport: null,
                    });
                const page = await browser.newPage();
                    await delay(2000)
            await page.goto('https://itemku.com/g/netflix/akun?page=1&group=198', $options);

            //ambil harga    
            {

                await page.waitForSelector('div#__next > div > div > div > div.w-full > div.w-full.pb-13 > div > a:nth-child(1) > div > div > div.w-full.px-2.py-3.space-y-3 > div.text-xl.text-persimmon.font-bold.leading-tight.mr-2', {visible:true, timeout:5000})
                const harga1 = await page.evaluate(() => {
                    return document.querySelector('div#__next > div > div > div > div.w-full > div.w-full.pb-13 > div > a:nth-child(1) > div > div > div.w-full.px-2.py-3.space-y-3 > div.text-xl.text-persimmon.font-bold.leading-tight.mr-2').innerText;
                })

                await page.waitForSelector('div#__next > div > div > div > div.w-full > div.w-full.pb-13 > div > a:nth-child(2) > div > div > div.w-full.px-2.py-3.space-y-3 > div.text-xl.text-persimmon.font-bold.leading-tight.mr-2', {visible:true, timeout:5000})
                const harga2 = await page.evaluate(() => {
                    return document.querySelector('div#__next > div > div > div > div.w-full > div.w-full.pb-13 > div > a:nth-child(2) > div > div > div.w-full.px-2.py-3.space-y-3 > div.text-xl.text-persimmon.font-bold.leading-tight.mr-2').innerText;
                })

                await page.waitForSelector('div#__next > div > div > div > div.w-full > div.w-full.pb-13 > div > a:nth-child(3) > div > div > div.w-full.px-2.py-3.space-y-3 > div.text-xl.text-persimmon.font-bold.leading-tight.mr-2', {visible:true, timeout:5000})
                const harga3 = await page.evaluate(() => {
                    return document.querySelector('div#__next > div > div > div > div.w-full > div.w-full.pb-13 > div > a:nth-child(3) > div > div > div.w-full.px-2.py-3.space-y-3 > div.text-xl.text-persimmon.font-bold.leading-tight.mr-2').innerText;
                })

                await page.waitForSelector('div#__next > div > div > div > div.w-full > div.w-full.pb-13 > div > a:nth-child(4) > div > div > div.w-full.px-2.py-3.space-y-3 > div.text-xl.text-persimmon.font-bold.leading-tight.mr-2', {visible:true, timeout:5000})
                const harga4 = await page.evaluate(() => {
                    return document.querySelector('div#__next > div > div > div > div.w-full > div.w-full.pb-13 > div > a:nth-child(4) > div > div > div.w-full.px-2.py-3.space-y-3 > div.text-xl.text-persimmon.font-bold.leading-tight.mr-2').innerText;
                })

                await page.waitForSelector('div#__next > div > div > div > div.w-full > div.w-full.pb-13 > div > a:nth-child(5) > div > div > div.w-full.px-2.py-3.space-y-3 > div.text-xl.text-persimmon.font-bold.leading-tight.mr-2', {visible:true, timeout:5000})
                const harga5 = await page.evaluate(() => {
                    return document.querySelector('div#__next > div > div > div > div.w-full > div.w-full.pb-13 > div > a:nth-child(5) > div > div > div.w-full.px-2.py-3.space-y-3 > div.text-xl.text-persimmon.font-bold.leading-tight.mr-2').innerText;
                })

                await page.waitForSelector('div#__next > div > div > div > div.w-full > div.w-full.pb-13 > div > a:nth-child(6) > div > div > div.w-full.px-2.py-3.space-y-3 > div.text-xl.text-persimmon.font-bold.leading-tight.mr-2', {visible:true, timeout:5000})
                const harga6 = await page.evaluate(() => {
                    return document.querySelector('div#__next > div > div > div > div.w-full > div.w-full.pb-13 > div > a:nth-child(6) > div > div > div.w-full.px-2.py-3.space-y-3 > div.text-xl.text-persimmon.font-bold.leading-tight.mr-2').innerText;
                })

                await page.waitForSelector('div#__next > div > div > div > div.w-full > div.w-full.pb-13 > div > a:nth-child(7) > div > div > div.w-full.px-2.py-3.space-y-3 > div.text-xl.text-persimmon.font-bold.leading-tight.mr-2', {visible:true, timeout:5000})
                const harga7 = await page.evaluate(() => {
                    return document.querySelector('div#__next > div > div > div > div.w-full > div.w-full.pb-13 > div > a:nth-child(7) > div > div > div.w-full.px-2.py-3.space-y-3 > div.text-xl.text-persimmon.font-bold.leading-tight.mr-2').innerText;
                })

                await page.waitForSelector('div#__next > div > div > div > div.w-full > div.w-full.pb-13 > div > a:nth-child(8) > div > div > div.w-full.px-2.py-3.space-y-3 > div.text-xl.text-persimmon.font-bold.leading-tight.mr-2', {visible:true, timeout:5000})
                const harga8 = await page.evaluate(() => {
                    return document.querySelector('div#__next > div > div > div > div.w-full > div.w-full.pb-13 > div > a:nth-child(8) > div > div > div.w-full.px-2.py-3.space-y-3 > div.text-xl.text-persimmon.font-bold.leading-tight.mr-2').innerText;
                })

                await page.waitForSelector('div#__next > div > div > div > div.w-full > div.w-full.pb-13 > div > a:nth-child(9) > div > div > div.w-full.px-2.py-3.space-y-3 > div.text-xl.text-persimmon.font-bold.leading-tight.mr-2', {visible:true, timeout:5000})
                const harga9 = await page.evaluate(() => {
                    return document.querySelector('div#__next > div > div > div > div.w-full > div.w-full.pb-13 > div > a:nth-child(9) > div > div > div.w-full.px-2.py-3.space-y-3 > div.text-xl.text-persimmon.font-bold.leading-tight.mr-2').innerText;
                })

                await page.waitForSelector('div#__next > div > div > div > div.w-full > div.w-full.pb-13 > div > a:nth-child(10) > div > div > div.w-full.px-2.py-3.space-y-3 > div.text-xl.text-persimmon.font-bold.leading-tight.mr-2', {visible:true, timeout:5000})
                const harga10 = await page.evaluate(() => {
                    return document.querySelector('div#__next > div > div > div > div.w-full > div.w-full.pb-13 > div > a:nth-child(10) > div > div > div.w-full.px-2.py-3.space-y-3 > div.text-xl.text-persimmon.font-bold.leading-tight.mr-2').innerText;
                })

                await page.waitForSelector('div#__next > div > div > div > div.w-full > div.w-full.pb-13 > div > a:nth-child(11) > div > div > div.w-full.px-2.py-3.space-y-3 > div.text-xl.text-persimmon.font-bold.leading-tight.mr-2', {visible:true, timeout:5000})
                const harga11 = await page.evaluate(() => {
                    return document.querySelector('div#__next > div > div > div > div.w-full > div.w-full.pb-13 > div > a:nth-child(11) > div > div > div.w-full.px-2.py-3.space-y-3 > div.text-xl.text-persimmon.font-bold.leading-tight.mr-2').innerText;
                })

                await page.waitForSelector('div#__next > div > div > div > div.w-full > div.w-full.pb-13 > div > a:nth-child(12) > div > div > div.w-full.px-2.py-3.space-y-3 > div.text-xl.text-persimmon.font-bold.leading-tight.mr-2', {visible:true, timeout:5000})
                const harga12 = await page.evaluate(() => {
                    return document.querySelector('div#__next > div > div > div > div.w-full > div.w-full.pb-13 > div > a:nth-child(12) > div > div > div.w-full.px-2.py-3.space-y-3 > div.text-xl.text-persimmon.font-bold.leading-tight.mr-2').innerText;
                })

                await page.waitForSelector('div#__next > div > div > div > div.w-full > div.w-full.pb-13 > div > a:nth-child(13) > div > div > div.w-full.px-2.py-3.space-y-3 > div.text-xl.text-persimmon.font-bold.leading-tight.mr-2', {visible:true, timeout:5000})
                const harga13 = await page.evaluate(() => {
                    return document.querySelector('div#__next > div > div > div > div.w-full > div.w-full.pb-13 > div > a:nth-child(13) > div > div > div.w-full.px-2.py-3.space-y-3 > div.text-xl.text-persimmon.font-bold.leading-tight.mr-2').innerText;
                })

                await page.waitForSelector('div#__next > div > div > div > div.w-full > div.w-full.pb-13 > div > a:nth-child(14) > div > div > div.w-full.px-2.py-3.space-y-3 > div.text-xl.text-persimmon.font-bold.leading-tight.mr-2', {visible:true, timeout:5000})
                const harga14 = await page.evaluate(() => {
                    return document.querySelector('div#__next > div > div > div > div.w-full > div.w-full.pb-13 > div > a:nth-child(14) > div > div > div.w-full.px-2.py-3.space-y-3 > div.text-xl.text-persimmon.font-bold.leading-tight.mr-2').innerText;
                })

                await page.waitForSelector('div#__next > div > div > div > div.w-full > div.w-full.pb-13 > div > a:nth-child(15) > div > div > div.w-full.px-2.py-3.space-y-3 > div.text-xl.text-persimmon.font-bold.leading-tight.mr-2', {visible:true, timeout:5000})
                const harga15 = await page.evaluate(() => {
                    return document.querySelector('div#__next > div > div > div > div.w-full > div.w-full.pb-13 > div > a:nth-child(15) > div > div > div.w-full.px-2.py-3.space-y-3 > div.text-xl.text-persimmon.font-bold.leading-tight.mr-2').innerText;
                })
                console.log(chalk.green('Loading Done\n'))
                console.log('Harga 1 :',harga1 + '  Harga 6 :', harga6 + '  Harga 11 :',harga1 +"\n")
                console.log('Harga 2 :',harga2 + '  Harga 7 :', harga7 + '  Harga 12 :',harga1 +"\n")
                console.log('Harga 3 :',harga3 + '  Harga 8 :', harga8 + '  Harga 13 :',harga1 +"\n")
                console.log('Harga 4 :',harga4 + '  Harga 9 :', harga9 + '  Harga 14 :',harga1 +"\n")
                console.log('Harga 5 :',harga5 + '  Harga 10 :', harga10 + '  Harga 15 :',harga1 +"\n") 
            }
            
                //batas ambil harga
        var lagi = readlineSync.question('    Lagi [y/n]  : ');
        console.log('\n')
        var i = 0;
        if (lagi == 'n'){
        await browser.close();
        break;
        }
    }
}
}  
})();