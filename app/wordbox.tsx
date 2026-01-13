'use client'

import { useEffect, useRef } from "react"
import Matter from "matter-js";

export default function WordBox(props: { words: [string, number][] }) {
    const sceneRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!sceneRef.current) return;
        if (props.words.length === 0) return;

        const size = sceneRef.current.clientHeight;

        var Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Bodies = Matter.Bodies,
            Composite = Matter.Composite,
            Mouse = Matter.Mouse,
            MouseConstraint = Matter.MouseConstraint,
            Events = Matter.Events;

        var engine = Engine.create();

        var render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                height: size,
                width: size,
                wireframes: false,
                background: "transparent"
            }
        });

        let toRender = [];
        let balls: [Matter.Body, string][] = [];
        const MIN_SIZE: number = 22;
        const MAX_SIZE: number = 3 * MIN_SIZE;
        const FIRST_BALL_INDEX: number = 0;
        const LAST_BALL_INDEX: number = 100;
        const BIGGEST_SIZE: number = props.words[0][1];
        const BALL_COLORS: string[] = ["#d44938", "#f9cc33", "#71cd4e", "#4585d1"];
        for (let i = FIRST_BALL_INDEX; i < Math.min(props.words.length, LAST_BALL_INDEX); i++) {
            let ballSize = props.words[i][1] / BIGGEST_SIZE * MAX_SIZE + MIN_SIZE
            let ball = Bodies.circle(Math.random() * (size - 2 * ballSize) + ballSize, Math.random() * size * -.5 - .5, ballSize, { 
                restitution: .3,
                render: {
                    fillStyle: BALL_COLORS[Math.floor(Math.random() * BALL_COLORS.length)]
                }
            });
            toRender.push(ball);
            balls.push([ball, props.words[i][0]]);
        }

        const WALL_HEIGHT = 25;
        toRender.push(Bodies.rectangle(size / 2, size + 2.5, size, 5, { isStatic: true }));
        toRender.push(Bodies.rectangle(0 - 2.5, size * (1 - WALL_HEIGHT / 2), 5, size * WALL_HEIGHT, { isStatic: true }));
        toRender.push(Bodies.rectangle(size + 2.5, size * (1 - WALL_HEIGHT / 2), 5, size * WALL_HEIGHT, { isStatic: true }));
        // add all of the bodies to the world
        Composite.add(engine.world, toRender);


        const mouseConstraint = MouseConstraint.create(
            engine, {
                mouse: Mouse.create(sceneRef.current),
                constraint: {
                    render: {
                        visible: false
                    }
                }
            }
        );
        Composite.add(engine.world, mouseConstraint);
        // run the renderer
        Render.run(render);

        // create runner
        var runner = Runner.create();

        // run the engine
        Runner.run(runner, engine);

        Events.on(render, 'afterRender', function() {
            const ctx = render.context;
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            balls.forEach(circle => {
                const radius = circle[0].circleRadius ?? 20;
                ctx.font = `${radius * 1.5 / circle[1].length}px Courier`;
                ctx.save();
                ctx.translate(circle[0].position.x, circle[0].position.y);
                ctx.rotate(circle[0].angle);
                ctx.fillText(circle[1], 0, 0);
                ctx.restore();
            })
        });

        return () => {
            Render.stop(render);
            Composite.clear(engine.world, false);
            Engine.clear(engine);
            render.canvas.remove();
            render.textures = {};
        };
    }, [props.words])
    return <div ref={sceneRef} className = "h-full w-full"/>;
}
