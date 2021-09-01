prediction_1 = "";
prediction_2 = "";

camera = document.getElementById("camera");

Webcam.set({
width:350,
height:300,
image_format:'png',
png_quality: 90 
});

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>'
    })
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5mxzZHkpx/model.json', modelLoaded);

function modelLoaded()
{
    console.log("Model Loaded!!");
}

function speak()
{
var synth = window.speechSynthesis;
var speak_data1 = "The First Prediction is "+prediction_1;
var speak_data2 = "The Second Prediction is "+prediction_2;
var utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
synth.speak(utterThis);
}

function check()
{
img = document.getElementById("captured_image");
classifier.classify(img, got_result);
}

function got_result(error, results)
{
if(error)
{
    console.error(error);
}
else
{
console.log(results);
prediction_1 = results[0].label;
prediction_2 = results[1].label;

document.getElementById("result_emotion1").innerHTML = prediction_1;
document.getElementById("result_emotion2").innerHTML = prediction_2;

speak();

if(prediction_1 == "")
{
document.getElementById("result_emoji1").innerHTML= "&#128522;";
}

if(prediction_1 == "sad")
{
document.getElementById("result_emoji1").innerHTML= "&#128532;";
}

if(prediction_1 == "angry")
{
document.getElementById("result_emoji1").innerHTML= "&#128548;";
}

if(prediction_2 == "happy")
{
document.getElementById("result_emoji2").innerHTML= "&#128522;";
}

if(prediction_2 == "sad")
{
document.getElementById("result_emoji2").innerHTML= "&#128532;";
}

if(prediction_2 == "angry")
{
document.getElementById("result_emoji2").innerHTML= "&#128548;";
}

}
}