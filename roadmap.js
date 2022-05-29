//Setting up global variables
var my_pink = "#F55D98";
var my_beige = "#F6F0EB"
var ccs_col = "#FFBF00";
var sti_col = "#F39C12";
var mam_col = "#D35400";
var age;
var input_age;
var win_width = 1170/2;
var win_height = 2000/2;
var beige_height = win_height-150;
var beige_width = win_width-100;
var num_lines;
var line_spacing;
var go_roadmap = 0;
var age_text_array;
var decade_y_coords = [];
var decade_x_coords = [];
var ccs_age_list = [];
var sti_age_list = [];
var mam_age_list = [];
var check_code = -1;


function setup() {
  createCanvas(win_width, win_height);
  ageSetup();
  age_text_array = ["0's", "10's", "20's", "30's", "40's", "50's", "60's", "70's"];
  decade_x_coords = [20, 20+44, 20+44*2, 20+44*3, 20+44*4, 20+44*5, 20+44*6, 20+44*7, 20+44*8, 20+44*9];

}

function draw() {

  //Setting backgroun colour
  background(color(my_pink));

  //Drawing title
  drawTitle();

  noStroke();
  rect(50, 120, win_width-100, win_height-150, 20);

  //Drawing age and text
  drawAge();

  if(go_roadmap == 1){
    drawRoadmap();
  }

  let a = createA('page_two.html', 'Book Video Appointment to Discuss');
  a.position(windowWidth/2-(a.width/2), win_height-50);
  a.style('color', my_pink);
  a.style('text-decoration', 'none');
  a.style('font-family', 'helvetica');

}

//Function to draw the title
function drawTitle() {
  fill(my_beige);
  textAlign(CENTER, TOP);
  textSize(24);
  textFont('Helvetica');
  text('Health4Her Health Check Roadmap', 0, 30, width);
}

//Setting up age function in the setup
function ageSetup() {
  noStroke();
  input_age = createInput();
  input_age.position(windowWidth/2+60, 80);
  input_age.style('border-radius', '5px');
  input_age.style('border-color', my_beige);
  input_age.style('height', '25px');
  input_age.style('width', '75px');
  input_age.style('text-align', 'center');
  input_age.style('background-color', my_beige);

  //Submit button
  button = createButton('GO');
  button.position(input_age.x+input_age.width+25, input_age.y+5);
  button.mousePressed(goRoadmap);
  button.style('background-color', my_beige);
  button.style('border', '0px');
  button.style('border-radius', '5px');
  button.style('color', my_pink);
}

//Drawing the age input
function drawAge() {
  fill(color(my_beige));
  textSize(16);
  text('Enter your current age: ', win_width/2-30, 80);
}

//Function that fires when the go button is pressed
function goRoadmap() {
  go_roadmap = 1;
}

function drawRoadmap() {
  //Setting age to current input
  age = input_age.value();
  age = int(age);

  //Entering the beige canvas
  translate(50, 120);

  //Running function to calculate number of lines
  numLinesCalc();

  //Running function to calculate line spacing
  lineSpacing();

  //Running function to draw the roadmap lines
  drawLines();

  //Drawing the legend
  drawLegend();

  ageNodes();


}

//Number of lines
function numLinesCalc() {
  num_lines = ceil((80 - age) / 10);
}

//Spacing in pixels
function lineSpacing() {
  line_spacing = beige_height/(num_lines+1);
}

//Drawing the roadmap lines and text
function drawLines() {
  let side_line = 0;
  let curr_lines = 1;
  let y_index = 0;
  let array_start = 8+num_lines*(-1);
  textSize(12);

  //drawing the horizontal lines
  for (let i = line_spacing; i < beige_height; i+=line_spacing) {
    strokeWeight(0.8);
    stroke(my_pink);
    line(20, i, beige_width-20, i);
    decade_y_coords[y_index] = i;
    y_index = y_index + 1;

    //Last itteration
    if(curr_lines >= num_lines) {

      if(side_line % 2 == 0) {
        noStroke();
        fill(my_pink);
        text(age_text_array[array_start], 32, i+5);
      }
      else {
        noStroke();
        fill(my_pink);
        text(age_text_array[array_start], beige_width-32, i+5);
      }
    }

    //drawing line on right side
    else if(side_line % 2 == 0) {
      strokeWeight(0.8);
      stroke(my_pink);
      line(beige_width-20, i, beige_width-20, i+line_spacing);

      //Putting the text in
      noStroke();
      fill(my_pink);
      text(age_text_array[array_start], 32, i+5);

    }

    //drawing line on left side
    else if(side_line % 2 == 1) {
      strokeWeight(0.8);
      stroke(my_pink);
      line(20, i, 20, i+line_spacing);

      //Putting the text in
      noStroke();
      fill(my_pink);
      text(age_text_array[array_start], beige_width-32, i+5);
    }

    side_line += 1;
    curr_lines += 1;
    array_start += 1;

  }



}

