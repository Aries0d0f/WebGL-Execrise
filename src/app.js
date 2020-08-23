class Playground {
  constructor(canvasDOM, fragmentShader, appShader) {
    this.canvasDOM = canvasDOM;
    this.$glsl = new GlslCanvas(this.canvasDOM);
    this.$glsl.load(fragmentShader);
    this.$glsl.load(appShader);
    
    this.canvasDOM.style.width = '100%';
    this.canvasDOM.style.height = '100%';
  }

  static async shader(DOMId) {
    const res = await axios.get(document.getElementById(DOMId).src);
    return res.data;
  }
}

const loader = async () => {
  new Playground(
    document.querySelector("#gl-playground"),
    await Playground.shader('fragment-shader'),
    await Playground.shader('cube-shader')
  );
};

window.onload = () => loader();
