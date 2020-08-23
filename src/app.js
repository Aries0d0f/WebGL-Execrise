class Playground {
  constructor(canvasDOM, vertexShader, fragmentShader) {
    this.canvasDOM = canvasDOM;
    this.$gl = this.canvasDOM.getContext("webgl");
    this.vertexShader = this.shader(this.$gl, this.$gl.VERTEX_SHADER, vertexShader);
    this.fragmentShader = this.shader(this.$gl, this.$gl.FRAGMENT_SHADER, fragmentShader);

    this.init();
  }

  static getShaderSource(DOMId) {
    return document.getElementById(DOMId).textContent;
  }

  shader(glContext, type, source) {
    const _shader = glContext.createShader(type);
    glContext.shaderSource(_shader, source);
    glContext.compileShader(_shader);

    return _shader;
  }

  init() {
    this.$gl.clearColor(0, 0, 0, 1);
    this.$gl.clear(this.$gl.COLOR_BUFFER_BIT);

    this.$program = this.$gl.createProgram();
    this.$gl.attachShader(this.$program, this.vertexShader);
    this.$gl.attachShader(this.$program, this.fragmentShader);
    this.$gl.linkProgram(this.$program);
    this.$gl.useProgram(this.$program);
  }
}

const loader = () => {
  const playground = new Playground(
    document.querySelector("#gl-playground"),
    Playground.getShaderSource('vertex-shader')
  );
};

window.onload = () => loader();
