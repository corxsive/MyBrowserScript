// ==UserScript==
// @name         MyLittleShion
// @version      2025-08-28
// @description custom style only
// @author       ShionMaker
// @include      https://nhentai.net/g/*/*/
// @include      https://animemusicquiz.com/
// @include      https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// @run-at       document-end
// ==/UserScript==

(() => {
    'use strict'

    class Global {
        static getDomainName() {
            return window.location.hostname
        }
    }

    class Nhentai {
        constructor() {
            console.log("nhentai.net detected")
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
                        // const popup = document.querySelector(".swal2-actions")
                        // if (popup) {
                        //     document.querySelector(".swal2-actions button").onclick()
                        // }
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
                if (answer_input.value.length >= 3 && autocomplete_list.length === 1) {
                    quiz.answerInput.setNewAnswer(`${autocomplete_list[0].textContent}`)
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

    switch (Global.getDomainName()) {
        case "nhentai.net":
            const nhentai = new Nhentai()
            nhentai.fullHeightImageDisplay()
            break
        case "animemusicquiz.com":
            const amq = new AMQ()
            amq.alertAutoConfirm()
            amq.removeAfk()
            amq.tabAutocomplete()
            /*
                new Listener("game invite", (data) => {
                    if (autoAcceptInvite && !inRoom() && checkAutoInvite(data.sender)) {
                        roomBrowser.fireSpectateGame(data.gameId, undefined, true);
                        gameChat.joinLeaveQueue() // * <-- added for autojoinqueue 
                    }
                }).bindListener();
            */
            break
        case "www.youtube.com":
            const yt = new Youtube()
            yt.removeChapters()
            break
        default:
            break
    }
})();