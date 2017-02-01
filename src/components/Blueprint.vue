<template>
  <div class="tool-wrapper">
    <button :disabled="!ready" v-on:click="save">Save</button>
    <button :disabled="interiorWalls.length < 1" v-on:click="clearInteriorWalls">Clear interior walls</button>

    <svg class="canvas" ref="canvas">
      <g class="walls">
        <path class="exteriorWall" :d="exteriorWallsPath"></path>
        <path style="fill:none; stroke: pink; stroke-width: 4px;" :d="storedExteriorWallsPath"></path>
        <path class="interiorWall" :d="interiorWallsPath"></path>
        <path style="fill:none; stroke: pink; stroke-width: 1px;" :d="storedInteriorWallsPath"></path>
      </g>
      <g class="guides" v-if="guideVisibility" >
        <path class="wallPreview" :d="previewPath"></path>
        <path :d="xGuidePath" class="guideline"></path>
        <path :d="yGuidePath" class="guideline"></path>
        <circle class="guidePoint" :cx="nextCoord[0]" :cy="nextCoord[1]" r="10"></circle>
        <circle class="guidePoint" v-if="currentInteriorWall.length > 0" :cx="currentInteriorWall[0][0]" :cy="currentInteriorWall[0][1]" r="10"></circle>
        <rect v-if="point.value !== '0.0'" class="measurementRect" :x="point.x - 50" :y="point.y - 30" width="100" height="30" v-for="point in wallMeasurements"></rect>
        <text v-if="point.value !== '0.0'" :x="point.x - 20" :y="point.y - 10" v-for="point in wallMeasurements">{{ point.value }}m</text>
        <circle v-on:click="endExteriorWalls" v-if="!ready" class="exteriorBeginGuide" :cx="exteriorBeginGuide.x" :cy="exteriorBeginGuide.y" r="10"></circle>
      </g>
    </svg>
    {{ instructionMessage }}
  </div>
</template>

<script>
import * as d3 from 'd3';
import { mapGetters } from 'vuex';
import util from '../util/blueprintUtil';
import * as MutationTypes from '../store/mutation-types';

const drawModes = {
  OUTSIDEWALLS: 'outsidewalls', // Drawing the closed loop of walls
  INSIDEWALLS1: 'insidewalls1', // Selecting interior wall beginning
  INSIDEWALLS2: 'insidewalls2', // Selecting interior wall end
};

const disableEditHandlers = () => {
  console.log('disableEditHandlers');
  d3.select('svg')
    .on('click', null)
    .on('mousemove', null);
  d3.select('.exteriorBeginGuide')
    .on('click', null);
};

const enableEditHandlers = (vueThis) => {
  console.log('enableEditHandlers');
  const vue = vueThis;

  vue.drawMode = drawModes.OUTSIDEWALLS;

  d3.select('svg')
    .on('click', () => {
      if (vue.drawMode === drawModes.OUTSIDEWALLS) {
        vue.instructionMessage = 'Now keep drawing the wall. Connect to first corner when ready';
        const prevCoord = vue.currentExteriorWallCoord;
        if (prevCoord == null) {
          vue.currentExteriorWallCoord = vue.nextCoord;
        } else {
          vue.currentExteriorWallCoord = vue.nextCoord;
          vue.exteriorWallpoints.push([prevCoord, vue.nextCoord]);
        }
        /*
        this.$store.commit(MutationTypes.BLUEPRINT_ADD_EXTERIOR_WALL,
          { wall: this.exteriorWallpoints });
        */
      } else if (vue.drawMode === drawModes.INSIDEWALLS1) {
        vue.instructionMessage = 'Now select the end for the interior wall';
        vue.currentInteriorWall = [vue.nextCoord];
        vue.currentInteriorWallOrigin = vue.nearestWall.line;
        vue.drawMode = drawModes.INSIDEWALLS2;
      } else if (vue.drawMode === drawModes.INSIDEWALLS2) {
        vue.instructionMessage = 'Add an interior wall by selecting a point or press save';
        vue.currentInteriorWall[1] = vue.nextCoord;
        vue.interiorWalls.push(vue.currentInteriorWall);
        vue.currentInteriorWall = [];
        vue.drawMode = drawModes.INSIDEWALLS1;
      }
    })
    .on('mousemove', function boundMouseover() {
      vue.hoverCoord = d3.mouse(this);
    });
};

