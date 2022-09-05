import {Item, itemFold, itemFoldback} from "./item";

export function insertItem<T>(start: Item<T>, val: T, insertBefore: (val: T, oth: Item<T>) => boolean): Item<T> {
    console.log(`Creating item: ${val}`);
    let current = start, previous = null;
    
    while (current !== null && !insertBefore(val, current)) {
        previous = current;
        current = current.next;
    }
    let item = new Item<T>(val, current)
    
    if (previous === null) {
        start = item;
    }
    else {
        previous.next = item;
    }
    
    return start;
}

export function removeItem<T>(start: Item<T>, val: T, valueEquals: (item: Item<T>, val: T) => boolean): Item<T> {
    let current = start, previous = null;
		
    while (current !== null && !valueEquals(current, val)) {
        previous = current;
        current = current.next;
    }
    
    if (current === null) {
        console.log(`Item ${val} does not exist!`);
    }
    else {
        if (previous === null) {
            start = current.next;
        }
        else {
            previous.next = current.next;
        }
        console.log(`Removed item: ${val}`);
    }
    
    return start;
}

export function removeAll<T>(_start: Item<T>): Item<T> {
    return null;
}

export function printList<T>(start: Item<T>) {
    while (start !== null) {
        start = start.printGetNext();
    }
}

export function printIterator<T>(start: Item<T>) {
    if (start !== null) {
        for (let item of start) {
            item.printGetNext();
        }
    }
}

export function printRecursive<T>(start: Item<T>) {
    if (start !== null) {
        printRecursive(start.printGetNext());
    }
}

export function printFold<T>(start: Item<T>) {
	let fSome = (current: Item<T>, _: Item<T>, accumulator: String) => `${accumulator}${current.value}, `;
	let fLast = (current: Item<T>, accumulator: String) => `${accumulator}${current.value}\n`;
	let fEmpty = (accumulator: String) => accumulator;
	process.stdout.write(itemFold(fSome, fLast, fEmpty, "", start).valueOf());
}

export function printFoldback<T>(start: Item<T>) {
	let fSome = (current: Item<T>, _: Item<T>, innerVal: String) => `${current.value}, ${innerVal}`;
	let fLast = (current: Item<T>) => `${current.value}\n`;
	let fEmpty = () => "";
	process.stdout.write(itemFoldback(fSome, fLast, fEmpty, (x: String) => x, start).valueOf());
}
