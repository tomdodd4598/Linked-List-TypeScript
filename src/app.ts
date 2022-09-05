import {exit} from "process";
import * as Helpers from "./helpers";
import {Item} from "./item";

import promptSync = require("prompt-sync");

const prompt: promptSync.Prompt = promptSync();

const validRegex = new RegExp("^(0|-?[1-9][0-9]*|[A-Za-z][0-9A-Z_a-z]*)$");
const numberRegex = new RegExp("^-?[0-9]+$");

function isValidString(str: string): boolean {
    return validRegex.test(str);
}

function isNumberString(str: string): boolean {
    return numberRegex.test(str);
}

function insertBefore(val: string, oth: Item<string>): boolean {
    if (isNumberString(val) && isNumberString(oth.value)) {
        return BigInt(val) <= BigInt(oth.value);
    }
    else {
        return val <= oth.value;
    }
}

function valueEquals(item: Item<string>, val: string): boolean {
    return item.value === val;
}

let start: Item<string> = null;

let begin = true;
let input: string = null;

while (true) {
    if (!begin) {
        console.log();
    }
    else {
        begin = false;
    }
    
    console.log("Awaiting input...");
    input = prompt("");
    
    if (input === "") {
        console.log("\nProgram terminated!");
        start = Helpers.removeAll(start);
        exit();
    }
    else if (input.charAt(0) === "~") {
        if (input.length === 1) {
            console.log("\nDeleting list...");
            start = Helpers.removeAll(start);
        }
        else {
            input = input.substring(1);
            if (isValidString(input)) {
                console.log("\nRemoving item...");
                start = Helpers.removeItem(start, input, valueEquals);
            }
            else {
                console.log("\nCould not parse input!");
            }
        }
    }
    else if (input === "l") {
        console.log("\nList print...");
        Helpers.printList(start);
    }
    else if (input === "i") {
        console.log("\nIterator print...");
        Helpers.printIterator(start);
    }
    else if (input === "a") {
        console.log("\nArray print not implemented!");
    }
    else if (input === "r") {
        console.log("\nRecursive print...");
        Helpers.printRecursive(start);
    }
    else if (input === "f") {
        console.log("\nFold print...");
        Helpers.printFold(start);
    }
    else if (input === "b") {
        console.log("\nFoldback print...");
        Helpers.printFoldback(start);
    }
    else if (isValidString(input)) {
        console.log("\nInserting item...");
        start = Helpers.insertItem(start, input, insertBefore);
    }
    else {
        console.log("\nCould not parse input!");
    }
}
