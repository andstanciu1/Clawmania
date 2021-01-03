// ClawMania = {
//     init: function () {
            
//     }
// }                                           

// MyApp.init();



paper.install(window);

var cx = 280  // all variables that define crane
var cy = 175
var x1 = 40
var x2 = 20
var y1 = 30
var y2 = 55
var arm_length = 1000000




var balls = [];  // array of balls on screen
var counter = 0;
var until_next_ball = 0;

function addBall() {   // creates new ball
    var ball = new Path.Circle([15, view.size.height * .90], 20);
    ball.strokeColor = 'black';
    // from https://stackoverflow.com/questions/1152024/best-way-to-generate-a-random-color-in-javascript
    ball.fillColor = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)  // copy pasted code to create random color
    balls.push(ball) 

}

window.onload = function() {    
	// from paper.js tutorial 
    paper.setup('myCanvas'); 

    // points that define crane (see notes)
    var p1 = new Point(cx - x2, cy + y2);
    var p2 = new Point(cx - x1, cy + y1);
    var p3 = new Point(cx, cy);
    var p4 = new Point(cx, cy - arm_length);
    var p5 = new Point(cx, cy);
    var p6 = new Point(cx + x1, cy + y1);
    var p7 = new Point(cx + x2, cy + y2)
    var v = 0
    var grabbed = false


    var crane = new Path();   //fixes bug below  


    view.onFrame = function(event) {

        crane.remove() //get rid of old crane
        crane = new Path()  // new crane created
        crane.add(p1); //add points to crane
        crane.add(p2);
        crane.add(p3);
        crane.add(p4);
        crane.add(p5);
        crane.add(p6);
        crane.add(p7);
        if (Key.isDown('q')) {   //this moves left
            cx = cx - 5

        }
        if (Key.isDown('e')) { // this moves right
            cx = cx + 5
        }
        if (Key.isDown('s') &&   //moves down to grabs
            cy < view.size.height * .83 && 
            !grabbed){
            cy = cy + v //goes down like gravity
            v += 0.5 //increases velocity
        }
        else if (cy > 175) { // below heighest point move up and change velocity to 0
            cy = cy - 5
            v = 0
        }
        
        if (cy < 200){    // if high make grabbed false
            grabbed = false
        }
        if (cy > view.size.height * .8){ // makes grabbed true when low
            grabbed = true
        }
        
        crane.strokeColor = 'black';  // creates all points based on crane dimensions
        crane.strokeWidth = 9;
        p1.x = cx - x2 
        p1.y = cy + y2
        p2.x = cx - x1
        p2.y = cy + y1;
        p3.x = cx
        p3.y = cy
        p4.x = cx
        p4.y = cy - arm_length
        p5.x = cx
        p5.y = cy
        p6.x = cx + x1 
        p6.y = cy + y1
        p7.x = cx + x2
        p7.y = cy + y2


        var floor = Path.Line({   // creates floor
            from: [0, view.size.height * .99],
            to: [view.size.width, view.size.height * .99],
            strokeColor: 'black'
        });

        floor.strokeWidth = 65; // makes floor wider

        counter += 1;
        until_next_ball -= 1;
        if (until_next_ball <= 0){   // creates new ball every few random seconds
            addBall() 
            until_next_ball = Math.random() * 100 + 50
        }

        for (i = 0; i < balls.length; i++) {  // go thru each ball 
            current_ball = balls[i];
            current_ball.position.x += 1; // mnmove ball forward, if too for right remove ball
            if (current_ball.position.x > view.size.width){
                current_ball.remove()
            }
 
            if (grabbed){  // if ball is grabbed it moves up with crane
                if (current_ball.position.x > p2.x && 
                    current_ball.position.x < p6.x &&
                    current_ball.position.y < p1.y){
                        current_ball.position.y = p2.y + 10
                        current_ball.position.x = p3.x
                    }

                if (current_ball.position.y < 250) {
                    current_ball.remove()
                }

            }
        }
    }
}