function ageNodes() {
  ccs_calc_age_list();
  sti_calc_age_list();
  mam_calc_age_list();
  ageToCoords(mam_age_list, mam_col, 2);
  if(sti_age_list[0] != -1) {
    ageToCoords(sti_age_list, sti_col, 1);
  }
  ageToCoords(ccs_age_list, ccs_col, 0);
}

function ccs_calc_age_list() {
  let ind = 0
  for(let l=age; l<74; l+=5) {
    ccs_age_list[ind] = l;
    ind=ind+1;
  }
}

function sti_calc_age_list() {
  let ind = 0
  if(age < 20) {
    for(let b=20; b<30; b+=1) {
      sti_age_list[ind] = b;
      ind=ind+1;
    }
  } else if(age < 30) {
    for(let m=age; m<30; m+=1) {
    sti_age_list[ind] = m;
    ind=ind+1;
    }
  } else {
      sti_age_list[0] = -1;
  }
}


function mam_calc_age_list() {
  let ind = 0
  if(age<50) {
    for(let n=50; n<74; n+=2) {
    mam_age_list[ind] = n;
    ind=ind+1;
    }
  } else {
    for(let n=age; n<74; n+=2) {
    mam_age_list[ind] = n;
    ind=ind+1;
    }
  }
}


function drawLegend() {
  fill(color(ccs_col));

  check_w = 40;
  check_h = 20;
  check_y = 10;
  ccs_x = beige_width/4;
  sti_x = beige_width/2-20;
  mam_x = 3*beige_width/4-40;

  rect(ccs_x, check_y, check_w, check_h);
  text("Cervical Cancer Screening", beige_width/4+10, 40);
  fill(color(sti_col));
  rect(sti_x, check_y, check_w, check_h);
  text("STI Screening", beige_width/2+5, 40);
  fill(color(mam_col));
  rect(mam_x, check_y, check_w, check_h);
  text("Mammogram", 3*beige_width/4-20, 40);


  if ((mouseX>ccs_x+50) && (mouseX<ccs_x+check_w+50) &&(mouseY>check_y+120) && (mouseY<check_y+check_w+120)){
    fill(ccs_col);
    rect(45, 55, 400, 30);
    fill(0);
    textSize(10);
    text("The Cervical Screening Test involves taking a swab of your cervix to look for signs of the human papillomavirus (HPV)", 47, 60, 400, 30);
  }

  if ((mouseX>sti_x+50) && (mouseX<sti_x+check_w+50) &&(mouseY>check_y+120) && (mouseY<check_y+check_w+120)){
    fill(sti_col);
    rect(45, 55, 400, 30);
    fill(0);
    textSize(10);
    text("An STI test usually involves giving a urine sample or having a vaginal examination.", 47, 60, 400, 30);
  }

  if ((mouseX>mam_x+50) && (mouseX<mam_x+check_w+50) &&(mouseY>check_y+120) && (mouseY<check_y+check_w+120)){
    fill(mam_col);
    rect(45, 55, 400, 30);
    fill(0);
    textSize(10);
    text("A screening mammogram is an x-ray of your breasts. They usually involve two x-ray pictures of each breast.", 47, 60, 400, 30);
  }
}

function drawNode(xPos, yPos, col, direction, check_code, age_text) {
  stroke(color(col));
  fill(color(col));
  if(check_code==0) {
    line_length = 15;
  } else if (check_code==1) {
    line_length = 30;
  } else {
    line_length = 45;
  }
  if(direction == "up") {
    line(xPos, yPos, xPos, yPos-line_length);
    circle(xPos, yPos-line_length-5, 15);
    fill(my_beige);
    textSize(8);
    text(age_text, xPos, yPos-line_length-10);
  } else {
    line(xPos, yPos, xPos, yPos+line_length);
    circle(xPos, yPos+line_length+10, 15);
    fill(my_beige);
    textSize(8);
    text(age_text, xPos, yPos+line_length+5);
  }
  noStroke();
}


function ageToCoords(age_list, col, check_code) {


  let current_decade = 7;

  for(let j=num_lines-1; j>=0; j--) {
    current_y = decade_y_coords[j];

    //Looping through the age list to find what we're looking for
    for(let k=0; k<=age_list.length; k++) {
      let tens = String(age_list[k])[0];
      let ones = String(age_list[k])[1];

      if(int(tens) == current_decade) {
        x = decade_x_coords[int(ones)];
        let direction = "down";
        if (int(age_list[k]) % 2 == 0) {
          direction = "up";
        } else {
          direction = "down";
        }
        drawNode(decade_x_coords[int(ones)], current_y, col, direction, check_code, String(age_list[k]));
      }
    }
    current_decade = current_decade-1;
  }

}
