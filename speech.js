const subscriptionKey = "e58572e8cfbd438a9ac0f900fe9aa802";
const regionKey = "northeurope";
let SpeechSDK = window.SpeechSDK;
let recognizer;
let muted = true;

const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey, regionKey);
speechConfig.speechRecognitionLanguage = "en-US";

function unmute() {
    muted = false;
    navigate();
}

function muteMic() {
    if (recognizer) {
        // recognizer.close();
        muted = true;
    }
}

function navigate() {
    console.log("navigating");
    console.log(muted);
    if (muted === true) {
        return;
    }
    const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

    recognizer.recognizeOnceAsync(
        function (result) {
            const path = result.text;

            switch (path) {
                case "Go to page one.": {
                    window.location.href = "railCar1.html";
                    recognizer.close();
                    break;
                }
                case "Go to page 2.": {
                    window.location.href = "railCar2.html";
                    recognizer.close();
                    break;
                }
                case "Go to page 3.": {
                    window.location.href = "railCar3.html";
                    recognizer.close();
                    break;
                }
                case "Go back.": {
                    window.location.href = "index.html";
                    recognizer.close();
                    break;
                }
                case "Type.": {
                    populate("carType");
                    break;
                }
                case "Damaged.": {
                    checkDamaged();
                    break;
                }
                case "Container one.": {
                    populate("container1");
                    break;
                }
                case "Container 2.": {
                    populate("container2");
                    break;
                }
                case "Submit.": {
                    $("#form").submit();
                    break;
                }
                case "Stop.": {
                    recognizer.close();
                    break;
                }
                default: {
                    alert("Please say a valid command");
                    navigate();
                }
            }
        },
        function (err) {
            console.log(err);
            recognizer.close();
        }
    );

    if (!!window.SpeechSDK) {
        SpeechSDK = window.SpeechSDK;
    }
}

function populate(field) {
    const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);
    carTypeDiv = document.getElementById(field);

    const id = "#" + field;

    recognizer.recognizeOnceAsync(
        function(result) {
            const value = result.text;
            $(id).val(value);
            console.log(value);
            navigate();
        },
        function(err) {
            alert(err);
        }
    )
}

function checkDamaged() {
    $("#damagedCheck").prop('checked', true);
    navigate();
}

document.addEventListener("DOMContentLoaded", function () {
    navigate();
});
