class DoublePendulum {

    constructor({ fixPointX, fixPointY, r1, m1, a1, r2, m2, a2, g, ctx, color }) {

        // fixed circle coordinates of the double pendulum
        this.fixPointX = fixPointX;
        this.fixPointY = fixPointY;
        
        // r: radius
        // m: mass
        // a: angle
        // a_v: angle velocity
        // a_a: angle acceleration
        // of first and second pendulum
        this.r1 = r1;
        this.m1 = m1;
        this.a1 = a1;
        this.a1_v = 0;
        
        this.r2 = r2;
        this.m2 = m2;
        this.a2 = a2;
        this.a2_v = 0;

        // g: gravity acceleration
        this.g = g;
        this.ctx = ctx;
        this.color = color;
        this.tracePoints = [];
        this.traceLength = 50;
        
    }

    calculate() {

        const { sin, cos } = Math; 
        
        const { fixPointX, fixPointY, r1, m1, a1, a1_v, r2, m2, a2, a2_v, g, tracePoints, traceLength } = this;

        // complicated formulas transformed to code
        // to calculate the angle acceleration
        const num1 = -g * (2 * m1 + m2) * sin(a1);
        const num2 = m2 * g * sin(a1 - 2 * a2);
        const num3 = 2 * sin(a1 - a2) * m2;
        const num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * cos(a1 - a2);
        const den1 = r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
        this.a1_a = (num1 - num2 - num3 * num4) / den1;
    
        const num5 = 2 * sin(a1 - a2);
        const num6 = (a1_v * a1_v * r1 * (m1 + m2));
        const num7 = g * (m1 + m2) * cos(a1);
        const num8 = a2_v * a2_v * r2 * m2 * cos(a1 - a2);
        const den2 = r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
        this.a2_a = num5 * (num6 + num7 + num8) / den2;

        // acceleration added to velocity
        this.a1_v += this.a1_a;
        this.a2_v += this.a2_a;
    
        // velocity added to angle
        this.a1 += this.a1_v;
        this.a2 += this.a2_v;
    
        // x and y calculated with angle, radius and fixpoint
        this.x1 = fixPointX + r1 * sin(this.a1);
        this.y1 = fixPointY - r1 * cos(this.a1);
    
        this.x2 = this.x1 + r2 * sin(this.a2);
        this.y2 = this.y1 - r2 * cos(this.a2);

        tracePoints.push({ x: this.x2, y: this.y2 });
    
        tracePoints.length >= traceLength && tracePoints.shift();

    }

    draw(drawOnlyLastCircle = false) {

        const { PI } = Math;
        const { fixPointX, fixPointY, x1, y1, x2, y2, ctx } = this;
        
        const circleRadius = 13;
        ctx.lineWidth = 10;
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;

        // drawing the circle of the second pendulum
        this.tracePoints.forEach((point, i) => {
            const opacity = (i + 1) / this.tracePoints.length;
            ctx.globalAlpha = opacity;

            ctx.beginPath();
            ctx.arc(point.x, point.y, circleRadius, 0, 2 * PI);
            ctx.fill();
        });
        ctx.globalAlpha = 1;

        // if you only want to see the circle of the second pendulum,
        // return here to prevent further drawing
        if (drawOnlyLastCircle) return;

        // drawing the fixed circle in the middle
        ctx.beginPath();
        ctx.arc(fixPointX, fixPointY, circleRadius, 0, 2 * PI);
        ctx.fill();
        
        // drawing the line of the first pendulum
        ctx.beginPath();
        ctx.moveTo(fixPointX, fixPointY);
        ctx.lineTo(x1, y1);
        ctx.stroke();
        
        // drawing the circle of the first pendulum
        ctx.beginPath();
        ctx.arc(x1, y1, circleRadius, 0, 2 * PI);
        ctx.fill();
        
        
        // drawing the line of the second pendulum
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        
    }

}