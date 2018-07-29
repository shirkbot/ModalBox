import gab.opencv.*; 
import processing.video.*; 
import java.awt.Rectangle;
 
Capture cam; 
OpenCV detection; 
Rectangle[] faces;
boolean[] arrest;
String[] dangerous = { "Yes", "High", "No", "Normal", "Low"};


// JSON data
JSONArray values;

//Times for the recording flashing 
int time_frame = 500;
int time_stamp = 0;
boolean record = true;

//Classifier
int min_time = 10000; // in ms
int max_time = 20000; // in ms
int time_select = (int)random(min_time, max_time);

int stamp = 0;
boolean show_status = true;

int rand;
int rand_name;


void setup() { 
  size(640, 480); 
  background (0, 0, 0); 
  cam = new Capture( this, 640, 480, 30); 
  cam.start(); 
  detection = new OpenCV(this, cam.width, cam.height); 
  detection.loadCascade(OpenCV.CASCADE_FRONTALFACE);
  faces = null; // yeh ok set it to null if you like
  rand = (int)random(dangerous.length);
}
 
void draw() { 
  detection.loadImage(cam); 
  faces = detection.detect(); //init the faces array - its now no longer null
  image(cam, 0, 0); 
 
  if (faces!=null) { 
    for (int i=0; i< faces.length; i++) { 
      noFill(); 
      stroke(255, 0, 0); 
      strokeWeight(5); 
      rect(faces[i].x-10, faces[i].y-10, faces[i].width+20, faces[i].height+20);
      textAlign(CENTER); 
      fill(255, 0, 0); 
      textSize(40);
      text("Suspect", faces[i].x-30, faces[i].y-30);
      textSize(20);
      text("Recording", 550, 20);
      textAlign(LEFT);
      text("Dangerous?", faces[i].x+160, faces[i].y+150);
      //text(name[rand_name], faces[i].x+325, faces[i].y+190); // bugged,m doesnt change

      //JSON DATA Q1
      values = loadJSONArray("myjsonfile.json");

      for (int j = 0; j < values.size(); j++) {
        
        JSONObject name = values.getJSONObject(j);
    
        String names = name.getString("name");
        
        if (names!= null){
          textSize(30);
          noStroke();
          fill(180,180,180, 180);
          String n = "Name :";
          float nw = textWidth(n+names);
          rect(45,368,nw+10,40);
          fill(250);
          text ("Name: "+ names, 50, 400);
        }
      }
      
      //JSON DATA Q2
      values = loadJSONArray("myjsonfileq2.json");

      for (int j = 0; j < values.size(); j++) {
        
        JSONObject gender = values.getJSONObject(j); 
    
        String genders = gender.getString("gender");
        
        if (genders!= null){
          textSize(30);
          noStroke();
          fill(180,180,180,180);
          String s = "Gender :";
          float gw = textWidth(s+genders);
          rect(45,418,gw+10,40);
          textSize(30);
          fill(250);
          text ("Gender: "+ genders, 50, 450);
        }
        //else if (genders= "female"){
        //}
      }

      //Flashing in recording
      int time_passed = millis() - time_stamp;  //keeps track of the times passed 
      if (time_passed < time_frame && record) 
      {
        fill(255, 0, 0);
        ellipse (485,13,10,10);
      }
      else if (time_passed >= time_frame)
      {
        time_stamp = millis();  //sets the time_span to the beggining
        //time_frame = (int)random(min_time, max_time); //reinitialices the time_frame from the begginig
        record = !record;
      }
      
      //Have the status change after a few minutes
      int time_status = millis() - stamp;
      if (time_status < time_select && show_status) {
        fill(255, 0, 0);
        textAlign(LEFT);
        String status = dangerous[rand];
        textSize(20);
        text(status, faces[i].x+275, faces[i].y+150);
        //if (rand != [0]) {
          //println("YES");}
      } else if (time_status >= time_frame) {
        stamp = millis();
        time_status = (int)random(min_time, max_time);
        show_status = !show_status;
        rand = (int)random(dangerous.length);
        //display();
      }
      else {
        fill(255, 0, 0);
        textAlign(LEFT);
        textSize(20);
        text("NEW SCORE!", faces[i].x+275, faces[i].y+150);
      } 
    }
  } 
  
  if (faces.length<=0) { 
    textAlign(CENTER); 
    fill(0); 
    textSize(40); 
    text("NO SUSPECT FOUND", 320, 220);
  }

}

void captureEvent(Capture cam) { 
  cam.read();
}
