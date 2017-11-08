
/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */

enum SwitchState {
    //% block="ON"
    on,
    //% block="OFF"
    off
}

enum LightRoom {
    //% block="Deck"
    deck,
    //% block="Attic"
    attic,
    //% block="Bedroom"
    bedroom,
    //% block="Dining Room"
    dining,
    //% block="Entrance"
    entrance
}

enum LightColor {
    //% block="Red"
    Red,
    //% block="Green"
    Green,
    //% block="Blue"
    Blue,
    //% block="Purple"
    Purple,
    //% block="White"
    White
}

let Deck_Light_State = ""
let Attic_Light_State = ""
let Bed_Room_Light_State = ""
let Dining_Room_Light_State = ""
let Entrance_Light_State = ""
let Party_Mode_State: boolean = false

/**
 * SmartHome blocks
 */
//% weight=100 color=#0fbc11 icon="\uf0c2"
namespace smarthome {
    let LEDs: neopixel.Strip = null
    LEDs = neopixel.create(DigitalPin.P8, 5, NeoPixelMode.RGB)

    /**
     * Use this to turn the light from a room on or off.
     * @param room "What room light to control"
     * @param state "describe parameter here"
     */
    //% block
    export function Lights(room: LightRoom, state: SwitchState): void {
        // Add code here
        let WhatRoom = 0
        let WhatState = ""
        if (state == SwitchState.on) {
            WhatState = "on"
        } else {
            WhatState = "off"
        }
        switch (room) {
            case LightRoom.deck: WhatRoom = 0;
                Deck_Light_State = WhatState
                break;
            case LightRoom.attic: WhatRoom = 1;
                Attic_Light_State = WhatState
                break;
            case LightRoom.bedroom: WhatRoom = 2;
                Bed_Room_Light_State = WhatState
                break;
            case LightRoom.dining: WhatRoom = 3;
                Dining_Room_Light_State = WhatState
                break;
            case LightRoom.entrance: WhatRoom = 4;
                Entrance_Light_State = WhatState
                break;
        }
        if (WhatState == "on") {
            LEDs.setPixelColor(WhatRoom, neopixel.colors(NeoPixelColors.White))
        } else {
            LEDs.setPixelColor(WhatRoom, neopixel.rgb(0, 0, 0))
        }
        LEDs.show()
    }

    /**
     * Use this to get the curant state of a room light. Select what room you want to know the state of and it will return "on" or "off".
     * @param room describe value here, eg: Bedroom
     */
    //% block
    export function Light_State(room: LightRoom): string {
        switch (room) {
            case LightRoom.deck: return Deck_Light_State;
                break;
            case LightRoom.attic: return Attic_Light_State;
                break;
            case LightRoom.bedroom: return Bed_Room_Light_State;
                break;
            case LightRoom.dining: return Dining_Room_Light_State;
                break;
            case LightRoom.entrance: return Entrance_Light_State;
                break;
            default: return "";
                break;
        }
    }

    /**
 * Blink a room light 4 times in Red, Green, Blue, Purple, or White. The light will return to whatever state it was origonaly set to after the blinking.
 * @param room "What room light to control"
 * @param color "Select the color for the blink"
 */
    //% block
    export function Blink_Light(room: LightRoom, color: LightColor): void {
        // Add code here
        let WhatRoom = 0
        let RoomLightState = ""

        switch (room) {
            case LightRoom.deck: WhatRoom = 0;
                RoomLightState = Deck_Light_State
                break;
            case LightRoom.attic: WhatRoom = 1;
                RoomLightState = Attic_Light_State
                break;
            case LightRoom.bedroom: WhatRoom = 2;
                RoomLightState = Bed_Room_Light_State
                break;
            case LightRoom.dining: WhatRoom = 3;
                RoomLightState = Dining_Room_Light_State
                break;
            case LightRoom.entrance: WhatRoom = 4;
                RoomLightState = Entrance_Light_State
                break;
        }
        for (let i = 0; i < 4; i++) {
            LEDs.setPixelColor(WhatRoom, neopixel.rgb(0, 0, 0))
            LEDs.show()
            basic.pause(500)
            switch (color) {
                case LightColor.Red:
                    LEDs.setPixelColor(WhatRoom, neopixel.colors(NeoPixelColors.Red))
                    break;
                case LightColor.Green:
                    LEDs.setPixelColor(WhatRoom, neopixel.colors(NeoPixelColors.Green))
                    break;
                case LightColor.Blue:
                    LEDs.setPixelColor(WhatRoom, neopixel.colors(NeoPixelColors.Blue))
                    break;
                case LightColor.Purple:
                    LEDs.setPixelColor(WhatRoom, neopixel.colors(NeoPixelColors.Purple))
                    break;
                case LightColor.White:
                    LEDs.setPixelColor(WhatRoom, neopixel.colors(NeoPixelColors.White))
                    break;
            }
            LEDs.show()
            basic.pause(500)
        }
        if (RoomLightState == "off") {
            LEDs.setPixelColor(WhatRoom, neopixel.rgb(0, 0, 0));
        } else {
            LEDs.setPixelColor(WhatRoom, neopixel.colors(NeoPixelColors.White))
        }
        LEDs.show()
    }

    /**
     * Party Mode lets you start the party or end it. 
     * @param room describe value here, eg: Bedroom
     */
    //% block
    export function Party_Mode(state: SwitchState): void {
        if (state == SwitchState.on) {
            Party_Mode_State = true
            music.beginMelody(music.builtInMelody(Melodies.Funk), MelodyOptions.Once)
            LEDs.showRainbow(1, 308)
            for (let i = 0; i < 8; i++) {
                basic.pause(500)
                LEDs.rotate(1)
                LEDs.show()
            }
        }else{
            Party_Mode_State = false
            music.beginMelody(music.builtInMelody(Melodies.PowerDown), MelodyOptions.Once)
            LEDs.clear()
            LEDs.show()
        }
    }

    /**
     * Is the party mode active? This will return a Boolean value (true or false) 
     */
    //% block
    export function Party_State(): boolean {
        return Party_Mode_State
    }
}