export default {
  name: 'blueprint',
  data() {
    return {
      canvasWidth: 0,
      canvasHeight: 0,
      ready: false,
      exteriorWallpoints: [],
      currentExteriorWallCoord: null,
      interiorWalls: [],
      hoverCoord: [0, 0],
      drawMode: '',
      instructionMessage: 'Start by selecting the house corner',
      currentInteriorWall: [],
      currentInteriorWallOrigin: [],
      distanceFactor: 0.025,
      snapDistance: 50,
      guideVisibility: false,
    };
  },
  computed: {
    ...mapGetters({
      editMode: 'blueprintEditMode',
      exteriorWalls: 'exteriorWalls',
      storedInteriorWalls: 'exteriorWalls',
    }),
    // Path created for drawing an exterior wall through all the coordinates
    exteriorWallsPath() {
      return util.coordPairsToLine(this.exteriorWallpoints);
    },
    // Path drawing all the interior walls
    interiorWallsPath() {
      return util.coordPairsToLine(this.interiorWalls);
    },
    storedExteriorWallsPath() {
      return util.coordToLine(this.exteriorWalls);
    },
    storedInteriorWallsPath() {
      return util.coordPairsToLine(this.storedInteriorWalls);
    },
    // Path showing the unfinished interior wall TODO: combine with previewPath
    previewPath() {
      let path = '';
      if (this.drawMode === drawModes.OUTSIDEWALLS) {
        if (this.currentExteriorWallCoord === null) {
          return util.coordToLine([]);
        }
        const prevWallpoint = this.currentExteriorWallCoord;
        const guideCoords = [prevWallpoint, this.nextCoord];
        path = util.coordToLine(guideCoords);
      } else if (this.drawMode === drawModes.INSIDEWALLS1) {
        path = util.coordToLine([]);
      } else if (this.drawMode === drawModes.INSIDEWALLS2) {
        path = util.coordToLine([this.nextCoord, this.currentInteriorWall[0]]);
      }
      return path;
    },
    // Coordinate for calculating next point to save when clicked
    nextCoord() {
      let coord = [];

      // Exterior walls are ensured to be on 90 degree angles
      if (this.drawMode === drawModes.OUTSIDEWALLS) {
        if (this.currentExteriorWallCoord === null) {
          return this.hoverCoord;
        }
        const prevWallpoint = this.currentExteriorWallCoord;
        coord = util.alignPoint(this.hoverCoord, prevWallpoint);
      } else if (this.drawMode === drawModes.INSIDEWALLS1 ||
          this.drawMode === drawModes.INSIDEWALLS2) {
        if (this.nearestWall.distance < this.snapDistance) {
          coord = this.nearestWall.wallPoint;
        } else {
          coord = this.hoverCoord;
        }
      }

      if (this.drawMode === drawModes.INSIDEWALLS2) {
        coord = util.alignPoint(coord, this.currentInteriorWall[0]);
      }

      return coord;
    },
    // Guidelines for next selected point
    xGuidePath() {
      if (this.nextCoord.length === 0) {
        return util.coordToLine([]);
      }
      return util.coordToLine([[0, this.nextCoord[1]], [this.canvasWidth, this.nextCoord[1]]]);
    },
    yGuidePath() {
      if (this.nextCoord.length === 0) {
        return util.coordToLine([]);
      }
      return util.coordToLine([[this.nextCoord[0], 0], [this.nextCoord[0], this.canvasHeight]]);
    },
    // Circle in the beginning of exterior walls. It's also used for ending the exterior wall
    exteriorBeginGuide() {
      if (this.exteriorWallpoints.length === 0) {
        return { x: -100, y: -100 };
      }
      const startPoint = this.exteriorWallpoints[0][0];
      return {
        x: startPoint[0],
        y: startPoint[1],
      };
    },
    // Calculated values and guide positions for wall lenghts
    wallMeasurements() {
      const measurementPoints = this.exteriorWallpoints.map((wall) => {
        const prevPoint = wall[0];
        const xDiff = prevPoint[0] + wall[1][0];
        const yDiff = prevPoint[1] + wall[1][1];
        const x = xDiff / 2;
        const y = yDiff / 2;
        const value = Math.sqrt(
          Math.pow(wall[1][0] - prevPoint[0], 2) +
          Math.pow(wall[1][1] - prevPoint[1], 2));
        return {
          x,
          y,
          value: (value * this.distanceFactor).toFixed(1),
        };
      })
      .filter(point => point !== null);
      if (this.editMode && this.nextCoord !== undefined && this.currentExteriorWallCoord !== null) {
        let prevPoint;
        if (this.drawMode === drawModes.OUTSIDEWALLS && this.exteriorWallpoints.length > 0) {
          prevPoint = this.exteriorWallpoints[this.exteriorWallpoints.length - 1][1];
        } else if (this.drawMode === drawModes.OUTSIDEWALLS) {
          prevPoint = this.currentExteriorWallCoord;
        } else if (this.currentInteriorWall[0] !== undefined) {
          prevPoint = this.currentInteriorWall[0];
        } else {
          prevPoint = this.nextCoord;
        }

        const xDiff = prevPoint[0] + this.nextCoord[0];
        const yDiff = prevPoint[1] + this.nextCoord[1];
        const x = xDiff / 2;
        const y = yDiff / 2;
        const value = Math.sqrt(
          Math.pow(this.nextCoord[0] - prevPoint[0], 2) +
          Math.pow(this.nextCoord[1] - prevPoint[1], 2));
        const cursorPoint = {
          x,
          y,
          value: (value * this.distanceFactor).toFixed(1),
        };
        measurementPoints.push(cursorPoint);
      }
      return measurementPoints;
    },
    straightPathToNearestWall() {
      const line = this.nearestWall.line;
      // const distance = this.nearestWall.distance;
      const isHorizontal = line[0][1] === line[1][1];
      return isHorizontal ?
        util.coordToLine([this.hoverCoord, [this.hoverCoord[0], line[0][1]]]) :
        util.coordToLine([this.hoverCoord, [line[0][0], this.hoverCoord[1]]]);
    },
    // Calculate info about the wall nearest to cursor
    nearestWall() {
      let nearestLine = {
        line: [[], []],
        distance: Number.MAX_SAFE_INTEGER,
        path: '',
        wallPoint: [],
      };

      this.exteriorWallpoints.forEach((wall) => {
        const line = wall;
        const distance = util.distanceToSegment(this.hoverCoord, line[0], line[1]);

        const isHorizontal = line[0][1] === line[1][1];
        const unclampedWallPoint = isHorizontal ?
          [this.hoverCoord[0], line[0][1]] :
          [line[0][0], this.hoverCoord[1]];
        const wallPoint = util.clampPointToSegment(unclampedWallPoint, line);
        const path = util.coordToLine([this.hoverCoord, wallPoint]);

        if (distance < nearestLine.distance) {
          nearestLine = {
            line,
            distance,
            path,
            wallPoint,
          };
        }
      });

      this.interiorWalls.forEach((wall) => {
        const distance = util.distanceToSegment(this.hoverCoord, wall[0], wall[1]);
        const isHorizontal = wall[0][1] === wall[1][1];
        const unclampedWallPoint = isHorizontal ?
          [this.hoverCoord[0], wall[0][1]] :
          [wall[0][0], this.hoverCoord[1]];
        const wallPoint = util.clampPointToSegment(unclampedWallPoint, wall);
        const path = util.coordToLine([this.hoverCoord, wallPoint]);
        if (distance < nearestLine.distance) {
          nearestLine = {
            line: wall,
            distance,
            path,
            wallPoint,
          };
        }
      });

      return nearestLine;
    },
  },
  watch: {
    editMode: function watchEditMode() {
      if (this.editMode) {
        this.guideVisibility = true;
        enableEditHandlers(this);
      } else {
        this.guideVisibility = false;
        disableEditHandlers(this);
      }
      console.log('Watch triggered', this.editMode);
    },
  },
  methods: {
    save() {
      this.editMode = false;
      this.instructionMessage = 'It\'s gone.';
      this.$store.commit(MutationTypes.TOGGLE_BLUEPRINT_EDIT_MODE, { newValue: false });
    },
    endExteriorWalls(e) {
      const lastWallpoint = this.currentExteriorWallCoord;
      // Compensate last point for 90 degree angle
      const alignedLastPoint = util.alignPoint(lastWallpoint, this.exteriorWallpoints[0][0]);
      // this.exteriorWallpoints.push(alignedLastPoint);
      this.exteriorWallpoints.push([alignedLastPoint, this.exteriorWallpoints[0][0]]);

      console.log('Outside walls ready', this.exteriorWallpoints);


      this.drawMode = drawModes.INSIDEWALLS1;
      this.ready = true;
      this.instructionMessage = 'Now start drawing an interior wall by selecting a point. Or you can save if ready';
      e.stopPropagation(); // Prevent bubbling to svg and adding another point of external wall
    },
    clearInteriorWalls() {
      console.log('Clearing interior walls');
    },
  },
  mounted() {
    this.canvasWidth = this.$refs.canvas.clientWidth;
    this.canvasHeight = this.$refs.canvas.clientHeight;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tool-wrapper {
  height: 100%;
  width: 100%;
  color: white;
}
svg {
  width: 100%;
  height: 100%;
}

.exteriorWall, .wallPreview {
  fill: none;
  stroke: white;
  stroke-width: 6px;
}

.wallPreview {
  opacity: 0.5;
}

.interiorWall {
  fill: none;
  stroke: white;
  stroke-width: 2px;
}

.guides {
  fill: none;
  stroke: white;
  stroke-width: 1px;
  stroke-opacity: 0.5;
}
.exteriorBeginGuide {
  fill: black;
}
.guidePoint {
  fill: white;
  opacity: 0.5;
}
.guides > text {
  fill: white;
}
.measurementRect {
  fill: black;
  stroke-width: 2px;
}
</style>
