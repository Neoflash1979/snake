export interface GameLoopOptions {
  /**
   * Sets update time step to a fixed value
   */
  updateTimeStep: number;
  /**
   * How often should FPS measurement change (1 means every frame)
   */
  fpsFilterStrength: number;
  /**
   * Slow motion coefficient (the bigger the slower)
   */
  slow: number;
  /**
   * This function is responsible for processing input
   */
  input: () => void;
  /**
   * This function is responsible for updating game objects' properties, physics etc...
   */
  update: (step: number) => void;
  /**
   * This function is responsible for drawing game objects
   */
  render: (interpolation: number) => void;
}

export class GameLoop {
  private sec_: number = 1000;
  private updateTimeStep_: number;
  private delta_: number = 0;
  private lag_: number = 0;
  private now_: number;
  private then_: number;
  private beginning_: number;
  private fpsFilterStrength_: number;
  private frameTime_: number = 0;
  private first_: boolean = false;
  private slow_: number;
  private slowStep_: number;
  private input_: () => void;
  private update_: (step: number) => void;
  private render_: (interpolation: number) => void;
  private rafId_: number = 0;

  constructor(options: GameLoopOptions) {
    this.updateTimeStep_ = options.updateTimeStep || this.sec_ / 30;
    this.now_ = performance.now();
    this.then_ = this.now_;
    this.beginning_ = this.then_;
    this.fpsFilterStrength_ = options.fpsFilterStrength || 20;
    this.slow_ = options.slow || 1;
    this.slowStep_ = this.slow_ * this.updateTimeStep_;
    this.input_ = options.input;
    this.update_ = options.update;
    this.render_ = options.render;
  }

  /**
   * Get slow motion coefficient
   */
  get slow() {
    return this.slow_;
  }

  /**
   * Set slow motion coefficient
   */
  set slow(value: number) {
    this.slow_ = value;
    this.slowStep_ = this.slow_ * this.updateTimeStep_;
  }

  /**
   * Actual game loop
   */
  private frame_(): void {
    this.rafId_ = requestAnimationFrame(() => this.frame_());
    this.input_();
    this.now_ = performance.now();
    this.delta_ = this.now_ - this.then_;
    this.then_ = this.now_;
    this.lag_ += Math.min(this.sec_, this.delta_);
    while(this.lag_ >= this.slowStep_) {
      this.lag_ -= this.slowStep_;
      this.update_(this.updateTimeStep_);
    }
    this.frameTime_ += (this.delta_ - this.frameTime_) / this.fpsFilterStrength_;
    this.render_(this.lag_ / this.slowStep_);
  }

  /**
   * Starts the loop
   */
  start(): void {
    this.then_ = performance.now();
    if(!this.first_) {
      this.first_ = true;
      this.beginning_ = this.then_;
    }
    this.rafId_ = requestAnimationFrame(() => this.frame_());
  }

  /**
   * Stops the loop
   */
  stop(): void {
    cancelAnimationFrame(this.rafId_);
  }

  /**
   * Get current Frames Per Seconds
   */
  getFps(): number {
    return this.sec_ / this.frameTime_;
  }

  getElapsedTime(): number {
    return (this.then_ - this.beginning_) / this.sec_;
  }
}

