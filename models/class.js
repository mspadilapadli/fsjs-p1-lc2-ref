class Tag {
    constructor(id, name) {
        (this.id = id), (this.name = name);
    }
}

class Shirt {
    constructor(id, name, type, size, stock, TagId, tagName) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.size = size;
        this.stock = stock;
        this.TagId = TagId;
        this.tagName = tagName;
    }
}

class Factory {
    static instanceShirts(arr) {
        return arr.map(
            ({ id, name, type, size, stock, TagId, tagName }) =>
                new Shirt(id, name, type, size, stock, TagId, tagName)
        );
    }
    static instanceTags(arr) {
        return arr.map(({ id, name }) => new Tag(id, name));
    }
}

module.exports = { Factory, Shirt };
