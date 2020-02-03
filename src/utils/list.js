export class ListNode {
    constructor(element) {
        this.next = null;
        this.pre = null;
        this.element = element;
    }
}

// 双向链表
export class List {
    constructor() {
        this.head = null;
        this.length = 0;
        this.tail = null;
    }

    static createNode(element) {
        return new ListNode(element);
    }

    append(element) {
        let node = List.createNode(element);
        if(this.head) {
            let currentNode = this.head;
            while(currentNode.next) {
                currentNode = currentNode.next;
            }
            currentNode.next = node;
            node.pre = currentNode;
            this.tail = node;
        } else {
            this.head = node;
            this.tail = node;
        }
        this.length++;
    }

    find(element) {
        let currentNode = this.head;
        while(currentNode) {
            if (element === currentNode.element) {
                return true;
            } 
            currentNode = currentNode.next;
        }
        return false;
    }

    indexOf(element) {
        let [currentNode, index] =[ this.head, 0];
        while(currentNode) {
            if(currentNode.element === element) {
                return index
            }
            index++;
            currentNode = currentNode.next;
        }
        return -1;
    }

    remove(element) {
        let position = this.indexOf(element);
        return this.removeAt(position);
    }

    removeAt(position) {
        if(position > -1 && position < this.length) {
            let currentNode = this.head;
            if (position === 0) {
                this.head = currentNode.next;
                if (this.length === 1) {
                    this.tail = null;
                } else {
                    this.head.pre = null;
                }
            } else if( position === this.length -1){
                currentNode = this.tail;
                this.tail = currentNode.pre;
                this.tail.next = null;
            } else {
                let index = 0,
                preNode = null;
                while( index++ < position) {
                    preNode = currentNode;
                    currentNode = currentNode.next;
                }
                preNode.next = currentNode.next;
                currentNode.next.pre = preNode;

            }
            this.length--;
            return currentNode.element;
        } else {
            return null;
        }
    }

    toArray() {
        let arr = [],
        currentNode = this.head;
        while(currentNode) {
            arr.push(currentNode.element);
            currentNode = currentNode.next;
        }
        return arr;
    }
}