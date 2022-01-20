// ==UserScript==
// @name        New Userscript
// @namespace   https://noel.moe
// @version     1.0.0
// @description custom style only
// @author      ShionMaker
// @include     https://nhentai.net/g/*/*/
// @include     https://www.manhuaren.com/*/
// @icon        https://www.google.com/s2/favicons?domain=nhentai.net
// @grant       none
// ==/UserScript==

(() => {
    'use strict'
    const domainName = document.domain

    const nhentai = () => {
        const css = document.createElement('style')
        css.type = 'text/css'
        css.innerHTML = "#image-container a img {height: 100vh !important; width: auto}"
        document.getElementsByTagName('head')[0].appendChild(css);
    }

    const manhuaren = () => {
        //close useless stuff
        document.getElementsByClassName("guide")[0].style.display = "none"
        document.getElementsByClassName("view-fix-top-bar")[0].style.display = "none"
        document.getElementsByClassName("view-fix-bottom-bar")[0].style.display = "none"
        document.getElementsByClassName("view-bottom-bar")[0].style.display = "none"

        const nextChapter = document.getElementsByClassName("winnextchapter")[0]

        // handle left right and esc key
        window.onkeydown = (event) => {
            const { key, repeat } = event
            if(!repeat){
                if(key == 'ArrowLeft'){
                    document.getElementsByClassName("view-bottom-bar")[0].children[1].children[0].click()
                } else if(key == 'ArrowRight' && nextChapter.style.display == ""){
                    document.getElementsByClassName("view-bottom-bar")[0].children[3].children[0].click()
                } else if(key == 'ArrowRight'){
                    document.getElementsByClassName("view-bottom-bar")[0].children[2].children[0].click()
                }
            }
        }

        //image style
        const css = document.createElement('style')
        css.innerHTML = `body { background-color: #2d3436; } #cp_img { display: flex; justify-content: center; } #cp_img img { height: 100vh; width: auto; }`
        document.getElementsByTagName('head')[0].appendChild(css)
    }

    domainName === "nhentai.net" && nhentai()
    domainName === "www.manhuaren.com" && manhuaren()

    // Your code here...
})();