const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.length = 0;
	}

	push(data, priority) {
		var node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
		this.length++;
	}

	pop() {
		if(this.root !== null) {
			var detached = this.detachRoot();
			this.restoreRootFromLastInsertedNode(detached);
			this.shiftNodeDown(this.root);
			this.length--;
			return detached.data;
		}
	}

	detachRoot() {
		var detachedRoot;
		detachedRoot = this.root;
		if(this.parentNodes.indexOf(this.root) > -1) {
			this.parentNodes.splice(0, 1);
		}
		this.root = null;
		return detachedRoot;
	}

	restoreRootFromLastInsertedNode(detached) {
		if(this.parentNodes.length > 0 && Object.keys(detached).length !== 0) {
			var lastInsertedNode = this.parentNodes[this.parentNodes.length - 1];
			this.parentNodes.splice(this.parentNodes.length - 1, 1);
			if(lastInsertedNode.parent !== detached) {
				if(this.parentNodes.indexOf(lastInsertedNode.parent) === -1){
					this.parentNodes.splice(0, 0, lastInsertedNode.parent);
				}
			}
			lastInsertedNode.remove();
			lastInsertedNode.parent = null;
			this.root = lastInsertedNode;
			this.root.left = detached.left;
			if(this.root.left !== null) {
				this.root.left.parent = this.root;
			}
			this.root.right = detached.right;
			if(this.root.right !== null) {
				this.root.right.parent = this.root;
			}
			if(this.root.left === null || this.root.right === null) {
				this.parentNodes.splice(0, 0, this.root);
			}
		}
	}

	size() {
		return this.length;
	}

	isEmpty() {
		return !this.root ? true : false;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.length = 0;
	}

	insertNode(node) {
		if(!this.root) {
			this.root = node;
			this.parentNodes.push(node);
		} else if(!this.parentNodes[0].left) {
			this.parentNodes[0].appendChild(node);
			this.parentNodes.push(node);
		} else if(!this.parentNodes[0].right) {
			this.parentNodes[0].appendChild(node);
			this.parentNodes.push(node);
			this.parentNodes.splice(0, 1);
		}
	}

	shiftNodeUp(node) {
		if (node.parent === null) {
			this.root = node;
			return;
		} else if(node.parent.priority < node.priority) {
			var indexChild = this.parentNodes.indexOf(node);
			var indexParent = this.parentNodes.indexOf(node.parent);
			if(indexChild > -1) {
				if(indexParent > -1) {
					this.parentNodes.splice(indexParent, 1, node);
					this.parentNodes.splice(indexChild, 1, node.parent);
				} else {
					this.parentNodes.splice(indexChild, 1, node.parent);
				}
			}
			node.swapWithParent();
			this.shiftNodeUp(node);
		}
	}

	shiftNodeDown(node) {
		function correctParentNodes(indexParent, indexChild, direction) {
			if(indexChild > -1) {
				if(indexParent > -1) {
					if(direction === "left") {
						this.parentNodes.splice(indexParent, 1, node.left);
					} else {
						this.parentNodes.splice(indexParent, 1, node.right);
					}
					
					this.parentNodes.splice(indexChild, 1, node);
				} else {
					this.parentNodes.splice(indexChild, 1, node);
				}
			}
		}
		if(this.parentNodes.length > 0) {
			if(node.left === null && node.right === null) {
				return;
			} else {
				var indexParent = this.parentNodes.indexOf(node);
				var indexChild;
				if(node.left !== null && node.right !== null) {
					if(node.left.priority >= node.right.priority && node.left.priority > node.priority) {
						indexChild = this.parentNodes.indexOf(node.left);
						correctParentNodes.call(this, indexParent, indexChild, "left");
						if(node === this.root) {
							this.root = node.left;
						}
						node.left.swapWithParent();
						this.shiftNodeDown(node);
					} else if(node.left.priority < node.right.priority && node.right.priority > node.priority) {
						indexChild = this.parentNodes.indexOf(node.right);
						correctParentNodes.call(this, indexParent, indexChild, "right");
						if(node === this.root) {
							this.root = node.right;
						}
						node.right.swapWithParent();
						this.shiftNodeDown(node);
					}
				} else if(node.left !== null && node.left.priority > node.priority) {
					indexChild = this.parentNodes.indexOf(node.left);
					correctParentNodes.call(this, indexParent, indexChild, "left");
					if(node === this.root) {
							this.root = node.left;
						}
					node.left.swapWithParent();
					this.shiftNodeDown(node);
				} else if(node.right !== null && node.right.priority > node.priority) {
					indexChild = this.parentNodes.indexOf(node.right);
					correctParentNodes.call(this, indexParent, indexChild, "right");
					if(node === this.root) {
							this.root = node.right;
						}
					node.right.swapWithParent();
					this.shiftNodeDown(node);
				} else {
					return;
				}
				
			}
		}
	}
}

module.exports = MaxHeap;
