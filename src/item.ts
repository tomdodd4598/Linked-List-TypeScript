export class Item<T> implements Iterable<Item<T>> {
    value: T;
    next: Item<T> = null;

    constructor(value: T, next: Item<T>) {
        this.value = value;
        this.next = next;
    }

    [Symbol.iterator](): Iterator<Item<T>> {
        let item: Item<T> = this;
        return {
            next(): IteratorResult<Item<T>> {
                let current = item;
                item = item?.next;
                return {
                    done: current === null,
                    value: current
                }
            }
        }
    }

    printGetNext(): Item<T> {
        process.stdout.write(this.value.toString());
        process.stdout.write(this.next == null ? "\n" : ", ");
        return this.next;
    }
}

export function itemFold<T, A, R>(fSome: (item: Item<T>, next: Item<T>, acc: A) => A, fLast: (item: Item<T>, acc: A) => R, fEmpty: (acc: A) => R, accumulator: A, item: Item<T>): R {
    if (item !== null) {
        let next = item.next;
        if (next !== null) {
            return itemFold(fSome, fLast, fEmpty, fSome(item, next, accumulator), next);
        } else {
            return fLast(item, accumulator);
        }
    } else {
        return fEmpty(accumulator);
    }
}

export function itemFoldback<T, A, R>(fSome: (item: Item<T>, next: Item<T>, inner: A) => A, fLast: (item: Item<T>) => A, fEmpty: () => A, generator: (inner: A) => R, item: Item<T>): R {
    if (item !== null) {
        let next = item.next;
        if (next !== null) {
            return itemFoldback(fSome, fLast, fEmpty, innerVal => generator(fSome(item, next, innerVal)), next);
        } else {
            return generator(fLast(item));
        }
    } else {
        return generator(fEmpty());
    }
}
