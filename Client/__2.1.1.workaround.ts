
/*
 * THIS IS TEMPORARY TO PATCH 2.1.1+ Core bugs
 */

/* tslint:disable */
let __compiler__ = require('@angular/compiler');
import { __platform_browser_private__ } from '@angular/platform-browser';
import { __core_private__ } from '@angular/core';
let patch = false;
if (!__core_private__['ViewUtils']) {
    patch = true;
    __core_private__['ViewUtils'] = __core_private__['view_utils'];
}



if (!__compiler__.__compiler_private__) {
    patch = true;
    (__compiler__).__compiler_private__ = {
        SelectorMatcher: __compiler__.SelectorMatcher,
        CssSelector: __compiler__.CssSelector
    }
}

var __universal__ = require('angular2-platform-node/__private_imports__');
if (patch) {
    __universal__.ViewUtils = __core_private__['view_utils'];
    __universal__.CssSelector = __compiler__.CssSelector
    __universal__.SelectorMatcher = __compiler__.SelectorMatcher
}





// Fix Universal Style
import { NodeDomRootRenderer, NodeDomRenderer } from 'angular2-universal/node';
function renderComponentFix(componentProto: any) {
    return new NodeDomRenderer(this, componentProto, this._animationDriver);
}
NodeDomRootRenderer.prototype.renderComponent = renderComponentFix;
// End Fix Universal Style

// Material style fix
var createElementOriginal = NodeDomRenderer.prototype.createElement;
function createElementFix(parent: any, name: any, _debugInfo: any) {
    var el = createElementOriginal.apply(this, [parent, name, _debugInfo]);
    if (el != null) {
        el.style = {};
        el.nodeName = el.name;
    }
    return el;
}
NodeDomRenderer.prototype.createElement = createElementFix;
// Material style fix

// Material disable MdRipple work around.
import { MdRipple } from '@angular/material/core/ripple/ripple';

// Make these functions NOOP.
MdRipple.prototype.ngOnInit = function () { }
MdRipple.prototype.ngOnDestroy = function () { }
MdRipple.prototype.ngOnChanges = function (changes: any) { }
// Material disable MdRipple work around.

// Material disable ripple on Button work around.
import { MdButton } from '@angular/material/button/button';
MdButton.prototype._isRippleDisabled = function () {
    return true;
};
// Material disable MdRipple work around.

// Disable observe content on the server.
import { ObserveContent } from '@angular/material/core/observe-content/observe-content';
ObserveContent.prototype.ngAfterContentInit = function () { }
// Disable observe content on the server.