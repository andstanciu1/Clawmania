// ClawMania = {
//     init: function () {
            
//     }
// }                                           

// MyApp.init();

paper.install(window);

var balls = [];
var counter = 0;
var until_next_ball = 0;

function addBall() {
    var ball = new Path.Circle([15, view.size.height * .90], 20);
    ball.strokeColor = 'black';
    // from https://stackoverflow.com/questions/1152024/best-way-to-generate-a-random-color-in-javascript
    ball.fillColor = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
    balls.push(ball)

}

window.onload = function() {
	// Setup directly from canvas id:
    paper.setup('myCanvas');
    
    view.onFrame = function(event) {
        var floor = Path.Line({
            from: [0, view.size.height * .99],
            to: [view.size.width, view.size.height * .99],
            strokeColor: 'black'
        });

        floor.strokeWidth = 65;

        counter += 1;
        until_next_ball -= 1;
        if (until_next_ball <= 0){
            addBall()
            until_next_ball = Math.random() * 100 + 50
        }

        for (i = 0; i < balls.length; i++) {
            current_ball = balls[i];
            current_ball.position.x += 1;
        }
    }
}