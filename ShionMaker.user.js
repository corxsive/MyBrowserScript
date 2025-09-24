// ==UserScript==
// @name         MyLittleShion Script
// @version      2025-09-24
// @description  custom style only
// @author       ShionMaker
// @include      https://n*n*a*.n*/g/*/*/
// @include      https://animemusicquiz.com/
// @include      https://www.youtube.com/*
// @include      https://anime1.me/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @license      MIT license
// @grant        none
// @run-at       document-end
// @downloadURL  https://github.com/corxsive/MyBrowserScript/raw/main/ShionMaker.user.js
// @updateURL    https://github.com/corxsive/MyBrowserScript/raw/main/ShionMaker.user.js

// ==/UserScript==

(() => {
    'use strict'

    class Global {
        static getDomainName() {
            return window.location.hostname
        }
    }

    class Secret {
        constructor() {

        }
        fullHeightImageDisplay() {
            const css = document.createElement('style')
            css.innerHTML = "#image-container a img {height: 100vh !important; width: auto}"
            document.getElementsByTagName('head')[0].appendChild(css)
        }
    }

    class AMQ {
        constructor() {
            console.log("animemusicquiz.com detected")
        }
        #clickAlert() {
            const popup = document.querySelector(".swal2-actions")
            if (popup) {
                document.querySelector(".swal2-actions button").onclick()
            }
        }
        alertAutoConfirm() {
            // execute once on login page loaded
            this.#clickAlert()
            console.log("Alert auto confirm executed")

            const callback = (mutationsList, observer) => {
                for (const mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                        this.#clickAlert()
                    }
                }
            }
            const observer = new MutationObserver(callback)
            observer.observe(document.body, { childList: true, subtree: true })
        }
        removeAfk() {
            AfkKicker.prototype.setupAfkTimeout = () => { }
            afkKicker.setup()
        }
        tabAutocomplete() {
            let answer_input = document.querySelector("#qpAnswerInput, #sai-answer-input")
            let selection = null
            answer_input.addEventListener("input", () => { selection = null })

            answer_input.addEventListener('keydown', (e) => {
                let autocomplete_list = document.querySelectorAll("#qpAnswerInputContainer > div.awesomplete > ul > li")
                if (e.key === "Tab") {
                    if (autocomplete_list.length === 0) return e.preventDefault()
                    if (selection != null) {
                        autocomplete_list[selection % autocomplete_list.length].style.background = ''
                        autocomplete_list[selection % autocomplete_list.length].style.color = ''
                    }
                    // allow shift + tab to reverse selection
                    selection = (e.shiftKey ? (selection == null || selection == 0 ? autocomplete_list.length - 1 : selection - 1) : (selection == null || selection == autocomplete_list.length - 1 ? 0 : selection + 1))
                    autocomplete_list[selection % autocomplete_list.length].style.background = 'hsl(200, 40%, 80%)'
                    autocomplete_list[selection % autocomplete_list.length].style.color = 'black'
                    autocomplete_list[selection % autocomplete_list.length].parentNode.scrollTop = autocomplete_list[selection % autocomplete_list.length].offsetTop
                    answer_input.value = autocomplete_list[selection % autocomplete_list.length].textContent
                    e.preventDefault()
                } else if (e.key === "Enter") {
                    if (autocomplete_list.length === 0 || (selection == null && autocomplete_list[0].textContent.toLowerCase() != answer_input.value.toLowerCase())) {
                        return e.preventDefault()
                    }
                }
            }, true)

            answer_input.addEventListener('keyup', (e) => {
                let autocomplete_list = document.querySelectorAll("#qpAnswerInputContainer > div.awesomplete > ul > li")
                if (!quiz.skipController._toggled && answer_input.value.length >= 3 && autocomplete_list.length === 1) {
                    let originText = answer_input.value
                    quiz.answerInput.setNewAnswer(`${autocomplete_list[0].textContent}`)
                    answer_input.value = originText
                    quiz.skipClicked()
                }
            }, true)
        }
    }

    class Youtube {
        constructor() {
            console.log("youtube.com detected")
        }
        removeChapters() {
            setTimeout(() => {
                console.log(document.querySelectorAll(".ytp-chapter-container"))
                document.querySelectorAll(".ytp-chapter-container").forEach(el => el.remove())
            }, 5000)
        }
    }

    class Anime1 {
        constructor() {
            console.log("anime1.me detected")
        }
        applyCss() {
            const style = document.createElement("style")
            style.innerHTML = `
            .switch {
                position: fixed;
                display: inline-block;
            }
                
            #switch-1 {
                top: 5px;
                right: 25px;
                width: 120px;
                height: 34px;
            }

            #switch-2 {
                top: 45px;
                right: 25px;
                width: 120px;
                height: 34px;
            }
            `
            document.getElementsByTagName('head')[0].appendChild(style)
        }

        appendSwitch = () => {
            const btn1 = document.createElement("button")
            btn1.classList += "switch"
            btn1.id = "switch-1"
            btn1.textContent = "順序播放"
            btn1.onclick = () => {
                this.addSwitchMethod(Array.from(document.querySelectorAll('article video')))
            }
            document.getElementById("page").appendChild(btn1)

            const btn2 = document.createElement("button")
            btn2.classList += "switch"
            btn2.id = "switch-2"
            btn2.textContent = "倒序播放"
            btn2.onclick = () => {
                this.addSwitchMethod(Array.from(document.querySelectorAll('article video')).reverse())
            }
            document.getElementById("page").appendChild(btn2)

            this.applyCss()
        }

        addSwitchMethod = (videos) => {

            // 初始化：設定靜音、隱藏除第一個影片外的所有影片
            videos.forEach((video, index) => {
                video.muted = true;
                video.setAttribute('controls', ''); // 顯示控制列
                video.addEventListener('play', (el) => {
                    el.target.muted = false;
                });
            });

            // 處理影片播放結束後的自動播放
            videos.forEach((video, index) => {
                video.addEventListener('ended', () => {

                    video.style.display = 'none';

                    const nextVideo = videos[index + 1];

                    if (nextVideo) {
                        nextVideo.style.display = 'block';
                        nextVideo.muted = false;
                        nextVideo.click()
                    }
                });
            });

        }
    }

    switch (Global.getDomainName()) {
        case "animemusicquiz.com":
            const amq = new AMQ()
            amq.alertAutoConfirm()
            amq.removeAfk()
            amq.tabAutocomplete()
            break
        case "www.youtube.com":
            const yt = new Youtube()
            yt.removeChapters()
            break
        case "anime1.me":
            const anime1 = new Anime1()
            anime1.appendSwitch()
            break
        default:
            if (/^(?=.*n[^n]*n)(?=.*\.n[a-zA-Z]{2,}).*$/.test(Global.getDomainName())) {
                const secret = new Secret()
                secret.fullHeightImageDisplay()
                break
            }
            break
    }
})();