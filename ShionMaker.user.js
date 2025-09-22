// ==UserScript==
// @name         MyLittleShion
// @version      2025-08-28
// @description custom style only
// @author       ShionMaker
// @include      https://nhentai.net/g/*/*/
// @include      https://animemusicquiz.com/
// @include      https://www.youtube.com/*
// @include      https://anime1.me/*
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
                width: 60px;
                height: 34px;
            }

            #switch-2 {
                top: 45px;
                right: 25px;
                width: 60px;
                height: 34px;
            }

            .switch input {
                opacity: 0;
                width: 0;
                height: 0;
            }

            .slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #ccc;
                -webkit-transition: .4s;
                transition: .4s;
            }

            .slider:before {
                position: absolute;
                content: "";
                height: 26px;
                width: 26px;
                left: 4px;
                bottom: 4px;
                background-color: white;
                -webkit-transition: .4s;
                transition: .4s;
            }

            input:checked + .slider {
                background-color: #2196F3;
            }

            input:focus + .slider {
                box-shadow: 0 0 1px #2196F3;
            }

            input:checked + .slider:before {
                -webkit-transform: translateX(26px);
                -ms-transform: translateX(26px);
                transform: translateX(26px);
            }
                
            .slider.round {
                border-radius: 34px;
            }

            .slider.round:before {
                border-radius: 50%;
            }
            `
            document.getElementsByTagName('head')[0].appendChild(style)
        }

        appendSwitch() {
            const autoPlaySwitch = document.createElement("label")
            autoPlaySwitch.classList += "switch"
            autoPlaySwitch.id = "switch-1"

            const autoPlaySwitch2 = document.createElement("label")
            autoPlaySwitch2.classList += "switch"
            autoPlaySwitch2.id = "switch-2"

            const checkbox = document.createElement("input")
            checkbox.type = "checkbox"
            autoPlaySwitch.appendChild(checkbox)

            const checkbox2 = document.createElement("input")
            checkbox2.type = "checkbox"
            autoPlaySwitch2.appendChild(checkbox2)

            const span = document.createElement("span")
            span.classList += "slider round"
            autoPlaySwitch.appendChild(span)

            const span2 = document.createElement("span")
            span2.classList += "slider round"
            autoPlaySwitch2.appendChild(span2)

            const videos = Array.from(document.querySelectorAll('article video'))

            autoPlaySwitch.onclick = () => this.addSwitchMethod(videos)
            document.getElementById("page").appendChild(autoPlaySwitch)
            autoPlaySwitch2.onclick = () => this.addSwitchMethod(videos.reverse())
            document.getElementById("page").appendChild(autoPlaySwitch2)

            this.applyCss()
        }

        addSwitchMethod(videos) {

            // 初始化：設定靜音、隱藏除第一個影片外的所有影片
            videos.forEach((video, index) => {
                video.muted = true;
                video.setAttribute('controls', ''); // 顯示控制列
            });

            // 監聽所有影片的 play 事件，只要使用者互動就進入 fullscreen
            videos.forEach((video) => {
                video.addEventListener('play', () => {
                    if (!document.fullscreenElement) {
                        if (video.requestFullscreen) video.requestFullscreen();
                        else if (video.mozRequestFullScreen) video.mozRequestFullScreen();
                        else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
                        else if (video.msRequestFullscreen) video.msRequestFullscreen();
                    }
                    video.muted = false;
                });
            });


            // 處理影片播放結束後的自動播放
            videos.forEach((video, index) => {
                video.addEventListener('ended', () => {
                    if (document.exitFullscreen) document.exitFullscreen();
                    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
                    else if (document.msExitFullscreen) document.msExitFullscreen();

                    const nextVideo = videos[index + 1];

                    setTimeout(() => {
                        if (nextVideo) {
                            video.style.display = 'none';
                            if (!document.fullscreenElement) {
                                if (nextVideo.requestFullscreen) nextVideo.requestFullscreen();
                                else if (nextVideo.webkitRequestFullscreen) nextVideo.webkitRequestFullscreen();
                                else if (nextVideo.msRequestFullscreen) nextVideo.msRequestFullscreen();
                            }
                            nextVideo.style.display = 'block';
                            nextVideo.muted = false;
                            nextVideo.click()
                        }
                    }, 1500)
                });
            });

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
            break
    }
})();