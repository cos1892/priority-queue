class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if(this.left==null) {
			this.left = node;
			node.parent = this;
		} else if (this.right == null) {
			this.right = node;
			node.parent = this;
		}
	}

	removeChild(node) {
		if(this.left === node) {
			this.left = null;
			node.parent = null;
		} else if(this.right === node) {
			this.right = null;
			node.parent = null;
		} else {
			throw new Error("Passed node is not a child of this node");
		}
	}

	remove() {
		if(this.parent) {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if(this.parent) {
			var swap = {};
			for(var key in this.parent) {
				swap[key] = this.parent[key];
			}
			if(swap.parent) {
				if(this.parent.parent.left.data === swap.data && this.parent.parent.left.priority === swap.priority) {
					this.parent.parent.left = this;
				} else {
					this.parent.parent.right = this;
				}
			}
			this.parent.parent = this;
			this.parent.left = this.left;
			if(this.left!==null) {
				this.parent.left.parent = this.parent;
			}
			this.parent.right = this.right;
			if(this.right!==null) {
				this.parent.right.parent = this.parent;
			}
			if(swap.left !== null) {
				if(swap.left.data === this.data && swap.left.priority === this.priority) {
					this.left = this.parent;
					this.right = swap.right;
					if(this.right!==null) {
						this.right.parent = this;
					}
				} else {
					this.right = this.parent;
					this.left = swap.left;
					if(this.left!==null) {
						this.left.parent = this;
					}	
				}
			}
			
			this.parent = swap.parent;
		}
	}
}

module.exports = Node;
