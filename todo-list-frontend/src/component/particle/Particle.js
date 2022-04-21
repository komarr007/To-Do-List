import Particles from "react-tsparticles"
import { loadFull } from "tsparticles"

const Particle = () => {
    const particlesInit = async (main) => {
        console.log(main)
        await loadFull(main)
    }

    const particlesLoaded = (container) => {
        console.log(container)
    }
    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                background: {
                    color: "#690000",
                    image: "",
                    position: "fixed",
                    repeat: "no-repeat",
                    // size: "cover",
                },
                fullScreen: {
                    enable: true,
                    zIndex: -1,
                },
                particles: {
                    number: {
                        value: 80,
                        density: {
                            enable: true,
                            value_area: 800,
                        },
                    },
                    color: {
                        value: "#690000",
                    },
                    shadow: {
                        enable: true,
                        color: "#690000",
                        blur: 5,
                        offset: {
                            x: 3,
                            y: 3,
                        },
                    },
                    shape: {
                        type: "circle",
                    },
                    opacity: {
                        value: 0.5,
                        random: false,
                        anim: {
                            enable: false,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false,
                        },
                    },
                    size: {
                        value: 5,
                        random: true,
                        anim: {
                            enable: false,
                            speed: 20,
                            size_min: 0.1,
                            sync: false,
                        },
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#ffffff", //line color
                        opacity: 0.4,
                        width: 1,
                        shadow: {
                            enable: true,
                            blur: 5,
                            color: "#000000",
                        },
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: "none",
                        random: false,
                        straight: false,
                        out_mode: "out",
                        attract: {
                            enable: false,
                            rotateX: 600,
                            rotateY: 1200,
                        },
                    },
                },
                interactivity: {
                    events: {
                        onhover: {
                            enable: true,
                            mode: "repulse",
                            parallax: {
                                enable: false,
                                force: 60,
                                smooth: 10,
                            },
                        },
                        onclick: {
                            enable: true,
                            mode: "push",
                        },
                        resize: true,
                    },
                    modes: {
                        grab: {
                            distance: 400,
                            line_linked: {
                                opacity: 1,
                            },
                        },
                        bubble: {
                            distance: 400,
                            size: 20,
                            duration: 2,
                            opacity: 0.8,
                            speed: 3,
                        },
                        repulse: {
                            distance: 200,
                        },
                        push: {
                            particles_nb: 4,
                        },
                        remove: {
                            particles_nb: 2,
                        },
                    },
                },
                fpsLimit: 120,
                retina_detect: true,
            }}
        />
    )
}

export default Particle
