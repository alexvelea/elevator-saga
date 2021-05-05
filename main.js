emptyApi = {
    goToFloor: function (_) {
    },
    getPressedFloors: function () {
    },
    currentFloor: function () {
    },
    loadFactor: function () {
    },
    goingUpIndicator: function () {
    },
    goingDownIndicator: function () {
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
            direction: [],
            maxLoadFactor: 0.5,
            ongoingHere: [],
        },
        init: function (elevators, floors) {
            elevators.forEach((elevator) => {
                this.state.direction.push(+1)
                elevator.goingUpIndicator(true)
                elevator.goingDownIndicator(false)
            })
            floors.forEach(() => {
                this.state.ongoingHere.push({
                    up: false,
                    down: false,
                })
            })
        },
        update: function (dt, elevators, floors) {
            this.state.ongoingHere.forEach((here) => {
                here.up = false
                here.down = false
            })

            elevators.forEach((elevator, index) => {
                    const pressed = elevator.getPressedFloors()
                    const currentFloor = elevator.currentFloor()
                    let direction = this.state.direction[index]
                    let toFloor

                    const swapDirection = () => {
                        direction = -direction
                        this.state.direction[index] = direction
                        elevator.goingDownIndicator(1 ^ elevator.goingDownIndicator())
                        elevator.goingUpIndicator(1 ^ elevator.goingUpIndicator())
                    };

                    let numTries = 0;
                    for (; ;) {
                        numTries += 1;
                        if (numTries === 3) {
                            toFloor = currentFloor
                            break
                        }
                        if (direction === +1) {
                            let nextLevel = floors.length
                            pressed.forEach((level) => {
                                if (level >= currentFloor)
                                    nextLevel = Math.min(nextLevel, level)
                            })

                            if (elevator.loadFactor() < this.state.maxLoadFactor) {
                                floors.forEach((floor, level) => {
                                    if (this.state.ongoingHere[level].up === false && level >= currentFloor && floor.buttonStates.up !== "") {
                                        nextLevel = Math.min(nextLevel, level)
                                    }
                                })
                            }

                            // try to go up to pick up people going down
                            if (nextLevel === floors.length) {
                                nextLevel = -1
                                floors.forEach((floor, level) => {
                                    if (this.state.ongoingHere[level].down === false && level > currentFloor && floor.buttonStates.down !== "") {
                                        nextLevel = Math.max(nextLevel, level)
                                    }
                                })
                                if (nextLevel === -1) {
                                    nextLevel = floors.length
                                }
                            }

                            if (nextLevel === floors.length) {
                                swapDirection()
                            } else {
                                toFloor = nextLevel
                                break
                            }
                        } else {
                            let nextLevel = -1
                            pressed.forEach((level) => {
                                if (level <= currentFloor)
                                    nextLevel = Math.max(nextLevel, level)
                            })
                            if (elevator.loadFactor() < this.state.maxLoadFactor) {
                                floors.forEach((floor, level) => {
                                    if (this.state.ongoingHere[level].down === false && level <= currentFloor && floor.buttonStates.down !== "") {
                                        nextLevel = Math.max(nextLevel, level)
                                    }
                                })
                            }

                            // try to go up to pick up people going up
                            if (nextLevel === floors.length) {
                                nextLevel = floors.length
                                floors.forEach((floor, level) => {
                                    if (this.state.ongoingHere[level].up === false && level < currentFloor && floor.buttonStates.up !== "") {
                                        nextLevel = Math.min(nextLevel, level)
                                    }
                                })
                                if (nextLevel === floors.length) {
                                    nextLevel = -1
                                }
                            }

                            if (nextLevel === -1) {
                                swapDirection()
                            } else {
                                toFloor = nextLevel
                                break
                            }
                        }
                    }

                    elevator.goToFloor(toFloor, true)
                    if (direction === +1) {
                        this.state.ongoingHere[toFloor].up = true
                    } else {
                        this.state.ongoingHere[toFloor].down = true
                    }
                }
            )
        }
    }
// end cut

obj.init()
obj.update(0.3, [emptyApi], [emptyApi])