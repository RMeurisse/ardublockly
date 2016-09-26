/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Block for the Microduino functions.
 *     The Arduino built in functions syntax can be found at:
 *     https://arduino.cc/en/Reference/HomePage
 */
'use strict';

goog.provide('Blockly.Blocks.md_control');

goog.require('Blockly.Blocks');


/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.md_control.HUE = 120;


/** Attach a microduino crashbutton block to the hub*/
Blockly.Blocks['mcookie_crashbutton_setup'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("../media/MD/MDButton.png", 19, 19, "*"))
        .appendField(Blockly.Msg.ARD_MD_CRASHBUTTON_COMPONENT)
        .appendField(new Blockly.Blocks.ComponentFieldVariable(
        Blockly.Msg.ARD_MD_CRASHBUTTON_DEFAULT_NAME, 'Button'), 'BUTTONNAME')
    this.setOutput(true, 'HUB_DIG');
    this.setColour(Blockly.Blocks.md_control.HUE);
    this.setTooltip(Blockly.Msg.ARD_MD_CRASHBUTTON_TIP);
    this.setHelpUrl('https://wiki.microduino.cc/index.php/Microduino-Crash');
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
   * Return the name of the component defined in this block
   * @return {!<string>} The name of the component
   * @this Blockly.Block
   */
  getComponentName: function() {
    return 'Button';
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('BUTTONNAME')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('BUTTONNAME'))) {
      this.setFieldValue(newName, 'BUTTONNAME');
    }
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

Blockly.Blocks['mcookie_button_digitalread'] = {
  /**
   * Block for creating a 'read pin'.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/DigitalRead');
    this.setColour(Blockly.Blocks.md_control.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_BUTTON_READ)
        .appendField(new Blockly.Blocks.ComponentFieldVariable(
        Blockly.Msg.ARD_MD_CRASHBUTTON_DEFAULT_NAME, 'Button'), 'BUTTONNAME');
    this.setOutput(true, Blockly.Types.BOOLEAN.output);
    this.setTooltip(Blockly.Msg.ARD_DIGITALREAD_TIP);
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.BOOLEAN;
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('BUTTONNAME')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('BUTTONNAME'))) {
      this.setFieldValue(newName, 'BUTTONNAME');
    }
  },
  /**
   * Gets the variable type required.
   * @param {!string} varName Name of the variable selected in this block to
   *     check.
   * @return {string} String to indicate the variable type.
   */
  getVarType: function(varName) {
    return Blockly.Types.NUMBER;
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks the instances of the config block and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function() {
    if (!this.workspace) { return; }  // Block has been deleted.

    var currentDropdown = this.getFieldValue('BUTTONNAME');
    if (Blockly.Blocks.ComponentFieldVariable.CheckSetupPresent(this.workspace, currentDropdown, 'Button')) {
      this.setWarningText(null);
    } else {
      // Set a warning to select a valid stepper config
      this.setWarningText(Blockly.Msg.ARD_COMPONENT_WARN1.replace('%1', Blockly.Msg.ARD_BUTTON_COMPONENT).replace('%1', Blockly.Msg.ARD_BUTTON_COMPONENT));
    }
  }
};