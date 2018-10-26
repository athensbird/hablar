const subscriptionKey = "e58572e8cfbd438a9ac0f900fe9aa802";
const regionKey = "northeurope";
let SpeechSDK = window.SpeechSDK;
let recognizer;
let muted = false;

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
    console.log(muted);
    if (muted === true) {
        return;
    }
    const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

    recognizer.recognizeOnceAsync(
        function (result) {
            let path = result.text;
            if (path && path.slice(-1) === '.') {
                path = path.slice(0, -1);
            }
            console.log(path);
            switch (path) {
                case "Railcar one": 
                    window.location.href = "railCar1.html";
                    recognizer.close();
                    break;
                case "Railcar 2": 
                    window.location.href = "railCar2.html";
                    recognizer.close();
                    break;
                case "Railcar 3": 
                    window.location.href = "railCar3.html";
                    recognizer.close();
                    break;
                case "Go back": 
                    window.location.href = "index.html";
                    recognizer.close();
                    break;
                case "Type": 
                    populate("carType");
                    break;
                case "Damaged": 
                    checkDamaged();
                    break;
                case "Container one": 
                    populate("container1");
                    break;
                case "Container 2": 
                case "Container too":
                    populate("container2");
                    break;
                case "Submit": 
                    alert("Your information has been submitted!");
                    muted = true;
                    break;
                case "Stop": 
                    recognizer.close();
                    break;
                default: 
                    alert("Please say a valid command");
                    navigate();
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
            let value = result.text;
            if (value.slice(-1) === '.') {
                value = value.slice(0, -1);
            }
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
