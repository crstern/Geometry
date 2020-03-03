// var initial_points = [{x:15, y:3}, {x:10, y:10}, {x:12, y:9}, {x:16, y:7}, {x:18, y:6}, {x:14, y:8}, {x:13, y:5}, {x:5, y:4}, {x:12, y:2}];
// var initial_points = [{x:1, y:1}, {x:4, y:2}, {x:4, y:6}, {x:5, y:7}, {x:3, y:8},  {x:2, y:6}, {x:1, y:5}];
// var initial_points = [{x:3.5, y:9}, {x:5, y:7.3}, {x:3.8, y:6.3}, {x:5.4, y:4.8}, {x:6, y:5.8},
//     {x:7, y:3.4}, {x:6.5, y:2.1}, {x:4.5, y:3}, {x:4.2, y:1.3}, {x:2.5, y:-5}, {x:3, y:4.3},
//     {x:0.5, y:6.6}, {x:2, y:8}]; //NU E MONOTON

// var initial_points = [{x:3, y:8.3}, {x:5.2, y:7}, {x:4.5, y:5.4}, {x:6.5, y:4.3}, {x:6.5, y:4.3},
//     {x:4, y:2.4}, {x:3.5, y:0.5}, {x:0.6, y:1.9}, {x:1.2, y:4.3}, {x:2.3, y:6.6}, {x:1.9, y:7.5}]; //LATURA PARALELA CU OX
var initial_points = [{x:4, y:7}, {x:5.5, y:6}, {x:4.5, y:4.5}, {x:6.5, y:3}, {x:6, y:2.5},
    {x:3.5, y:1}, {x:2, y:2}, {x:2.5, y:3.5}, {x:1.5, y:5}]; //Y-monoton

// var initial_points = [{x:0, y:0}, {x:2, y:0}, {x:2, y:2}, {x:0, y:2}]

var len = initial_points.length;
var stack = [];
var left_last_turn;
var right_last_turn;
var left_brench = [];
var right_brench = [];
var edges = new Map();
var temp;
var points_for_draw = [];
var y_monoton = true;

for (var i = 0; i < len; i++) {
    points_for_draw.push([initial_points[i].x, initial_points[i].y])
}
points_for_draw.push([initial_points[0].x, initial_points[0].y])

console.log(points_for_draw);

for (var i = 0; i < len; i++) {
    if (i > 0)
        temp = [initial_points[i - 1]];
    else temp = [initial_points[len - 1]];

    temp.push(initial_points[(i + 1) % len])
    edges.set(initial_points[i], temp);
}

function neighbours(p1, p2) {
    arr = edges.get(p2);
    if (p1 == arr[0] || p1 == arr[1])
        return 1;
    return 0;
}

console.log(edges);

points = initial_points;
points.sort(function (a, b) {
    if (a.y == b.y) return a.x - b.x;
    return b.y - a.y;
});


left_brench.push(points[0]);
right_brench.push(points[0]);

for (var sweep_line = 1; sweep_line < len; sweep_line++) {
    if (neighbours(points[sweep_line], left_brench[left_brench.length - 1]) == 1) {
        left_brench.push(points[sweep_line]);
    }
    else if (neighbours(points[sweep_line], right_brench[right_brench.length - 1]) == 1) {
        right_brench.push(points[sweep_line]);
    }
    else {
        console.log("Nu, polinomul nu este monoton");
        y_monoton = false;
        break;
    }
}

if (left_brench[left_brench.length - 1] != points[len - 1]) {
    left_brench.push(points[len - 1]);
} else {
    right_brench.push(points[len - 1]);
}

console.log("Este y-monoton!")
console.log(left_brench);
console.log(right_brench);

//Variables used for drawing
var x_coordinates = [];
var y_coordinates = [];
for (var i = 0; i < len; i++) {
    x_coordinates.push(points_for_draw[i][0]);
    y_coordinates.push(points_for_draw[i][1]);
}
x_coordinates.push(points_for_draw[0][0]);
y_coordinates.push(points_for_draw[0][1]);
var trace = {
    x: window.x_coordinates,
    y: window.y_coordinates,
    mode: 'lines+markers',
    marker: {
        color: 'rgb(50, 0, 128)',
        size: 8
    },
    line: {
        color: 'rgb(50, 0, 128)',
        width: 3,
    }
};

var layout = {
    title: 'y-monotone polygon?',
    xaxis: {
        title: 'x-axis'
    },
    yaxis: {
        title: 'y-axis title'
    }
};


var left_point_sweep_line = Math.min(...x_coordinates) - 4;
var right_point_sweep_line = Math.max(...x_coordinates) + 4;
var start_point = Math.max(...y_coordinates) + 1;
var end_point = Math.min(...y_coordinates);

var data = [trace];

