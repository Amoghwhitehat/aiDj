song="";
scoreLeftWrist=0;
leftwristX=0;
leftwristY=0;
rightwristY=0;
rightwristX=0;
function preload()
{
    song=loadSound('song.mp3');
}
function setup()
{
    canvas=createCanvas(450,450);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotPoses);
}
function modelLoaded()
{
    console.log("poseNet is Initiated");
}
function draw()
{
    image(video,0,0,450,450);
    circle(leftwristX,leftwristY,25);
    fill("green");
    inNumberleftwristY=Number(leftwristY);
    removeDecimals=floor(inNumberleftwristY);
    volume=removeDecimals/500;
    document.getElementById("volume").innerHTML="volume : " + volume;


    circle(rightwristX,rightwristY,25);
    fill("green");
    stroke("blue");
    if(rightwristY>0 && rightwristY<=100)
    {
        document.getElementById("speed").innerHTML="speed=0.5 x";
        song.rate(0.5);
    }
    if(rightwristY>100 && rightwristY<=200)
    {
        document.getElementById("speed").innerHTML="speed=1 x";
        song.rate(1);
    }
    if(rightwristY>200 && rightwristY<=300)
    {
        document.getElementById("speed").innerHTML="speed=1.5 x";
        song.rate(1.5);
    }
    if(rightwristY>300 && rightwristY<=400)
    {
        document.getElementById("speed").innerHTML="speed=2 x";
        song.rate(2);
    }
    if(rightwristY>400 && rightwristY<=500)
    {
        document.getElementById("speed").innerHTML="speed=2.5 x";
        song.rate(2.5);
    }
}
function play()
{
    song.play();
    song.setVolume(volume);
    song.rate(1);
}
function gotPoses(results)
{
if (results.length>0)
{
    console.log(results);
    scoreLeftWrist=results[0].pose.keypoints[9].score;
    leftwristX=results[0].pose.leftWrist.x;
    leftwristY=results[0].pose.leftWrist.y;
    console.log("leftWristX=" +leftwristX,"leftwristY="+leftwristY);

    rightwristX=results[0].pose.rightWrist.x;
    rightwristY=results[0].pose.rightWrist.y;
    console.log("rightWristX=" +rightwristX,"rightwristY="+rightwristY);
}
}