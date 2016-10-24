/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Block for the AllBot functions.
 *     The AllBot examples can be found at:
 *     https://github.com/Velleman/ALLBOT-lib
 */
'use strict';

goog.provide('Blockly.Blocks.allbot');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');


/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.allbot.HUE = '#50E68E';

Blockly.Blocks['allbotservo_config_hub'] = {
  /**
   * Block for adding an allbot servo to a hub.
   * @this Blockly.Block
   */
  init: function() {
    var names = [];
    if (Blockly.Arduino.Boards.selected['joints'] !== undefined) {
        for (var nrname in Blockly.Arduino.Boards.selected.joints.name) {
            names.push(
                [Blockly.Msg[ Blockly.Arduino.Boards.selected.joints.name[nrname][0] ],
                 Blockly.Arduino.Boards.selected.joints.name[nrname][1]]);
        }
    } else {
        names = [['No AllBot', 'noallbot']];
    }
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("media/arduino/Servo.png", 19, 19, "*"))
        .appendField(Blockly.Msg.ARD_ALLBOT_SERVOHUB)
        .appendField(new Blockly.FieldDropdown(names), 'NAMESERVO');
    this.setOutput(true, "HUB_DIGOUT");
    this.setColour(Blockly.Blocks.allbot.HUE);
    this.setTooltip(Blockly.Msg.ARD_SERVOHUB_TIP);
    this.setHelpUrl('https://www.arduino.cc/en/Reference/Servo');
  },
  /**
   * Set the connection pins that the component connects to
   * @param {array} array of the connections (as string, eg '1', 'SDA', 'A1', ...
   * @this Blockly.Block
   */
  setHubConnector: function(connector) {
    this['connector'] = connector;
  },
  /**
   * Gets the variable type required.
   * @param {!string} varName Name of the variable selected in this block to
   *     check.
   * @return {string} String to indicate the variable type.
   */
  getVarType: function(varName) {
    return Blockly.Types.NUMBER;
  }
};
