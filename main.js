emptyApi = {
    goToFloor: function (_) {
    },
    getPressedFloors: function () {
    },
    currentFloor: function () {
    },
    loadFactor: function () {
    },
    buttonStates: {
        up: "",
        down: "",
    }
}

const obj =
    // begin cut below
    {
        state: {
            direction: +1
        },
        init: function (elevators, floors) {
        },
        update: function (dt, elevators, floors) {
            const elevator = elevators[0]
            const pressed = elevator.getPressedFloors()
            const currentFloor = elevator.currentFloor()
            let toFloor = 0

            // check if we should go down
            if (this.state.direction === +1) {
                let maxLevel = -1
                pressed.forEach((level) => {
                    maxLevel = Math.max(maxLevel, level)
                })

                floors.forEach((floor, level) => {
                    if (floor.buttonStates.up !== "" || floor.buttonStates.down !== "") {
                        maxLevel = Math.max(maxLevel, level)
                    }
                })

                // finished everything on max-level, go down
                if (currentFloor > maxLevel) {
                    this.state.direction = -1
                }
            } else {
                let minLevel = floors.length
                pressed.forEach((level) => {
                    minLevel = Math.min(minLevel, level)
                })

                floors.forEach((floor, level) => {
                    if (floor.buttonStates.up !== "" || floor.buttonStates.down !== "") {
                        minLevel = Math.min(minLevel, level)
                    }
                })

                // finished everything on min-level, go up
                if (currentFloor < minLevel) {
                    this.state.direction = +1
                }

                if (elevator.loadFactor() === 1) {
                    this.state.direction = +1
                }
            }

            // next floor at which we should stop at
            if (this.state.direction === +1) {
                let nextLevel = floors.length - 1
                pressed.forEach((level) => {
                    if (level >= currentFloor)
                        nextLevel = Math.min(nextLevel, level)
                })
                floors.forEach((floor, level) => {
                    if (level >= currentFloor && floor.buttonStates.up !== "") {
                        nextLevel = Math.min(nextLevel, level)
                    }
                })

                toFloor = nextLevel
            } else {
                let nextLevel = 0
                pressed.forEach((level) => {
                    if (level <= currentFloor)
                        nextLevel = Math.max(nextLevel, level)
                })
                floors.forEach((floor, level) => {
                    if (level <= currentFloor && floor.buttonStates.down !== "") {
                        nextLevel = Math.max(nextLevel, level)
                    }
                })

                toFloor = nextLevel
            }

            elevator.goToFloor(toFloor, true)
            console.log(this.state.direction, toFloor)
        }
    } // end cut

obj.init()
obj.update(0.3, [emptyApi], [emptyApi])